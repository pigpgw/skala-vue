import openWeatherClient from '@/utils/openWeatherClient'

/**
 * @param {number} latitude
 * @param {number} longitude
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

/** @param {string} city */
export const getWeatherByCityName = async (city) => {
  const response = await openWeatherClient.get('/weather', {
    params: { q: city },
  })
  return response.data
}
