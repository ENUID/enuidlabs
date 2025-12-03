import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Get count from KV store
      const count = await kv.get('wishlist:count') || 0;
      
      console.log('Current wishlist count:', count);

      return res.status(200).json({ 
        count: Number(count)
      });
    } catch (error) {
      console.error('Error getting count:', error);
      return res.status(500).json({ 
        error: 'Failed to get count', 
        count: 0,
        message: error.message 
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
