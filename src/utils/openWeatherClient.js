import axios from 'axios'

import { API_TIMEOUT_MS } from '@/constants/api'
import { ERROR_MESSAGE } from '@/messages/error'

const baseURL = import.meta.env.VITE_OPENWEATHER_BASE_URL
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const openWeatherClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT_MS,
})

openWeatherClient.interceptors.request.use(
  (config) => {
    if (!baseURL) {
      throw new Error(ERROR_MESSAGE.OPENWEATHER_BASE_URL_MISSING)
    }
    if (!apiKey) {
      throw new Error(ERROR_MESSAGE.OPENWEATHER_API_KEY_MISSING)
    }
    config.params = {
      units: 'metric',
      lang: 'kr',
      ...config.params,
      appid: apiKey,
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

openWeatherClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('날씨 API 요청 실패:', error.response?.status ?? error.message)
    return Promise.reject(error)
  },
)

export default openWeatherClient
