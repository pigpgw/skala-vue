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
      </div>
    </div>
  </main>
</template>
