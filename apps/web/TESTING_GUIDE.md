# Testing & Deployment Guide

**Project:** labs.vedify.in  
**Last Updated:** June 27, 2026

---

## 🧪 Pre-Deployment Testing Checklist

### 1. Build & Type Checking

```bash
# Install dependencies
npm install

# Type checking
npm run check-types
# Expected: No errors

# Build verification
npm run build
# Expected: Successful build, no errors

# Start production server
npm run start
# Expected: Server starts on port 3000
```

### 2. Automated Tests

```bash
# Lint check
npm run lint
# Expected: No errors

# Data generation
node scripts/generate-data.mjs
# Expected: 
# ✓ public/data/site.json
# ✓ public/data/projects.json (X projects)
```

### 3. Manual Functionality Testing

#### Navigation & Interaction
- [ ] Page loads without errors
- [ ] All project cards render correctly
- [ ] Search functionality works
- [ ] Category filter buttons work
- [ ] Accordion expands/collapses
- [ ] Carousel auto-advances every 5 seconds
- [ ] Carousel pauses on hover
- [ ] All external links open in new tabs
- [ ] All internal navigation works

#### Data Integrity
- [ ] Projects load from JSON
- [ ] All project fields display correctly
- [ ] Status badges show correct state
- [ ] Icons render for all projects
- [ ] Links work (GitHub, demo, read more)

---

## ♿ Accessibility Testing

### Keyboard Navigation
```
Test Sequence:
1. Press Tab from page load
2. Verify skip link appears and is visible
3. Press Enter on skip link
4. Verify focus moves to main content
5. Tab through all interactive elements
6. Verify focus indicators are visible
7. Test carousel with arrow keys (←/→)
8. Verify all buttons are reachable
9. Test category filters with keyboard
10. Verify accordion with Enter/Space
```

**Pass Criteria:**
- [ ] Skip link visible on focus
- [ ] All interactive elements keyboard accessible
- [ ] Carousel responds to arrow keys
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Visible focus indicators

### Screen Reader Testing

**Tools:** NVDA (Windows), JAWS (Windows), VoiceOver (Mac)

```
Test Sequence:
1. Navigate with screen reader active
2. Verify page title announced
3. Check skip link announcement
4. Verify heading hierarchy
5. Test search input label
6. Verify carousel announcements
7. Check button labels
8. Verify link descriptions
9. Test form controls
10. Verify landmark regions
```

**Pass Criteria:**
- [ ] Page title read correctly
- [ ] Skip link announced and functional
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Search input has label
- [ ] Carousel slide changes announced
- [ ] All buttons have descriptive names
- [ ] Links provide context
- [ ] Landmarks properly identified

### Motion & Animation
```
Test Sequence:
1. Enable "Reduce motion" in OS settings:
   - Windows: Settings → Ease of Access → Display
   - Mac: System Preferences → Accessibility → Display
2. Reload page
3. Verify animations are minimal
4. Check carousel still functional
5. Verify transitions still smooth
```

**Pass Criteria:**
- [ ] Animations reduced to ~0.01ms
- [ ] No jarring movements
- [ ] Carousel still navigable
- [ ] Page remains functional

---

## 🎨 Visual Testing

### Browser Compatibility
Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive Design
Test at:
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1024px)
- [ ] Large Desktop (1440px+)

### Theme Testing
- [ ] Dark theme renders correctly
- [ ] Light theme renders correctly (if DEMO_THEME=light)
- [ ] Theme-color meta tag works

---

## 🚀 Performance Testing

### Lighthouse Audit
```bash
# Development
npm run dev

# Then in Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Desktop" or "Mobile"
# 4. Check "Accessibility", "Performance", "Best Practices", "SEO"
# 5. Click "Analyze page load"
```

**Target Scores:**
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Web Vitals
Monitor:
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Bundle Size
```bash
npm run build

# Check .next/static/chunks for bundle sizes
# Target: Main bundle < 300KB gzipped
```

---

## 🔒 Security Testing

