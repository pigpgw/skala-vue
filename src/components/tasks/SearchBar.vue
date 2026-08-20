<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

/** @param {Event} event */
const updateSearchQuery = (event) => {
  const input = event.currentTarget
  if (!(input instanceof HTMLInputElement)) return
  emit('update-query', input.value)
}
</script>

<template>
  <div>검색할 도시</div>
  <input class="search-input" type="text" :value="searchQuery" @input="updateSearchQuery" placeholder="도시명을 입력하세요" />
  <div>입력한 도시: {{ searchQuery }}</div>
</template>

<style scoped>
.search-input {
  padding: 8px;
}
</style>
