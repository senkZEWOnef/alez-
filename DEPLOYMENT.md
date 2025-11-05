# PVC Cabinets Haiti - Deployment Guide

## Overview
This guide covers deploying the PVC Cabinets Haiti website with full functionality including contact forms, quote requests, and email handling.

## Deployment Platforms

### Recommended: Vercel (Free Tier Available)
1. **Deploy the Frontend:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables:**
   Set these in your Vercel dashboard under Settings > Environment Variables:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   DATABASE_URL=your_neon_postgres_url
   ```

### Alternative: Netlify
1. **Deploy:**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Functions:**
   Move API files to `netlify/functions/` and update imports for Netlify Functions format.

## Email Service Setup

### Option 1: SendGrid (Recommended)
1. **Sign up:** https://sendgrid.com
2. **Get API Key:** Settings > API Keys
3. **Verify Domain:** Add your domain and verify DNS records
4. **Uncomment SendGrid code** in `api/contact.js` and `api/quote.js`

### Option 2: Mailgun
1. **Sign up:** https://mailgun.com
2. **Add Domain:** Domains > Add New Domain
3. **Get API Key:** Settings > API Keys
4. **Uncomment Mailgun code** in API files

### Option 3: Email Forwarding (Simple)
For basic setups, you can use services like:
- Formspree (https://formspree.io)
- EmailJS (https://emailjs.com)
- Netlify Forms

## Database Setup (Optional)

### Neon PostgreSQL (Recommended)
1. **Sign up:** https://neon.tech
2. **Create Database:**
   ```sql
   CREATE TABLE contact_submissions (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     subject VARCHAR(100),
     message TEXT,
     preferred_contact VARCHAR(50),
     project_type VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE quote_requests (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     address TEXT,
     project_type VARCHAR(50),
     room_dimensions JSONB,
     cabinet_style VARCHAR(50),
     finish VARCHAR(50),
     features JSONB,
     budget VARCHAR(50),
     timeline VARCHAR(50),
     existing_cabinets BOOLEAN DEFAULT FALSE,
     renovation_type VARCHAR(50),
     additional_notes TEXT,
     preferred_contact VARCHAR(50),
     visit_required BOOLEAN DEFAULT TRUE,
     estimated_cost INTEGER,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Get Connection String:** Dashboard > Connection Details
4. **Uncomment database code** in API files

## Domain Setup

### Custom Domain
1. **Purchase Domain:** From any registrar (Namecheap, GoDaddy, etc.)
2. **Configure DNS:**
   - For Vercel: Add CNAME record pointing to `cname.vercel-dns.com`
   - For Netlify: Add CNAME record pointing to your Netlify subdomain

### SSL Certificate
Both Vercel and Netlify provide automatic SSL certificates.

## Content Management

### Multi-language Content
Update translation files in `src/i18n/`:
- `ht.json` - Kreyòl Ayisyen (primary)
- `fr.json` - Français
- `en.json` - English

### Business Information
Update these files with your actual business details:
- Contact information in `src/components/Footer.tsx`
- Phone numbers in `src/components/Navbar.tsx`
- WhatsApp numbers throughout the app
- Email addresses in API files

## SEO Configuration

### Meta Tags
Update `index.html` with:
```html
<meta name="description" content="Your business description">
<meta property="og:title" content="PVC Cabinets Haiti">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
```

### Google Analytics
Add tracking code to `index.html` or use a service like Vercel Analytics.

### Google Search Console
1. Verify domain ownership
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Testing Forms Locally

For local testing without deploying:
1. Update form submissions to log to console
2. Use a service like https://httpbin.org for testing
3. Set up local email testing with MailHog

## Security Considerations

1. **Rate Limiting:** Add rate limiting to prevent spam
2. **Input Validation:** Already implemented with Zod schemas
3. **CORS:** Configured in API files
4. **Environment Variables:** Never commit secrets to Git

## Monitoring

### Error Tracking
Consider adding:
- Sentry for error monitoring
- LogRocket for user session recording
- Vercel Analytics for performance monitoring

### Email Delivery
- Monitor bounce rates
- Set up email notifications for form submissions
- Test email delivery regularly

## Maintenance

### Regular Updates
- Update dependencies monthly: `npm update`
- Review and update content quarterly
- Monitor website performance
- Backup database regularly

### Content Updates
- Add new project photos to gallery
- Update pricing information
- Add new testimonials
- Update service areas

## Support

For technical issues:
1. Check Vercel/Netlify deployment logs
2. Review browser console for JavaScript errors
3. Test email delivery
4. Monitor form submission rates

For content updates, modify the appropriate JSON files in `src/i18n/` and `src/data/`.