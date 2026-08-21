<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import UnitToggler from '@/components/weather/UnitToggler.vue'
import WeatherHeader from '@/components/weather/WeatherHeader.vue'
</script>

<template>
  <TooltipProvider>
    <div class="min-h-screen bg-muted/30">
      <header class="border-b bg-background">
        <div class="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
          <WeatherHeader />
          <UnitToggler />
        </div>
        <nav class="mx-auto flex max-w-5xl items-center gap-1 px-6 pb-3">
          <Button as-child variant="ghost" size="sm"><RouterLink to="/">날씨 홈</RouterLink></Button>
          <Button as-child variant="ghost" size="sm"><RouterLink to="/about">서비스 소개</RouterLink></Button>
          <Button as-child variant="ghost" size="sm"><RouterLink to="/tips">날씨 생활 팁</RouterLink></Button>
        </nav>
      </header>
      <main class="mx-auto max-w-5xl px-6 py-8">
        <RouterView />
      </main>
    </div>
  </TooltipProvider>
</template>
