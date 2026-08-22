import { createRouter, createWebHistory } from 'vue-router'

import WeatherHomeView from '@/views/WeatherHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('@/views/WeatherAboutView.vue'),
  },
  {
    path: '/tips',
    name: 'WeatherTips',
    component: () => import('@/views/WeatherTipsView.vue'),
  },
  {
    path: '/regions',
    name: 'RegionalCode',
    component: () => import('@/views/RegionalCodeView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('@/views/WeatherDetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
