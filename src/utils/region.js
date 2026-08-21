/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeItemResponse} RegionalCodeItemResponse */
/** @typedef {import('@/types/region').Region} Region */

/**
 * 지역코드 응답에서 사용 중인 시군구만 추려 중복 없는 검색 지역 목록으로 변환합니다.
 *
 * @param {RegionalCodeItemResponse[]} items
 * @returns {Region[]}
 */
export const normalizeRegions = (items) => {
  /** @type {Map<string, Region>} */
  const regionMap = new Map()

  items.forEach((region) => {
    if (region.use_yn !== 'Y' || !region.sgg_cd || !region.sgg_nm) return

    regionMap.set(region.sgg_cd, {
      id: region.sgg_cd,
      name: region.ctpv_nm === region.sgg_nm ? region.ctpv_nm : `${region.ctpv_nm} ${region.sgg_nm}`,
      weatherName: region.sgg_nm,
    })
  })

  return [...regionMap.values()]
}
