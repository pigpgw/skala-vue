<script setup>
/** @typedef {'primary' | 'success' | 'warning' | 'danger'} ButtonVariant*/
/** @typedef {'small' | 'medium' | 'large'} ButtonSize*/

const props = defineProps({
  variant: {
    type: /** @type {import('vue').PropType<ButtonVariant>} */ (String),
    default: 'primary',
  },
  size: {
    type: /** @type {import('vue').PropType<ButtonSize>} */ (String),
    default: 'medium',
  },
})

const emit = defineEmits(['click'])

/** @param {MouseEvent} event */
const handleClick = (event) => emit('click', event)

/** @type {Record<ButtonVariant, import('vue').CSSProperties>} */
const variantStyles = {
  primary: {
    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
    boxShadow: 'var(--shadow-button-primary)',
    color: 'var(--color-white)',
  },
  success: {
    background: 'linear-gradient(135deg, var(--color-success), var(--color-success-hover))',
    boxShadow: 'var(--shadow-button-success)',
    color: 'var(--color-white)',
  },
  warning: {
    background: 'linear-gradient(135deg, var(--color-warning), var(--color-warning-hover))',
    boxShadow: 'var(--shadow-button-warning)',
    color: 'var(--color-white)',
  },
  danger: {
    background: 'linear-gradient(135deg, var(--color-danger), var(--color-danger-hover))',
    boxShadow: 'var(--shadow-button-danger)',
    color: 'var(--color-white)',
  },
}

/** @type {Record<ButtonSize, import('vue').CSSProperties>} */
const sizeStyles = {
  small: {
    minHeight: 'var(--control-height-sm)',
    padding: '0 var(--space-3)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-xs)',
  },
  medium: {
    minHeight: 'var(--control-height-md)',
    padding: '0 var(--space-4)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    minHeight: 'var(--control-height-lg)',
    padding: '0 var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-md)',
  },
}
</script>

<template>
  <button
    class="base-button"
    :style="[variantStyles[props.variant], sizeStyles[props.size]]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid var(--color-button-border);
  font: inherit;
  font-weight: var(--font-weight-bold);
  line-height: 1;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.base-button:hover {
  filter: brightness(1.06) saturate(1.05);
  transform: translateY(-1px);
}

.base-button:active {
  filter: brightness(0.94);
  transform: translateY(0) scale(0.98);
}

.base-button:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 3px;
}

.base-button:disabled {
  box-shadow: none !important;
  cursor: not-allowed;
  filter: grayscale(0.2);
  opacity: 0.55;
  transform: none;
}
</style>
