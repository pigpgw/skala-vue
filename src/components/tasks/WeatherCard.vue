<script setup>
/**
 * @typedef {Object} WeatherItem
 * @property {string} id
 * @property {string} name
 * @property {string} status
 * @property {number} temp
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} dust
 */

const emit = defineEmits(['select-card', 'click-detail'])

defineProps({
  item: {
    type: /** @type {import('vue').PropType<WeatherItem>} */ (Object),
    required: true,
  },
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${item.name}이 선택되었습니다.`)">
    <div>{{ item.name }}</div>
    <div>현재 날씨: {{ item.status }}</div>
    <div>기온: {{ item.temp }}°C</div>
    <div>습도: {{ item.humidity }}%</div>
    <div>풍속: {{ item.windSpeed }}m/s</div>
    <div>미세먼지: {{ item.dust }}</div>

    <div v-if="item.dust === '나쁨'">외출할 때 마스크를 착용하세요.</div>
    <div v-else-if="item.dust === '보통'">미세먼지 농도가 보통입니다.</div>
    <div v-else>공기가 깨끗합니다.</div>

    <div v-if="item.temp >= 25">25도 이상으로 덥습니다.</div>
    <div v-else>25도 미만으로 선선합니다.</div>

    <button @click.stop="emit('click-detail', item.name, item.status)">날씨 자세히 보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid #e5e7eb;
}
</style>
