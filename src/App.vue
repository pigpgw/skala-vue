<script setup>
import { nextTick, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import UnitToggler from '@/components/weather/UnitToggler.vue'
import WeatherHeader from '@/components/weather/WeatherHeader.vue'

const route = useRoute()
/** @type {import('vue').Ref<HTMLElement | null>} */
const mainContent = ref(null)

const navigationItems = [
  { name: 'WeatherHome', label: '날씨 홈', to: '/' },
  { name: 'WeatherAbout', label: '서비스 소개', to: '/about' },
  { name: 'WeatherTips', label: '날씨 생활 팁', to: '/tips' },
  { name: 'RegionalCode', label: '행정구역 코드', to: '/regions' },
]

/** @param {string} routeName */
const isNavigationActive = (routeName) => route.name === routeName || (routeName === 'WeatherHome' && route.name === 'WeatherDetail')

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    mainContent.value?.focus()
  },
)
</script>

<template>
  <TooltipProvider>
    <div class="min-h-screen bg-muted/30">
      <a href="#main-content" class="sr-only z-50 rounded-md bg-background px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4">본문으로 바로가기</a>
      <header class="border-b bg-background">
        <div class="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
          <WeatherHeader />
          <UnitToggler />
        </div>
        <nav class="mx-auto flex max-w-5xl items-center gap-1 px-6 pb-3" aria-label="주요 메뉴">
          <Button v-for="item in navigationItems" :key="item.name" as-child :variant="isNavigationActive(item.name) ? 'secondary' : 'ghost'" size="sm">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </Button>
        </nav>
      </header>
      <main id="main-content" ref="mainContent" class="mx-auto max-w-5xl px-6 py-8 outline-none" tabindex="-1">
        <RouterView />
      </main>
    </div>
  </TooltipProvider>
</template>
