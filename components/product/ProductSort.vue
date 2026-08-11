<script setup lang="ts">
import type { SortBy } from '~/types/product'

const props = defineProps<{
  modelValue: SortBy
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SortBy]
  change: [value: SortBy]
}>()

const options: { value: SortBy; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as SortBy
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <label class="flex items-center gap-2">
    <span class="sr-only">Sort products</span>
    <select
      :value="props.modelValue"
      class="rounded-md border border-brand-300 bg-white px-3 py-2 text-sm text-brand-900 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/20"
      @change="onChange"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
