import { REGIONAL_CODE_DEFAULT_PAGE_NUMBER, REGIONAL_CODE_DEFAULT_PAGE_SIZE } from '@/constants/api'
import regionalCodeClient from '@/utils/regionalCodeClient'

/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeRequest} RegionalCodeRequest */
/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeResponse} RegionalCodeResponse */

/**
 * @param {RegionalCodeRequest} [request]
 * @returns {Promise<RegionalCodeResponse>}
 */
export const getRegionalCodes = async ({ pageNo = REGIONAL_CODE_DEFAULT_PAGE_NUMBER, numOfRows = REGIONAL_CODE_DEFAULT_PAGE_SIZE, ctpvCode } = {}) => {
  const response = await regionalCodeClient.get('/getRegionalCode', {
    params: {
      pageNo,
      numOfRows,
      ctpv_cd: ctpvCode,
    },
  })

  return response.data
}
