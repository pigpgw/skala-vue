<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
  size: { type: String, required: false, default: "default" },
  role: { type: String, required: false, default: undefined },
  tabindex: { type: [String, Number], required: false, default: undefined },
  ariaPressed: { type: Boolean, required: false, default: undefined },
});

const emits = defineEmits(["click", "keydown"]);

/** @param {MouseEvent} event */
const handleClick = (event) => emits("click", event);
/** @param {KeyboardEvent} event */
const handleKeydown = (event) => emits("keydown", event);
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :role="role"
    :tabindex="tabindex"
    :aria-pressed="props.ariaPressed"
    :class="
      cn(
        'ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col',
        props.class,
      )
    "
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>
