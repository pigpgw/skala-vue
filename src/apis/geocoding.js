import { REGION_SEARCH_RESULT_LIMIT } from '@/constants/region'
import openWeatherGeocodingClient from '@/utils/openWeatherGeocodingClient'

/** @typedef {import('@/dto/openWeatherGeocodingDto').GeocodingSearchResponse} GeocodingSearchResponse */

/**
 * @param {string} query
 * @returns {Promise<GeocodingSearchResponse>}
 */
export const searchKoreanRegions = async (query) => {
  const response = await openWeatherGeocodingClient.get('/direct', {
    params: {
      q: `${query},KR`,
      limit: REGION_SEARCH_RESULT_LIMIT,
    },
  })

  return response.data
}
