/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeRequest} RegionalCodeRequest */
/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeResponse} RegionalCodeResponse */
import regionalCodeClient from '@/utils/regionalCodeClient'

/**
 * @param {RegionalCodeRequest} [request]
 * @returns {Promise<RegionalCodeResponse>}
 */
export const getRegionalCodes = async ({ pageNo = 1, numOfRows = 100, ctpvCode } = {}) => {
  const response = await regionalCodeClient.get('/getRegionalCode', {
    params: {
      pageNo,
      numOfRows,
      ctpv_cd: ctpvCode,
    },
  })

  return response.data
}
