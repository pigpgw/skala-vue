import { FINE_DUST_GOOD_MAX, FINE_DUST_MODERATE_MAX, MINIMUM_PM25 } from '@/constants/weather'

/** @typedef {import('@/types/weather').DustStatus} DustStatus */

/**
 * OpenWeather Air Pollution API의 PM2.5 농도를 앱의 미세먼지 상태로 변환합니다.
 *
 * @param {number | undefined} pm25
 * @returns {DustStatus}
 */
export const getFineDustStatus = (pm25) => {
  if (typeof pm25 !== 'number' || !Number.isFinite(pm25) || pm25 < MINIMUM_PM25) return '정보 없음'
  if (pm25 <= FINE_DUST_GOOD_MAX) return '좋음'
  if (pm25 <= FINE_DUST_MODERATE_MAX) return '보통'
  return '나쁨'
}
