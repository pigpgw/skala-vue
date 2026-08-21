<script setup>
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getInsectVariant } from '@/utils/insect'

/** @typedef {import('@/types/insect').Insect} Insect */

const props = defineProps({
  insect: {
    type: /** @type {import('vue').PropType<Insect>} */ (Object),
    required: true,
  },
})

</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Badge as="button" type="button" :variant="getInsectVariant(props.insect)" class="cursor-help" @click.stop>
        {{ props.insect.name }}
      </Badge>
    </TooltipTrigger>

    <TooltipContent side="bottom" align="start" :side-offset="8" class="grid w-[17.5rem] gap-1 bg-card text-card-foreground shadow-md">
      <strong>출몰 조건</strong>
      <span>{{ props.insect.condition }}</span>
      <strong class="mt-1">영향</strong>
      <span>{{ props.insect.sideEffects }}</span>
    </TooltipContent>
  </Tooltip>
</template>
