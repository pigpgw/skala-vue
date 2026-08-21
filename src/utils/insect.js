import { JAVASCRIPT_MONTH_OFFSET } from '@/constants/weather'
import { insectData } from '@/data/insectData'

/**
 * @param {import('@/types/insect').Insect} insect
 * @returns {'warning' | 'destructive'}
 */
export const getInsectVariant = (insect) => (insect.id === 'chigger-mite' ? 'destructive' : 'warning')

/**
 * @param {import('@/types/insect').InsectWeatherCondition} weather
 * @param {number} [month]
 * @returns {import('@/types/insect').Insect[]}
 */
export const getActiveInsects = (weather, month = new Date().getMonth() + JAVASCRIPT_MONTH_OFFSET) => {
  return Object.values(insectData).filter((insect) => {
    const criteria = insect.appearanceCriteria

    return (
      weather.temp >= criteria.minTemperature &&
      weather.temp <= criteria.maxTemperature &&
      weather.humidity >= criteria.minHumidity &&
      weather.windSpeed <= criteria.maxWindSpeed &&
      criteria.activeMonths.includes(month)
    )
  })
}
