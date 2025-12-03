import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  // This is a one-time migration endpoint
  // Call it once to migrate existing emails to KV
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read the existing wishlist file
    const filePath = path.join(__dirname, 'emails', 'wishlist-emails.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const emails = JSON.parse(fileContent);

    let imported = 0;
    let skipped = 0;

    // Import each email into KV
    for (const entry of emails) {
      const normalizedEmail = entry.email.toLowerCase().trim();
      const existing = await kv.get(`email:${normalizedEmail}`);
      
      if (!existing) {
        await kv.set(`email:${normalizedEmail}`, {
          email: normalizedEmail,
          timestamp: entry.timestamp
        });
        imported++;
      } else {
        skipped++;
      }
    }

    // Set the counter
    await kv.set('wishlist:count', emails.length);

    return res.status(200).json({
      message: 'Migration completed',
      imported,
      skipped,
      total: emails.length
    });
  } catch (error) {
    console.error('Migration error:', error);
    return res.status(500).json({ error: error.message });
  }
}
