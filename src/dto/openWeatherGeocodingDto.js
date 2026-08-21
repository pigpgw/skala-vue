/**
 * @typedef {Object} GeocodingSearchRequest
 * @property {string} q
 * @property {number} [limit]
 * @property {string} appid
 */

/**
 * @typedef {Object} GeocodingLocalNamesResponse
 * @property {string} [ko]
 */

/**
 * @typedef {Object} GeocodingLocationResponse
 * @property {string} name
 * @property {GeocodingLocalNamesResponse} [local_names]
 * @property {number} lat
 * @property {number} lon
 * @property {string} country
 * @property {string} [state]
 */

/** @typedef {GeocodingLocationResponse[]} GeocodingSearchResponse */

export {}
