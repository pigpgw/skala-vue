<script setup>
import { useId } from 'vue'

import BaseBadge from '@/components/tasks/common/BaseBadge.vue'
import { getInsectVariant } from '@/utils/insect'

/** @typedef {import('@/types/insect').Insect} Insect */

const props = defineProps({
  insect: {
    type: /** @type {import('vue').PropType<Insect>} */ (Object),
    required: true,
  },
})

const tooltipId = `insect-tooltip-${useId()}`
</script>

<template>
  <span class="insect-condition">
    <button
      class="insect-condition__trigger"
      type="button"
      :aria-describedby="tooltipId"
      @click.stop
    >
      <BaseBadge :variant="getInsectVariant(props.insect)" size="small">
        {{ props.insect.name }}
      </BaseBadge>
    </button>

    <span :id="tooltipId" class="insect-condition__tooltip" role="tooltip">
      <strong>출몰 조건</strong>
      <span>{{ props.insect.condition }}</span>
      <strong>영향</strong>
      <span>{{ props.insect.sideEffects }}</span>
    </span>
  </span>
</template>

<style scoped>
.insect-condition {
  position: relative;
  display: inline-flex;
}

.insect-condition__trigger {
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  cursor: help;
}

.insect-condition__trigger:focus-visible {
  border-radius: var(--radius-full);
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.insect-condition__tooltip {
  position: absolute;
  z-index: 10;
  top: calc(100% + var(--space-2));
  left: 0;
  display: grid;
  gap: var(--space-1);
  width: min(280px, calc(100vw - var(--space-8)));
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  font-size: var(--font-size-xs);
  line-height: 1.45;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 140ms ease,
    transform 140ms ease,
    visibility 140ms ease;
}

.insect-condition__tooltip strong:not(:first-child) {
  margin-top: var(--space-1);
}

.insect-condition:hover .insect-condition__tooltip,
.insect-condition:focus-within .insect-condition__tooltip {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}
</style>
