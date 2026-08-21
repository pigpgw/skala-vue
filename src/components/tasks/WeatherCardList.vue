<script setup>
import WeatherCard from '@/components/tasks/WeatherCard.vue'

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
  <div v-if="weatherList.length > 0" class="weather-list">
    <WeatherCard
      v-for="weatherItem in weatherList"
      :key="weatherItem.id"
      :weather-item="weatherItem"
      @select-card="handleCardSelect"
      @click-detail="handleDetailClick"
    />
  </div>
  <div v-else>검색 결과와 일치하는 도시가 없습니다.</div>
</template>
