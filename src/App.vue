<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import UnitToggler from '@/components/weather/UnitToggler.vue'
import WeatherHeader from '@/components/weather/WeatherHeader.vue'
</script>

<template>
  <TooltipProvider>
    <WeatherHeader />
    <div class="flex w-full items-center gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <nav class="flex shrink-0 items-center gap-1">
        <Button as-child variant="link" size="sm"><RouterLink to="/">날씨 홈</RouterLink></Button>
        <Button as-child variant="link" size="sm"><RouterLink to="/about">서비스 소개</RouterLink></Button>
        <Button as-child variant="link" size="sm"><RouterLink to="/tips">날씨 생활 팁</RouterLink></Button>
      </nav>
      <UnitToggler />
    </div>
    <main>
      <RouterView />
    </main>
  </TooltipProvider>
</template>
