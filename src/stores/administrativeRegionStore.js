import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getRegionalCodes } from '@/apis/regionalCode'
import { REGIONAL_CODE_DEFAULT_PAGE_SIZE, REGIONAL_CODE_MAX_PAGES_PER_PROVINCE } from '@/constants/api'
import { ERROR_MESSAGE } from '@/messages/error'
import { normalizeAdministrativeDistricts } from '@/utils/regionalCode'

/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeItemResponse} RegionalCodeItemResponse */
/** @typedef {import('@/types/region').AdministrativeDistrict} AdministrativeDistrict */

export const useAdministrativeRegionStore = defineStore('administrativeRegion', () => {
  /** @type {import('vue').Ref<Record<string, AdministrativeDistrict[]>>} */
  const districtsByProvince = ref({})
  const isLoading = ref(false)
  const errorMessage = ref('')
  const lastRequestedProvinceCode = ref('')

  /** @param {string} provinceCode */
  const getDistrictsByProvince = (provinceCode) => districtsByProvince.value[provinceCode] ?? []

  /** @param {string} provinceCode */
  const fetchDistrictsByProvince = async (provinceCode) => {
    lastRequestedProvinceCode.value = provinceCode
    errorMessage.value = ''

    const cachedDistricts = getDistrictsByProvince(provinceCode)
    if (cachedDistricts.length > 0) return cachedDistricts

    isLoading.value = true

    try {
      const firstPage = await getRegionalCodes({ ctpvCode: provinceCode })
      const firstBody = firstPage.Response.body
      const totalPages = Math.ceil(firstBody.totalCount / firstBody.numOfRows)
      if (totalPages > REGIONAL_CODE_MAX_PAGES_PER_PROVINCE) {
        throw new Error('시·도별 지역코드 조회 허용 페이지 수를 초과했습니다.')
      }
      const remainingPageNumbers = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2)
      const remainingPages = await Promise.all(
        remainingPageNumbers.map((pageNo) =>
          getRegionalCodes({
            pageNo,
            numOfRows: REGIONAL_CODE_DEFAULT_PAGE_SIZE,
            ctpvCode: provinceCode,
          }),
        ),
      )
      /** @type {RegionalCodeItemResponse[]} */
      const items = [firstBody, ...remainingPages.map((page) => page.Response.body)].flatMap((body) => body.items.item)
      const districts = normalizeAdministrativeDistricts(items)

      districtsByProvince.value = {
        ...districtsByProvince.value,
        [provinceCode]: districts,
      }

      return districts
    } catch (error) {
      console.error(error instanceof Error ? error.message : '공식 행정구역 조회 실패')
      errorMessage.value = ERROR_MESSAGE.REGIONAL_CODE_LIST
      return []
    } finally {
      isLoading.value = false
    }
  }

  const retryLastRequest = async () => {
    if (!lastRequestedProvinceCode.value) return
    delete districtsByProvince.value[lastRequestedProvinceCode.value]
    await fetchDistrictsByProvince(lastRequestedProvinceCode.value)
  }

  return {
    districtsByProvince,
    isLoading,
    errorMessage,
    getDistrictsByProvince,
    fetchDistrictsByProvince,
    retryLastRequest,
  }
})
