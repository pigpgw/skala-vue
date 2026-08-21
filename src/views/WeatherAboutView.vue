<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="grid gap-3 p-4">
    <h2 class="text-2xl font-bold">Weather App 소개</h2>
    <p>도시별 날씨를 검색하고 상세 기상 정보를 확인할 수 있는 서비스입니다.</p>

    <ul class="list-disc pl-5">
      <li>도시별 날씨 검색</li>
      <li>전국 날씨 통계 확인</li>
      <li>도시별 상세 날씨 조회</li>
    </ul>

    <Button as-child variant="link" class="w-fit px-0"><RouterLink to="/">메인 대시보드로 돌아가기</RouterLink></Button>
  </section>
</template>
