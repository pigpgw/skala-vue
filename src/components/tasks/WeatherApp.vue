<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { weatherData } from '@/data/weatherData'

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const weatherList = ref(weatherData)
const showNationalSummary = ref(true)

const filteredWeatherList = computed(() => weatherList.value.filter((item) => item.name.includes(searchQuery.value.trim())))
const searchResultCount = computed(() => filteredWeatherList.value.length)
const averageTemperature = computed(() => (weatherList.value.reduce((sum, item) => sum + item.temp, 0) / weatherList.value.length).toFixed(1))
const averageHumidity = computed(() => (weatherList.value.reduce((sum, item) => sum + item.humidity, 0) / weatherList.value.length).toFixed(1))
const averageWindSpeed = computed(() => (weatherList.value.reduce((sum, item) => sum + item.windSpeed, 0) / weatherList.value.length).toFixed(1))
const badDustCityCount = computed(() => weatherList.value.filter((item) => item.dust === '나쁨').length)
const hottestCity = computed(() => weatherList.value.reduce((hottest, item) => (item.temp > hottest.temp ? item : hottest)))
const coldestCity = computed(() => weatherList.value.reduce((coldest, item) => (item.temp < coldest.temp ? item : coldest)))
const mostHumidCity = computed(() => weatherList.value.reduce((mostHumid, item) => (item.humidity > mostHumid.humidity ? item : mostHumid)))
const strongestWindCity = computed(() =>
  weatherList.value.reduce((strongestWind, item) => (item.windSpeed > strongestWind.windSpeed ? item : strongestWind)),
)

const showDetail = (cityName, status) => window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)

watch(selectedCityInfo, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 상태 바 문구가 업데이트 되었습니다. ${oldValue} -> ${newValue}`),
)
watch(showNationalSummary, (newValue) => console.log(`[watch 자동 호출] 전국 통계 표시 여부가 변경되었습니다. ${newValue}`))
watch(searchResultCount, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 검색 결과 개수가 변경되었습니다. ${oldValue}개 -> ${newValue}개`),
)
watch(averageTemperature, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 전국 평균 기온이 변경되었습니다. ${oldValue}°C -> ${newValue}°C`),
)
watch(averageHumidity, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 전국 평균 습도가 변경되었습니다. ${oldValue}% -> ${newValue}%`),
)
watch(averageWindSpeed, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 전국 평균 풍속이 변경되었습니다. ${oldValue}m/s -> ${newValue}m/s`),
)
watch(badDustCityCount, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 미세먼지 나쁨 도시가 변경되었습니다. ${oldValue}개 -> ${newValue}개`),
)
watch(hottestCity, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 가장 더운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`),
)
watch(coldestCity, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 가장 추운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`),
)
watch(mostHumidCity, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 가장 습한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`),
)
watch(strongestWindCity, (newValue, oldValue) =>
  console.log(`[watch 자동 호출] 풍속이 가장 강한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`),
)

watchEffect(() => console.log(`[watchEffect 자동 호출] 현재 검색어 ${searchQuery.value}`))
</script>

<template>
  <main>
    <div>Weather App</div>

    <div>
      <div>검색할 도시</div>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="도시명을 입력하세요" />
      <div>입력한 도시: {{ searchQuery }}</div>
      <div>검색 결과: {{ searchResultCount }}개</div>
      <label><input type="checkbox" v-model="showNationalSummary" /> 전국 통계 보기</label>
    </div>

    <div v-show="showNationalSummary">
      <div>전국 날씨 통계</div>
      <div>평균 기온: {{ averageTemperature }}°C</div>
      <div>평균 습도: {{ averageHumidity }}%</div>
      <div>평균 풍속: {{ averageWindSpeed }}m/s</div>
      <div>미세먼지 나쁨 도시: {{ badDustCityCount }}개</div>
      <div>가장 더운 도시: {{ hottestCity.name }} {{ hottestCity.temp }}°C</div>
      <div>가장 추운 도시: {{ coldestCity.name }} {{ coldestCity.temp }}°C</div>
      <div>가장 습한 도시: {{ mostHumidCity.name }} {{ mostHumidCity.humidity }}%</div>
      <div>풍속이 가장 강한 도시: {{ strongestWindCity.name }} {{ strongestWindCity.windSpeed }}m/s</div>
    </div>

    <div>
      <div>선택 결과</div>
      <div>{{ selectedCityInfo }}</div>
    </div>

    <div v-if="filteredWeatherList.length > 0" class="weather-list">
      <div
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
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

        <button @click.stop="showDetail(item.name, item.status)">날씨 자세히 보기</button>
      </div>
    </div>
    <div v-else>검색 결과와 일치하는 도시가 없습니다.</div>
  </main>
</template>

<style scoped>
.weather-list {
  border: 1px solid #dcdfe6;
}

.weather-card {
  border: 1px solid #e5e7eb;
}
</style>
