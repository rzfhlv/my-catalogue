<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    type?: 'text' | 'search' | 'number'
    placeholder?: string
    label?: string
    name?: string
    icon?: string
    id?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    label: '',
    name: '',
    icon: '',
    id: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="block">
    <span v-if="label" class="mb-1.5 block text-sm font-medium text-brand-800">{{ label }}</span>
    <span class="relative block">
      <Icon
        v-if="icon"
        :name="icon"
        class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-400"
      />
      <input
        :id="id || name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        class="w-full rounded-md border border-brand-300 bg-white px-3 py-2 text-sm text-brand-900 placeholder:text-brand-400 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/20"
        :class="icon ? 'pl-10' : ''"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </span>
  </label>
</template>
