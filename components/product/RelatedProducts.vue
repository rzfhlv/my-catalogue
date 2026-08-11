<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section v-if="products.length > 0" aria-labelledby="related-products-heading">
    <h2 id="related-products-heading" class="mb-4 text-xl font-bold text-brand-900">
      You may also like
    </h2>
    <ProductGrid :products="products" />
  </section>
</template>
