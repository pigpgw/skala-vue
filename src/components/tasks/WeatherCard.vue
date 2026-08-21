<script setup>
import { computed } from 'vue'

import BaseBadge from '@/components/tasks/common/BaseBadge.vue'
import BaseButton from '@/components/tasks/common/BaseButton.vue'
import { useConfigStore } from '@/stores/configStore'
import { getInsectVariant } from '@/utils/insect'
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

/** @type {import('vue').ComputedRef<'success' | 'warning' | 'danger'>} */
const dustVariant = computed(() => {
  if (props.weatherItem.dust === '나쁨') return 'danger'
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
  <div class="weather-card" @click="handleCardSelect">
    <div>{{ weatherItem.name }}</div>
    <div class="weather-card__badges">
      <BaseBadge size="small">날씨 {{ weatherItem.status }}</BaseBadge>
      <BaseBadge :variant="dustVariant" size="small">미세먼지 {{ weatherItem.dust }}</BaseBadge>
    </div>
    <div>기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</div>
    <div>습도: {{ weatherItem.humidity }}%</div>
    <div>풍속: {{ weatherItem.windSpeed }}m/s</div>

    <div v-if="weatherItem.dust === '나쁨'">외출할 때 마스크를 착용하세요.</div>
    <div v-else-if="weatherItem.dust === '보통'">미세먼지 농도가 보통입니다.</div>
    <div v-else>공기가 깨끗합니다.</div>

    <div v-if="weatherItem.temp >= 25">25도 이상으로 덥습니다.</div>
    <div v-else>25도 미만으로 선선합니다.</div>

    <div class="weather-card__insects">
      <div class="weather-card__insects-title">자주 출몰하는 벌레</div>
      <div class="weather-card__insect-list">
        <BaseBadge
          v-for="insect in weatherItem.insects"
          :key="insect"
          :variant="getInsectVariant(insect)"
          size="small"
        >
          {{ insect }}
        </BaseBadge>
      </div>
    </div>

    <BaseButton @click.stop="handleDetailClick">날씨 자세히 보기</BaseButton>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.weather-card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.weather-card__insects {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-3) 0;
}

.weather-card__insects-title {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.weather-card__insect-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}
</style>
