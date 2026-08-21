<script setup>
import { computed } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import InsectConditionBadge from '@/components/weather/InsectConditionBadge.vue'
import { HOT_WEATHER_THRESHOLD_CELSIUS } from '@/constants/weather'
import { useConfigStore } from '@/stores/configStore'
import { convertTemperature } from '@/utils/temperature'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

const props = defineProps({
  weatherItem: {
    type: /** @type {import('vue').PropType<WeatherItem>} */ (Object),
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()

const displayTemperature = computed(() => convertTemperature(props.weatherItem.temp, configStore.unit))

/** @type {import('vue').ComputedRef<'default' | 'success' | 'warning' | 'destructive'>} */
const dustVariant = computed(() => {
  if (props.weatherItem.dust === '정보 없음') return 'default'
  if (props.weatherItem.dust === '나쁨') return 'destructive'
  if (props.weatherItem.dust === '보통') return 'warning'
  return 'success'
})

const handleCardSelect = () => {
  emit('select-card', `${props.weatherItem.name}이 선택되었습니다.`)
}

const handleDetailClick = () => {
  emit('click-detail', props.weatherItem.id)
}
</script>

<template>
  <Card class="cursor-pointer transition-shadow hover:shadow-md" @click="handleCardSelect">
    <CardHeader>
      <div class="flex items-start justify-between gap-3">
        <CardTitle>{{ weatherItem.name }}</CardTitle>
        <div class="text-2xl font-semibold tracking-tight">{{ displayTemperature }}{{ configStore.unitSymbol }}</div>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge variant="secondary">날씨 {{ weatherItem.status }}</Badge>
        <Badge :variant="dustVariant">미세먼지 {{ weatherItem.dust }}</Badge>
      </div>
    </CardHeader>

    <CardContent class="grid gap-4">
      <div class="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-sm">
        <div>
          <div class="text-muted-foreground">습도</div>
          <div class="font-medium">{{ weatherItem.humidity }}%</div>
        </div>
        <div>
          <div class="text-muted-foreground">풍속</div>
          <div class="font-medium">{{ weatherItem.windSpeed }}m/s</div>
        </div>
      </div>

      <div class="grid gap-1 text-sm text-muted-foreground">
        <div v-if="weatherItem.dust === '정보 없음'">미세먼지 정보를 준비 중입니다.</div>
        <div v-else-if="weatherItem.dust === '나쁨'">외출할 때 마스크를 착용하세요.</div>
        <div v-else-if="weatherItem.dust === '보통'">미세먼지 농도가 보통입니다.</div>
        <div v-else>공기가 깨끗합니다.</div>
        <div v-if="weatherItem.temp >= HOT_WEATHER_THRESHOLD_CELSIUS">{{ HOT_WEATHER_THRESHOLD_CELSIUS }}도 이상으로 덥습니다.</div>
        <div v-else>{{ HOT_WEATHER_THRESHOLD_CELSIUS }}도 미만으로 선선합니다.</div>
      </div>

      <div class="grid gap-2">
        <div class="text-sm font-medium">자주 출몰하는 벌레</div>
        <div v-if="weatherItem.insects.length > 0" class="flex flex-wrap gap-1">
          <InsectConditionBadge
            v-for="insect in weatherItem.insects"
            :key="insect.id"
            :insect="insect"
          />
        </div>
        <div v-else class="text-sm text-muted-foreground">벌레 정보를 준비 중입니다.</div>
      </div>
    </CardContent>

    <CardFooter>
      <Button class="w-full" @click.stop="handleDetailClick">날씨 자세히 보기</Button>
    </CardFooter>
  </Card>
</template>
