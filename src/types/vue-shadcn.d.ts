import 'vue'

declare module 'vue' {
  interface HTMLAttributes {
    'data-size'?: string
    'data-slot'?: string
  }

  interface ComponentCustomProps {
    dataSize?: string
    dataSlot?: string
    dataVariant?: string
  }
}
