import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number, currency = 'HTG'): string {
  return new Intl.NumberFormat('ht-HT', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPhoneNumber(phone: string): string {
  // Format for Haiti phone numbers
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('509')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`
  }
  if (cleaned.length === 8) {
    return `+509 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`
  }
  return phone
}

export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const fullPhone = cleanPhone.startsWith('509') ? cleanPhone : `509${cleanPhone}`
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function calculatePVCVsWoodCost(params: {
  kitchenSize: number
  pvcPricePerSqFt: number
  woodPricePerSqFt: number
  woodMaintenancePercent: number
  humidityMultiplier: number
  woodReplacementRisk: number
}): {
  year: number
  pvcCost: number
  woodCost: number
}[] {
  const {
    kitchenSize,
    pvcPricePerSqFt,
    woodPricePerSqFt,
    woodMaintenancePercent,
    humidityMultiplier,
    woodReplacementRisk,
  } = params

  const basePvcCost = kitchenSize * pvcPricePerSqFt
  const baseWoodCost = kitchenSize * woodPricePerSqFt
  const annualMaintenanceCost = baseWoodCost * (woodMaintenancePercent / 100) * humidityMultiplier

  const results = []
  let cumulativePvcCost = basePvcCost
  let cumulativeWoodCost = baseWoodCost

  for (let year = 1; year <= 5; year++) {
    // PVC has minimal maintenance costs
    cumulativePvcCost += basePvcCost * 0.02 // 2% annual for cleaning supplies

    // Wood has maintenance and potential replacement
    cumulativeWoodCost += annualMaintenanceCost
    
    // Add replacement risk (compound probability)
    if (year >= 3) {
      const replacementProbability = woodReplacementRisk / 100 * (year - 2) * 0.5
      cumulativeWoodCost += baseWoodCost * replacementProbability
    }

    results.push({
      year,
      pvcCost: Math.round(cumulativePvcCost),
      woodCost: Math.round(cumulativeWoodCost),
    })
  }

  return results
}

export function getTranslatedContent<T extends Record<string, any>>(
  content: T,
  language: string
): any {
  return content[language] || content.en || content.ht || Object.values(content)[0]
}