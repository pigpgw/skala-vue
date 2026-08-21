<script setup>
/** @typedef {import('@/types/region').Region} Region */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
})

const emit = defineEmits(['update-query', 'select-region'])

/** @param {string | number} value */
const handleSearchInput = (value) => emit('update-query', String(value))

/** @param {Region} region */
const selectRegion = (region) => {
  emit('select-region', region)
}
</script>

<template>
  <div class="flex w-full flex-col items-start gap-1">
    <label for="city-search" class="w-full max-w-md text-left text-sm font-medium">검색할 도시</label>
    <div class="mb-1 w-full max-w-md">
      <Input
        id="city-search"
        type="text"
        :model-value="searchQuery"
        placeholder="도시명을 입력하세요"
        :disabled="disabled"
        @update:model-value="handleSearchInput"
      />
    </div>
    <div v-if="regions.length > 0" class="mt-3 flex w-full max-w-md flex-col gap-2">
      <Button
        v-for="region in regions"
        :key="region.id"
        class="w-full justify-start text-left"
        type="button"
        :disabled="disabled"
        @click="selectRegion(region)"
      >
        {{ region.name }}
      </Button>
    </div>
    <div class="w-full max-w-md text-left text-sm">입력한 도시: {{ searchQuery }}</div>
    <div class="w-full max-w-md text-left text-sm">검색 결과 개수: {{ searchResultCount }}개</div>
    <div class="w-full max-w-md text-left text-sm text-muted-foreground">검색 상태: {{ searchStatusMessage }}</div>
  </div>
</template>
