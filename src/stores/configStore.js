import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  /** @type {import('vue').Ref<'celsius' | 'fahrenheit'>} */
  const unit = ref('celsius')

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,
  }
})
