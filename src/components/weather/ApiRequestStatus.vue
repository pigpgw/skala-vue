<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

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
  <div v-if="isLoading" class="api-request-status api-request-status--loading" role="status" aria-live="polite">
    {{ loadingMessage }}
  </div>

  <div v-else-if="errorMessage" class="api-request-status api-request-status--error" role="alert">
    <span>{{ errorMessage }}</span>
    <BaseButton type="button" variant="danger" size="small" @click="emit('retry')">다시 시도</BaseButton>
  </div>
</template>

<style scoped>
.api-request-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border: 1px solid;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.api-request-status--loading {
  border-color: var(--color-primary);
  color: var(--color-primary-hover);
  background: var(--color-primary-soft);
}

.api-request-status--error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  background: var(--color-surface);
}
</style>
