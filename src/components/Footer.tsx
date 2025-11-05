import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const { t } = useI18n()

  const quickLinks = [
    { key: 'home', href: '/' },
    { key: 'products', href: '/products' },
    { key: 'pricing', href: '/pricing' },
    { key: 'process', href: '/process' },
    { key: 'gallery', href: '/gallery' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' }
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/pvchaiti',
      icon: Facebook
    },
    {
      name: 'Instagram', 
      href: 'https://instagram.com/pvchaiti',
      icon: Instagram
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@pvchaiti',
      icon: Youtube
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">Z</span>
              </div>
              <div>
                <div className="font-bold text-white text-base sm:text-lg">
                  {t('footer.company')}
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">
                  Port-au-Prince, Cap-Haïtien, Gonaïves, Jacmel
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">+509 3212 3456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">info@pvchaiti.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base block py-1"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2024 PVC Cabinets Haiti by Zewo. {t('footer.rights')}.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>

      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "PVC Cabinets Haiti by Zewo",
            "description": "Professional PVC cabinet installation services in Haiti. Waterproof, termite-resistant cabinets designed for tropical climate.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "HT",
              "addressRegion": "Ouest",
              "addressLocality": "Port-au-Prince"
            },
            "telephone": "+509-3212-3456",
            "email": "info@pvchaiti.com",
            "url": "https://pvchaiti.com",
            "areaServed": [
              "Port-au-Prince",
              "Cap-Haïtien", 
              "Gonaïves",
              "Jacmel",
              "Les Cayes"
            ],
            "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-12:00",
            "priceRange": "HTG 45,000 - HTG 200,000",
            "sameAs": [
              "https://facebook.com/pvchaiti",
              "https://instagram.com/pvchaiti"
            ]
          })
        }}
      />
    </footer>
  )
}