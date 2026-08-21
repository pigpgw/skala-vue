<script setup>
import { Input } from '@/components/ui/input'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  resultCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:model-value'])

/** @param {string | number} value */
const updateFilter = (value) => emit('update:model-value', String(value))
</script>

<template>
  <div class="grid w-full max-w-md gap-2">
    <label for="weather-list-filter" class="text-sm font-medium">등록된 날씨 카드 찾기</label>
    <Input id="weather-list-filter" type="search" :model-value="modelValue" placeholder="등록된 지역명을 입력하세요" @update:model-value="updateFilter" />
    <p class="text-xs text-muted-foreground">표시 중인 카드 {{ resultCount }}개</p>
  </div>
</template>
