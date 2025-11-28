# ENUID Labs - Landing Page

A beautiful, modern landing page for ENUID Labs with glassmorphism effects, Framer Motion animations, and a wishlist modal.

## Features

- 🎨 **Premium Design**: Glassmorphism effects, gradient orbs, and smooth animations
- 🌊 **Framer Motion**: Smooth entrance/exit animations and micro-interactions
- 📧 **Wishlist Modal**: Beautiful modal to collect email addresses
- 💾 **Email Storage**: Emails are saved to `wishlist-emails.json` file
- 🎯 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Built with Vite for lightning-fast development

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the Application

You have two options:

#### Option 1: Run Everything (Recommended)
```bash
npm run dev:all
```
This starts both the Vite dev server (port 5173) and the API server (port 3001).

#### Option 2: Run Separately
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend API
npm run server
```

### Access the Application

- **Frontend**: http://localhost:5173
- **API Server**: http://localhost:3001

## Wishlist Feature

### How It Works

1. User clicks "Join the wishlist" button
2. Beautiful modal appears with Framer Motion animations
3. User enters their email address
4. Email is validated and saved to `wishlist-emails.json`
5. Success message appears with a checkmark animation
6. Modal auto-closes after 2 seconds

### Email Storage

All wishlist emails are stored in `wishlist-emails.json` in the following format:

```json
[
  {
    "email": "user@example.com",
    "timestamp": "2025-11-25T12:04:10.123Z"
  }
]
```

### Viewing Wishlist Emails

Simply open `wishlist-emails.json` to see all collected emails and their timestamps.

### API Endpoints

- `POST /api/save-email` - Save a new email to the wishlist
- `GET /api/emails/count` - Get the total count of emails

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Express** - Backend API server
- **CORS** - Cross-origin resource sharing

## Project Structure

```
enuidlabs/
├── App.jsx              # Main React component
├── main.jsx             # React entry point
├── index.html           # HTML template
├── index.css            # Global styles
├── server.js            # Express API server
├── wishlist-emails.json # Email storage (auto-created)
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## Sections

1. **Hero** - Main landing section with animated orb
2. **The Lab** - About ENUID Labs
3. **How We Build** - Core principles (4 cards)
4. **Fluid Orbit** - Product showcase with wishlist CTA
5. **Experiments** - 6 experiment cards with status badges
6. **Footer** - Links and branding

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

---

**Built for people** 🚀
