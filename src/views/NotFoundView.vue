<script setup>
import { CircleHelp } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <section class="mx-auto grid max-w-xl gap-4 py-12 text-center">
    <Card class="border-dashed">
      <CardHeader class="items-center">
        <div class="flex size-12 items-center justify-center rounded-full bg-muted"><CircleHelp class="size-6 text-muted-foreground" aria-hidden="true" /></div>
        <CardTitle class="text-2xl">페이지를 찾을 수 없습니다.</CardTitle>
        <CardDescription>요청한 주소가 없거나 이동되었어요. 날씨 홈에서 다시 시작해 주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button as-child><RouterLink to="/">날씨 홈으로 돌아가기</RouterLink></Button>
      </CardContent>
    </Card>
  </section>
</template>
