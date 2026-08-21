<script setup>
/** @typedef {import('@/types/region').Region} Region */
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import DashboardCard from '@/components/weather/DashboardCard.vue'

import ApiRequestStatus from '@/components/weather/ApiRequestStatus.vue'
import CitySearchPanel from '@/components/weather/CitySearchPanel.vue'
import CitySelectionStatusPanel from '@/components/weather/CitySelectionStatusPanel.vue'
import NationalWeatherPanel from '@/components/weather/NationalWeatherPanel.vue'
import WeatherCardList from '@/components/weather/WeatherCardList.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { useRegionStore } from '@/stores/regionStore'

const router = useRouter()
const regionStore = useRegionStore()
const weatherStore = useWeatherStore()
const { weatherList, isLoading: isWeatherLoading, errorMessage: weatherErrorMessage } = storeToRefs(weatherStore)
const { regions, isLoading: isRegionLoading, errorMessage: regionErrorMessage } = storeToRefs(regionStore)

onMounted(() => {
  regionStore.fetchRegions()
  weatherStore.fetchMainCityDatasById()
})

const searchQuery = ref('')
const isNationalSummaryVisible = ref(true)
const selectionMessage = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => weatherList.value.filter((weatherItem) => weatherItem.name.includes(searchQuery.value.trim())))
const filteredRegions = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return []
  return regions.value.filter((region) => region.name.includes(query)).slice(0, 10)
})
const searchResultCount = computed(() => filteredRegions.value.length)
const searchStatusMessage = computed(() =>
  searchQuery.value.trim() ? `"${searchQuery.value.trim()}" 검색 결과 ${searchResultCount.value}개를 표시하고 있습니다.` : '도시명을 입력하면 지역 검색 결과가 표시됩니다.',
)

const averageTemperature = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.temp, 0) / weatherList.value.length)
const averageHumidity = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.humidity, 0) / weatherList.value.length)
const averageWindSpeed = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.windSpeed, 0) / weatherList.value.length)
const badDustCityCount = computed(() => weatherList.value.filter((weatherItem) => weatherItem.dust === '나쁨').length)
const hottestCity = computed(() => weatherList.value.reduce((hottest, weatherItem) => (weatherItem.temp > hottest.temp ? weatherItem : hottest)))
const coldestCity = computed(() => weatherList.value.reduce((coldest, weatherItem) => (weatherItem.temp < coldest.temp ? weatherItem : coldest)))
const mostHumidCity = computed(() => weatherList.value.reduce((mostHumid, weatherItem) => (weatherItem.humidity > mostHumid.humidity ? weatherItem : mostHumid)))
const strongestWindCity = computed(() => weatherList.value.reduce((strongestWind, weatherItem) => (weatherItem.windSpeed > strongestWind.windSpeed ? weatherItem : strongestWind)))

/** @param {string} query */
const updateSearchQuery = (query) => (searchQuery.value = query)
/** @param {boolean} isVisible */
const updateNationalSummaryVisibility = (isVisible) => (isNationalSummaryVisible.value = isVisible)
/** @param {string} message */
const updateSelectionMessage = (message) => (selectionMessage.value = message)
/** @param {string} cityId */
const navigateToWeatherDetail = (cityId) => router.push('/weather/' + cityId)
/** @param {Region} region */
const selectRegion = async (region) => {
  if (isWeatherLoading.value) return
  selectionMessage.value = `${region.name} 날씨를 불러오는 중입니다.`
  const weatherItem = await weatherStore.fetchWeatherByRegion(region)

  if (!weatherItem) {
    selectionMessage.value = `${region.name} 날씨를 불러오지 못했습니다.`
    return
  }

  searchQuery.value = ''
  selectionMessage.value = `${region.name} 날씨를 추가했습니다.`
}

watch(searchResultCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 결과 개수가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(searchStatusMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 상태가 변경되었습니다. ${oldValue} -> ${newValue}`))
watch(isNationalSummaryVisible, (newValue) => console.log(`[watch 자동 호출] 전국 통계 표시 여부가 변경되었습니다. ${newValue}`))
watch(averageTemperature, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 기온이 변경되었습니다. ${oldValue}°C -> ${newValue}°C`))
watch(averageHumidity, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 습도가 변경되었습니다. ${oldValue}% -> ${newValue}%`))
watch(averageWindSpeed, (newValue, oldValue) => console.log(`[watch 자동 호출] 전국 평균 풍속이 변경되었습니다. ${oldValue}m/s -> ${newValue}m/s`))
watch(badDustCityCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 미세먼지 나쁨 도시가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(hottestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 더운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(coldestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 추운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(mostHumidCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 습한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(strongestWindCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 풍속이 가장 강한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(selectionMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 상태 바 문구가 업데이트 되었습니다. ${oldValue} -> ${newValue}`))

watchEffect(() => console.log(`[watchEffect 자동 호출] 현재 검색어 ${searchQuery.value}`))
</script>

<template>
  <div class="p-4">
    <ApiRequestStatus
      :is-loading="isRegionLoading"
      loading-message="지역 검색 목록을 불러오는 중입니다."
      :error-message="regionErrorMessage"
      @retry="regionStore.fetchRegions"
    />

    <ApiRequestStatus
      :is-loading="isWeatherLoading"
      loading-message="날씨 정보를 불러오는 중입니다."
      :error-message="weatherErrorMessage"
      @retry="weatherStore.retryFailedRequest"
    />

    <DashboardCard>
      <CitySearchPanel
        :search-query="searchQuery"
        :search-result-count="searchResultCount"
        :search-status-message="searchStatusMessage"
        :regions="filteredRegions"
        :disabled="isWeatherLoading || isRegionLoading"
        @update-query="updateSearchQuery"
        @select-region="selectRegion"
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
        @visibility-change="updateNationalSummaryVisibility"
      />
    </DashboardCard>

    <DashboardCard>
      <CitySelectionStatusPanel :message="selectionMessage" />
    </DashboardCard>

    <DashboardCard>
      <WeatherCardList :weather-list="filteredWeatherList" @select-card="updateSelectionMessage" @click-detail="navigateToWeatherDetail" />
    </DashboardCard>
  </div>
</template>
