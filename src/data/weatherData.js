import { insectData } from '@/data/insectData'

export const weatherData = [
  {
    id: '5f317145-21e8-433e-a78d-24c2eb08d614',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 58,
    windSpeed: 2.4,
    dust: '보통',
    insects: [insectData.mosquito, insectData.loveBug, insectData.cicada, insectData.moth],
  },
  {
    id: '3b554f98-c212-458f-a33c-b753bf8a369e',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 82,
    windSpeed: 3.1,
    dust: '좋음',
    insects: [insectData.mosquito, insectData.fruitFly, insectData.dragonfly, insectData.chiggerMite],
  },
  {
    id: 'fa9ac620-3636-4261-8122-6e269653d711',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 71,
    windSpeed: 5.6,
    dust: '나쁨',
    insects: [insectData.loveBug, insectData.fruitFly, insectData.cicada, insectData.moth],
  },
  {
    id: '43213133-2d65-4706-8426-0f7e4d739070',
    name: '제주',
    temp: 23,
    status: '흐림',
    humidity: 76,
    windSpeed: 6.2,
    dust: '좋음',
    insects: [insectData.mosquito, insectData.fruitFly, insectData.dragonfly, insectData.chiggerMite, insectData.moth],
  },
]
