<script setup>
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <Card class="mb-4 shadow-sm">
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
