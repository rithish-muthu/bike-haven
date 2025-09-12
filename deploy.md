# Deployment Guide

## Quick Start

1. **Setup Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication and Firestore Database
   - Copy your config to `assets/js/firebase-config.js`

2. **Run Locally**
   ```bash
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

3. **Deploy to Firebase Hosting**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize hosting
   firebase init hosting
   
   # Deploy
   firebase deploy
   ```

## Alternative Deployment Options

### Netlify
1. Drag and drop the project folder to [Netlify](https://netlify.com)
2. Configure build settings (not needed for static site)
3. Deploy

### Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Configure project settings
3. Deploy

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch
4. Deploy

## Environment Variables

For production deployment, make sure to:
- Update Firebase configuration with production values
- Set up proper Firestore security rules
- Configure authentication providers
- Set up proper CORS settings

## Security Checklist

- [ ] Firebase security rules configured
- [ ] Authentication enabled
- [ ] Admin users created
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] Input validation added
