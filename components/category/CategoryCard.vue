<script setup lang="ts">
import type { Category } from '~/types/product'

defineProps<{
  category: Category
}>()
</script>

<template>
  <NuxtLink
    :to="`/categories/${category.slug}`"
    class="group relative block overflow-hidden rounded-lg bg-brand-900"
  >
    <NuxtImg
      :src="category.image"
      :alt="`${category.name} category`"
      loading="lazy"
      class="aspect-[4/5] w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-70"
    />
    <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-950/90 to-transparent p-4">
      <h3 class="text-lg font-bold text-white">{{ category.name }}</h3>
      <p class="mt-1 line-clamp-2 text-sm text-brand-200">{{ category.description }}</p>
      <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
        Browse
        <Icon name="lucide:arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </NuxtLink>
</template>
