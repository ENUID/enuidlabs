import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

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

      // Check if email already exists
      const emailDoc = await db.collection('wishlist').doc(normalizedEmail).get();

      if (emailDoc.exists) {
        console.log(`❌ Duplicate email attempt: ${normalizedEmail}`);
        return res.status(200).json({ message: 'Email already registered' });
      }

      // Save email to Firestore
      await db.collection('wishlist').doc(normalizedEmail).set({
        email: normalizedEmail,
        timestamp: timestamp || admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✅ Email saved to Firebase: ${normalizedEmail}`);
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
