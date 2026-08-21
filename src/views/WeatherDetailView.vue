<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import InsectConditionBadge from '@/components/weather/InsectConditionBadge.vue'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { convertTemperature } from '@/utils/temperature'

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
/** @type {import('vue').Ref<import('@/types/weather').WeatherItem | null>} */
const cityData = ref(null)
const isLoading = ref(true)

const displayTemperature = computed(() => {
  const rawTemperature = cityData.value?.temp
  if (typeof rawTemperature !== 'number') return null
  return convertTemperature(rawTemperature, configStore.unit)
})

onMounted(async () => {
  const cityId = route.params.cityId
  if (typeof cityId !== 'string') {
    isLoading.value = false
    return
  }

  cityData.value = await weatherStore.fetchWeatherById(cityId)
  isLoading.value = false
})
</script>

<template>
  <section class="grid gap-4 p-4">
    <h2 class="text-2xl font-bold">지역별 상세 날씨</h2>

    <p v-if="isLoading" role="status">상세 날씨를 불러오는 중입니다.</p>
    <Card v-else-if="cityData">
      <CardHeader>
        <CardTitle>{{ cityData.name }}</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-1">
        <p>기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</p>
        <p>현재 날씨: {{ cityData.status }}</p>
        <p>습도: {{ cityData.humidity }}%</p>
        <p>풍속: {{ cityData.windSpeed }}m/s</p>
        <p>미세먼지: {{ cityData.dust }}</p>
        <div class="my-4">
          <h4 class="mb-2 font-semibold">자주 출몰하는 벌레</h4>
          <div class="flex flex-wrap gap-2">
            <InsectConditionBadge v-for="insect in cityData.insects" :key="insect.id" :insect="insect" />
          </div>
        </div>
      </CardContent>
    </Card>
    <p v-else>해당 도시의 날씨 정보를 찾을 수 없습니다.</p>

    <Button as-child variant="link" class="w-fit px-0"><RouterLink to="/">메인 대시보드로 돌아가기</RouterLink></Button>
  </section>
</template>
