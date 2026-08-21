import axios from 'axios'

import { API_TIMEOUT_MS } from '@/constants/api'
import { ERROR_MESSAGE } from '@/messages/error'

const baseURL = import.meta.env.VITE_MOLIT_REGIONAL_CODE_BASE_URL
const encodedServiceKey = import.meta.env.VITE_DATA_GO_KR_API_KEY
const serviceKey = encodedServiceKey ? decodeURIComponent(encodedServiceKey) : ''

const regionalCodeClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT_MS,
})

regionalCodeClient.interceptors.request.use(
  (config) => {
    if (!baseURL) {
      throw new Error(ERROR_MESSAGE.REGIONAL_CODE_BASE_URL_MISSING)
    }
    if (!serviceKey) {
      throw new Error(ERROR_MESSAGE.REGIONAL_CODE_API_KEY_MISSING)
    }
    config.params = {
      dataType: 'JSON',
      ...config.params,
      serviceKey,
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

regionalCodeClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('지역코드 API 요청 실패:', error.response?.status ?? error.message)
    return Promise.reject(error)
  },
)

export default regionalCodeClient
