/** @typedef {import('@/types/weather').DustStatus} DustStatus */

/**
 * OpenWeather Air Pollution API의 PM2.5 농도를 앱의 미세먼지 상태로 변환합니다.
 *
 * @param {number | undefined} pm25
 * @returns {DustStatus}
 */
export const getFineDustStatus = (pm25) => {
  if (typeof pm25 !== 'number' || !Number.isFinite(pm25) || pm25 < 0) return '정보 없음'
  if (pm25 <= 15) return '좋음'
  if (pm25 <= 35) return '보통'
  return '나쁨'
}
