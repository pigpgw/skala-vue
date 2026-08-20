<script setup>
import { ref } from 'vue'
import { weatherData } from '@/data/weatherData'

const weatherList = ref(weatherData)
</script>

<template>
  <main>
    <div>Weather App</div>

    <div class="weather-list">
      <div v-for="item in weatherList" :key="item.id" class="weather-card">
        <div>{{ item.name }}</div>
        <div>현재 날씨: {{ item.status }}</div>
        <div>기온: {{ item.temp }}°C</div>
        <div v-if="item.temp >= 25">25도 이상으로 덥습니다.</div>
        <div v-else>25도 미만으로 선선합니다.</div>
      </div>
    </div>
  </main>
</template>
