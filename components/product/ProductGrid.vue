<script setup lang="ts">
import type { Product } from '~/types/product'

withDefaults(
  defineProps<{
    products: Product[]
    loading?: boolean
    skeletonCount?: number
  }>(),
  {
    loading: false,
    skeletonCount: 8,
  },
)
</script>

<template>
  <div v-if="loading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    <SkeletonCard v-for="n in skeletonCount" :key="n" />
  </div>

  <div
    v-else-if="products.length > 0"
    class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
  >
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>

  <div v-else class="py-16 text-center">
    <Icon name="lucide:package-search" class="mx-auto size-12 text-brand-300" />
    <h3 class="mt-4 text-lg font-semibold text-brand-900">No products found</h3>
    <p class="mt-1 text-sm text-brand-500">
      Try adjusting your filters or search query.
    </p>
    <slot name="empty" />
  </div>
</template>
