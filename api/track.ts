export default async function handler(req: any, res: any) {
  // CORS check (optional, but good practice)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventName, eventID, sourceUrl, fbp, fbc } = req.body;
  
  if (!eventName || !eventID) {
    return res.status(400).json({ error: 'Missing required parameters: eventName or eventID' });
  }

  const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const META_PIXEL_ID = process.env.META_PIXEL_ID || '2963831520554824'; 
  const META_TEST_CODE = process.env.META_TEST_CODE;

  if (!META_ACCESS_TOKEN) {
    console.warn('META_ACCESS_TOKEN not set. Skipping CAPI request.');
    return res.status(200).json({ status: 'ignored', reason: 'Missing access token' });
  }

  try {
    const clientIpAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
    const clientUserAgent = req.headers['user-agent'];
    
    const payload: any = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventID,
          event_source_url: sourceUrl,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIpAddress,
            client_user_agent: clientUserAgent,
          },
        }
      ]
    };

    if (fbp) payload.data[0].user_data.fbp = fbp;
    if (fbc) payload.data[0].user_data.fbc = fbc;

    if (META_TEST_CODE) {
      payload.test_event_code = META_TEST_CODE;
    }

    console.log(`Sending to Meta Conversions API (event=${eventName}, id=${eventID})`);

    const response = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Meta CAPI Error:', responseData);
      return res.status(400).json({ error: 'Failed to send event', details: responseData });
    }

    console.log('Meta CAPI Success:', responseData);
    return res.status(200).json({ status: 'success', response: responseData });
  } catch (err) {
    console.error('API track exception:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
