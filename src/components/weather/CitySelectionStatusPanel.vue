<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>선택 결과</div>
  <div>{{ message }}</div>
</template>
