import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const emailsFilePath = path.join(__dirname, '..', '..', 'wishlist-emails.json');
      
      let emails = [];
      if (fs.existsSync(emailsFilePath)) {
        const fileContent = fs.readFileSync(emailsFilePath, 'utf-8');
        emails = JSON.parse(fileContent);
      }

      return res.status(200).json({ count: emails.length });
    } catch (error) {
      console.error('Error getting count:', error);
      return res.status(500).json({ error: 'Failed to get count', count: 0 });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
