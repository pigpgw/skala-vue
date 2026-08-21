/** @typedef {import('@/dto/openWeatherGeocodingDto').GeocodingLocationResponse} GeocodingLocationResponse */
/** @typedef {import('@/types/region').Region} Region */

/**
 * 지역 검색 응답을 화면과 날씨 조회에서 사용하는 지역 목록으로 변환합니다.
 *
 * @param {GeocodingLocationResponse[]} locations
 * @returns {Region[]}
 */
export const normalizeRegions = (locations) =>
  locations
    .filter((location) => location.country === 'KR')
    .map((location) => {
      const localizedName = location.local_names?.ko ?? location.name

      return {
        id: `${location.lat},${location.lon}`,
        name: localizedName,
        weatherName: localizedName,
        latitude: location.lat,
        longitude: location.lon,
      }
    })
