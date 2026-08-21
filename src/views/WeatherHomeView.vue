<script setup>
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import ApiRequestStatus from '@/components/weather/ApiRequestStatus.vue'
import CitySearchPanel from '@/components/weather/CitySearchPanel.vue'
import CitySelectionStatusPanel from '@/components/weather/CitySelectionStatusPanel.vue'
import DashboardCard from '@/components/weather/DashboardCard.vue'
import NationalWeatherPanel from '@/components/weather/NationalWeatherPanel.vue'
import WeatherCardList from '@/components/weather/WeatherCardList.vue'
import WeatherListFilter from '@/components/weather/WeatherListFilter.vue'
import { REGION_SEARCH_DEBOUNCE_MS, REGION_SEARCH_MIN_LENGTH } from '@/constants/region'
import { useRegionStore } from '@/stores/regionStore'
import { useWeatherStore } from '@/stores/weatherStore'

/** @typedef {import('@/types/region').Region} Region */

const router = useRouter()
const regionStore = useRegionStore()
const weatherStore = useWeatherStore()
const { regions, isLoading: isRegionLoading, errorMessage: regionErrorMessage } = storeToRefs(regionStore)
const { weatherList, isLoading: isWeatherLoading, errorMessage: weatherErrorMessage } = storeToRefs(weatherStore)

const regionSearchQuery = ref('')
const weatherFilterQuery = ref('')
const isRegionSummaryVisible = ref(true)
const selectionMessage = ref('날씨 카드를 선택하거나 새 지역을 추가해 보세요.')
const selectedWeatherId = ref('')
/** @type {ReturnType<typeof setTimeout> | undefined} */
let regionSearchTimer

const filteredWeatherList = computed(() => weatherList.value.filter((weatherItem) => weatherItem.name.includes(weatherFilterQuery.value.trim())))
const searchResultCount = computed(() => regions.value.length)
const searchStatusMessage = computed(() => {
  const query = regionSearchQuery.value.trim()
  if (!query) return '추가할 지역을 검색해 보세요.'
  if (query.length < REGION_SEARCH_MIN_LENGTH) return `${REGION_SEARCH_MIN_LENGTH}글자 이상 입력해 주세요.`
  if (isRegionLoading.value) return `"${query}" 지역을 검색하고 있습니다.`
  if (regionErrorMessage.value) return '지역 검색에 실패했습니다.'
  if (searchResultCount.value === 0) return `"${query}"와 일치하는 국내 지역이 없습니다.`
  return `"${query}"와 일치하는 국내 지역 ${searchResultCount.value}개를 찾았습니다.`
})

const averageTemperature = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.temp, 0) / weatherList.value.length)
const averageHumidity = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.humidity, 0) / weatherList.value.length)
const averageWindSpeed = computed(() => weatherList.value.reduce((sum, weatherItem) => sum + weatherItem.windSpeed, 0) / weatherList.value.length)
const badDustCityCount = computed(() => weatherList.value.filter((weatherItem) => weatherItem.dust === '나쁨').length)
const hottestCity = computed(() => weatherList.value.reduce((hottest, weatherItem) => (weatherItem.temp > hottest.temp ? weatherItem : hottest)))
const coldestCity = computed(() => weatherList.value.reduce((coldest, weatherItem) => (weatherItem.temp < coldest.temp ? weatherItem : coldest)))
const mostHumidCity = computed(() => weatherList.value.reduce((mostHumid, weatherItem) => (weatherItem.humidity > mostHumid.humidity ? weatherItem : mostHumid)))
const strongestWindCity = computed(() => weatherList.value.reduce((strongestWind, weatherItem) => (weatherItem.windSpeed > strongestWind.windSpeed ? weatherItem : strongestWind)))

/** @param {string} query */
const updateRegionSearchQuery = (query) => (regionSearchQuery.value = query)
/** @param {string} query */
const updateWeatherFilterQuery = (query) => (weatherFilterQuery.value = query)
/** @param {boolean} isVisible */
const updateRegionSummaryVisibility = (isVisible) => (isRegionSummaryVisible.value = isVisible)
/**
 * @param {string} message
 * @param {string} cityId
 */
