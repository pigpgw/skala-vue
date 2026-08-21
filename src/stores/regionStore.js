import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getRegionalCodes } from '@/apis/regionalCode'
import { ERROR_MESSAGE } from '@/messages/error'
import { normalizeRegions } from '@/utils/region'

/** @typedef {import('@/dto/regionalCodeDto').RegionalCodeItemResponse} RegionalCodeItemResponse */

export const useRegionStore = defineStore('region', () => {
  /** @type {import('vue').Ref<import('@/types/region').Region[]>} */
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
      regions.value = normalizeRegions(items)
    } catch (e) {
      console.error(e instanceof Error ? e.message : '지역 검색 목록 요청 실패')
      errorMessage.value = ERROR_MESSAGE.REGION_LIST
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
