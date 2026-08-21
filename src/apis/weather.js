import openWeatherClient from '@/utils/openWeatherClient'

/** @typedef {import('@/dto/openWeatherDto').WeatherByCoordinatesRequest} WeatherByCoordinatesRequest */
/** @typedef {import('@/dto/openWeatherDto').WeatherByCityNameRequest} WeatherByCityNameRequest */
/** @typedef {import('@/dto/openWeatherDto').WeatherResponse} WeatherResponse */
/** @typedef {import('@/dto/openWeatherDto').AirPollutionRequest} AirPollutionRequest */
/** @typedef {import('@/dto/openWeatherDto').AirPollutionResponse} AirPollutionResponse */

/**
 * @param {WeatherByCoordinatesRequest} request
 * @returns {Promise<WeatherResponse>}
 */
export const getWeatherByCoordinates = async ({ latitude, longitude }) => {
  const response = await openWeatherClient.get('/weather', {
    params: {
      lat: latitude,
      lon: longitude,
    },
  })
  return response.data
}

/**
 * @param {WeatherByCityNameRequest} request
 * @returns {Promise<WeatherResponse>}
 */
export const getWeatherByCityName = async ({ city }) => {
  const response = await openWeatherClient.get('/weather', {
    params: { q: city },
  })
  return response.data
}

/**
 * @param {AirPollutionRequest} request
 * @returns {Promise<AirPollutionResponse>}
 */
export const getAirPollutionByCoordinates = async ({ latitude, longitude }) => {
  const response = await openWeatherClient.get('/air_pollution', {
    params: {
      lat: latitude,
      lon: longitude,
    },
  })
  return response.data
}
