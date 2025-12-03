import admin from 'firebase-admin';

const initializeFirebase = () => {
  if (admin.apps.length) {
    return admin.app();
  }

  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
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
      // Check if environment variables are set
      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        return res.status(500).json({ 
          error: 'Firebase credentials not configured',
          count: 0,
          message: 'Missing Firebase environment variables'
        });
      }

      initializeFirebase();
      const db = admin.firestore();

      // Get count of documents in wishlist collection
      const snapshot = await db.collection('wishlist').count().get();
      const count = snapshot.data().count;

      console.log(`Current wishlist count: ${count}`);

      return res.status(200).json({ count });
    } catch (error) {
      console.error('Error getting count:', error);
      return res.status(500).json({ 
        error: 'Failed to get count', 
        count: 0,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
