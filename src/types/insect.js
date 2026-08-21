/**
 * @typedef {Object} InsectAppearanceCriteria
 * @property {number} minTemperature
 * @property {number} maxTemperature
 * @property {number} minHumidity
 * @property {number} maxWindSpeed
 * @property {number[]} activeMonths
 */

/**
 * @typedef {Object} Insect
 * @property {string} id
 * @property {string} name
 * @property {string} condition
 * @property {string} sideEffects
 * @property {InsectAppearanceCriteria} appearanceCriteria
 */

/**
 * @typedef {Object} InsectWeatherCondition
 * @property {number} temp
 * @property {number} humidity
 * @property {number} windSpeed
 */

export {}
