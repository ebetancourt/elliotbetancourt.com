# Brevo Migration Guide for Contact Form Workers

This guide is for migrating a Cloudflare Worker contact form integration from EmailOctopus to Brevo. It assumes the site has a **contact form only** (no lead magnets) that submits `name`, `email`, and optionally `message` to a Cloudflare Worker.

---

## Prerequisites (Manual Steps)

Before making code changes, the site owner must:

1. **Have a Brevo account** with an API key (Settings > API Keys)
2. **Create a contact list** in Brevo and note the numeric List ID
3. **Create these custom contact attributes** in Brevo (Settings > Contacts > Contact Attributes), all as Text type:
   - `FULLNAME`
   - `CONTACT_MESSAGE`
   - `CONTACT_BRAND`
   - `CONTACT_SOURCE`
4. **Set the worker secret** after deploying: `npx wrangler secret put BREVO_API_KEY`

---

## Code Changes

### 1. `worker/wrangler.toml`

Replace the EmailOctopus environment variable with Brevo's:

```toml
# BEFORE
[vars]
EMAILOCTOPUS_LIST_ID = "your-list-id"
CONTACT_BRAND = "your-brand"
ALLOWED_ORIGIN = "https://yoursite.com"
# API key is set as a secret: npx wrangler secret put EMAILOCTOPUS_API_KEY

# AFTER
[vars]
BREVO_LIST_ID = "YOUR_NUMERIC_BREVO_LIST_ID"
CONTACT_BRAND = "your-brand"
ALLOWED_ORIGIN = "https://yoursite.com"
# API key is set as a secret: npx wrangler secret put BREVO_API_KEY
```

Do the same for any `[env.preview.vars]` sections.

### 2. `worker/index.js`

Replace the EmailOctopus API call with Brevo's contact creation endpoint. The key differences:

| Aspect | EmailOctopus | Brevo |
|--------|-------------|-------|
| Endpoint | `PUT /lists/{id}/contacts` | `POST /v3/contacts` |
| Auth header | `Authorization: Bearer {key}` | `api-key: {key}` |
| Custom fields | `fields: { ... }` | `attributes: { ... }` |
| Tags | `tags: { tagName: true }` | Use attributes instead |
| List assignment | Part of the URL | `listIds: [numericId]` |
| Upsert | Implicit with PUT | `updateEnabled: true` |

Replace the API call block with:

```js
const res = await fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': env.BREVO_API_KEY,
  },
  body: JSON.stringify({
    email,
    attributes: {
      FULLNAME: name,
      CONTACT_MESSAGE: message || '',
      CONTACT_BRAND: env.CONTACT_BRAND,
      CONTACT_SOURCE: 'website-inquiry',
    },
    listIds: [parseInt(env.BREVO_LIST_ID)],
    updateEnabled: true,
  }),
});
```

The `CONTACT_BRAND` value is set per-site in `wrangler.toml` and distinguishes which site the contact came from. Change it to match the site you're migrating.

### 3. Response handling

Brevo returns `201` for new contacts and `204` for updates. Both are success cases. Check with `res.ok` which covers both:

```js
if (!res.ok) {
  const data = await res.json();
  return new Response(JSON.stringify({ error: 'Submission failed', details: data }), {
    status: res.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### 4. No frontend changes needed

The HTML forms submit to the same worker endpoint with the same field names. No form changes are required.

---

## Post-Deploy Verification

1. Set the secret: `npx wrangler secret put BREVO_API_KEY`
2. Deploy: `npx wrangler deploy`
3. Test with curl:
   ```bash
   curl -X POST https://YOUR-WORKER.workers.dev \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","message":"Migration test"}'
   ```
4. Verify the contact appears in Brevo with correct attributes and list membership
5. Delete the test contact from Brevo