### Content Security Policy
```bash
# Test headers (after deployment)
curl -I https://labs.vedify.in

# Verify:
# - X-Frame-Options: DENY
# - X-Content-Type-Options: nosniff
# - Referrer-Policy: strict-origin-when-cross-origin
```

### Dependency Audit
```bash
npm audit
# Expected: 0 vulnerabilities

# If vulnerabilities found:
npm audit fix
```

### Environment Variables
- [ ] No secrets in code
- [ ] Environment variables validated
- [ ] DEMO_VIEW/DEMO_THEME properly validated

---

## 📱 PWA Testing

### Manifest
```bash
# Visit in browser
open https://labs.vedify.in/manifest.json

# Verify:
# - name, short_name
# - icons array
# - theme_color, background_color
# - display mode
```

### Service Worker
```bash
# Open DevTools → Application → Service Workers
# Verify:
# - Service worker registered
# - Status: activated and running
# - No errors in console
```

### Install Prompt
- [ ] "Install" button appears (desktop/mobile)
- [ ] App installs successfully
- [ ] Standalone mode works
- [ ] Icon appears on home screen (mobile)

---

## 🐛 Error State Testing

### Missing Data
```bash
# Test error handling
rm public/data/projects.json
npm run dev

# Expected:
# - No crash
# - Fallback data displayed
# - Error logged to console
```

### Network Errors
- [ ] Test offline functionality
- [ ] Verify graceful degradation
- [ ] Check error boundaries catch errors

### Invalid Data
```bash
# Add invalid project to data/projects/test-invalid.yaml
# Run build
node scripts/generate-data.mjs

# Expected:
# - Validation errors displayed
# - Build stops with exit code 1
# - Helpful error messages
```

---

## 📊 SEO Testing

### Meta Tags
View source and verify:
- [ ] Title tag present
- [ ] Meta description present
- [ ] Canonical URL correct
- [ ] OpenGraph tags present
- [ ] Twitter Card tags present

### Robots & Sitemap
```bash
# Check robots.txt
curl https://labs.vedify.in/robots.txt

# Check sitemap
curl https://labs.vedify.in/sitemap.xml
```

### Structured Data
```bash
# Test with Google Rich Results Tool
# https://search.google.com/test/rich-results

# Verify:
# - WebSite schema
# - ItemList schema
# - FAQPage schema
# - No errors
```

---

## 🌐 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Build successful
- [ ] Dependencies up to date
- [ ] Environment variables configured

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment Verification
- [ ] Visit production URL
- [ ] Test all functionality
- [ ] Run Lighthouse audit
- [ ] Check Analytics (if enabled)
- [ ] Monitor error tracking
- [ ] Verify CDN caching

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor Core Web Vitals
- [ ] Track user analytics
- [ ] Check logs regularly

---

## 🔍 Known Issues & Limitations

### Not Yet Implemented
1. OpenGraph images (needs design assets)
2. Analytics integration (deployment decision)
3. Advanced error tracking (Sentry setup)
4. E2E tests (Playwright/Cypress)

### Browser Limitations
- Terminal view uses inline styles (acceptable for demo)
- Some animations may not work in IE11 (unsupported)

### Performance Notes
- First load may be slower (no data caching yet)
- Service worker caches static assets
- Consider implementing React Suspense for data loading

---

## 📞 Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Type Errors
```bash
# Check types
npm run check-types

# Common fixes:
# - Update import paths
# - Verify type exports
# - Check @types/* packages
```

### Service Worker Issues
```bash
# Unregister service worker
# In DevTools Console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(r => r.unregister())
})

# Clear cache and reload
```

---

## ✅ Final Go-Live Checklist

- [ ] All tests passing
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Error boundaries working
- [ ] Service worker registered
- [ ] SEO meta tags verified
- [ ] Robots.txt live
- [ ] Sitemap.xml live
- [ ] Analytics configured (optional)
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Performance baseline established

---

**Ready for Production! 🚀**

For issues or questions, refer to:
- `bugs.md` - Original bug report
- `FIXES_COMPLETED.md` - Implementation details
- GitHub Issues - Project-specific problems
