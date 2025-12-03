import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Try multiple possible paths for the wishlist file
      const possiblePaths = [
        path.join(__dirname, 'wishlist-emails.json'),
        path.join(__dirname, '..', 'wishlist-emails.json'),
        path.join(__dirname, '..', '..', 'wishlist-emails.json'),
        path.join(process.cwd(), 'wishlist-emails.json'),
        path.join(process.cwd(), 'api', 'emails', 'wishlist-emails.json'),
      ];

      let emails = [];

      for (const filePath of possiblePaths) {
        try {
          if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            emails = JSON.parse(fileContent);
            console.log(`✅ Found wishlist at: ${filePath} with ${emails.length} emails`);
            break;
          }
        } catch (err) {
          console.log(`Failed to read ${filePath}`);
        }
      }

      return res.status(200).json({ 
        count: emails.length
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
