import { insectData } from '@/data/insectData'

/**
 * @param {import('@/types/insect').Insect} insect
 * @returns {'warning' | 'danger'}
 */
export const getInsectVariant = (insect) => (insect.id === 'chigger-mite' ? 'danger' : 'warning')

/**
 * @param {import('@/types/insect').InsectWeatherCondition} weather
 * @param {number} [month]
 * @returns {import('@/types/insect').Insect[]}
 */
export const getActiveInsects = (weather, month = new Date().getMonth() + 1) => {
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
