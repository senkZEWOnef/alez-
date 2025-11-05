import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  subject: z.enum(['general', 'quote', 'support', 'partnership'], {
    required_error: 'Please select a subject'
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).optional(),
  projectType: z.enum(['kitchen', 'office', 'closet', 'vanity', 'custom']).optional()
})

export const quoteFormSchema = z.object({
  // Personal Information
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please provide your complete address'),
  
  // Project Details
  projectType: z.enum(['kitchen', 'office', 'closet', 'vanity', 'custom'], {
    required_error: 'Please select a project type'
  }),
  roomDimensions: z.object({
    length: z.number().min(1, 'Length must be greater than 0'),
    width: z.number().min(1, 'Width must be greater than 0'),
    height: z.number().min(1, 'Height must be greater than 0')
  }),
  
  // Cabinet Specifications
  cabinetStyle: z.enum(['modern', 'traditional', 'transitional', 'contemporary'], {
    required_error: 'Please select a cabinet style'
  }),
  finish: z.enum(['white', 'wood-grain', 'gray', 'espresso', 'custom'], {
    required_error: 'Please select a finish'
  }),
  
  // Features
  features: z.array(z.enum([
    'soft-close-hinges', 
    'pull-out-drawers', 
    'lazy-susan', 
    'crown-molding',
    'under-cabinet-lighting',
    'glass-doors',
    'wine-rack',
    'spice-rack'
  ])).optional(),
  
  // Budget and Timeline
  budget: z.enum(['15000-30000', '30000-50000', '50000-75000', '75000-100000', '100000+'], {
    required_error: 'Please select a budget range'
  }),
  timeline: z.enum(['asap', '1-month', '2-3-months', '3-6-months', 'flexible'], {
    required_error: 'Please select your preferred timeline'
  }),
  
  // Additional Information
  existingCabinets: z.boolean().default(false),
  renovationType: z.enum(['new-construction', 'full-renovation', 'cabinet-replacement', 'partial-update']).optional(),
  additionalNotes: z.string().optional(),
  
  // Preferences
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).default('whatsapp'),
  visitRequired: z.boolean().default(true)
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>