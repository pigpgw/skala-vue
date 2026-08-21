<script setup>
import WeatherCard from '@/components/weather/WeatherCard.vue'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

defineProps({
  weatherList: {
    type: /** @type {import('vue').PropType<WeatherItem[]>} */ (Array),
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

/** @param {string} message */
const handleCardSelect = (message) => emit('select-card', message)
/** @param {string} cityId */
const handleDetailClick = (cityId) => emit('click-detail', cityId)
</script>

<template>
  <div v-if="weatherList.length > 0" class="grid gap-4 md:grid-cols-2">
    <WeatherCard v-for="weatherItem in weatherList" :key="weatherItem.id" :weather-item="weatherItem" @select-card="handleCardSelect" @click-detail="handleDetailClick" />
  </div>
  <div v-else class="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">등록된 날씨 카드 중 일치하는 지역이 없습니다.</div>
</template>
