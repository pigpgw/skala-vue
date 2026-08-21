<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="grid gap-3 p-4">
    <h2 class="text-2xl font-bold">페이지를 찾을 수 없습니다.</h2>
    <p class="text-muted-foreground">요청한 주소가 존재하지 않습니다.</p>
    <Button as-child variant="link" class="w-fit px-0"><RouterLink to="/">메인 대시보드로 돌아가기</RouterLink></Button>
  </section>
</template>
