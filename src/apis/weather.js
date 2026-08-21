/** @typedef {import('@/types/openWeather').OpenWeatherResponse} OpenWeatherResponse */
/** @typedef {import('@/types/openWeather').OpenWeatherAirPollutionResponse} OpenWeatherAirPollutionResponse */
import openWeatherClient from '@/utils/openWeatherClient'

/**
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<OpenWeatherResponse>}
 */
export const getWeatherByCoordinates = async (latitude, longitude) => {
  const response = await openWeatherClient.get('/weather', {
    params: {
      lat: latitude,
      lon: longitude,
    },
  })
  return response.data
}

/**
 * @param {string} city
 * @returns {Promise<OpenWeatherResponse>}
 */
export const getWeatherByCityName = async (city) => {
  const response = await openWeatherClient.get('/weather', {
    params: { q: city },
  })
  return response.data
}

/**
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<OpenWeatherAirPollutionResponse>}
 */
export const getAirPollutionByCoordinates = async (latitude, longitude) => {
  const response = await openWeatherClient.get('/air_pollution', {
    params: {
      lat: latitude,
      lon: longitude,
    },
  })
  return response.data
}