const updateSelection = (message, cityId) => {
  selectionMessage.value = message
  selectedWeatherId.value = cityId
}
/** @param {string} cityId */
const navigateToWeatherDetail = (cityId) => router.push('/weather/' + cityId)
const retryRegionSearch = () => regionStore.searchRegions(regionSearchQuery.value)
/** @param {Region} region */
const selectRegion = async (region) => {
  if (isWeatherLoading.value) return
  selectionMessage.value = `${region.name} 날씨를 불러오는 중입니다.`
  const weatherItem = await weatherStore.fetchWeatherByRegion(region)

  if (!weatherItem) {
    selectionMessage.value = `${region.name} 날씨를 불러오지 못했습니다.`
    return
  }

  regionSearchQuery.value = ''
  regionStore.clearSearchResults()
  weatherFilterQuery.value = ''
  selectedWeatherId.value = weatherItem.id
  selectionMessage.value = `${region.name} 날씨를 추가했습니다.`

  await nextTick()
  document.getElementById(`weather-card-${weatherItem.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

onMounted(() => {
  weatherStore.ensureMainCityWeather()
})

onBeforeUnmount(() => clearTimeout(regionSearchTimer))

watch(regionSearchQuery, (query) => {
  clearTimeout(regionSearchTimer)
  regionStore.clearSearchResults()

  if (query.trim().length < REGION_SEARCH_MIN_LENGTH) return

  regionSearchTimer = setTimeout(() => regionStore.searchRegions(query), REGION_SEARCH_DEBOUNCE_MS)
})

watch(searchResultCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 결과 개수가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(searchStatusMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 검색 상태가 변경되었습니다. ${oldValue} -> ${newValue}`))
watch(isRegionSummaryVisible, (newValue) => console.log(`[watch 자동 호출] 등록 지역 요약 표시 여부가 변경되었습니다. ${newValue}`))
watch(averageTemperature, (newValue, oldValue) => console.log(`[watch 자동 호출] 등록 지역 평균 기온이 변경되었습니다. ${oldValue}°C -> ${newValue}°C`))
watch(averageHumidity, (newValue, oldValue) => console.log(`[watch 자동 호출] 등록 지역 평균 습도가 변경되었습니다. ${oldValue}% -> ${newValue}%`))
watch(averageWindSpeed, (newValue, oldValue) => console.log(`[watch 자동 호출] 등록 지역 평균 풍속이 변경되었습니다. ${oldValue}m/s -> ${newValue}m/s`))
watch(badDustCityCount, (newValue, oldValue) => console.log(`[watch 자동 호출] 미세먼지 나쁨 도시가 변경되었습니다. ${oldValue}개 -> ${newValue}개`))
watch(hottestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 더운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(coldestCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 추운 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(mostHumidCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 가장 습한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(strongestWindCity, (newValue, oldValue) => console.log(`[watch 자동 호출] 풍속이 가장 강한 도시가 변경되었습니다. ${oldValue.name} -> ${newValue.name}`))
watch(selectionMessage, (newValue, oldValue) => console.log(`[watch 자동 호출] 상태 바 문구가 업데이트 되었습니다. ${oldValue} -> ${newValue}`))

watchEffect(() => console.log(`[watchEffect 자동 호출] 현재 지역 검색어 ${regionSearchQuery.value}`))
</script>

<template>
  <div class="grid gap-4">
    <ApiRequestStatus :is-loading="isWeatherLoading" loading-message="날씨 정보를 불러오는 중입니다." :error-message="weatherErrorMessage" @retry="weatherStore.retryFailedRequest" />
    <DashboardCard>
      <CitySearchPanel
        :search-query="regionSearchQuery"
        :search-result-count="searchResultCount"
        :search-status-message="searchStatusMessage"
        :regions="regions"
        :disabled="isWeatherLoading"
        :is-searching="isRegionLoading"
        :error-message="regionErrorMessage"
        @update-query="updateRegionSearchQuery"
        @select-region="selectRegion"
        @retry-search="retryRegionSearch"
      />
    </DashboardCard>
    <DashboardCard>
      <NationalWeatherPanel
        :is-visible="isRegionSummaryVisible"
        :average-temperature="averageTemperature"
        :average-humidity="averageHumidity"
        :average-wind-speed="averageWindSpeed"
        :bad-dust-city-count="badDustCityCount"
        :region-count="weatherList.length"
        :hottest-city="hottestCity"
        :coldest-city="coldestCity"
        :most-humid-city="mostHumidCity"
        :strongest-wind-city="strongestWindCity"
        @visibility-change="updateRegionSummaryVisibility"
      />
    </DashboardCard>
    <DashboardCard>
      <CitySelectionStatusPanel :message="selectionMessage" />
    </DashboardCard>
    <DashboardCard>
      <WeatherListFilter :model-value="weatherFilterQuery" :result-count="filteredWeatherList.length" @update:model-value="updateWeatherFilterQuery" />
    </DashboardCard>
    <WeatherCardList :weather-list="filteredWeatherList" :selected-id="selectedWeatherId" @select-card="updateSelection" @click-detail="navigateToWeatherDetail" />
  </div>
</template>
