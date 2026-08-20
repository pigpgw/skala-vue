<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="weather-about">
    <h2>Weather App 소개</h2>
    <p>도시별 날씨를 검색하고 상세 기상 정보를 확인할 수 있는 서비스입니다.</p>

    <ul>
      <li>도시별 날씨 검색</li>
      <li>전국 날씨 통계 확인</li>
      <li>도시별 상세 날씨 조회</li>
    </ul>

    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-about {
  padding: 16px;
}
</style>
