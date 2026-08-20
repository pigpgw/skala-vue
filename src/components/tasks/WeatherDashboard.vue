<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { weatherData } from '@/data/weatherData'
import DashboardCard from './DashboardCard.vue'
import CitySearchPanel from './CitySearchPanel.vue'
import NationalWeatherPanel from './NationalWeatherPanel.vue'
import CitySelectionStatusPanel from './CitySelectionStatusPanel.vue'
import WeatherCardList from './WeatherCardList.vue'

const searchQuery = ref('')
const selectionMessage = ref('카드를 클릭하거나 검색해 보세요.')
const weatherList = ref(weatherData)
const isNationalSummaryVisible = ref(true)

const filteredWeatherList = computed(() => weatherList.value.filter((weatherItem) => weatherItem.name.includes(searchQuery.value.trim())))
const searchResultCount = computed(() => filteredWeatherList.value.length)
const averageTemperature = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.temp, 0) / weatherList.value.length)
const averageHumidity = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.humidity, 0) / weatherList.value.length)
const averageWindSpeed = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.windSpeed, 0) / weatherList.value.length)
const badDustCityCount = computed(() => weatherList.value.filter((weatherItem) => weatherItem.dust === '나쁨').length)
const hottestCity = computed(() => weatherList.value.reduce((hottest, weatherItem) => (weatherItem.temp > hottest.temp ? weatherItem : hottest)))
const coldestCity = computed(() => weatherList.value.reduce((coldest, weatherItem) => (weatherItem.temp < coldest.temp ? weatherItem : coldest)))
const mostHumidCity = computed(() => weatherList.value.reduce((mostHumid, weatherItem) => (weatherItem.humidity > mostHumid.humidity ? weatherItem : mostHumid)))
const strongestWindCity = computed(() => weatherList.value.reduce((strongestWind, weatherItem) => (weatherItem.windSpeed > strongestWind.windSpeed ? weatherItem : strongestWind)))
const searchStatusMessage = computed(() =>
  searchQuery.value.trim() ? `"${searchQuery.value.trim()}" 검색 결과 ${searchResultCount.value}개를 표시하고 있습니다.` : `전체 도시 ${searchResultCount.value}개를 표시하고 있습니다.`,
)

/** @param {string} cityName @param {string} status */
const showWeatherDetail = (cityName, status) => window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)

watch(selectionMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 상태 바 문구가 업데이트 되었습니다. ${oldValue} -> ${newValue}`))
watch(isNationalSummaryVisible, (newValue) => console.log(`[watch 자동 호출] 전국 통계 표시 여부가 변경되었습니다. ${newValue}`))
watch(searchResultCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 결과 개수가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(averageTemperature, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 기온이 변경되었습니다. ${oldValue}°C -> ${newValue}°C`))
watch(averageHumidity, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 습도가 변경되었습니다. ${oldValue}% -> ${newValue}%`))
watch(averageWindSpeed, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 풍속이 변경되었습니다. ${oldValue}m/s -> ${newValue}m/s`))
watch(badDustCityCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 미세먼지 나쁨 도시가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(hottestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 더운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(coldestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 추운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(mostHumidCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 습한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(strongestWindCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 풍속이 가장 강한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(searchStatusMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 상태가 변경되었습니다. ${oldValue} -> ${newValue}`))

watchEffect(() => console.log(`[watchEffect 자동 호출] 현재 검색어 ${searchQuery.value}`))
</script>

<template>
  <div class="weather-dashboard">
    <DashboardCard>
      <CitySearchPanel
        :search-query="searchQuery"
        :search-result-count="searchResultCount"
        :search-status-message="searchStatusMessage"
        @update-query="searchQuery = $event"
      />
    </DashboardCard>

    <DashboardCard>
      <NationalWeatherPanel
        :is-visible="isNationalSummaryVisible"
        :average-temperature="averageTemperature"
        :average-humidity="averageHumidity"
        :average-wind-speed="averageWindSpeed"
        :bad-dust-city-count="badDustCityCount"
        :hottest-city="hottestCity"
        :coldest-city="coldestCity"
        :most-humid-city="mostHumidCity"
        :strongest-wind-city="strongestWindCity"
        @visibility-change="isNationalSummaryVisible = $event"
      />
    </DashboardCard>

    <DashboardCard>
      <CitySelectionStatusPanel :message="selectionMessage" />
    </DashboardCard>

    <DashboardCard>
      <WeatherCardList
        :weather-list="filteredWeatherList"
        @select-card="selectionMessage = $event"
        @click-detail="showWeatherDetail"
      />
    </DashboardCard>
  </div>
</template>

<style scoped>
.weather-dashboard {
  padding: 16px;
}
</style>
