import { useState, useMemo } from 'react'
import { Calculator, TrendingUp, Zap, Clock } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Button } from './ui/Button'
import { FormField } from './forms/FormField'
import { calculatePVCVsWoodCost, formatCurrency } from '../lib/utils'

interface CostCalculatorProps {
  className?: string
}

export function CostCalculator({ className = '' }: CostCalculatorProps) {
  const { t } = useI18n()
  
  const [inputs, setInputs] = useState({
    kitchenSize: 120, // sq ft
    pvcPricePerSqFt: 450, // HTG per sq ft
    woodPricePerSqFt: 350, // HTG per sq ft
    woodMaintenancePercent: 8, // % of initial cost per year
    humidityMultiplier: 1.5, // Haiti's high humidity factor
    woodReplacementRisk: 25 // % chance of replacement needed
  })

  const [showDetails, setShowDetails] = useState(false)

  const costData = useMemo(() => 
    calculatePVCVsWoodCost(inputs), 
    [inputs]
  )

  const totalSavings = costData[4].woodCost - costData[4].pvcCost
  const maxCost = Math.max(...costData.map(d => Math.max(d.pvcCost, d.woodCost)))

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(field, Number(e.target.value))
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 ${className}`}>
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-primary-500 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('calculator.title') || '5-Year Cost Calculator'}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          {t('calculator.subtitle') || 'Compare the true cost of PVC vs Wood cabinets over 5 years'}
        </p>
      </div>

      {/* Input Controls */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FormField
            label={t('calculator.kitchenSize') || 'Kitchen Size (sq ft)'}
            type="number"
            value={inputs.kitchenSize}
            onChange={handleChange('kitchenSize')}
            min="50"
            max="500"
            step="10"
          />
          
          <FormField
            label={t('calculator.pvcPrice') || 'PVC Price (HTG/sq ft)'}
            type="number"
            value={inputs.pvcPricePerSqFt}
            onChange={handleChange('pvcPricePerSqFt')}
            min="300"
            max="800"
            step="25"
          />
          
          <FormField
            label={t('calculator.woodPrice') || 'Wood Price (HTG/sq ft)'}
            type="number"
            value={inputs.woodPricePerSqFt}
            onChange={handleChange('woodPricePerSqFt')}
            min="200"
            max="600"
            step="25"
          />
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <FormField
              label={t('calculator.maintenance') || 'Wood Maintenance (% per year)'}
              type="number"
              value={inputs.woodMaintenancePercent}
              onChange={handleChange('woodMaintenancePercent')}
              min="5"
              max="15"
              step="1"
            />
            
            <FormField
              label={t('calculator.humidity') || 'Humidity Factor'}
              type="number"
              value={inputs.humidityMultiplier}
              onChange={handleChange('humidityMultiplier')}
              min="1"
              max="2"
              step="0.1"
            />
            
            <FormField
              label={t('calculator.replacement') || 'Replacement Risk (%)'}
              type="number"
              value={inputs.woodReplacementRisk}
              onChange={handleChange('woodReplacementRisk')}
              min="10"
              max="50"
              step="5"
            />
          </div>
        )}
        
        <div className="mt-4 sm:mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs sm:text-sm"
          >
            {showDetails ? (t('calculator.hideAdvanced') || 'Hide Advanced') : (t('calculator.showAdvanced') || 'Show Advanced Settings')}
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {t('calculator.chartTitle') || 'Cumulative Cost Comparison'}
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-auto"
            style={{ maxHeight: '300px' }}
          >
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <g key={i}>
                <line
                  x1={50 + i * 80}
                  y1={50}
                  x2={50 + i * 80}
                  y2={250}
                  stroke="#e5e7eb"
                  strokeDasharray="2,2"
                />
                <text
                  x={50 + i * 80}
                  y={270}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-300"
                >
                  {i === 0 ? 'Start' : `Year ${i}`}
                </text>
              </g>
            ))}
            
            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map(i => (
              <g key={i}>
                <line
                  x1={45}
                  y1={250 - i * 200}
                  x2={450}
                  y2={250 - i * 200}
                  stroke="#e5e7eb"
                  strokeDasharray="2,2"
                />
                <text
                  x={35}
                  y={250 - i * 200 + 5}
                  textAnchor="end"
                  className="text-xs fill-gray-600 dark:fill-gray-300"
                >
                  {formatCurrency(Math.round(maxCost * i))}
                </text>
              </g>
            ))}

            {/* PVC Line */}
            <polyline
              points={[
                `50,250`,
                ...costData.map((d, i) => 
                  `${50 + (i + 1) * 80},${250 - (d.pvcCost / maxCost) * 200}`
                )
              ].join(' ')}
              fill="none"
              stroke="#0E7C66"
              strokeWidth="3"
              className="drop-shadow-sm"
            />

            {/* Wood Line */}
            <polyline
              points={[
                `50,250`,
                ...costData.map((d, i) => 
                  `${50 + (i + 1) * 80},${250 - (d.woodCost / maxCost) * 200}`
                )
              ].join(' ')}
              fill="none"
              stroke="#DC2626"
              strokeWidth="3"
              className="drop-shadow-sm"
            />

            {/* Data points */}
            {costData.map((d, i) => (
              <g key={i}>
                {/* PVC Point */}
                <circle
                  cx={50 + (i + 1) * 80}
                  cy={250 - (d.pvcCost / maxCost) * 200}
                  r="4"
                  fill="#0E7C66"
                  className="drop-shadow-sm"
                />
                {/* Wood Point */}
                <circle
                  cx={50 + (i + 1) * 80}
                  cy={250 - (d.woodCost / maxCost) * 200}
                  r="4"
                  fill="#DC2626"
                  className="drop-shadow-sm"
                />
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(300, 30)">
              <rect x="0" y="0" width="140" height="40" fill="white" fillOpacity="0.9" stroke="#e5e7eb" strokeWidth="1" rx="4" />
              <line x1="10" y1="15" x2="25" y2="15" stroke="#0E7C66" strokeWidth="3" />
              <circle cx="32" cy="15" r="3" fill="#0E7C66" />
              <text x="40" y="19" className="text-xs fill-gray-700">PVC</text>
              <line x1="10" y1="30" x2="25" y2="30" stroke="#DC2626" strokeWidth="3" />
              <circle cx="32" cy="30" r="3" fill="#DC2626" />
              <text x="40" y="34" className="text-xs fill-gray-700">{t('calculator.wood') || 'Wood'}</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 sm:p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200">
            {formatCurrency(totalSavings)}
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm sm:text-base">
            {t('calculator.totalSavings') || 'Total 5-Year Savings'}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 sm:p-6 text-center">
          <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-200">
            {formatCurrency(costData[4].pvcCost)}
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
            {t('calculator.pvcTotal') || 'PVC Total Cost'}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 sm:p-6 text-center">
          <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-bold text-red-800 dark:text-red-200">
            {formatCurrency(costData[4].woodCost)}
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm sm:text-base">
            {t('calculator.woodTotal') || 'Wood Total Cost'}
          </p>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('calculator.breakdown') || 'Year-by-Year Breakdown'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">{t('calculator.year') || 'Year'}</th>
                <th className="text-right py-2 text-green-700 dark:text-green-300">PVC</th>
                <th className="text-right py-2 text-red-700 dark:text-red-300">{t('calculator.wood') || 'Wood'}</th>
                <th className="text-right py-2 text-blue-700 dark:text-blue-300">{t('calculator.savings') || 'Savings'}</th>
              </tr>
            </thead>
            <tbody>
              {costData.map((data) => (
                <tr key={data.year} className="border-b border-gray-200 dark:border-gray-600">
                  <td className="py-2 text-gray-900 dark:text-white">{data.year}</td>
                  <td className="py-2 text-right text-green-700 dark:text-green-300 font-medium">
                    {formatCurrency(data.pvcCost)}
                  </td>
                  <td className="py-2 text-right text-red-700 dark:text-red-300 font-medium">
                    {formatCurrency(data.woodCost)}
                  </td>
                  <td className="py-2 text-right text-blue-700 dark:text-blue-300 font-bold">
                    {formatCurrency(data.woodCost - data.pvcCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t('calculator.disclaimer') || 'Calculations include maintenance costs, humidity factors, and replacement risks specific to Haiti\'s climate.'}
        </p>
        <Button variant="primary" className="text-sm sm:text-base">
          {t('calculator.getQuote') || 'Get Your Custom Quote'}
        </Button>
      </div>
    </div>
  )
}