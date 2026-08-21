<script setup>
import WeatherCard from '@/components/weather/WeatherCard.vue'

/** @typedef {import('@/types/weather').WeatherItem} WeatherItem */

defineProps({
  weatherList: {
    type: /** @type {import('vue').PropType<WeatherItem[]>} */ (Array),
    required: true,
  },
  selectedId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

/**
 * @param {string} message
 * @param {string} cityId
 */
const handleCardSelect = (message, cityId) => emit('select-card', message, cityId)
/** @param {string} cityId */
const handleDetailClick = (cityId) => emit('click-detail', cityId)
</script>

<template>
  <div v-if="weatherList.length > 0" class="grid gap-4 md:grid-cols-2">
    <div
      v-for="weatherItem in weatherList"
      :id="`weather-card-${weatherItem.id}`"
      :key="weatherItem.id"
      class="scroll-mt-4 rounded-xl transition-shadow"
      :class="weatherItem.id === selectedId ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''"
    >
      <WeatherCard :weather-item="weatherItem" :selected="weatherItem.id === selectedId" @select-card="handleCardSelect" @click-detail="handleDetailClick" />
    </div>
  </div>
  <div v-else class="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">등록된 날씨 카드 중 일치하는 지역이 없습니다.</div>
</template>
