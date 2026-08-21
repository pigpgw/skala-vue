import regionalCodeClient from '@/utils/regionalCodeClient'

/**
 * @param {number} pageNo
 * @param {number} numOfRows
 * @param {string=} ctpvCode
 */
export const getRegionalCodes = async (pageNo = 1, numOfRows = 100, ctpvCode) => {
  const response = await regionalCodeClient.get('/getRegionalCode', {
    params: {
      pageNo,
      numOfRows,
      ctpv_cd: ctpvCode,
    },
  })

  return response.data
}
