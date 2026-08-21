/** @typedef {'celsius' | 'fahrenheit'} TemperatureUnit */

/**
 * @param {number} temperature
 * @param {TemperatureUnit} unit
 */
export const convertTemperature = (temperature, unit) => {
  if (unit === 'fahrenheit') return Math.round((temperature * 9) / 5 + 32)
  return temperature
}
