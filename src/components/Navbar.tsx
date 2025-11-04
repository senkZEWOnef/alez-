import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Globe, MessageCircle } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'
import type { Language } from '../lib/types'

export function Navbar() {
  const { language, setLanguage, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'products', href: '/products' },
    { key: 'pricing', href: '/pricing' },
    { key: 'process', href: '/process' },
    { key: 'gallery', href: '/gallery' },
    { key: 'partners', href: '/partners' },
    { key: 'about', href: '/about' },
    { key: 'blog', href: '/blog' },
    { key: 'contact', href: '/contact' }
  ]

  const handleWhatsApp = () => {
    const message = t('nav.whatsappMessage') || 'Bonjou! Mwen enterese nan kabann PVC yo.'
    window.open(`https://wa.me/50932123456?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <nav className="bg-white dark:bg-dark shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">Z</span>
            </div>
            <div className="min-w-0">
              <div className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg leading-tight truncate">
                PVC Cabinets Haiti
              </div>
              <div className="text-xs text-primary-500 font-medium">by Zewo</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
                </span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className={cn(
                        'w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                        language === lang.code && 'bg-primary-50 dark:bg-primary-900 text-primary-600'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Button */}
            <Button variant="whatsapp" size="sm" onClick={handleWhatsApp} icon={MessageCircle}>
              WhatsApp
            </Button>

            {/* Quote Button */}
            <Button variant="primary" size="sm">
              <Link to="/quote">{t('nav.quote')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium px-4 py-2"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {t('nav.language') || 'Language'}
                </div>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors',
                        language === lang.code 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="px-4 space-y-3">
                <Button 
                  variant="whatsapp" 
                  className="w-full" 
                  onClick={handleWhatsApp}
                  icon={MessageCircle}
                >
                  WhatsApp
                </Button>
                <Button variant="primary" className="w-full">
                  <Link to="/quote" onClick={() => setIsOpen(false)}>
                    {t('nav.quote')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}