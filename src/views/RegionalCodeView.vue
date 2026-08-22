<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import RegionalCodePanel from '@/components/region/RegionalCodePanel.vue'
import { provinceData } from '@/data/provinceData'
import { useAdministrativeRegionStore } from '@/stores/administrativeRegionStore'

const administrativeRegionStore = useAdministrativeRegionStore()
const { isLoading, errorMessage } = storeToRefs(administrativeRegionStore)
const selectedProvinceCode = ref('')
const districts = computed(() => administrativeRegionStore.getDistrictsByProvince(selectedProvinceCode.value))

/** @param {string} provinceCode */
const searchDistricts = async (provinceCode) => {
  selectedProvinceCode.value = provinceCode
  await administrativeRegionStore.fetchDistrictsByProvince(provinceCode)
}
</script>

<template>
  <section class="grid gap-6">
    <div>
      <Badge variant="secondary">MOLIT Regional Code</Badge>
      <h2 class="mt-3 text-2xl font-bold tracking-tight">공식 행정구역 코드</h2>
      <p class="mt-1 text-sm text-muted-foreground">전국 데이터를 한꺼번에 받지 않고 선택한 시·도만 조회해 API 호출 수를 줄였습니다.</p>
    </div>

    <RegionalCodePanel
      :provinces="provinceData"
      :districts="districts"
      :is-loading="isLoading"
      :error-message="errorMessage"
      @search="searchDistricts"
      @retry="administrativeRegionStore.retryLastRequest"
    />
  </section>
</template>
