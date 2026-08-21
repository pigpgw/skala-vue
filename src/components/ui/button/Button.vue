<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: "button" },
  type: { type: String, required: false, default: "button" },
  disabled: { type: Boolean, required: false, default: false },
});

const emits = defineEmits(["click"]);

const nativeAttributes = computed(() =>
  props.asChild || props.as !== "button"
    ? {}
    : { type: props.type, disabled: props.disabled },
);

/** @param {MouseEvent} event */
const handleClick = (event) => emits("click", event);

const forwardedEvents = { click: handleClick };
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    v-bind="nativeAttributes"
    v-on="forwardedEvents"
  >
    <slot />
  </Primitive>
</template>
