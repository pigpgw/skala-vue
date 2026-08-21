<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import InsectConditionBadge from '@/components/weather/InsectConditionBadge.vue'
import { WEATHER_STATISTICS_DECIMAL_PLACES } from '@/constants/weather'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { formatTemperature } from '@/utils/temperature'

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
/** @type {import('vue').Ref<import('@/types/weather').WeatherItem | null>} */
const cityData = ref(null)
const isLoading = ref(true)

const displayTemperature = computed(() => {
  const rawTemperature = cityData.value?.temp
  if (typeof rawTemperature !== 'number') return null
  return formatTemperature(rawTemperature, configStore.unit)
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
  <section class="grid gap-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">지역별 상세 날씨</h2>
      <p class="mt-1 text-sm text-muted-foreground">선택한 지역의 현재 기상 정보와 출몰 예상 벌레를 확인하세요.</p>
    </div>

    <div v-if="isLoading" role="status" aria-live="polite">
      <Card>
        <CardHeader>
          <Skeleton class="h-6 w-32" />
          <Skeleton class="h-4 w-56" />
        </CardHeader>
        <CardContent class="grid gap-3">
          <Skeleton class="h-20 w-full" />
          <span class="sr-only">상세 날씨를 불러오는 중입니다.</span>
        </CardContent>
      </Card>
    </div>
    <Card v-else-if="cityData">
      <CardHeader>
        <CardTitle>{{ cityData.name }}</CardTitle>
        <CardDescription>현재 관측된 날씨 정보입니다.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-5">
        <div class="flex flex-wrap gap-2">
          <Badge>기온 {{ displayTemperature }}{{ configStore.unitSymbol }}</Badge>
          <Badge variant="secondary">날씨 {{ cityData.status }}</Badge>
          <Badge variant="outline">미세먼지 {{ cityData.dust }}</Badge>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="rounded-lg bg-muted/50 p-3">
            <div class="text-muted-foreground">습도</div>
            <div class="mt-1 font-medium">{{ cityData.humidity }}%</div>
          </div>
          <div class="rounded-lg bg-muted/50 p-3">
            <div class="text-muted-foreground">풍속</div>
            <div class="mt-1 font-medium">{{ cityData.windSpeed.toFixed(WEATHER_STATISTICS_DECIMAL_PLACES) }}m/s</div>
          </div>
        </div>
        <div>
          <h3 class="mb-2 font-semibold">자주 출몰하는 벌레</h3>
          <div class="flex flex-wrap gap-2">
            <InsectConditionBadge v-for="insect in cityData.insects" :key="insect.id" :insect="insect" />
            <span v-if="cityData.insects.length === 0" class="text-sm text-muted-foreground">현재 조건에 해당하는 벌레 정보가 없습니다.</span>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card v-else class="border-dashed">
      <CardHeader>
        <CardTitle>날씨 정보를 찾을 수 없습니다.</CardTitle>
        <CardDescription>주소를 다시 확인하거나 홈에서 지역을 검색해 주세요.</CardDescription>
      </CardHeader>
    </Card>

    <Button as-child variant="outline" class="w-fit"><RouterLink to="/">날씨 홈으로 돌아가기</RouterLink></Button>
  </section>
</template>
