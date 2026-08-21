/**
 * @typedef {Object} RegionalCodeRequest
 * @property {number} [pageNo]
 * @property {number} [numOfRows]
 * @property {string} [ctpvCode]
 */

/**
 * @typedef {Object} RegionalCodeItemResponse
 * @property {string} ctpv_cd
 * @property {string} ctpv_nm
 * @property {string | null} sgg_cd
 * @property {string | null} sgg_nm
 * @property {'Y' | 'N'} use_yn
 */

/**
 * @typedef {Object} RegionalCodeResponse
 * @property {{ body: { items: { item: RegionalCodeItemResponse[] } } }} Response
 */

export {}
