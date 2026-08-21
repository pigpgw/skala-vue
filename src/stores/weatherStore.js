import { ref } from 'vue'
import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

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
