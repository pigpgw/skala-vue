<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="grid gap-3 p-4">
    <h2 class="text-2xl font-bold">날씨 생활 팁</h2>

    <ul class="list-disc pl-5">
      <li>기온이 높은 날에는 물을 자주 마시고 야외 활동을 줄이세요.</li>
      <li>비가 오는 날에는 우산을 준비하고 미끄러운 길을 조심하세요.</li>
      <li>미세먼지가 나쁜 날에는 외출할 때 마스크를 착용하세요.</li>
    </ul>

    <Button as-child variant="link" class="w-fit px-0"><RouterLink to="/">메인 대시보드로 돌아가기</RouterLink></Button>
  </section>
</template>
