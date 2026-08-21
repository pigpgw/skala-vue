<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="font-medium">선택 결과</div>
  <div class="text-sm text-muted-foreground">{{ message }}</div>
</template>
