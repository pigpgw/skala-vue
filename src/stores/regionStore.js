/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeItemResponse} RegionalCodeItemResponse */
/** @typedef {import('@/types/region').Region} Region */
import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getRegionalCodes } from '@/apis/regionalCode'

export const useRegionStore = defineStore('region', () => {
  /** @type {import('vue').Ref<Region[]>} */
  const regions = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const fetchRegions = async () => {
    if (regions.value.length > 0) return
    isLoading.value = true
    errorMessage.value = ''

    try {
      const data = await getRegionalCodes()

      /** @type {RegionalCodeItemResponse[]} */
      const items = data.Response.body.items.item

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

      regions.value = [...regionMap.values()]
    } catch (e) {
      console.error(e instanceof Error ? e.message : '지역 검색 목록 요청 실패')
      errorMessage.value = '지역 검색 목록을 불러오지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    regions,
    isLoading,
    errorMessage,
    fetchRegions,
  }
})
