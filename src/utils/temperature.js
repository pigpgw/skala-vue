import { CELSIUS_TO_FAHRENHEIT_RATIO, FAHRENHEIT_OFFSET } from '@/constants/weather'

/** @typedef {'celsius' | 'fahrenheit'} TemperatureUnit */

/**
 * @param {number} temperature
 * @param {TemperatureUnit} unit
 */
export const convertTemperature = (temperature, unit) => {
  if (unit === 'fahrenheit') return Math.round(temperature * CELSIUS_TO_FAHRENHEIT_RATIO + FAHRENHEIT_OFFSET)
  return temperature
}
