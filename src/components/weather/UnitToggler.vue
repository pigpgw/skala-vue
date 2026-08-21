<script setup>
import { Button } from '@/components/ui/button'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="flex items-center gap-2 whitespace-nowrap">
    <span class="text-sm text-muted-foreground">{{ configStore.unitLabel }}({{ configStore.unitSymbol }})</span>
    <Button variant="outline" size="sm" @click="configStore.toggleUnit()">{{ configStore.nextUnitLabel }}로 변경</Button>
  </div>
</template>
