<script setup>
import { Bug, ChartNoAxesCombined, CloudSun, Code2, Database, MapPin, Search } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <section class="grid gap-6">
    <Card class="bg-primary text-primary-foreground">
      <CardHeader class="gap-3">
        <Badge variant="secondary" class="w-fit">Vue Weather Dashboard</Badge>
        <CardTitle class="text-2xl sm:text-3xl">날씨를 확인하고 오늘의 생활 준비까지 한 번에</CardTitle>
        <CardDescription class="max-w-2xl text-primary-foreground/80">
          국내 지역의 현재 날씨와 미세먼지를 조회하고, 기온·습도·풍속에 따라 자주 나타날 수 있는 벌레 정보와 생활 팁을 함께 확인하는 날씨 대시보드입니다.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap gap-2">
        <Button as-child variant="secondary"><RouterLink to="/">날씨 확인하기</RouterLink></Button>
        <Button as-child variant="outline" class="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
          <RouterLink to="/tips">생활 팁 보기</RouterLink>
        </Button>
      </CardContent>
    </Card>

    <div>
      <h2 class="text-2xl font-bold tracking-tight">주요 기능</h2>
      <p class="mt-1 text-sm text-muted-foreground">검색부터 상세 확인까지 실제 사용 흐름에 맞춰 구성했습니다.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Search class="size-5" aria-hidden="true" /></div>
          <CardTitle>국내 지역 검색</CardTitle>
          <CardDescription>지역명을 검색해 좌표를 찾고 현재 날씨 카드를 바로 추가합니다.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><CloudSun class="size-5" aria-hidden="true" /></div>
          <CardTitle>실시간 날씨와 미세먼지</CardTitle>
          <CardDescription>기온, 날씨 상태, 습도, 풍속과 PM2.5 기반 미세먼지 상태를 함께 표시합니다.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><ChartNoAxesCombined class="size-5" aria-hidden="true" /></div>
          <CardTitle>등록 지역 비교</CardTitle>
          <CardDescription>등록한 지역의 평균과 가장 덥거나 습한 지역을 한눈에 비교합니다.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Bug class="size-5" aria-hidden="true" /></div>
          <CardTitle>날씨 기반 벌레 정보</CardTitle>
          <CardDescription>현재 기상 조건에 따라 예상되는 벌레와 출몰 조건, 영향을 확인합니다.</CardDescription>
        </CardHeader>
      </Card>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <Database class="size-5 text-primary" aria-hidden="true" />
            <CardTitle>데이터 출처</CardTitle>
          </div>
          <CardDescription>화면에 필요한 데이터만 DTO로 정의하고 좌표 기반으로 조회합니다.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Badge variant="outline">OpenWeather Current Weather</Badge>
          <Badge variant="outline">OpenWeather Air Pollution</Badge>
          <Badge variant="outline">OpenWeather Geocoding</Badge>
          <Badge variant="outline">국토교통부 지역코드</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <Code2 class="size-5 text-primary" aria-hidden="true" />
            <CardTitle>기술 구성</CardTitle>
          </div>
          <CardDescription>기능과 화면 책임을 나누고 공용 UI를 조합해 구현했습니다.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Badge>Vue 3</Badge>
          <Badge>Pinia</Badge>
          <Badge>Vue Router</Badge>
          <Badge>Axios</Badge>
          <Badge>Tailwind CSS</Badge>
          <Badge>shadcn-vue</Badge>
          <Badge>JSDoc Strict</Badge>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent class="flex flex-col items-start justify-between gap-4 pt-4 sm:flex-row sm:items-center">
        <div class="flex items-start gap-3">
          <MapPin class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <div class="font-semibold">학습 내용을 단계적으로 확장한 프로젝트</div>
            <p class="mt-1 text-sm text-muted-foreground">Mockup에서 시작해 Composition API, Component, Router, Store, 실제 API와 UI Library를 순서대로 적용했습니다.</p>
          </div>
        </div>
        <Button as-child variant="outline" class="shrink-0">
          <a href="https://github.com/pigpgw/skala-vue" target="_blank" rel="noreferrer">GitHub에서 코드 보기</a>
        </Button>
      </CardContent>
    </Card>
  </section>
</template>
