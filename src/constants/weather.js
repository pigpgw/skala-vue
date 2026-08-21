export const CELSIUS_TO_FAHRENHEIT_RATIO = 9 / 5
export const FAHRENHEIT_OFFSET = 32
export const FINE_DUST_GOOD_MAX = 15
export const FINE_DUST_MODERATE_MAX = 35
export const HOT_WEATHER_THRESHOLD_CELSIUS = 25
export const HEAT_SAFETY_THRESHOLD_CELSIUS = 28
export const COLD_SAFETY_THRESHOLD_CELSIUS = 5
export const STRONG_WIND_THRESHOLD_MPS = 8
export const JAVASCRIPT_MONTH_OFFSET = 1
export const MINIMUM_PM25 = 0
export const WEATHER_STATISTICS_DECIMAL_PLACES = 1

/** @type {Readonly<Record<string, string>>} */
export const WEATHER_DESCRIPTION_LABELS = Object.freeze({
  온흐림: '흐림',
  '실 비': '약한 비',
  '보통 비': '비',
  튼구름: '구름 많음',
})
