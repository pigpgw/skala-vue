import { ref } from 'vue'
import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'
import { cityData } from '@/data/cityData'
import { getAirPollutionByCoordinates, getWeatherByCityName, getWeatherByCoordinates } from '@/apis/weather'
import { getFineDustStatus } from '@/utils/airQuality'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */
/** @typedef {import('@/types/region').Region} Region */

export const useWeatherStore = defineStore('weather', () => {
  /** @type {import('vue').Ref<WeatherItem[]>} */
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
          const [weather, airPollution] = await Promise.all([
            getWeatherByCoordinates({ latitude: city.latitude, longitude: city.longitude }),
            getAirPollutionByCoordinates({ latitude: city.latitude, longitude: city.longitude }),
          ])
          const mockData = weatherData.find((weatherItem) => weatherItem.name === city.name)

          return {
            id: city.id,
            name: city.name,
            temp: weather.main.temp,
            status: weather.weather[0]?.description ?? '정보 없음',
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
            dust: getFineDustStatus(airPollution.list[0]?.components.pm2_5),

            // 벌레 계산을 적용하기 전까지 임시 사용
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

  /**
   * @param {Region} region
   * @returns {Promise<WeatherItem | null>}
   */
  const fetchWeatherByRegion = async (region) => {
    isLoading.value = true

    try {
      const weather = await getWeatherByCityName({ city: region.weatherName })
      const airPollution = await getAirPollutionByCoordinates({
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
      })
      const currentWeatherItem = weatherList.value.find((weatherItem) => weatherItem.id === region.id)

      /** @type {WeatherItem} */
      const weatherItem = {
        id: region.id,
        name: region.name,
        temp: weather.main.temp,
        status: weather.weather[0]?.description ?? '정보 없음',
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        dust: getFineDustStatus(airPollution.list[0]?.components.pm2_5),
        insects: currentWeatherItem?.insects ?? [],
      }

      const weatherItemIndex = weatherList.value.findIndex((item) => item.id === region.id)

      if (weatherItemIndex === -1) {
        weatherList.value.push(weatherItem)
      } else {
        weatherList.value.splice(weatherItemIndex, 1, weatherItem)
      }

      return weatherItem
    } catch (e) {
      console.error(e instanceof Error ? e.message : '지역 날씨 요청 실패')
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherList,
    isLoading,
    addWeatherItem,
    fetchMainCityDatasById,
    fetchWeatherByRegion,
    findWeatherById,
  }
})
