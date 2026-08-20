import { ref } from 'vue'
import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'

/**
 * @typedef {Object} WeatherItem
 * @property {string} id
 * @property {string} name
 * @property {string} status
 * @property {number} temp
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} dust
 */

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([...weatherData])

  /** @param {WeatherItem} weatherItem */
  const addWeatherItem = (weatherItem) => {
    weatherList.value.push(weatherItem)
  }

  /** @param {string} cityId */
  const findWeatherById = (cityId) => {
    return weatherList.value.find((weatherItem) => weatherItem.id === cityId) ?? null
  }

  return {
    weatherList,
    addWeatherItem,
    findWeatherById,
  }
})
