<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: 'new' | 'best-seller' | 'sale' | 'out-of-stock'
    label?: string
  }>(),
  {
    tag: 'new',
    label: '',
  },
)

const badge = computed(() => {
  switch (props.tag) {
    case 'new':
      return {
        text: props.label || 'New',
        classes: 'bg-emerald-600 text-white',
      }
    case 'best-seller':
      return {
        text: props.label || 'Best Seller',
        classes: 'bg-amber-500 text-white',
      }
    case 'sale':
      return {
        text: props.label || 'Sale',
        classes: 'bg-accent-600 text-white',
      }
    case 'out-of-stock':
    default:
      return {
        text: props.label || 'Out of Stock',
        classes: 'bg-brand-800 text-white',
      }
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
    :class="badge?.classes"
  >
    <slot>{{ badge?.text }}</slot>
  </span>
</template>
