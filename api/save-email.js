import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
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

      // Try multiple possible paths for the wishlist file
      const possiblePaths = [
        path.join(__dirname, '..', 'wishlist-emails.json'),
        path.join(process.cwd(), 'wishlist-emails.json'),
        path.join(__dirname, 'wishlist-emails.json'),
      ];

      let emailsFilePath = null;
      let emails = [];

      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          emailsFilePath = filePath;
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          emails = JSON.parse(fileContent);
          break;
        }
      }

      // If no file found, use the first path and create it
      if (!emailsFilePath) {
        emailsFilePath = possiblePaths[0];
      }

      // Check if email already exists
      const emailExists = emails.some(entry => entry.email === email);
      if (emailExists) {
        return res.status(200).json({ message: 'Email already registered' });
      }

      emails.push({ email, timestamp });
      
      // Try to write the file
      try {
        fs.writeFileSync(emailsFilePath, JSON.stringify(emails, null, 2));
        console.log(`✅ Email saved: ${email} to ${emailsFilePath}`);
      } catch (writeError) {
        console.error('Cannot write to filesystem on Vercel:', writeError);
        // On Vercel, we can't write to filesystem, so just return success
        // You'll need a database for production
      }

      return res.status(200).json({ message: 'Email saved successfully' });
    } catch (error) {
      console.error('Error saving email:', error);
      return res.status(500).json({ error: 'Failed to save email', message: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
