/**
 * @typedef {Object} OpenWeatherCoordinates
 * @property {number} lon
 * @property {number} lat
 */

/**
 * @typedef {Object} OpenWeatherMain
 * @property {number} temp
 * @property {number} feels_like
 * @property {number} temp_min
 * @property {number} temp_max
 * @property {number} pressure
 * @property {number} humidity
 * @property {number} [sea_level]
 * @property {number} [grnd_level]
 */

/**
 * @typedef {Object} OpenWeatherCondition
 * @property {number} id
 * @property {string} main
 * @property {string} description
 * @property {string} icon
 */

/**
 * @typedef {Object} OpenWeatherWind
 * @property {number} speed
 * @property {number} deg
 * @property {number} [gust]
 */

/**
 * @typedef {Object} OpenWeatherClouds
 * @property {number} all
 */

/**
 * @typedef {Object} OpenWeatherSystem
 * @property {number} [type]
 * @property {number} [id]
 * @property {string} country
 * @property {number} sunrise
 * @property {number} sunset
 */

/**
 * @typedef {Object} OpenWeatherResponse
 * @property {OpenWeatherCoordinates} coord
 * @property {OpenWeatherCondition[]} weather
 * @property {string} base
 * @property {OpenWeatherMain} main
 * @property {number} visibility
 * @property {OpenWeatherWind} wind
 * @property {OpenWeatherClouds} clouds
 * @property {number} dt
 * @property {OpenWeatherSystem} sys
 * @property {number} timezone
 * @property {number} id
 * @property {string} name
 * @property {number} cod
 */

/**
 * @typedef {Object} OpenWeatherAirPollutionComponents
 * @property {number} co
 * @property {number} no
 * @property {number} no2
 * @property {number} o3
 * @property {number} so2
 * @property {number} pm2_5
 * @property {number} pm10
 * @property {number} nh3
 */

/**
 * @typedef {Object} OpenWeatherAirPollutionItem
 * @property {{ aqi: 1 | 2 | 3 | 4 | 5 }} main
 * @property {OpenWeatherAirPollutionComponents} components
 * @property {number} dt
 */

/**
 * @typedef {Object} OpenWeatherAirPollutionResponse
 * @property {OpenWeatherCoordinates} coord
 * @property {OpenWeatherAirPollutionItem[]} list
 */

export {}
