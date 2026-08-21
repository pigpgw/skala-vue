import { WEATHER_DESCRIPTION_LABELS } from '@/constants/weather'
import { getFineDustStatus } from '@/utils/airQuality'
import { getActiveInsects } from '@/utils/insect'

/** @typedef {import('@/dto/openWeatherDto').AirPollutionResponse} AirPollutionResponse */
/** @typedef {import('@/dto/openWeatherDto').WeatherResponse} WeatherResponse */
/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

/** @param {string} description */
export const normalizeWeatherDescription = (description) => WEATHER_DESCRIPTION_LABELS[description] ?? description

/**
 * OpenWeatherMap 응답을 화면에서 사용하는 날씨 객체로 변환합니다.
 *
 * @param {{ id: string, name: string, weather: WeatherResponse, airPollution?: AirPollutionResponse }} data
 * @returns {WeatherItem}
 */
export const createWeatherItem = ({ id, name, weather, airPollution }) => ({
  id,
  name,
  temp: weather.main.temp,
  status: normalizeWeatherDescription(weather.weather[0]?.description ?? '정보 없음'),
  humidity: weather.main.humidity,
  windSpeed: weather.wind.speed,
  dust: getFineDustStatus(airPollution?.list[0]?.components.pm2_5),
  insects: getActiveInsects({
    temp: weather.main.temp,
    humidity: weather.main.humidity,
    windSpeed: weather.wind.speed,
  }),
})
