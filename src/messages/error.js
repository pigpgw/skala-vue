const RETRY_GUIDANCE = '잠시 후 다시 시도해 주세요.'

export const ERROR_MESSAGE = Object.freeze({
  MAIN_CITY_WEATHER: `도시별 날씨 정보를 불러오지 못했습니다. ${RETRY_GUIDANCE}`,
  OPENWEATHER_API_KEY_MISSING: 'OpenWeatherMap API Key가 설정되지 않았습니다.',
  OPENWEATHER_BASE_URL_MISSING: 'OpenWeatherMap Base URL이 설정되지 않았습니다.',
  REGIONAL_CODE_API_KEY_MISSING: '공공데이터포털 API Key가 설정되지 않았습니다.',
  REGIONAL_CODE_BASE_URL_MISSING: '국토교통부 지역코드 Base URL이 설정되지 않았습니다.',
  REGION_LIST: `지역 검색 목록을 불러오지 못했습니다. ${RETRY_GUIDANCE}`,
})

/**
 * @param {string[]} weatherCityNames
 * @param {string[]} airPollutionCityNames
 */
export const createMainCityPartialErrorMessage = (weatherCityNames, airPollutionCityNames) => {
  /** @type {string[]} */
  const messages = []

  if (weatherCityNames.length > 0) {
    messages.push(`날씨 정보를 불러오지 못한 도시: ${weatherCityNames.join(', ')}`)
  }

  if (airPollutionCityNames.length > 0) {
    messages.push(`미세먼지 정보를 불러오지 못한 도시: ${airPollutionCityNames.join(', ')}`)
  }

  return messages.length > 0 ? `${messages.join(' / ')}. ${RETRY_GUIDANCE}` : ''
}

/** @param {string} regionName */
export const createRegionAirPollutionErrorMessage = (regionName) =>
  `${regionName}의 미세먼지 정보만 불러오지 못했습니다. 날씨 정보는 정상적으로 표시됩니다.`

/** @param {string} regionName */
export const createRegionWeatherErrorMessage = (regionName) => `${regionName}의 날씨 정보를 불러오지 못했습니다. ${RETRY_GUIDANCE}`
