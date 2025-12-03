import { google } from 'googleapis';

const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

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

      const sheets = getGoogleSheetsClient();
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      // Get all existing emails to check for duplicates
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A:A',
      });

      const existingEmails = response.data.values || [];
      const emailExists = existingEmails.some(
        row => row[0]?.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        console.log(`❌ Duplicate email attempt: ${normalizedEmail}`);
        return res.status(200).json({ message: 'Email already registered' });
      }

      // Add new email to sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:B',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[normalizedEmail, timestamp || new Date().toISOString()]],
        },
      });

      console.log(`✅ Email saved to Google Sheets: ${normalizedEmail}`);
      return res.status(200).json({ message: 'Email saved successfully' });
    } catch (error) {
      console.error('Error saving email:', error);
      return res.status(500).json({ 
        error: 'Failed to save email', 
        message: error.message 
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
