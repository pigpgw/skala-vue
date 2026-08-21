<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="weather-tips">
    <h2>날씨 생활 팁</h2>

    <ul>
      <li>기온이 높은 날에는 물을 자주 마시고 야외 활동을 줄이세요.</li>
      <li>비가 오는 날에는 우산을 준비하고 미끄러운 길을 조심하세요.</li>
      <li>미세먼지가 나쁜 날에는 외출할 때 마스크를 착용하세요.</li>
    </ul>

    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-tips {
  padding: var(--space-4);
}
</style>
