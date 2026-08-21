<script setup>
import { computed } from 'vue'

import { useConfigStore } from '@/stores/configStore'
import { convertTemperature } from '@/utils/temperature'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  averageTemperature: {
    type: Number,
    required: true,
  },
  averageHumidity: {
    type: Number,
    required: true,
  },
  averageWindSpeed: {
    type: Number,
    required: true,
  },
  badDustCityCount: {
    type: Number,
    required: true,
  },
  hottestCity: {
    type: Object,
    required: true,
  },
  coldestCity: {
    type: Object,
    required: true,
  },
  mostHumidCity: {
    type: Object,
    required: true,
  },
  strongestWindCity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['visibility-change'])
const configStore = useConfigStore()

const displayAverageTemperature = computed(() => convertTemperature(props.averageTemperature, configStore.unit))
const displayHottestTemperature = computed(() => convertTemperature(props.hottestCity.temp, configStore.unit))
const displayColdestTemperature = computed(() => convertTemperature(props.coldestCity.temp, configStore.unit))

/** @param {Event} event */
const handleVisibilityChange = (event) => {
  const checkbox = event.currentTarget
  if (!(checkbox instanceof HTMLInputElement)) return
  emit('visibility-change', checkbox.checked)
}
</script>

<template>
  <label>
    <input type="checkbox" :checked="isVisible" @change="handleVisibilityChange" />
    전국 통계 보기
  </label>

  <div v-show="isVisible">
    <div>전국 날씨 통계</div>
    <div>평균 기온: {{ displayAverageTemperature.toFixed(1) }}{{ configStore.unitSymbol }}</div>
    <div>평균 습도: {{ averageHumidity.toFixed(1) }}%</div>
    <div>평균 풍속: {{ averageWindSpeed.toFixed(1) }}m/s</div>
    <div>미세먼지 나쁨 도시: {{ badDustCityCount }}개</div>
    <div>가장 더운 도시: {{ hottestCity.name }} {{ displayHottestTemperature }}{{ configStore.unitSymbol }}</div>
    <div>가장 추운 도시: {{ coldestCity.name }} {{ displayColdestTemperature }}{{ configStore.unitSymbol }}</div>
    <div>가장 습한 도시: {{ mostHumidCity.name }} {{ mostHumidCity.humidity }}%</div>
    <div>풍속이 가장 강한 도시: {{ strongestWindCity.name }} {{ strongestWindCity.windSpeed }}m/s</div>
  </div>
</template>
