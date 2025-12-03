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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const sheets = getGoogleSheetsClient();
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      // Get all emails from the sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A:A',
      });

      const emails = response.data.values || [];
      const count = emails.length;

      console.log(`Current wishlist count: ${count}`);

      return res.status(200).json({ count });
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
