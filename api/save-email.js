import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { email, timestamp } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Normalize email to lowercase for consistent checking
      const normalizedEmail = email.toLowerCase().trim();

      // Check if email already exists in KV store
      const existingEmail = await kv.get(`email:${normalizedEmail}`);
      
      if (existingEmail) {
        console.log(`❌ Duplicate email attempt: ${normalizedEmail}`);
        return res.status(200).json({ message: 'Email already registered' });
      }

      // Save email to KV store
      await kv.set(`email:${normalizedEmail}`, {
        email: normalizedEmail,
        timestamp: timestamp || new Date().toISOString()
      });

      // Increment the counter
      await kv.incr('wishlist:count');

      console.log(`✅ New email saved: ${normalizedEmail}`);
      return res.status(200).json({ message: 'Email saved successfully' });
    } catch (error) {
      console.error('Error saving email:', error);
      return res.status(500).json({ error: 'Failed to save email', message: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
