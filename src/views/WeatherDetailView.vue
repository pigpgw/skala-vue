<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BaseBadge from '@/components/tasks/common/BaseBadge.vue'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { getInsectVariant } from '@/utils/insect'
import { convertTemperature } from '@/utils/temperature'

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const cityData = ref()

const displayTemperature = computed(() => {
  const rawTemperature = cityData.value?.temp
  if (typeof rawTemperature !== 'number') return null
  return convertTemperature(rawTemperature, configStore.unit)
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
      <div class="weather-detail__insects">
        <h4>자주 출몰하는 벌레</h4>
        <div class="weather-detail__insect-list">
          <BaseBadge
            v-for="insect in cityData.insects"
            :key="insect"
            :variant="getInsectVariant(insect)"
            size="small"
          >
            {{ insect }}
          </BaseBadge>
        </div>
      </div>
    </div>
    <p v-else>해당 도시의 날씨 정보가 없습니다.</p>

    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-detail {
  padding: var(--space-4);
}

.weather-detail__insects {
  margin: var(--space-4) 0;
}

.weather-detail__insects h4 {
  margin-bottom: var(--space-2);
}

.weather-detail__insect-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
