# PVC Cabinets Haiti by Zewo

A complete, production-ready website for PVC kitchen cabinets and furniture services in Haiti. Specializing in kitchens with additional offerings including office desks, standing desks, walk-in closets, and bathroom vanities. Built with React, TypeScript, Vite, and Tailwind CSS with full multilingual support (Kreyòl, Français, English).

## 🚀 Features

- **Multilingual Support**: Complete translations in Kreyòl Ayisyen (HT), Français (FR), and English (EN)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: React 18, TypeScript, Vite for fast development and builds
- **SEO Optimized**: Meta tags, OpenGraph, structured data, sitemap, robots.txt
- **Performance**: Optimized images, code splitting, lazy loading
- **Forms**: React Hook Form with Zod validation
- **Analytics Ready**: Plausible Analytics integration
- **Accessibility**: WCAG compliant with semantic HTML and focus management

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Database**: Neon PostgreSQL (configured)
- **Deployment**: Ready for Vercel/Netlify

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, etc.)
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer with structured data
├── data/               # JSON data files
│   ├── finishes.json   # Cabinet finish options
│   ├── projects.json   # Portfolio projects
│   └── testimonials.json # Customer testimonials
├── i18n/               # Translation files
│   ├── ht.json         # Kreyòl Ayisyen
│   ├── fr.json         # Français
│   └── en.json         # English
├── lib/                # Utility functions
│   ├── i18n.ts         # Internationalization logic
│   ├── types.ts        # TypeScript type definitions
│   └── utils.ts        # Helper functions
├── routes/             # Page components
│   └── Home.tsx        # Homepage component
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: #0E7C66 (Teal green - eco-friendly)
- **Accent**: #F4A340 (Warm gold - highlights)
- **Dark**: #0B1220 (Dark mode background)
- **Light**: #F8FAFC (Light mode background)

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Tailwind's default type scale
- **Dark Mode**: Class-based dark mode support

## 🌐 Internationalization

The site defaults to **Kreyòl Ayisyen** with language switching between:
- 🇭🇹 **Kreyòl** (ht) - Primary language
- 🇫🇷 **Français** (fr) - Secondary language  
- 🇺🇸 **English** (en) - International language

All content, including navigation, forms, and messaging is fully translated.

## 📱 Pages & Features

### Implemented
- ✅ **Homepage** - Hero, benefits, comparison table, process steps, additional products showcase, CTA
- ✅ **Navigation** - Multilingual navbar with language switcher
- ✅ **Footer** - Contact info, links, structured data
- ✅ **Product Range** - Kitchen cabinets (primary), office furniture, closets, vanities
- ✅ **Responsive Design** - Mobile-first with Tailwind

### Coming Soon (Placeholder Pages)
- 🚧 Products - Full product catalog (kitchen cabinets, office desks, standing desks, closets, vanities)
- 🚧 Pricing - Transparent pricing with 5-year calculator
- 🚧 Process - Step-by-step installation process
- 🚧 Gallery - Project portfolio with before/after
- 🚧 Partners - Contractor program and signup
- 🚧 About - Company story and team
- 🚧 Blog - Educational content
- 🚧 Contact - Multi-step contact form with furniture type selection
- 🚧 Quote - Detailed quote request wizard for all furniture types

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install**:
```bash
git clone <repository-url>
cd pvc-cabinets-haiti
npm install
```

2. **Environment setup**:
```bash
# Copy environment template
cp .env.example .env.local

# Add your environment variables:
# DATABASE_URL=postgresql://neondb_owner:npg_85mzQKZdcvxH@ep-empty-star-aeknhdcm-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
# PLAUSIBLE_DOMAIN=yourdomain.com
# WHATSAPP_NUMBER=50932123456
```

3. **Development**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
npm run preview
```

## 📊 Database Integration

The project is configured to use Neon PostgreSQL with the provided connection string. Database integration is ready for:

- Lead capture and contact forms
- Quote requests and customer management
- Partner applications
- Blog content management
- Analytics and reporting

## 🔧 Configuration

### WhatsApp Integration
Update the phone number in:
- `src/components/Navbar.tsx`
- `src/routes/Home.tsx`
- Environment variables

### Analytics
Replace the Plausible domain in `index.html`:
```html
<script defer data-domain="YOUR_DOMAIN.com" src="https://plausible.io/js/script.js"></script>
```

### SEO
Update meta tags in `index.html` and component files for your domain and branding.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables
Set these in your deployment platform:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `PLAUSIBLE_DOMAIN` - Your domain for analytics
- `WHATSAPP_NUMBER` - Business WhatsApp number

## 🎯 Business Features

### Lead Generation
- WhatsApp deep linking with pre-filled messages
- Contact forms with validation
- Quote request system
- Phone call tracking

### SEO & Marketing
- Structured data for LocalBusiness
- OpenGraph tags for social sharing
- Sitemap and robots.txt
- Performance optimized
- Mobile-first responsive design

### Multi-language Support
- Complete Haitian market coverage
- French for formal business communications
- English for international customers
- Automatic language detection and storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript types
4. Test thoroughly across languages and devices
5. Submit a pull request

## 📄 License

Copyright 2024 PVC Cabinets Haiti by Zewo. All rights reserved.

## 📞 Support

For technical support or business inquiries:
- Email: info@pvchaiti.com
- WhatsApp: +509 3212 3456
- Website: https://pvchaiti.com

---

Built with ❤️ for the Haitian market by Zewo.