import axios from 'axios'

import { API_TIMEOUT_MS, OPENWEATHER_GEOCODING_BASE_URL } from '@/constants/api'
import { ERROR_MESSAGE } from '@/messages/error'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const openWeatherGeocodingClient = axios.create({
  baseURL: OPENWEATHER_GEOCODING_BASE_URL,
  timeout: API_TIMEOUT_MS,
})

openWeatherGeocodingClient.interceptors.request.use(
  (config) => {
    if (!apiKey) {
      throw new Error(ERROR_MESSAGE.OPENWEATHER_API_KEY_MISSING)
    }

    config.params = {
      ...config.params,
      appid: apiKey,
    }

    return config
  },
  (error) => Promise.reject(error),
)

openWeatherGeocodingClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('지역 검색 API 요청 실패:', error.response?.status ?? error.message)
    return Promise.reject(error)
  },
)

export default openWeatherGeocodingClient
