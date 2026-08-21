import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  /** @type {import('vue').Ref<'celsius' | 'fahrenheit'>} */
  const unit = ref('celsius')

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })
  const unitLabel = computed(() => (unit.value === 'celsius' ? '섭씨' : '화씨'))
  const nextUnitLabel = computed(() => (unit.value === 'celsius' ? '화씨' : '섭씨'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return {
    unit,
    unitSymbol,
    unitLabel,
    nextUnitLabel,
    toggleUnit,
  }
})
