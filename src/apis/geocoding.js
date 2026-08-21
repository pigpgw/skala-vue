import { REGION_CITY_SUFFIX, REGION_SEARCH_RESULT_LIMIT } from '@/constants/region'
import openWeatherGeocodingClient from '@/utils/openWeatherGeocodingClient'

/** @typedef {import('@/dto/openWeatherGeocodingDto').GeocodingSearchResponse} GeocodingSearchResponse */

/**
 * @param {string} query
 * @returns {Promise<GeocodingSearchResponse>}
 */
export const searchKoreanRegions = async (query) => {
  /** @param {string} regionName */
  const requestRegions = async (regionName) => {
    const response = await openWeatherGeocodingClient.get('/direct', {
      params: {
        q: `${regionName},KR`,
        limit: REGION_SEARCH_RESULT_LIMIT,
      },
    })

    return response.data
  }

  const regions = await requestRegions(query)
  if (regions.length > 0 || query.endsWith(REGION_CITY_SUFFIX)) return regions

  return requestRegions(`${query}${REGION_CITY_SUFFIX}`)
}
