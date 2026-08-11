<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const { getCategoryById } = useCategories()

const category = computed(() => getCategoryById(props.product.categoryId))
const image = computed(() => props.product.images[0])
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="group flex flex-col overflow-hidden rounded-lg border border-brand-200 bg-white transition-shadow hover:shadow-lg"
    :aria-label="product.name"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-brand-100">
      <NuxtImg
        :src="image"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        :class="{ 'opacity-60 grayscale': !product.inStock }"
      />
      <div class="absolute left-3 top-3 flex flex-col gap-2">
        <BaseBadge
          v-if="!product.inStock"
          tag="out-of-stock"
          label="Out of Stock"
        />
        <BaseBadge v-if="product.inStock && product.tags.includes('new')" tag="new" />
        <BaseBadge
          v-if="product.inStock && product.tags.includes('best-seller')"
          tag="best-seller"
        />
        <BaseBadge v-if="product.inStock && product.tags.includes('sale')" tag="sale" />
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-1 p-4">
      <p class="text-xs uppercase tracking-wider text-brand-400">
        {{ category?.name ?? product.categoryId }}
      </p>
      <h3 class="font-semibold text-brand-900 group-hover:text-accent-600">
        {{ product.name }}
      </h3>
      <p class="mt-auto pt-1 font-medium text-brand-900">
        {{ formatPrice(product.price, product.currency) }}
      </p>
    </div>
  </NuxtLink>
</template>
