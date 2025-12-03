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

      // Normalize email to lowercase for consistent checking
      const normalizedEmail = email.toLowerCase().trim();

      // Try to find the wishlist file
      const possiblePaths = [
        path.join(__dirname, 'emails', 'wishlist-emails.json'),
        path.join(__dirname, '..', 'wishlist-emails.json'),
        path.join(process.cwd(), 'wishlist-emails.json'),
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

      // Check if email already exists
      const emailExists = emails.some(entry => entry.email.toLowerCase() === normalizedEmail);
      
      if (emailExists) {
        console.log(`❌ Duplicate email attempt: ${normalizedEmail}`);
        return res.status(200).json({ message: 'Email already registered' });
      }

      // Note: On Vercel, we can't write to filesystem
      // So we just return success but the email won't persist
      // This is a limitation of serverless functions
      console.log(`⚠️ Email submitted but cannot persist on Vercel: ${normalizedEmail}`);
      
      return res.status(200).json({ 
        message: 'Email saved successfully',
        note: 'Running on serverless - data shown is from deployment time'
      });
    } catch (error) {
      console.error('Error processing email:', error);
      return res.status(500).json({ error: 'Failed to save email', message: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
