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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ error: 'emails array is required' });
    }

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    // Process in batches of 500 (Firestore limit)
    const batchSize = 500;
    
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = db.batch();
      const emailBatch = emails.slice(i, i + batchSize);

      for (const entry of emailBatch) {
        try {
          const email = typeof entry === 'string' ? entry : entry.email;
          const timestamp = entry.timestamp || new Date().toISOString();
          
          if (!email) continue;

          const normalizedEmail = email.toLowerCase().trim();
          const docRef = db.collection('wishlist').doc(normalizedEmail);

          // Check if already exists
          const doc = await docRef.get();
          if (doc.exists) {
            skipped++;
            continue;
          }

          batch.set(docRef, {
            email: normalizedEmail,
            timestamp: timestamp,
            importedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          imported++;
        } catch (err) {
          console.error('Error processing email:', err);
          errors++;
        }
      }

      await batch.commit();
      console.log(`Batch ${Math.floor(i / batchSize) + 1} committed`);
    }

    return res.status(200).json({
      message: 'Import completed',
      imported,
      skipped,
      errors,
      total: emails.length,
    });
  } catch (error) {
    console.error('Import error:', error);
    return res.status(500).json({ error: error.message });
  }
}
