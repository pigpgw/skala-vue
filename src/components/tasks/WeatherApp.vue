<script setup>
import { ref } from 'vue'
import { weatherData } from '@/data/weatherData'

const weatherList = ref(weatherData)
const searchQuery = ref('')
</script>

<template>
  <main>
    <div>Weather App</div>

    <div>
      <div>검색할 도시</div>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="도시명을 입력하세요" />
      <div>입력한 도시: {{ searchQuery }}</div>
    </div>

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
