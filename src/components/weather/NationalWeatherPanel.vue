<script setup>
import { computed } from 'vue'

import { Checkbox } from '@/components/ui/checkbox'
import { WEATHER_STATISTICS_DECIMAL_PLACES } from '@/constants/weather'
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
  regionCount: {
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
const displayHottestTemperature = computed(() => convertTemperature(props.hottestCity.temp, configStore.unit).toFixed(WEATHER_STATISTICS_DECIMAL_PLACES))
const displayColdestTemperature = computed(() => convertTemperature(props.coldestCity.temp, configStore.unit).toFixed(WEATHER_STATISTICS_DECIMAL_PLACES))

/** @param {boolean} isChecked */
const handleVisibilityChange = (isChecked) => emit('visibility-change', isChecked)
</script>

<template>
  <label class="flex items-center gap-2 font-medium">
    <Checkbox :model-value="isVisible" @update:model-value="handleVisibilityChange" />
    등록 지역 요약 보기
  </label>

  <div v-show="isVisible" class="mt-4 grid gap-4 text-sm">
    <div class="font-semibold">등록한 지역 {{ regionCount }}곳의 날씨 요약</div>
    <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div class="rounded-lg bg-muted/50 p-3">
        <div class="text-muted-foreground">평균 기온</div>
        <div class="font-medium">{{ displayAverageTemperature.toFixed(WEATHER_STATISTICS_DECIMAL_PLACES) }}{{ configStore.unitSymbol }}</div>
      </div>
      <div class="rounded-lg bg-muted/50 p-3">
        <div class="text-muted-foreground">평균 습도</div>
        <div class="font-medium">{{ averageHumidity.toFixed(WEATHER_STATISTICS_DECIMAL_PLACES) }}%</div>
      </div>
      <div class="rounded-lg bg-muted/50 p-3">
        <div class="text-muted-foreground">평균 풍속</div>
        <div class="font-medium">{{ averageWindSpeed.toFixed(WEATHER_STATISTICS_DECIMAL_PLACES) }}m/s</div>
      </div>
      <div class="rounded-lg bg-muted/50 p-3">
        <div class="text-muted-foreground">미세먼지 나쁨</div>
        <div class="font-medium">{{ badDustCityCount }}개 도시</div>
      </div>
    </div>
    <div class="grid gap-1 text-muted-foreground">
      <div>
        가장 더운 도시: <span class="text-foreground">{{ hottestCity.name }} {{ displayHottestTemperature }}{{ configStore.unitSymbol }}</span>
      </div>
      <div>
        가장 추운 도시: <span class="text-foreground">{{ coldestCity.name }} {{ displayColdestTemperature }}{{ configStore.unitSymbol }}</span>
      </div>
      <div>
        가장 습한 도시: <span class="text-foreground">{{ mostHumidCity.name }} {{ mostHumidCity.humidity }}%</span>
      </div>
      <div>
        풍속이 가장 강한 도시: <span class="text-foreground">{{ strongestWindCity.name }} {{ strongestWindCity.windSpeed.toFixed(WEATHER_STATISTICS_DECIMAL_PLACES) }}m/s</span>
      </div>
    </div>
  </div>
</template>
