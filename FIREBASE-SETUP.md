# Firebase Setup Guide

## Using Existing Firebase Project

If you already have a Firebase project with emails stored in a `wishlist` collection, just add the credentials to Vercel environment variables.

## Step 1: Get Firebase Credentials

1. Go to https://console.firebase.google.com
2. Select your existing project
3. Click gear icon ⚙️ → "Project settings"
4. Go to "Service accounts" tab
5. Click "Generate new private key"
6. Download the JSON file

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose closest to you)
5. Click "Enable"

## Step 3: Create Service Account

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Go to "Service accounts" tab
4. Click "Generate new private key"
5. Click "Generate key" - a JSON file will download

## Step 4: Add Environment Variables to Vercel

1. Open the downloaded JSON file
2. Find these 3 values:
   - `project_id`
   - `client_email`
   - `private_key`

3. Go to Vercel Dashboard:
   - https://vercel.com/dashboard
   - Select "enuidlabs" project
   - Go to "Settings" → "Environment Variables"

4. Add these 3 variables:

   **Variable 1:**
   - Name: `FIREBASE_PROJECT_ID`
   - Value: (paste `project_id` from JSON)

   **Variable 2:**
   - Name: `FIREBASE_CLIENT_EMAIL`
   - Value: (paste `client_email` from JSON)

   **Variable 3:**
   - Name: `FIREBASE_PRIVATE_KEY`
   - Value: (paste entire `private_key` from JSON, keep the quotes and \\n)

5. Click "Save" for each

## Step 5: Import Your 1000+ Emails

1. Prepare your emails in JSON format like this:
```json
[
  {"email": "user1@example.com", "timestamp": "2024-01-01T00:00:00Z"},
  {"email": "user2@example.com", "timestamp": "2024-01-02T00:00:00Z"}
]
```

Or simple array:
```json
["user1@example.com", "user2@example.com", "user3@example.com"]
```

2. After deployment, use this PowerShell command to import:

```powershell
$emails = Get-Content "path-to-your-emails.json" | ConvertFrom-Json
$body = @{ emails = $emails } | ConvertTo-Json -Depth 10
Invoke-WebRequest -Uri "https://enuid.com/api/import-emails" -Method POST -Body $body -ContentType "application/json"
```

Or use Postman/Insomnia:
- URL: `https://enuid.com/api/import-emails`
- Method: POST
- Body: `{"emails": ["email1@test.com", "email2@test.com", ...]}`

## Done!

Your wishlist will now:
- ✅ Save emails to Firebase Firestore
- ✅ Prevent duplicates perfectly
- ✅ Show correct count
- ✅ Handle 1000+ emails easily
- ✅ Work on production without any issues

## View Your Data

Go to Firebase Console → Firestore Database to see all your emails in real-time!
