import { CELSIUS_TO_FAHRENHEIT_RATIO, FAHRENHEIT_OFFSET, WEATHER_STATISTICS_DECIMAL_PLACES } from '@/constants/weather'

/** @typedef {'celsius' | 'fahrenheit'} TemperatureUnit */

/**
 * @param {number} temperature
 * @param {TemperatureUnit} unit
 */
export const convertTemperature = (temperature, unit) => {
  if (unit === 'fahrenheit') return temperature * CELSIUS_TO_FAHRENHEIT_RATIO + FAHRENHEIT_OFFSET
  return temperature
}

/**
 * @param {number} temperature
 * @param {TemperatureUnit} unit
 */
export const formatTemperature = (temperature, unit) => convertTemperature(temperature, unit).toFixed(WEATHER_STATISTICS_DECIMAL_PLACES)
