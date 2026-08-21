<script setup>
import { Bug, CloudRain, Snowflake, ThermometerSun, Wind } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ApiRequestStatus from '@/components/weather/ApiRequestStatus.vue'
import { COLD_SAFETY_THRESHOLD_CELSIUS, HEAT_SAFETY_THRESHOLD_CELSIUS, STRONG_WIND_THRESHOLD_MPS } from '@/constants/weather'
import { useWeatherStore } from '@/stores/weatherStore'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

const weatherStore = useWeatherStore()
const { weatherList, isLoading, errorMessage } = storeToRefs(weatherStore)

/**
 * @param {(weatherItem: WeatherItem) => boolean} predicate
 * @returns {string}
 */
const getRegionNames = (predicate) =>
  weatherList.value
    .filter(predicate)
    .map((weatherItem) => weatherItem.name)
    .join(', ')

const currentRecommendations = computed(() => {
  /** @type {{ title: string, description: string }[]} */
  const recommendations = []
  const hotRegions = getRegionNames((weatherItem) => weatherItem.temp >= HEAT_SAFETY_THRESHOLD_CELSIUS)
  const coldRegions = getRegionNames((weatherItem) => weatherItem.temp <= COLD_SAFETY_THRESHOLD_CELSIUS)
  const rainyRegions = getRegionNames((weatherItem) => ['비', '소나기', '뇌우'].some((keyword) => weatherItem.status.includes(keyword)))
  const dustyRegions = getRegionNames((weatherItem) => weatherItem.dust === '나쁨')
  const windyRegions = getRegionNames((weatherItem) => weatherItem.windSpeed >= STRONG_WIND_THRESHOLD_MPS)
  const insectRegions = getRegionNames((weatherItem) => weatherItem.insects.length > 0)

  if (hotRegions) recommendations.push({ title: '더위 대비', description: `${hotRegions}은 기온이 높습니다. 물을 챙기고 한낮의 장시간 야외 활동은 줄이세요.` })
  if (coldRegions) recommendations.push({ title: '추위 대비', description: `${coldRegions}은 기온이 낮습니다. 겹쳐 입을 옷과 보온용품을 준비하세요.` })
  if (rainyRegions) recommendations.push({ title: '우산 준비', description: `${rainyRegions}에 비가 관측됩니다. 우산을 챙기고 미끄러운 길을 주의하세요.` })
  if (dustyRegions) recommendations.push({ title: '미세먼지 주의', description: `${dustyRegions}의 미세먼지 상태가 나쁩니다. 외출 전 마스크를 준비하고 환기 시간을 조절하세요.` })
  if (windyRegions) recommendations.push({ title: '강풍 주의', description: `${windyRegions}의 바람이 강합니다. 가벼운 야외 물건을 고정하고 이동할 때 주의하세요.` })
  if (insectRegions) recommendations.push({ title: '벌레 대비', description: `${insectRegions}은 벌레가 활동하기 쉬운 기상 조건입니다. 외출 전 기피제와 긴 옷을 준비해 보세요.` })

  return recommendations.length > 0
    ? recommendations
    : [{ title: '큰 주의 조건 없음', description: '현재 등록 지역에는 더위, 추위, 비, 미세먼지 또는 강풍 기준에 해당하는 특별한 주의 조건이 없습니다.' }]
})

onMounted(() => weatherStore.ensureMainCityWeather())
</script>

<template>
  <section class="grid gap-6">
    <div>
      <Badge variant="secondary">Weather Life Guide</Badge>
      <h2 class="mt-3 text-2xl font-bold tracking-tight">날씨 생활 팁</h2>
      <p class="mt-1 text-sm text-muted-foreground">등록된 지역의 현재 날씨를 확인하고 외출 전에 필요한 준비를 챙겨 보세요.</p>
    </div>

    <ApiRequestStatus :is-loading="isLoading" loading-message="생활 팁에 사용할 날씨를 불러오는 중입니다." :error-message="errorMessage" @retry="weatherStore.retryFailedRequest" />

    <div class="grid gap-3">
      <div>
        <h3 class="text-lg font-semibold">지금 확인할 내용</h3>
        <p class="text-sm text-muted-foreground">현재 등록된 지역의 기온, 날씨, 미세먼지, 풍속과 벌레 조건을 기준으로 안내합니다.</p>
      </div>
      <Alert v-for="recommendation in currentRecommendations" :key="recommendation.title">
        <AlertTitle>{{ recommendation.title }}</AlertTitle>
        <AlertDescription>{{ recommendation.description }}</AlertDescription>
      </Alert>
    </div>

    <div>
      <h3 class="text-lg font-semibold">상황별 기본 수칙</h3>
      <p class="mt-1 text-sm text-muted-foreground">날씨가 바뀌었을 때 다시 확인할 수 있는 기본 준비 목록입니다.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <ThermometerSun class="size-6 text-primary" aria-hidden="true" />
          <CardTitle>더운 날</CardTitle>
          <CardDescription>물을 자주 마시고 가장 더운 시간대의 장시간 야외 활동을 피하세요.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">물 · 모자 · 자외선 차단제</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Snowflake class="size-6 text-primary" aria-hidden="true" />
          <CardTitle>추운 날</CardTitle>
          <CardDescription>얇은 옷을 여러 겹 입고 손과 목처럼 노출되는 부위를 따뜻하게 보호하세요.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">겉옷 · 장갑 · 목도리</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CloudRain class="size-6 text-primary" aria-hidden="true" />
          <CardTitle>비 오는 날</CardTitle>
          <CardDescription>우산을 챙기고 젖은 바닥과 차량의 제동 거리를 고려해 여유 있게 이동하세요.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">우산 · 미끄럼 방지 신발</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Wind class="size-6 text-primary" aria-hidden="true" />
          <CardTitle>미세먼지·강풍</CardTitle>
          <CardDescription>대기 상태를 확인해 마스크를 준비하고 강풍에는 야외 물건과 간판 주변을 주의하세요.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">마스크 · 창문과 야외 물건 점검</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Bug class="size-6 text-primary" aria-hidden="true" />
          <CardTitle>벌레가 많은 날</CardTitle>
          <CardDescription>습하고 따뜻한 날에는 기피제를 사용하고 밝은색 긴 옷으로 피부 노출을 줄이세요.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">기피제 · 긴소매 · 방충망 점검</CardContent>
      </Card>
      <Card class="bg-muted/40">
        <CardHeader>
          <CardTitle>출발 전 마지막 확인</CardTitle>
          <CardDescription>목적지의 상세 날씨와 벌레 배지를 확인하면 출몰 조건과 영향을 더 자세히 볼 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as-child><RouterLink to="/">지역 날씨 확인하기</RouterLink></Button>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
