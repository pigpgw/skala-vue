<script setup>
/** @typedef {import('@/types/region').Region} Region */
import BaseInput from '@/components/common/BaseInput.vue'

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
})

const emit = defineEmits(['update-query', 'select-region'])

/** @param {Event} event */
const handleSearchInput = (event) => {
  const input = event.currentTarget
  if (!(input instanceof HTMLInputElement)) return
  emit('update-query', input.value)
}

/** @param {Region} region */
const selectRegion = (region) => {
  emit('select-region', region)
}
</script>

<template>
  <div class="city-search-panel">
    <div>검색할 도시</div>
    <div class="search-input-wrapper">
      <BaseInput variant="primary" size="medium" type="text" :value="searchQuery" placeholder="도시명을 입력하세요" @input="handleSearchInput" />
    </div>
    <div v-if="regions.length > 0">
      <button v-for="region in regions" :key="region.id" type="button" @click="selectRegion(region)">
        {{ region.name }}
      </button>
    </div>
    <div>입력한 도시: {{ searchQuery }}</div>
    <div>검색 결과 개수: {{ searchResultCount }}개</div>
    <div>검색 상태: {{ searchStatusMessage }}</div>
  </div>
</template>

<style scoped>
.search-input-wrapper {
  width: 100%;
}
</style>
