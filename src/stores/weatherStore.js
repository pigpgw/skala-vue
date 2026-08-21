import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getAirPollutionByCoordinates, getWeatherByCoordinates } from '@/apis/weather'
import { cityData } from '@/data/cityData'
import { weatherData } from '@/data/weatherData'
import { ERROR_MESSAGE, createMainCityPartialErrorMessage, createRegionAirPollutionErrorMessage, createRegionWeatherErrorMessage } from '@/messages/error'
import { findSavedRegionById, saveRegion } from '@/utils/regionStorage'
import { createWeatherItem } from '@/utils/weather'

/** @typedef {import('@/types/region').Region} Region */
/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

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
  const hasLoadedMainCityWeather = ref(false)
  /** @type {Promise<void> | null} */
  let mainCitiesRequest = null
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

  /**
   * @param {WeatherItem} weatherItem
   * @param {boolean} [moveToFront]
   */
  const upsertWeatherItem = (weatherItem, moveToFront = false) => {
    const weatherItemIndex = weatherList.value.findIndex((item) => item.id === weatherItem.id || item.name === weatherItem.name)

    if (weatherItemIndex >= 0) {
      weatherList.value.splice(weatherItemIndex, 1)
    }

    if (moveToFront) {
      weatherList.value.unshift(weatherItem)
      return
    }

    if (weatherItemIndex >= 0) {
      weatherList.value.splice(weatherItemIndex, 0, weatherItem)
      return
    }

    weatherList.value.push(weatherItem)
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
    const airPollution = airPollutionResult.status === 'fulfilled' ? airPollutionResult.value : undefined

    return {
      weatherItem: createWeatherItem({
        id: city.id,
        name: city.name,
        weather,
        airPollution,
      }),
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

      errorMessage.value = createMainCityPartialErrorMessage(weatherFailedCityNames, airPollutionFailedCityNames)
    } catch (e) {
      console.error(e instanceof Error ? e.message : '날씨 요청 처리 실패')
      failedMainCityIds.value = [...cityIds]
      errorMessage.value = ERROR_MESSAGE.MAIN_CITY_WEATHER
    } finally {
      isLoading.value = false
    }
  }

  const fetchMainCityDatasById = async () => {
    if (mainCitiesRequest) return mainCitiesRequest

    mainCitiesRequest = fetchMainCitiesByIds(cityData.map((city) => city.id))

    try {
      await mainCitiesRequest
      hasLoadedMainCityWeather.value = true
    } finally {
      mainCitiesRequest = null
    }
  }

  const ensureMainCityWeather = async () => {
    if (hasLoadedMainCityWeather.value) return
    await fetchMainCityDatasById()
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
      const weather = await getWeatherByCoordinates({
        latitude: region.latitude,
        longitude: region.longitude,
      })
      const [airPollutionResult] = await Promise.allSettled([
        getAirPollutionByCoordinates({
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
        }),
      ])
      const airPollution = airPollutionResult.status === 'fulfilled' ? airPollutionResult.value : undefined
      /** @type {WeatherItem} */
      const weatherItem = createWeatherItem({
        id: region.id,
        name: region.name,
        weather,
        airPollution,
      })

      upsertWeatherItem(weatherItem, true)
      saveRegion(region)

      if (airPollutionResult.status === 'rejected') {
        lastFailedRegion.value = region
        errorMessage.value = createRegionAirPollutionErrorMessage(region.name)
      }

      return weatherItem
    } catch (e) {
      console.error(e instanceof Error ? e.message : '지역 날씨 요청 실패')
      lastFailedRegion.value = region
      errorMessage.value = createRegionWeatherErrorMessage(region.name)
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

  /**
   * 상세 URL에 해당하는 날씨를 Store, 기본 도시 좌표 또는 저장된 검색 지역에서 복구합니다.
   *
   * @param {string} cityId
   * @returns {Promise<WeatherItem | null>}
   */
  const fetchWeatherById = async (cityId) => {
    const existingWeatherItem = findWeatherById(cityId)
    if (existingWeatherItem) return existingWeatherItem

    const mainCity = cityData.find((city) => city.id === cityId)
    if (mainCity) {
      await fetchMainCitiesByIds([mainCity.id])
      return findWeatherById(cityId)
    }

    const savedRegion = findSavedRegionById(cityId)
    if (savedRegion) return fetchWeatherByRegion(savedRegion)

    return null
  }

  return {
    weatherList,
    isLoading,
    errorMessage,
    hasLoadedMainCityWeather,
    failedMainCityIds,
    addWeatherItem,
    findWeatherById,
    fetchWeatherById,
    fetchMainCityDatasById,
    ensureMainCityWeather,
    fetchWeatherByRegion,
    retryFailedRequest,
  }
})
