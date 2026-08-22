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
 * @property {string | null} emd_cd
 * @property {string | null} emd_nm
 * @property {'Y' | 'N'} use_yn
 */

/**
 * @typedef {Object} RegionalCodeBodyResponse
 * @property {{ item: RegionalCodeItemResponse[] }} items
 * @property {number} numOfRows
 * @property {number} pageNo
 * @property {number} totalCount
 */

/**
 * @typedef {Object} RegionalCodeResponse
 * @property {{ body: RegionalCodeBodyResponse }} Response
 */

export {}
