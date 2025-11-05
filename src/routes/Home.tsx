import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { Button } from '../components/ui/Button'
import { CostCalculator } from '../components/CostCalculator'
import { Droplets, Bug, Sparkles, Truck, Leaf, MessageCircle } from 'lucide-react'

export function Home() {
  const { t } = useI18n()

  const benefits = [
    {
      icon: Droplets,
      key: 'moisture'
    },
    {
      icon: Bug,
      key: 'pests'
    },
    {
      icon: Sparkles,
      key: 'cleaning'
    },
    {
      icon: Truck,
      key: 'transport'
    },
    {
      icon: Leaf,
      key: 'eco'
    }
  ]

  const comparisonData = [
    {
      criteria: 'criteria.moisture',
      pvc: 'ratings.excellent',
      wood: 'ratings.poor'
    },
    {
      criteria: 'criteria.maintenance',
      pvc: 'ratings.excellent',
      wood: 'ratings.fair'
    },
    {
      criteria: 'criteria.durability',
      pvc: 'ratings.excellent',
      wood: 'ratings.good'
    },
    {
      criteria: 'criteria.cost5year',
      pvc: 'ratings.excellent',
      wood: 'ratings.poor'
    },
    {
      criteria: 'criteria.termites',
      pvc: 'ratings.excellent',
      wood: 'ratings.poor'
    }
  ]

  const processSteps = [
    {
      number: '1',
      key: 'measure'
    },
    {
      number: '2',
      key: 'design'
    },
    {
      number: '3',
      key: 'manufacture'
    },
    {
      number: '4',
      key: 'install'
    }
  ]

  const handleWhatsApp = () => {
    const message = t('hero.whatsappMessage') || 'Bonjou! Mwen enterese nan kabann PVC yo. Tanpri ba mwen enfòmasyon ak pri yo.'
    window.open(`https://wa.me/50932123456?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Link to="/quote">{t('hero.cta1')}</Link>
              </Button>
              <Button 
                variant="whatsapp" 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4" 
                onClick={handleWhatsApp}
                icon={MessageCircle}
              >
                {t('hero.cta2')}
              </Button>
            </div>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-4 sm:mt-6">
              {t('hero.trustText')}
            </p>
          </div>
        </div>
      </section>

      {/* Why PVC Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('whyPvc.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('whyPvc.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.key} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`whyPvc.benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(`whyPvc.benefits.${benefit.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('comparison.title')}
            </h2>
          </div>
          
          {/* Mobile Comparison Cards */}
          <div className="block sm:hidden space-y-6 max-w-md mx-auto">
            {comparisonData.map((row, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {t(`comparison.${row.criteria}`)}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
                      {t('comparison.pvc')}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      {t(`comparison.${row.pvc}`)}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {t('comparison.wood')}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                      {t(`comparison.${row.wood}`)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Table */}
          <div className="hidden sm:block max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-50 dark:bg-primary-900">
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-gray-900 dark:text-white text-sm lg:text-base"></th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-primary-600 dark:text-primary-400 text-sm lg:text-base">
                      {t('comparison.pvc')}
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                      {t('comparison.wood')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-900 dark:text-white text-sm lg:text-base">
                        {t(`comparison.${row.criteria}`)}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <span className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {t(`comparison.${row.pvc}`)}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <span className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                          {t(`comparison.${row.wood}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('process.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.key} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-lg sm:text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`process.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(`process.steps.${step.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t('otherProducts.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('otherProducts.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-100 dark:bg-accent-800 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('otherProducts.office.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('otherProducts.office.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-100 dark:bg-accent-800 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('otherProducts.closet.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('otherProducts.closet.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-100 dark:bg-accent-800 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('otherProducts.vanity.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('otherProducts.vanity.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CostCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary-500 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link to="/contact">{t('cta.form')}</Link>
            </Button>
            <Button 
              variant="whatsapp" 
              size="lg" 
              onClick={handleWhatsApp}
              icon={MessageCircle}
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {t('cta.whatsapp')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}