import { ref } from 'vue'
import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'
import { cityData } from '@/data/cityData'
import { getWeatherByCoordinates } from '@/apis/weather'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([...weatherData])
  const isLoading = ref(false)

  /** @param {WeatherItem} weatherItem */
  const addWeatherItem = (weatherItem) => {
    weatherList.value.push(weatherItem)
  }

  /** @param {string} cityId */
  const findWeatherById = (cityId) => {
    return weatherList.value.find((weatherItem) => weatherItem.id === cityId) ?? null
  }

  const fetchMainCityDatasById = async () => {
    isLoading.value = true

    try {
      const results = await Promise.all(
        cityData.map(async (city) => {
          const data = await getWeatherByCoordinates(city.latitude, city.longitude)
          const mockData = weatherData.find((weatherItem) => weatherItem.name === city.name)
          return {
            id: city.id,
            name: city.name,
            temp: data.main.temp,
            status: data.weather[0]?.description ?? '정보 없음',
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,

            // 미세먼지 API와 벌레 계산을 적용하기 전까지 임시 사용
            dust: mockData?.dust ?? '정보 없음',
            insects: mockData?.insects ?? [],
          }
        }),
      )

      weatherList.value = results
    } catch (e) {
      console.error(e instanceof Error ? e.message : '날씨 요청 실패')
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherList,
    isLoading,
    addWeatherItem,
    fetchMainCityDatasById,
    findWeatherById,
  }
})
