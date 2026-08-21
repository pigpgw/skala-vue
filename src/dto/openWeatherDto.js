/**
 * @typedef {Object} WeatherByCoordinatesRequest
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {Object} WeatherByCityNameRequest
 * @property {string} city
 */

/**
 * @typedef {Object} AirPollutionRequest
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {Object} WeatherResponse
 * @property {{ lat: number, lon: number }} coord
 * @property {{ description: string }[]} weather
 * @property {{ temp: number, humidity: number }} main
 * @property {{ speed: number }} wind
 */

/**
 * @typedef {Object} AirPollutionResponse
 * @property {{ components: { pm2_5: number } }[]} list
 */

export {}
