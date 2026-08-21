<script setup>
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/** @typedef {import('@/types/region').Region} Region */

defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  searchResultCount: {
    type: Number,
    required: true,
  },
  searchStatusMessage: {
    type: String,
    required: true,
  },
  regions: {
    type: /** @type {import('vue').PropType<Region[]>}*/ (Array),
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isSearching: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query', 'select-region', 'retry-search'])

/** @param {string | number} value */
const handleSearchInput = (value) => emit('update-query', String(value))

/** @param {Region} region */
const selectRegion = (region) => {
  emit('select-region', region)
}
</script>

<template>
  <div class="grid w-full gap-2">
    <label for="city-search" class="w-full max-w-md text-left text-sm font-medium">새 지역 날씨 추가</label>
    <div class="mb-1 w-full max-w-md">
      <Input id="city-search" type="text" :model-value="searchQuery" placeholder="예: 부산, 전주, 강릉" :disabled="disabled" @update:model-value="handleSearchInput" />
    </div>
    <p class="w-full max-w-md text-left text-xs text-muted-foreground">대한민국 지역명을 2글자 이상 입력한 뒤 추가할 지역을 선택하세요.</p>

    <Alert v-if="isSearching" class="mt-2 w-full max-w-md" role="status" aria-live="polite">
      <AlertDescription>지역을 검색하고 있습니다.</AlertDescription>
    </Alert>
    <Alert v-else-if="errorMessage" variant="destructive" class="mt-2 w-full max-w-md">
      <AlertDescription class="flex items-center justify-between gap-3">
        <span>{{ errorMessage }}</span>
        <Button type="button" variant="destructive" size="sm" @click="emit('retry-search')">다시 검색</Button>
      </AlertDescription>
    </Alert>

    <div v-if="regions.length > 0" class="mt-2 grid w-full max-w-md gap-1" aria-label="추가할 지역 검색 결과">
      <div class="mb-1 text-left text-sm font-medium">추가할 지역 검색 결과</div>
      <Button
        v-for="region in regions"
        :key="region.id"
        variant="outline"
        class="w-full justify-between text-left font-normal"
        type="button"
        :disabled="disabled || isSearching"
        @click="selectRegion(region)"
      >
        <span>{{ region.name }}</span>
        <span class="text-xs text-muted-foreground">날씨 추가</span>
      </Button>
    </div>
    <div class="mt-1 w-full max-w-md text-left text-sm text-muted-foreground" aria-live="polite">{{ searchStatusMessage }}</div>
    <div v-if="searchQuery.trim().length >= 2 && !isSearching && !errorMessage" class="w-full max-w-md text-left text-xs text-muted-foreground">검색 결과 {{ searchResultCount }}개</div>
  </div>
</template>
