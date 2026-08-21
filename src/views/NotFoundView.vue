<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청한 주소가 존재하지 않습니다.</p>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  padding: var(--space-4);
}
</style>
