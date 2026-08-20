<script setup>
import { RouterLink, RouterView } from 'vue-router'

import WeatherHeader from '@/components/tasks/WeatherHeader.vue'
</script>

<template>
  <WeatherHeader />
  <nav>
    <RouterLink to="/">날씨 홈</RouterLink>
    <RouterLink to="/about">서비스 소개</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
