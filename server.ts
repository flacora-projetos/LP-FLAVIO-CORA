import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON body
  app.use(express.json());
  app.set('trust proxy', true);

  // META CAPI Endpoint
  app.post('/api/track', async (req, res) => {
    const { eventName, eventID, sourceUrl, fbp, fbc, customData } = req.body;
    
    if (!eventName || !eventID) {
      return res.status(400).json({ error: 'Missing required parameters: eventName or eventID' });
    }

    // Lead capture logging (minimal persistence structure)
    if (eventName === 'QualificationComplete' || eventName === 'Lead') {
       console.log('--- NEW LEAD (Qualification Complete) ---');
       console.log(JSON.stringify({ 
         timestamp: new Date().toISOString(),
         eventName,
         eventID,
         customData,
         sourceUrl
       }, null, 2));
    }

    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const META_PIXEL_ID = process.env.META_PIXEL_ID || '2963831520554824'; // Fallback to hardcoded ID to ensure deduplication if not set in ENVs
    const META_TEST_CODE = process.env.META_TEST_CODE;

    if (!META_ACCESS_TOKEN) {
      console.warn('META_ACCESS_TOKEN not set. Skipping CAPI request.');
      return res.status(200).json({ status: 'ignored', reason: 'Missing access token' });
    }

    try {
      const clientIpAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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
            ...(customData && { custom_data: customData }),
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
      console.error('API /api/track exception:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server', err);
});
