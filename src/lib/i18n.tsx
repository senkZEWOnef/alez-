import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import type { Language, Translations } from './types'

// Import translation files
import htTranslations from '../i18n/ht.json'
import frTranslations from '../i18n/fr.json'
import enTranslations from '../i18n/en.json'

const translations: Record<Language, Translations> = {
  ht: htTranslations,
  fr: frTranslations,
  en: enTranslations,
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const LANGUAGE_KEY = 'pvc-cabinets-language'
const DEFAULT_LANGUAGE: Language = 'ht'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_KEY) as Language
      if (stored && ['ht', 'fr', 'en'].includes(stored)) {
        return stored
      }
    }
    return DEFAULT_LANGUAGE
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_KEY, lang)
      document.documentElement.lang = lang
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in any language
          }
        }
        break
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Replace parameters
    if (params) {
      return Object.entries(params).reduce(
        (text, [param, val]) => text.replace(new RegExp(`{{${param}}}`, 'g'), val),
        value
      )
    }

    return value
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    t,
  }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

