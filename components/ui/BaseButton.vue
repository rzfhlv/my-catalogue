<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    type: 'button',
  },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
    :class="[
      variant === 'primary' &&
        'bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-950',
      variant === 'secondary' &&
        'border border-brand-300 bg-white text-brand-900 hover:bg-brand-100',
      variant === 'ghost' && 'text-brand-700 hover:bg-brand-100',
      variant === 'danger' && 'bg-accent-600 text-white hover:bg-accent-700',
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
    ]"
    @click="emit('click', $event)"
  >
    <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
    <slot />
  </button>
</template>
