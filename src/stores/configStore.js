import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
