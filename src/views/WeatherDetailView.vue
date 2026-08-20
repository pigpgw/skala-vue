<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const cityData = ref()

const displayTemperature = computed(() => {
  const rawTemperature = cityData.value?.temp
  if (typeof rawTemperature !== 'number') return null
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemperature * 9) / 5 + 32)
  return rawTemperature
})

onMounted(() => {
  const cityId = route.params.cityId
  if (typeof cityId !== 'string') return
  cityData.value = weatherStore.findWeatherById(cityId)
})
</script>

<template>
  <section class="weather-detail">
    <h2>지역별 상세 날씨</h2>

    <div v-if="cityData">
      <h3>{{ cityData.name }}</h3>
      <p>기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</p>
      <p>현재 날씨: {{ cityData.status }}</p>
      <p>습도: {{ cityData.humidity }}%</p>
      <p>풍속: {{ cityData.windSpeed }}m/s</p>
      <p>미세먼지: {{ cityData.dust }}</p>
    </div>
    <p v-else>해당 도시의 날씨 정보가 없습니다.</p>

    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-detail {
  padding: 16px;
}
</style>
