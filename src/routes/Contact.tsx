import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/forms/FormField'
import { contactFormSchema, type ContactFormData } from '../lib/schemas'
import { generateWhatsAppLink } from '../lib/utils'

export function Contact() {
  const { t } = useI18n()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        alert(t('contact.form.success') || 'Message sent successfully! We will contact you within 24 hours.')
        reset()
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('contact.form.error') || 'Error sending message. Please try again or contact us directly via WhatsApp.')
    }
  }

  const handleWhatsApp = () => {
    const message = t('contact.whatsappMessage') || 'Bonjou! Mwen vle pale ak nou sou kabann PVC yo.'
    window.open(generateWhatsAppLink('32123456', message), '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t('contact.title') || 'Contact Us'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle') || 'Get in touch with our team for professional PVC cabinet consultation and installation services.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.info.title') || 'Get in Touch'}
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {t('contact.info.locations') || 'Service Areas'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Port-au-Prince, Cap-Haïtien<br />
                      Gonaïves, Jacmel
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {t('contact.info.phone') || 'Phone'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      +509 3212 3456
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {t('contact.info.email') || 'Email'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      info@pvchaiti.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {t('contact.info.hours') || 'Business Hours'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {t('contact.info.schedule') || 'Mon-Fri: 8:00 AM - 5:00 PM'}<br />
                      {t('contact.info.weekend') || 'Sat: 8:00 AM - 12:00 PM'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="whatsapp"
                  onClick={handleWhatsApp}
                  icon={MessageCircle}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  {t('contact.whatsapp') || 'Chat on WhatsApp'}
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.form.title') || 'Send us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                label={t('contact.form.name') || 'Full Name'}
                {...register('name')}
                error={errors.name?.message}
                placeholder="Your full name"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  label={t('contact.form.email') || 'Email'}
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="your@email.com"
                />

                <FormField
                  label={t('contact.form.phone') || 'Phone'}
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                  placeholder="+509 1234 5678"
                />
              </div>

              <FormField
                label={t('contact.form.subject') || 'Subject'}
                component="select"
                {...register('subject')}
                error={errors.subject?.message}
              >
                <option value="">{t('contact.form.selectSubject') || 'Select a subject'}</option>
                <option value="general">{t('contact.form.subjects.general') || 'General Inquiry'}</option>
                <option value="quote">{t('contact.form.subjects.quote') || 'Request Quote'}</option>
                <option value="support">{t('contact.form.subjects.support') || 'Support'}</option>
                <option value="partnership">{t('contact.form.subjects.partnership') || 'Partnership'}</option>
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  label={t('contact.form.preferredContact') || 'Preferred Contact Method'}
                  component="select"
                  {...register('preferredContact')}
                >
                  <option value="">{t('contact.form.any') || 'Any method'}</option>
                  <option value="email">{t('contact.form.email') || 'Email'}</option>
                  <option value="phone">{t('contact.form.phone') || 'Phone'}</option>
                  <option value="whatsapp">WhatsApp</option>
                </FormField>

                <FormField
                  label={t('contact.form.projectType') || 'Project Type (Optional)'}
                  component="select"
                  {...register('projectType')}
                >
                  <option value="">{t('contact.form.selectProject') || 'Select project type'}</option>
                  <option value="kitchen">{t('contact.form.projects.kitchen') || 'Kitchen'}</option>
                  <option value="office">{t('contact.form.projects.office') || 'Office'}</option>
                  <option value="closet">{t('contact.form.projects.closet') || 'Closet'}</option>
                  <option value="vanity">{t('contact.form.projects.vanity') || 'Vanity'}</option>
                  <option value="custom">{t('contact.form.projects.custom') || 'Custom'}</option>
                </FormField>
              </div>

              <FormField
                label={t('contact.form.message') || 'Message'}
                component="textarea"
                rows={4}
                {...register('message')}
                error={errors.message?.message}
                placeholder={t('contact.form.messagePlaceholder') || 'Tell us about your project...'}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full text-sm sm:text-base py-3 sm:py-4"
              >
                {isSubmitting ? (t('contact.form.sending') || 'Sending...') : (t('contact.form.send') || 'Send Message')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}