<script setup>
defineProps({
  showNationalSummary: {
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
</script>

<template>
  <div v-show="showNationalSummary">
    <div>전국 날씨 통계</div>
    <div>평균 기온: {{ averageTemperature.toFixed(1) }}°C</div>
    <div>평균 습도: {{ averageHumidity.toFixed(1) }}%</div>
    <div>평균 풍속: {{ averageWindSpeed.toFixed(1) }}m/s</div>
    <div>미세먼지 나쁨 도시: {{ badDustCityCount }}개</div>
    <div>가장 더운 도시: {{ hottestCity.name }} {{ hottestCity.temp }}°C</div>
    <div>가장 추운 도시: {{ coldestCity.name }} {{ coldestCity.temp }}°C</div>
    <div>가장 습한 도시: {{ mostHumidCity.name }} {{ mostHumidCity.humidity }}%</div>
    <div>풍속이 가장 강한 도시: {{ strongestWindCity.name }} {{ strongestWindCity.windSpeed }}m/s</div>
  </div>
</template>
