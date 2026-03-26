// Lead magnet lookup table
// Add new entries here when creating new lead magnets.
// fileUrl: public URL to the PDF (hosted on elliotbetancourt.com/resources/files/)
// description: used in EmailOctopus email subject/body via {{ LeadMagnetDescription }}
const LEAD_MAGNETS = {
  'agent-evaluation-framework': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/agent-evaluation-framework.pdf',
    description: 'Agent Evaluation Framework PDF',
  },
  'first-30-days-checklist': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/first-30-days-checklist.pdf',
    description: 'First 30 Days AI Agent Checklist',
  },
  'ai-roi-measurement': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/ai-roi-measurement.pdf',
    description: 'AI ROI Measurement Framework PDF',
  },
  'agent-performance-review': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/agent-performance-review.pdf',
    description: 'Agent Performance Review Template PDF',
  },
};

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const { name, email, message, leadMagnet } = await request.json();

      if (!email || !name) {
        return new Response(JSON.stringify({ error: 'Name and email are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Build tags — always include brand tag
      const tags = { [env.CONTACT_BRAND]: true };

      // Build fields
      const fields = {
        FullName: name,
        ContactMessage: message || '',
        ContactBrand: env.CONTACT_BRAND,
      };

      if (leadMagnet) {
        tags['lead-magnet'] = true;
        tags[leadMagnet] = true;

        // Look up file URL and description for EmailOctopus template variables
        const magnet = LEAD_MAGNETS[leadMagnet];
        if (magnet) {
          fields.LeadMagnetUrl = magnet.fileUrl;
          fields.LeadMagnetDescription = magnet.description;
        }
      } else {
        tags['website-inquiry'] = true;
      }

      const res = await fetch(
        `https://api.emailoctopus.com/lists/${env.EMAILOCTOPUS_LIST_ID}/contacts`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.EMAILOCTOPUS_API_KEY}`,
          },
          body: JSON.stringify({
            email_address: email,
            fields,
            tags,
            status: 'subscribed',
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Submission failed', details: data }), {
          status: res.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
