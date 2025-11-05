import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calculator, Clock, DollarSign, Home } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/forms/FormField'
import { CheckboxField } from '../components/forms/CheckboxField'
import { MultiCheckboxField } from '../components/forms/MultiCheckboxField'
import { quoteFormSchema, type QuoteFormData } from '../lib/schemas'
import { formatCurrency } from '../lib/utils'

export function Quote() {
  const { t } = useI18n()
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      preferredContact: 'whatsapp',
      visitRequired: true,
      existingCabinets: false
    }
  })

  const roomDimensions = watch('roomDimensions')

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        alert(t('quote.form.success') || `Quote request submitted successfully! Estimated cost: ${result.estimatedCost?.toLocaleString()} HTG. We will contact you within 24 hours with a detailed quote.`)
        reset()
      } else {
        throw new Error(result.error || 'Failed to submit quote request')
      }
    } catch (error) {
      console.error('Error submitting quote form:', error)
      alert(t('quote.form.error') || 'Error submitting quote request. Please try again or contact us directly via WhatsApp.')
    }
  }

  const calculateEstimatedArea = () => {
    if (roomDimensions?.length && roomDimensions?.width) {
      return roomDimensions.length * roomDimensions.width
    }
    return 0
  }

  const featureOptions = [
    { value: 'soft-close-hinges', label: t('quote.features.softClose') || 'Soft-Close Hinges', description: 'Quiet, smooth closing doors and drawers' },
    { value: 'pull-out-drawers', label: t('quote.features.pullOut') || 'Pull-Out Drawers', description: 'Full-extension drawer slides for easy access' },
    { value: 'lazy-susan', label: t('quote.features.lazySusan') || 'Lazy Susan', description: 'Rotating corner cabinet storage' },
    { value: 'crown-molding', label: t('quote.features.crown') || 'Crown Molding', description: 'Decorative trim for elegant finish' },
    { value: 'under-cabinet-lighting', label: t('quote.features.lighting') || 'Under-Cabinet Lighting', description: 'LED strip lighting for better visibility' },
    { value: 'glass-doors', label: t('quote.features.glass') || 'Glass Doors', description: 'Tempered glass door inserts' },
    { value: 'wine-rack', label: t('quote.features.wine') || 'Wine Rack', description: 'Built-in wine storage solution' },
    { value: 'spice-rack', label: t('quote.features.spice') || 'Spice Rack', description: 'Organized spice storage' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t('quote.title') || 'Request a Quote'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('quote.subtitle') || 'Get a detailed estimate for your PVC cabinet project. Our team will provide a comprehensive quote within 24 hours.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
              
              {/* Personal Information Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary-500" />
                  {t('quote.personal.title') || 'Personal Information'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    label={t('quote.personal.name') || 'Full Name'}
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Your full name"
                  />

                  <FormField
                    label={t('quote.personal.email') || 'Email Address'}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="your@email.com"
                  />

                  <FormField
                    label={t('quote.personal.phone') || 'Phone Number'}
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="+509 1234 5678"
                  />

                  <FormField
                    label={t('quote.personal.preferredContact') || 'Preferred Contact'}
                    component="select"
                    {...register('preferredContact')}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">{t('quote.personal.phone') || 'Phone'}</option>
                    <option value="email">{t('quote.personal.email') || 'Email'}</option>
                  </FormField>
                </div>

                <div className="mt-4 sm:mt-6">
                  <FormField
                    label={t('quote.personal.address') || 'Complete Address'}
                    {...register('address')}
                    error={errors.address?.message}
                    placeholder="Street address, city, department"
                  />
                </div>
              </section>

              {/* Project Details Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary-500" />
                  {t('quote.project.title') || 'Project Details'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <FormField
                    label={t('quote.project.type') || 'Project Type'}
                    component="select"
                    {...register('projectType')}
                    error={errors.projectType?.message}
                  >
                    <option value="">{t('quote.project.selectType') || 'Select project type'}</option>
                    <option value="kitchen">{t('quote.project.types.kitchen') || 'Kitchen Cabinets'}</option>
                    <option value="office">{t('quote.project.types.office') || 'Office Furniture'}</option>
                    <option value="closet">{t('quote.project.types.closet') || 'Closet System'}</option>
                    <option value="vanity">{t('quote.project.types.vanity') || 'Bathroom Vanity'}</option>
                    <option value="custom">{t('quote.project.types.custom') || 'Custom Project'}</option>
                  </FormField>

                  <FormField
                    label={t('quote.project.renovation') || 'Renovation Type'}
                    component="select"
                    {...register('renovationType')}
                  >
                    <option value="">{t('quote.project.selectRenovation') || 'Select renovation type'}</option>
                    <option value="new-construction">{t('quote.project.renovations.new') || 'New Construction'}</option>
                    <option value="full-renovation">{t('quote.project.renovations.full') || 'Full Renovation'}</option>
                    <option value="cabinet-replacement">{t('quote.project.renovations.replacement') || 'Cabinet Replacement'}</option>
                    <option value="partial-update">{t('quote.project.renovations.partial') || 'Partial Update'}</option>
                  </FormField>
                </div>

                {/* Room Dimensions */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('quote.dimensions.title') || 'Room Dimensions (in feet)'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label={t('quote.dimensions.length') || 'Length'}
                      type="number"
                      step="0.1"
                      min="1"
                      {...register('roomDimensions.length', { valueAsNumber: true })}
                      error={errors.roomDimensions?.length?.message}
                      placeholder="12.0"
                    />

                    <FormField
                      label={t('quote.dimensions.width') || 'Width'}
                      type="number"
                      step="0.1"
                      min="1"
                      {...register('roomDimensions.width', { valueAsNumber: true })}
                      error={errors.roomDimensions?.width?.message}
                      placeholder="10.0"
                    />

                    <FormField
                      label={t('quote.dimensions.height') || 'Height'}
                      type="number"
                      step="0.1"
                      min="1"
                      {...register('roomDimensions.height', { valueAsNumber: true })}
                      error={errors.roomDimensions?.height?.message}
                      placeholder="9.0"
                    />
                  </div>

                  {calculateEstimatedArea() > 0 && (
                    <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900 rounded-lg">
                      <p className="text-sm text-primary-700 dark:text-primary-300">
                        <strong>{t('quote.dimensions.area') || 'Estimated Floor Area'}:</strong> {calculateEstimatedArea().toFixed(1)} sq ft
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Cabinet Specifications */}
              <section>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t('quote.specs.title') || 'Cabinet Specifications'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <FormField
                    label={t('quote.specs.style') || 'Cabinet Style'}
                    component="select"
                    {...register('cabinetStyle')}
                    error={errors.cabinetStyle?.message}
                  >
                    <option value="">{t('quote.specs.selectStyle') || 'Select cabinet style'}</option>
                    <option value="modern">{t('quote.specs.styles.modern') || 'Modern'}</option>
                    <option value="traditional">{t('quote.specs.styles.traditional') || 'Traditional'}</option>
                    <option value="transitional">{t('quote.specs.styles.transitional') || 'Transitional'}</option>
                    <option value="contemporary">{t('quote.specs.styles.contemporary') || 'Contemporary'}</option>
                  </FormField>

                  <FormField
                    label={t('quote.specs.finish') || 'Finish'}
                    component="select"
                    {...register('finish')}
                    error={errors.finish?.message}
                  >
                    <option value="">{t('quote.specs.selectFinish') || 'Select finish'}</option>
                    <option value="white">{t('quote.specs.finishes.white') || 'Classic White'}</option>
                    <option value="wood-grain">{t('quote.specs.finishes.wood') || 'Wood Grain'}</option>
                    <option value="gray">{t('quote.specs.finishes.gray') || 'Modern Gray'}</option>
                    <option value="espresso">{t('quote.specs.finishes.espresso') || 'Espresso'}</option>
                    <option value="custom">{t('quote.specs.finishes.custom') || 'Custom Color'}</option>
                  </FormField>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <Controller
                    name="features"
                    control={control}
                    render={({ field }) => (
                      <MultiCheckboxField
                        label={t('quote.features.title') || 'Additional Features (Optional)'}
                        options={featureOptions}
                        value={field.value || []}
                        onChange={field.onChange}
                        error={errors.features?.message}
                      />
                    )}
                  />
                </div>
              </section>

              {/* Budget and Timeline */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary-500" />
                  {t('quote.budget.title') || 'Budget & Timeline'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    label={t('quote.budget.range') || 'Budget Range (HTG)'}
                    component="select"
                    {...register('budget')}
                    error={errors.budget?.message}
                  >
                    <option value="">{t('quote.budget.select') || 'Select budget range'}</option>
                    <option value="15000-30000">{formatCurrency(15000)} - {formatCurrency(30000)}</option>
                    <option value="30000-50000">{formatCurrency(30000)} - {formatCurrency(50000)}</option>
                    <option value="50000-75000">{formatCurrency(50000)} - {formatCurrency(75000)}</option>
                    <option value="75000-100000">{formatCurrency(75000)} - {formatCurrency(100000)}</option>
                    <option value="100000+">{formatCurrency(100000)}+</option>
                  </FormField>

                  <FormField
                    label={t('quote.timeline.title') || 'Preferred Timeline'}
                    component="select"
                    {...register('timeline')}
                    error={errors.timeline?.message}
                  >
                    <option value="">{t('quote.timeline.select') || 'Select timeline'}</option>
                    <option value="asap">{t('quote.timeline.asap') || 'As soon as possible'}</option>
                    <option value="1-month">{t('quote.timeline.month1') || 'Within 1 month'}</option>
                    <option value="2-3-months">{t('quote.timeline.months23') || '2-3 months'}</option>
                    <option value="3-6-months">{t('quote.timeline.months36') || '3-6 months'}</option>
                    <option value="flexible">{t('quote.timeline.flexible') || 'Flexible'}</option>
                  </FormField>
                </div>
              </section>

              {/* Additional Information */}
              <section>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {t('quote.additional.title') || 'Additional Information'}
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <Controller
                    name="existingCabinets"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        label={t('quote.additional.existing') || 'I have existing cabinets that need removal'}
                        description={t('quote.additional.existingDesc') || 'Check this if you need us to remove your current cabinets'}
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="visitRequired"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        label={t('quote.additional.visit') || 'I would like an in-home consultation'}
                        description={t('quote.additional.visitDesc') || 'Our team will visit your location for precise measurements and detailed planning'}
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <FormField
                    label={t('quote.additional.notes') || 'Additional Notes (Optional)'}
                    component="textarea"
                    rows={4}
                    {...register('additionalNotes')}
                    placeholder={t('quote.additional.notesPlaceholder') || 'Tell us more about your project, special requirements, or any questions you have...'}
                  />
                </div>
              </section>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full text-sm sm:text-base py-3 sm:py-4"
                  icon={Clock}
                >
                  {isSubmitting ? (t('quote.form.submitting') || 'Submitting Request...') : (t('quote.form.submit') || 'Submit Quote Request')}
                </Button>
                
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
                  {t('quote.form.disclaimer') || 'We will contact you within 24 hours with a detailed quote. In-home consultations are free.'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}