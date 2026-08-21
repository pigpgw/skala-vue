<template>
  <section class="dashboard-card">
    <slot />
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
</style>
