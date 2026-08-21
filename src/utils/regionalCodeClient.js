import axios from 'axios'

const baseURL = import.meta.env.VITE_MOLIT_REGIONAL_CODE_BASE_URL
const encodedServiceKey = import.meta.env.VITE_DATA_GO_KR_API_KEY
const serviceKey = encodedServiceKey ? decodeURIComponent(encodedServiceKey) : ''

const regionalCodeClient = axios.create({
  baseURL,
  timeout: 10000,
})

regionalCodeClient.interceptors.request.use(
  (config) => {
    if (!baseURL) {
      throw new Error('국토교통부 지역코드 Base URL이 설정되지 않았습니다.')
    }
    if (!serviceKey) {
      throw new Error('공공데이터포털 API Key가 설정되지 않았습니다.')
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
