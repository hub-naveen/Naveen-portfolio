# Deployment Guide

## Local Development

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Using Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app
   - Deploy!

### Option 3: Using GitHub Actions

1. **Create GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to Vercel
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: amondnet/vercel-action@v20
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }}
             vercel-org-id: ${{ secrets.ORG_ID }}
             vercel-project-id: ${{ secrets.PROJECT_ID }}
   ```

## Environment Variables

No environment variables are required for this project.

## Custom Domain

1. **Add Custom Domain in Vercel**
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain

2. **Update DNS Records**
   - Add the CNAME record provided by Vercel
   - Wait for DNS propagation (up to 48 hours)

## Performance Optimization

1. **Enable Compression**
   - Vercel automatically enables gzip compression

2. **Optimize Images**
   - Use WebP format when possible
   - Implement lazy loading for images

3. **Enable Caching**
   - Static assets are automatically cached by Vercel

## SEO Optimization

1. **Update Meta Tags**
   - Modify `public/index.html` with your information
   - Add Open Graph tags for social sharing

2. **Add Sitemap**
   - Create `public/sitemap.xml`
   - Submit to Google Search Console

3. **Add robots.txt**
   - Create `public/robots.txt`

## Analytics

1. **Google Analytics**
   - Add Google Analytics tracking code to `public/index.html`

2. **Vercel Analytics**
   - Enable Vercel Analytics in project settings

## Monitoring

1. **Vercel Analytics**
   - Monitor performance and errors
   - Track user behavior

2. **Error Tracking**
   - Consider adding Sentry for error tracking

## Security

1. **Content Security Policy**
   - Add CSP headers in `public/index.html`

2. **HTTPS**
   - Vercel automatically provides SSL certificates

## Backup

1. **GitHub Repository**
   - Keep your code backed up on GitHub
   - Use GitHub releases for version management

2. **Environment Backup**
   - Export environment variables if needed

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 16+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Deployment Issues**
   - Check Vercel logs
   - Verify build output
   - Check for TypeScript errors

3. **Performance Issues**
   - Optimize images
   - Reduce bundle size
   - Enable code splitting

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **React Documentation**: [reactjs.org](https://reactjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

Your portfolio is now ready for deployment! 🚀 