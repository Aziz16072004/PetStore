# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved (`npm run typecheck`)
- [ ] ESLint warnings addressed (`npm run lint`)
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed or documented

### ✅ Configuration
- [ ] API endpoints configured correctly in `src/config/api.ts`
- [ ] Environment variables set up (`.env.example` provided)
- [ ] Production API URL configured
- [ ] All hardcoded URLs replaced with environment variables

### ✅ Dependencies
- [ ] All dependencies up to date
- [ ] No unused dependencies in `package.json`
- [ ] Lock file (`package-lock.json`) committed

### ✅ Git & GitHub
- [ ] `.gitignore` properly configured
- [ ] Sensitive data not committed (API keys, .env files)
- [ ] README.md complete and accurate
- [ ] Repository initialized with `git init`
- [ ] All files staged and committed

### ✅ Testing
- [ ] All pages load without errors
- [ ] Cart functionality works
- [ ] Wishlist functionality works
- [ ] LocalStorage persistence verified
- [ ] Responsive design tested on multiple devices
- [ ] API integration tested

### ✅ Performance
- [ ] Images optimized
- [ ] Build size checked (`npm run build`)
- [ ] No memory leaks in React components
- [ ] Lazy loading implemented where appropriate

## 📋 GitHub Push Steps

### 1. Initialize Git Repository (if not already done)
```bash
git init
```

### 2. Add Remote Repository
```bash
git remote add origin <your-github-repo-url>
```

### 3. Stage All Files
```bash
git add .
```

### 4. Commit Changes
```bash
git commit -m "Initial commit: Pet Store e-commerce application"
```

### 5. Push to GitHub
```bash
git push -u origin main
# or if your default branch is master
git push -u origin master
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts
4. Set environment variables in Netlify dashboard

### Option 3: GitHub Pages
1. Install gh-pages: `npm i -D gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Update `vite.config.ts` with base path
4. Run: `npm run deploy`

## 🔐 Environment Variables

### Development (.env.local)
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### Production
Set these in your hosting platform:
```env
VITE_API_BASE_URL=https://your-production-api.com/api
```

## 📦 Build Command
```bash
npm run build
```

Output directory: `dist/`

## 🔍 Post-Deployment Verification

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Products load from API
- [ ] Cart functionality works
- [ ] Wishlist functionality works
- [ ] Images display correctly
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active (HTTPS)
- [ ] No console errors in browser

## 🐛 Common Issues

### Issue: API calls fail in production
**Solution**: Check CORS settings on backend and verify API_BASE_URL

### Issue: Images not loading
**Solution**: Verify image paths are relative and assets are in public folder

### Issue: Routes return 404
**Solution**: Configure hosting platform for SPA routing (redirect all to index.html)

### Issue: Environment variables not working
**Solution**: Ensure variables start with `VITE_` prefix and rebuild after changes

## 📞 Support

For deployment issues, contact:
- Email: mouhamedazizchaabani@gmail.com
- Phone: +216 50-551-663

---

Last updated: October 2025
