# Google Sheets Setup Guide

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com
2. Click "Blank" to create a new spreadsheet
3. Name it: `ENUID Wishlist`
4. In cell A1, type: `Email`
5. In cell B1, type: `Timestamp`
6. Copy the spreadsheet ID from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the `SPREADSHEET_ID_HERE` part

## Step 2: Create a Google Service Account

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name it: `enuid-sheets-access`
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. Create Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON"
   - Download the JSON file

## Step 3: Share Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `something@project-id.iam.gserviceaccount.com`)
3. Copy that email
4. Go back to your Google Sheet
5. Click "Share" button
6. Paste the service account email
7. Give it "Editor" access
8. Uncheck "Notify people"
9. Click "Share"

## Step 4: Add Environment Variables to Vercel

1. Open the downloaded JSON file
2. Find these values:
   - `client_email`
   - `private_key`

3. Go to Vercel Dashboard:
   - https://vercel.com/dashboard
   - Select your "enuidlabs" project
   - Go to "Settings" → "Environment Variables"

4. Add these 3 variables:

   **Variable 1:**
   - Name: `GOOGLE_SHEET_ID`
   - Value: (paste the spreadsheet ID from Step 1)

   **Variable 2:**
   - Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: (paste the `client_email` from JSON)

   **Variable 3:**
   - Name: `GOOGLE_PRIVATE_KEY`
   - Value: (paste the entire `private_key` from JSON, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

5. Click "Save" for each variable

## Step 5: Import Existing Emails (Optional)

If you want to import your existing 26 emails:

1. Open your `wishlist-emails.json` file
2. Copy all the emails
3. Paste them into your Google Sheet (column A)
4. Add timestamps in column B if you want

## Step 6: Redeploy

Vercel will automatically redeploy when you push the next commit.

## Done!

Your wishlist will now:
- ✅ Save emails to Google Sheets
- ✅ Prevent duplicates
- ✅ Show correct count
- ✅ Let you view/manage emails in a spreadsheet
