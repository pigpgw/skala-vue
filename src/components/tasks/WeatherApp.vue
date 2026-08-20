<script setup>
import { ref } from 'vue'
import { weatherData } from '@/data/weatherData'

const weatherList = ref(weatherData)
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const showDetail = (cityName, status) => window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
</script>

<template>
  <main>
    <div>Weather App</div>

    <div>
      <div>검색할 도시</div>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="도시명을 입력하세요" />
      <div>입력한 도시: {{ searchQuery }}</div>
    </div>

    <div>
      <div>선택 결과</div>
      <div>{{ selectedCityInfo }}</div>
    </div>

    <div class="weather-list">
      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <div>{{ item.name }}</div>
        <div>현재 날씨: {{ item.status }}</div>
        <div>기온: {{ item.temp }}°C</div>
        <div v-if="item.temp >= 25">25도 이상으로 덥습니다.</div>
        <div v-else>25도 미만으로 선선합니다.</div>

        <button @click.stop="showDetail(item.name, item.status)">날씨 자세히 보기</button>
      </div>
    </div>
  </main>
</template>
