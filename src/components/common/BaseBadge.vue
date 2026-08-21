<script setup>
/** @typedef {'primary' | 'success' | 'warning' | 'danger'} BadgeVariant */
/** @typedef {'small' | 'medium' | 'large'} BadgeSize */

const props = defineProps({
  variant: {
    type: /** @type {import('vue').PropType<BadgeVariant>} */ (String),
    default: 'primary',
  },
  size: {
    type: /** @type {import('vue').PropType<BadgeSize>} */ (String),
    default: 'medium',
  },
})

/** @type {Record<BadgeVariant, import('vue').CSSProperties>} */
const variantStyles = {
  primary: {
    color: 'var(--color-primary)',
  },
  success: {
    color: 'var(--color-success)',
  },
  warning: {
    color: 'var(--color-warning)',
  },
  danger: {
    color: 'var(--color-danger)',
  },
}

/** @type {Record<BadgeSize, import('vue').CSSProperties>} */
const sizeStyles = {
  small: {
    minHeight: '22px',
    padding: '2px var(--space-2)',
    fontSize: 'var(--font-size-xs)',
  },
  medium: {
    minHeight: '26px',
    padding: '3px var(--space-3)',
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    minHeight: '32px',
    padding: '4px var(--space-4)',
    fontSize: 'var(--font-size-md)',
  },
}
</script>

<template>
  <span
    class="base-badge"
    :style="[variantStyles[props.variant], sizeStyles[props.size]]"
  >
    <span class="base-badge__dot" aria-hidden="true"></span>
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  box-sizing: border-box;
  width: fit-content;
  border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
  border-radius: var(--radius-full);
  background-color: color-mix(in srgb, currentColor 9%, var(--color-surface));
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
}

.base-badge__dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  background-color: currentColor;
}
</style>
