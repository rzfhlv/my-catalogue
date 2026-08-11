<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => (is404.value ? 'Page not found' : 'Something went wrong'),
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="container-page flex flex-1 flex-col items-center justify-center py-20 text-center">
      <p class="text-sm font-semibold uppercase tracking-widest text-accent-600">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-brand-900">
        {{ is404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="mt-4 max-w-md text-brand-500">
        {{
          is404
            ? "The page you're looking for doesn't exist or has been moved."
            : 'An unexpected error occurred. Please try again.'
        }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 rounded-md bg-brand-900 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-800"
        >
          <Icon name="lucide:home" class="size-4" />
          Back to home
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 rounded-md border border-brand-300 px-6 py-3 font-medium text-brand-900 transition-colors hover:bg-brand-100"
        >
          Browse products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
