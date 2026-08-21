import { defineStore } from 'pinia'
import { ref } from 'vue'

import { searchKoreanRegions } from '@/apis/geocoding'
import { ERROR_MESSAGE } from '@/messages/error'
import { normalizeRegions } from '@/utils/region'

export const useRegionStore = defineStore('region', () => {
  /** @type {import('vue').Ref<import('@/types/region').Region[]>} */
  const regions = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  let latestRequestId = 0

  /** @param {string} query */
  const searchRegions = async (query) => {
    const normalizedQuery = query.trim()
    const requestId = ++latestRequestId
    isLoading.value = true
    errorMessage.value = ''

    try {
      const data = await searchKoreanRegions(normalizedQuery)
      if (requestId !== latestRequestId) return

      regions.value = normalizeRegions(data)
    } catch (e) {
      if (requestId !== latestRequestId) return
      console.error(e instanceof Error ? e.message : '지역 검색 요청 실패')
      regions.value = []
      errorMessage.value = ERROR_MESSAGE.REGION_SEARCH
    } finally {
      if (requestId === latestRequestId) isLoading.value = false
    }
  }

  const clearSearchResults = () => {
    latestRequestId += 1
    regions.value = []
    isLoading.value = false
    errorMessage.value = ''
  }

  return {
    regions,
    isLoading,
    errorMessage,
    searchRegions,
    clearSearchResults,
  }
})
