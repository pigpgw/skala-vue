<script setup>
import { Button } from '@/components/ui/button'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="flex items-center gap-2 whitespace-nowrap">
    <span>{{ configStore.unit }} {{ configStore.unitSymbol }}</span>
    <Button size="sm" @click="configStore.toggleUnit()">섭씨 화씨 변경</Button>
  </div>
</template>
