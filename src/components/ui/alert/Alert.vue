<script setup>
import { cn } from "@/lib/utils";
import { alertVariants } from ".";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
  variant: { type: null, required: false },
  role: { type: String, required: false, default: "alert" },
  "aria-live": {
    type: /** @type {import('vue').PropType<'off' | 'assertive' | 'polite'>} */ (String),
    required: false,
  },
});
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(alertVariants({ variant }), props.class)"
    :role="role"
    :aria-live="props['aria-live']"
  >
    <slot />
  </div>
</template>
