import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, timestamp } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const emailsFilePath = path.join(__dirname, '..', 'wishlist-emails.json');
      
      let emails = [];
      if (fs.existsSync(emailsFilePath)) {
        const fileContent = fs.readFileSync(emailsFilePath, 'utf-8');
        emails = JSON.parse(fileContent);
      }

      // Check if email already exists
      const emailExists = emails.some(entry => entry.email === email);
      if (emailExists) {
        return res.status(200).json({ message: 'Email already registered' });
      }

      emails.push({ email, timestamp });
      fs.writeFileSync(emailsFilePath, JSON.stringify(emails, null, 2));

      return res.status(200).json({ message: 'Email saved successfully' });
    } catch (error) {
      console.error('Error saving email:', error);
      return res.status(500).json({ error: 'Failed to save email' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
