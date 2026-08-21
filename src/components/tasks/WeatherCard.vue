<script setup>
import { computed } from 'vue'

import BaseButton from '@/components/tasks/common/BaseButton.vue'
import { useConfigStore } from '@/stores/configStore'

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

const props = defineProps({
  weatherItem: {
    type: /** @type {import('vue').PropType<WeatherItem>} */ (Object),
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()

const displayTemperature = computed(() => {
  const rawTemperature = props.weatherItem.temp
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemperature * 9) / 5 + 32)
  return rawTemperature
})

const handleCardSelect = () => {
  emit('select-card', `${props.weatherItem.name}이 선택되었습니다.`)
}

const handleDetailClick = () => {
  emit('click-detail', props.weatherItem.id)
}
</script>

<template>
  <div class="weather-card" @click="handleCardSelect">
    <div>{{ weatherItem.name }}</div>
    <div>현재 날씨: {{ weatherItem.status }}</div>
    <div>기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</div>
    <div>습도: {{ weatherItem.humidity }}%</div>
    <div>풍속: {{ weatherItem.windSpeed }}m/s</div>
    <div>미세먼지: {{ weatherItem.dust }}</div>

    <div v-if="weatherItem.dust === '나쁨'">외출할 때 마스크를 착용하세요.</div>
    <div v-else-if="weatherItem.dust === '보통'">미세먼지 농도가 보통입니다.</div>
    <div v-else>공기가 깨끗합니다.</div>

    <div v-if="weatherItem.temp >= 25">25도 이상으로 덥습니다.</div>
    <div v-else>25도 미만으로 선선합니다.</div>

    <BaseButton @click.stop="handleDetailClick">날씨 자세히 보기</BaseButton>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid #e5e7eb;
}
</style>
