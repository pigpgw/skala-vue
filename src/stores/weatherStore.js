import { ref } from 'vue'
import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'
import { cityData } from '@/data/cityData'
import { getAirPollutionByCoordinates, getWeatherByCityName, getWeatherByCoordinates } from '@/apis/weather'
import { getFineDustStatus } from '@/utils/airQuality'
import { getActiveInsects } from '@/utils/insect'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */
/** @typedef {import('@/types/region').Region} Region */

/**
 * @typedef {Object} MainCityRequestResult
 * @property {WeatherItem | null} weatherItem
 * @property {boolean} isWeatherFailed
 * @property {boolean} isAirPollutionFailed
 */

export const useWeatherStore = defineStore('weather', () => {
  /** @type {import('vue').Ref<WeatherItem[]>} */
  const weatherList = ref([...weatherData])
  const isLoading = ref(false)
  const errorMessage = ref('')
  /** @type {import('vue').Ref<string[]>} */
  const failedMainCityIds = ref([])
  /** @type {import('vue').Ref<Region | null>} */
  const lastFailedRegion = ref(null)

  /** @param {WeatherItem} weatherItem */
  const addWeatherItem = (weatherItem) => {
    weatherList.value.push(weatherItem)
  }

  /** @param {string} cityId */
  const findWeatherById = (cityId) => {
    return weatherList.value.find((weatherItem) => weatherItem.id === cityId) ?? null
  }

  /** @param {WeatherItem} weatherItem */
  const upsertWeatherItem = (weatherItem) => {
    const weatherItemIndex = weatherList.value.findIndex((item) => item.id === weatherItem.id || item.name === weatherItem.name)

    if (weatherItemIndex === -1) {
      weatherList.value.push(weatherItem)
      return
    }

    weatherList.value.splice(weatherItemIndex, 1, weatherItem)
  }

  /**
   * @param {(typeof cityData)[number]} city
   * @returns {Promise<MainCityRequestResult>}
   */
  const requestMainCityWeather = async (city) => {
    const [weatherResult, airPollutionResult] = await Promise.allSettled([
      getWeatherByCoordinates({ latitude: city.latitude, longitude: city.longitude }),
      getAirPollutionByCoordinates({ latitude: city.latitude, longitude: city.longitude }),
    ])

    if (weatherResult.status === 'rejected') {
      return {
        weatherItem: null,
        isWeatherFailed: true,
        isAirPollutionFailed: airPollutionResult.status === 'rejected',
      }
    }

    const weather = weatherResult.value

    return {
      weatherItem: {
        id: city.id,
        name: city.name,
        temp: weather.main.temp,
        status: weather.weather[0]?.description ?? '정보 없음',
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        dust: airPollutionResult.status === 'fulfilled' ? getFineDustStatus(airPollutionResult.value.list[0]?.components.pm2_5) : '정보 없음',
        insects: getActiveInsects({
          temp: weather.main.temp,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed,
        }),
      },
      isWeatherFailed: false,
      isAirPollutionFailed: airPollutionResult.status === 'rejected',
    }
  }

  /** @param {string[]} cityIds */
  const fetchMainCitiesByIds = async (cityIds) => {
    isLoading.value = true
    errorMessage.value = ''
    lastFailedRegion.value = null

    try {
      const targetCities = cityData.filter((city) => cityIds.includes(city.id))
      const results = await Promise.allSettled(targetCities.map((city) => requestMainCityWeather(city)))
      /** @type {string[]} */
      const weatherFailedCityNames = []
      /** @type {string[]} */
      const airPollutionFailedCityNames = []
      /** @type {string[]} */
      const failedCityIds = []

      results.forEach((result, index) => {
        const city = targetCities[index]

        if (result.status === 'rejected' || result.value.isWeatherFailed) {
          weatherFailedCityNames.push(city.name)
          failedCityIds.push(city.id)
          return
        }

        if (result.value.weatherItem) upsertWeatherItem(result.value.weatherItem)

        if (result.value.isAirPollutionFailed) {
          airPollutionFailedCityNames.push(city.name)
          failedCityIds.push(city.id)
        }
      })

      failedMainCityIds.value = [...new Set(failedCityIds)]

      /** @type {string[]} */
      const messages = []
      if (weatherFailedCityNames.length > 0) messages.push(`날씨 조회 실패: ${weatherFailedCityNames.join(', ')}`)
      if (airPollutionFailedCityNames.length > 0) messages.push(`미세먼지 조회 실패: ${airPollutionFailedCityNames.join(', ')}`)
      errorMessage.value = messages.join(' / ')
    } catch (e) {
      console.error(e instanceof Error ? e.message : '날씨 요청 처리 실패')
      failedMainCityIds.value = [...cityIds]
      errorMessage.value = '도시별 날씨 요청을 처리하지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  const fetchMainCityDatasById = async () => {
    await fetchMainCitiesByIds(cityData.map((city) => city.id))
  }

  /**
   * @param {Region} region
   * @returns {Promise<WeatherItem | null>}
   */
  const fetchWeatherByRegion = async (region) => {
    isLoading.value = true
    errorMessage.value = ''
    failedMainCityIds.value = []
    lastFailedRegion.value = null

    try {
      const weather = await getWeatherByCityName({ city: region.weatherName })
      const [airPollutionResult] = await Promise.allSettled([
        getAirPollutionByCoordinates({
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
        }),
      ])
      /** @type {WeatherItem} */
      const weatherItem = {
        id: region.id,
        name: region.name,
        temp: weather.main.temp,
        status: weather.weather[0]?.description ?? '정보 없음',
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        dust: airPollutionResult.status === 'fulfilled' ? getFineDustStatus(airPollutionResult.value.list[0]?.components.pm2_5) : '정보 없음',
        insects: getActiveInsects({
          temp: weather.main.temp,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed,
        }),
      }

      upsertWeatherItem(weatherItem)

      if (airPollutionResult.status === 'rejected') {
        lastFailedRegion.value = region
        errorMessage.value = `${region.name} 미세먼지 정보를 불러오지 못했습니다.`
      }

      return weatherItem
    } catch (e) {
      console.error(e instanceof Error ? e.message : '지역 날씨 요청 실패')
      lastFailedRegion.value = region
      errorMessage.value = `${region.name} 날씨 정보를 불러오지 못했습니다.`
      return null
    } finally {
      isLoading.value = false
    }
  }

  const retryFailedRequest = async () => {
    if (lastFailedRegion.value) {
      await fetchWeatherByRegion(lastFailedRegion.value)
      return
    }

    if (failedMainCityIds.value.length > 0) {
      await fetchMainCitiesByIds([...failedMainCityIds.value])
      return
    }

    await fetchMainCityDatasById()
  }

  return {
    weatherList,
    isLoading,
    errorMessage,
    failedMainCityIds,
    addWeatherItem,
    fetchMainCityDatasById,
    fetchWeatherByRegion,
    retryFailedRequest,
    findWeatherById,
  }
})
