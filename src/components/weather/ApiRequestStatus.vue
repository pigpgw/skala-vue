<script setup>
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  loadingMessage: {
    type: String,
    default: '정보를 불러오는 중입니다.',
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['retry'])
</script>

<template>
  <Alert v-if="isLoading" class="mb-4 border-primary/30 bg-primary/5" role="status" aria-live="polite">
    <AlertDescription class="flex items-center gap-3 text-primary">
      <Skeleton class="size-4 shrink-0 rounded-full bg-primary/20" />
      {{ loadingMessage }}
    </AlertDescription>
  </Alert>

  <Alert v-else-if="errorMessage" variant="destructive" class="mb-4">
    <AlertDescription class="flex items-center justify-between gap-3 text-destructive">
      <span>{{ errorMessage }}</span>
      <Button type="button" variant="destructive" size="sm" @click="emit('retry')">다시 시도</Button>
    </AlertDescription>
  </Alert>
</template>
