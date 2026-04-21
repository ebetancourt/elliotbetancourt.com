// Lead magnet lookup table
// Add new entries here when creating new lead magnets.
// fileUrl: public URL to the PDF (hosted on elliotbetancourt.com/resources/files/)
// description: used in Brevo email templates via {{ contact.LEAD_MAGNET_DESCRIPTION }}
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
  'ai-unit-economics-checklist': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/ai-unit-economics-checklist.pdf',
    description: 'AI Unit Economics Checklist PDF',
  },
  'ai-systems-checklist': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/ai-systems-checklist.pdf',
    description: 'AI Systems Readiness Checklist PDF',
  },
  'ai-agent-systems-audit': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/ai-agent-systems-audit.pdf',
    description: 'AI Agent Systems Audit PDF',
  },
  'ai-adoption-readiness-audit': {
    fileUrl: 'https://elliotbetancourt.com/resources/files/ai-adoption-readiness-audit.pdf',
    description: 'AI Adoption Readiness Audit PDF',
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

      // Build Brevo contact attributes
      const magnet = leadMagnet ? LEAD_MAGNETS[leadMagnet] : null;

      const attributes = {
        FULLNAME: name,
        CONTACT_MESSAGE: message || '',
        CONTACT_BRAND: env.CONTACT_BRAND,
        CONTACT_SOURCE: leadMagnet ? 'lead-magnet' : 'website-inquiry',
        LEAD_MAGNET_ID: leadMagnet || '',
        LEAD_MAGNET_URL: magnet?.fileUrl || '',
        LEAD_MAGNET_DESCRIPTION: magnet?.description || '',
      };

      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          attributes,
          listIds: [parseInt(env.BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
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
