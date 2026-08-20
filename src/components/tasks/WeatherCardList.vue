<script setup>
import WeatherCard from './WeatherCard.vue'

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

const emit = defineEmits(['select-card', 'click-detail'])

/**
 * @param {string} name
 * @param {string} status
 */
const handleClickDetail = (name, status) => emit('click-detail', name, status)

defineProps({
  filteredWeatherList: {
    type: /** @type {import('vue').PropType<WeatherItem[]>} */ (Array),
    required: true,
  },
})
</script>

<template>
  <div class="weather-list">
    <WeatherCard
      v-for="item in filteredWeatherList"
      :key="item.id"
      :item="item"
      @select-card="emit('select-card', $event)"
      @click-detail="handleClickDetail"
    />
  </div>
</template>
