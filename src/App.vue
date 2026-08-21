<script setup>
import { RouterLink, RouterView } from 'vue-router'

import UnitToggler from '@/components/tasks/UnitToggler.vue'
import WeatherHeader from '@/components/tasks/WeatherHeader.vue'
</script>

<template>
  <WeatherHeader />
  <div class="navigation-area">
    <nav>
      <RouterLink to="/">날씨 홈</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
      <RouterLink to="/tips">날씨 생활 팁</RouterLink>
    </nav>
    <UnitToggler />
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navigation-area,
nav {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
</style>
