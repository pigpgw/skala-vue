<script setup>
import { computed, ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ApiRequestStatus from '@/components/weather/ApiRequestStatus.vue'

/** @typedef {import('@/types/region').Province} Province */
/** @typedef {import('@/types/region').AdministrativeDistrict} AdministrativeDistrict */

const props = defineProps({
  provinces: {
    type: /** @type {import('vue').PropType<Province[]>} */ (Array),
    required: true,
  },
  districts: {
    type: /** @type {import('vue').PropType<AdministrativeDistrict[]>} */ (Array),
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['search', 'retry'])
const selectedProvinceCode = ref('')
const displayedProvinceCode = ref('')
const selectedProvince = computed(() => props.provinces.find((province) => province.code === displayedProvinceCode.value) ?? null)

const searchDistricts = () => {
  if (!selectedProvinceCode.value) return
  displayedProvinceCode.value = selectedProvinceCode.value
  emit('search', selectedProvinceCode.value)
}
</script>

<template>
  <div class="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle>공식 행정구역 코드 조회</CardTitle>
        <CardDescription>시·도를 선택하면 국토교통부 지역코드 OpenAPI에서 현재 사용 중인 시군구 이름과 코드를 조회합니다.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div class="grid gap-1.5">
          <label for="province-code" class="text-sm font-medium">조회할 시·도</label>
          <select
            id="province-code"
            v-model="selectedProvinceCode"
            class="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isLoading"
          >
            <option value="">시·도를 선택하세요.</option>
            <option v-for="province in provinces" :key="province.code" :value="province.code">{{ province.name }}</option>
          </select>
        </div>
        <Button type="button" :disabled="!selectedProvinceCode || isLoading" @click="searchDistricts">지역코드 조회</Button>
      </CardContent>
    </Card>

    <ApiRequestStatus :is-loading="isLoading" loading-message="공식 행정구역 코드를 불러오는 중입니다." :error-message="errorMessage" @retry="emit('retry')" />

    <Card v-if="selectedProvince && !isLoading && !errorMessage">
      <CardHeader>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>{{ selectedProvince.name }} 시군구</CardTitle>
          <Badge variant="secondary">{{ districts.length }}개</Badge>
        </div>
        <CardDescription v-if="districts.length > 0">같은 시군구가 읍면동별로 반복되는 원본 응답을 코드 기준으로 한 번씩만 표시합니다.</CardDescription>
        <CardDescription v-else>조회 버튼을 누르면 공식 시군구 코드가 표시됩니다.</CardDescription>
      </CardHeader>
      <CardContent v-if="districts.length > 0">
        <ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="district in districts" :key="district.code" class="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm">
            <span class="font-medium">{{ district.name }}</span>
            <Badge variant="outline" class="font-mono">{{ district.code }}</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
