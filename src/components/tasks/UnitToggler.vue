<script setup>
import BaseButton from '@/components/tasks/common/BaseButton.vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>{{ configStore.unit }} {{ configStore.unitSymbol }}</span>
    <BaseButton size="small" @click="configStore.toggleUnit()">섭씨 화씨 변경</BaseButton>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
