export type Language = 'ht' | 'fr' | 'en'

export interface Translations {
  [key: string]: string | Translations
}

export interface Finish {
  id: string
  name: {
    ht: string
    fr: string
    en: string
  }
  color: string
  description?: {
    ht: string
    fr: string
    en: string
  }
  category: 'wood-grain' | 'solid' | 'metallic'
}

export interface Project {
  id: string
  title: {
    ht: string
    fr: string
    en: string
  }
  description: {
    ht: string
    fr: string
    en: string
  }
  category: 'kitchen' | 'bathroom' | 'closet' | 'office'
  location: string
  beforeImage: string
  afterImage: string
  features: string[]
  completionDate: string
  size?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  content: {
    ht: string
    fr: string
    en: string
  }
  avatar?: string
  date: string
  verified: boolean
}

export interface ProductLine {
  id: string
  name: {
    ht: string
    fr: string
    en: string
  }
  description: {
    ht: string
    fr: string
    en: string
  }
  category: 'base' | 'wall' | 'tall' | 'vanity'
  features: string[]
  dimensions: {
    width: string
    depth: string
    height: string
  }
  finishes: string[]
  priceRange: {
    min: number
    max: number
  }
  image: string
}

export interface BlogPost {
  slug: string
  title: {
    ht: string
    fr: string
    en: string
  }
  excerpt: {
    ht: string
    fr: string
    en: string
  }
  content: {
    ht: string
    fr: string
    en: string
  }
  author: string
  publishDate: string
  readTime: number
  tags: string[]
  featuredImage: string
  seo: {
    metaDescription: {
      ht: string
      fr: string
      en: string
    }
    keywords: string[]
  }
}

export interface ContactFormData {
  name: string
  phone: string
  email?: string
  city: string
  roomType: 'kitchen' | 'bathroom' | 'closet' | 'office' | 'other'
  dimensions: {
    width: number
    depth: number
    height: number
  }
  budget: 'under-50k' | '50k-100k' | '100k-200k' | '200k-500k' | 'over-500k'
  timeline: '0-3months' | '3-6months' | '6-12months' | 'over-12months'
  message?: string
  attachments?: File[]
}

export interface PartnerFormData {
  companyName: string
  contactName: string
  phone: string
  email: string
  city: string
  taxId?: string
  experience: 'new' | '1-3years' | '3-5years' | '5plus'
  coverageZones: string[]
  currentVolume: string
  certifications?: string[]
}

export interface QuoteFormData extends ContactFormData {
  projectType: 'new-construction' | 'renovation' | 'replacement'
  currentCabinets?: 'wood' | 'metal' | 'laminate' | 'none'
  specialRequirements?: string
  preferredFinish?: string
  installationPreference: 'diy' | 'professional' | 'consultation'
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  ogImage?: string
  structuredData?: Record<string, any>
}