<script setup>
import WeatherCard from '@/components/tasks/WeatherCard.vue'

/**
 * @typedef {Object} WeatherItem
 * @property {string} id
 * @property {string} name
 * @property {string} status
 * @property {number} temp
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} dust
 */

defineProps({
  weatherList: {
    type: /** @type {import('vue').PropType<WeatherItem[]>} */ (Array),
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

/** @param {string} name @param {string} status */
const handleDetailClick = (name, status) => emit('click-detail', name, status)
</script>

<template>
  <div v-if="weatherList.length > 0" class="weather-list">
    <WeatherCard
      v-for="weatherItem in weatherList"
      :key="weatherItem.id"
      :weather-item="weatherItem"
      @select-card="emit('select-card', $event)"
      @click-detail="handleDetailClick"
    />
  </div>
  <div v-else>검색 결과와 일치하는 도시가 없습니다.</div>
</template>
