# Deployment Guide

## 🚀 Ready for Production

The Ethics-Tech-Policy Decisions Sandbox is ready to be deployed! The application has been built and tested successfully.

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the recommended platform for Next.js applications and offers the easiest deployment process.

#### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy!

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

#### Alternative: Deploy via GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

**Environment Variables** (if needed):
- No environment variables required for basic functionality
- All features work without external services

---

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build Command**:
   ```bash
   npm run build
   ```

3. **Publish Directory**: `.next`

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

---

### Option 3: Self-Hosted (Node.js Server)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Configure reverse proxy** (nginx, Apache, etc.) to point to port 3000

---

## Pre-Deployment Checklist

✅ **Build Status**: Build passes successfully
✅ **TypeScript**: No type errors
✅ **Linting**: No linting errors
✅ **Features Tested**:
   - Homepage loads correctly
   - Level selection works
   - Progress saving/loading works
   - Certificate generation works
   - Social sharing works
   - Audio toggle works

## Post-Deployment

### Test the Live Site

1. **Homepage**: Verify all 7 level cards display
2. **Level Navigation**: Click a level and verify it loads
3. **Progress Saving**: Save progress and verify it persists
4. **Certificate**: Complete a level and generate certificate
5. **Social Sharing**: Test LinkedIn/Twitter/Facebook sharing

### Monitor

- Check browser console for errors
- Verify localStorage is working (for progress saving)
- Test on multiple browsers/devices
- Check mobile responsiveness

## Known Considerations

1. **localStorage**: Progress is saved in browser localStorage
   - Each player gets their own unique ID
   - Progress is isolated per player
   - Works across sessions

2. **Audio Files**: Background music is loaded from `/public/background-music.mp3`
   - Ensure the file is included in deployment
   - File size: ~3.9MB

3. **No Backend Required**: All features work client-side
   - Progress saving uses localStorage
   - Certificate generation is client-side
   - No database needed

## Troubleshooting

### Build Errors
- Run `npm run build` locally to catch errors
- Check TypeScript types: `npm run typecheck`
- Check linting: `npm run lint`

### Runtime Errors
- Check browser console
- Verify all public assets are deployed
- Check localStorage permissions

### Performance
- Static assets are optimized by Next.js
- Images are optimized automatically
- Code splitting is handled automatically

## Support

For issues or questions:
- Check the test progress page: `/test-progress`
- Review browser console for errors
- Verify all dependencies are installed

---

## Quick Deploy Command (Vercel)

```bash
# One-line deploy
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

