import axios from 'axios'

const baseURL = import.meta.env.VITE_OPENWEATHER_BASE_URL
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const openWeatherClient = axios.create({
  baseURL,
  timeout: 10000,
})

openWeatherClient.interceptors.request.use(
  (config) => {
    if (!baseURL) {
      throw new Error('OpenWeatherMap Base URL이 설정되지 않았습니다.')
    }
    if (!apiKey) {
      throw new Error('OpenWeatherMap API Key가 설정되지 않았습니다.')
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
