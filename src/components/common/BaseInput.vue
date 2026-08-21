<script setup>
/** @typedef {'primary' | 'success' | 'warning' | 'danger'} InputVariant */
/** @typedef {'small' | 'medium' | 'large'} InputSize */

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  variant: {
    type: /** @type {import('vue').PropType<InputVariant>} */ (String),
    default: 'primary',
  },
  size: {
    type: /** @type {import('vue').PropType<InputSize>} */ (String),
    default: 'medium',
  },
  type: {
    type: /** @type {import('vue').PropType<import('vue').InputTypeHTMLAttribute>} */ (String),
    default: 'text',
  },
  value: {
    type: /** @type {import('vue').PropType<string | number>} */ ([String, Number]),
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['input'])

/** @param {Event} event */
const handleInput = (event) => emit('input', event)

/** @type {Record<InputVariant, import('vue').CSSProperties>} */
const variantStyles = {
  primary: {
    borderColor: 'var(--color-primary)',
  },
  success: {
    borderColor: 'var(--color-success)',
  },
  warning: {
    borderColor: 'var(--color-warning)',
  },
  danger: {
    borderColor: 'var(--color-danger)',
  },
}

/** @type {Record<InputSize, import('vue').CSSProperties>} */
const sizeStyles = {
  small: {
    minHeight: 'var(--control-height-sm)',
    padding: '0 var(--space-2)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-xs)',
  },
  medium: {
    minHeight: 'var(--control-height-md)',
    padding: '0 var(--space-3)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    minHeight: 'var(--control-height-lg)',
    padding: '0 var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-md)',
  },
}
</script>

<template>
  <input
    class="base-input"
    v-bind="$attrs"
    :type="props.type"
    :value="props.value"
    :placeholder="props.placeholder"
    :style="[variantStyles[props.variant], sizeStyles[props.size]]"
    @input="handleInput"
  />
</template>

<style scoped>
.base-input {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  font-family: inherit;
}
</style>
