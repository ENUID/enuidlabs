# Deploy to Vercel with Custom Domain (enuid.com)

## Quick Deploy Steps:

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
npm run build
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **enuidlabs** (or whatever you want)
- Directory? **./** (press Enter)
- Override settings? **N**

### 4. Connect Your Domain (enuid.com)

After deployment:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Domains**
4. Add your domain: **enuid.com**
5. Vercel will show you DNS records to add

### 5. Update DNS at Your Domain Registrar

Add these records at your domain registrar (where you bought enuid.com):

**For root domain (enuid.com):**
- Type: **A**
- Name: **@**
- Value: **76.76.21.21** (Vercel's IP)

**For www subdomain:**
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com**

### 6. Deploy to Production
```bash
vercel --prod
```

## Important Notes:

⚠️ **Email Storage Limitation**: On Vercel's serverless platform, the `/tmp` directory is temporary. Emails will be lost between deployments.

### Better Solution for Production:

Use a database instead of JSON file. Quick options:

**Option 1: Vercel Postgres (Recommended)**
```bash
npm install @vercel/postgres
```

**Option 2: MongoDB Atlas (Free tier)**
```bash
npm install mongodb
```

**Option 3: Google Sheets API (Simple)**
```bash
npm install googleapis
```

Would you like me to set up one of these for persistent email storage?

## Testing Locally Before Deploy:

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Commands Summary:

```bash
# Development
npm run dev:all

# Build for production
npm run build

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

Your site will be live at:
- https://your-project.vercel.app (temporary)
- https://enuid.com (after DNS setup)
