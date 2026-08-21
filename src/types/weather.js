/** @typedef {'좋음' | '보통' | '나쁨' | '정보 없음'} DustStatus */

/**
 * @typedef {Object} WeatherItem
 * @property {string} id
 * @property {string} name
 * @property {string} status
 * @property {number} temp
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {DustStatus} dust
 * @property {import('@/types/insect').Insect[]} insects
 */

export {}
