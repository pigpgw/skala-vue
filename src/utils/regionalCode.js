/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeItemResponse} RegionalCodeItemResponse */
/** @typedef {import('@/types/region').AdministrativeDistrict} AdministrativeDistrict */

/**
 * 읍면동 단위로 반복되는 응답에서 사용 중인 시군구만 코드 기준으로 추립니다.
 *
 * @param {RegionalCodeItemResponse[]} items
 * @returns {AdministrativeDistrict[]}
 */
export const normalizeAdministrativeDistricts = (items) => {
  /** @type {Map<string, AdministrativeDistrict>} */
  const districtMap = new Map()

  items.forEach((item) => {
    if (item.use_yn !== 'Y' || !item.sgg_cd || !item.sgg_nm) return
    if (item.sgg_cd === `${item.ctpv_cd}000`) return

    districtMap.set(item.sgg_cd, {
      code: item.sgg_cd,
      name: item.sgg_nm,
      provinceCode: item.ctpv_cd,
      provinceName: item.ctpv_nm,
    })
  })

  return [...districtMap.values()].sort((firstDistrict, secondDistrict) => firstDistrict.code.localeCompare(secondDistrict.code))
}
