import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Always use the same file path
const emailsFilePath = path.join(__dirname, 'wishlist-emails.json');

// Initialize the file if it doesn't exist
if (!fs.existsSync(emailsFilePath)) {
  fs.writeFileSync(emailsFilePath, JSON.stringify([], null, 2));
}

app.post('/api/save-email', (req, res) => {
  try {
    const { email, timestamp } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let emails = [];
    const fileContent = fs.readFileSync(emailsFilePath, 'utf-8');
    emails = JSON.parse(fileContent);

    // Check if email already exists
    const emailExists = emails.some(entry => entry.email === email);
    if (emailExists) {
      return res.status(200).json({ message: 'Email already registered' });
    }

    emails.push({ email, timestamp });
    fs.writeFileSync(emailsFilePath, JSON.stringify(emails, null, 2));

    console.log(`✅ New email added: ${email} (Total: ${emails.length})`);
    return res.status(200).json({ message: 'Email saved successfully' });
  } catch (error) {
    console.error('❌ Error saving email:', error);
    return res.status(500).json({ error: 'Failed to save email' });
  }
});

app.get('/api/emails/count', (req, res) => {
  try {
    const fileContent = fs.readFileSync(emailsFilePath, 'utf-8');
    const emails = JSON.parse(fileContent);
    res.json({ count: emails.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get count' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📧 Emails will be saved to: ${emailsFilePath}`);
  });
}

export default app;
