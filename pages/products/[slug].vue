<script setup lang="ts">
import type { Product } from '~/types/product'

const route = useRoute()

const { getProductBySlug, getRelated } = useProducts()
const { getCategoryById } = useCategories()

const product = computed<Product>(() => {
  const found = getProductBySlug(route.params.slug as string)
  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
      fatal: true,
    })
  }
  return found
})

const category = computed(() => getCategoryById(product.value.categoryId))
const relatedProducts = computed(() => getRelated(product.value, 4))

const selectedSize = ref<string>('')
const selectedColor = ref<string>('')

const image = computed(() => product.value.images[0] ?? '')

useSeoMeta({
  title: () => product.value.name,
  description: () => product.value.description,
  ogTitle: () => product.value.name,
  ogDescription: () => product.value.description,
  ogType: 'website',
  ogImage: () => image.value,
})
</script>

<template>
  <div class="container-page py-10">
    <nav class="mb-6 flex items-center gap-2 text-sm text-brand-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-brand-900">Home</NuxtLink>
      <Icon name="lucide:chevron-right" class="size-4" />
      <NuxtLink :to="`/categories/${category?.slug}`" class="hover:text-brand-900">
        {{ category?.name ?? 'Products' }}
      </NuxtLink>
      <Icon name="lucide:chevron-right" class="size-4" />
      <span class="font-medium text-brand-900">{{ product.name }}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2">
      <ProductGallery :product="product" />

      <div>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-3xl font-bold text-brand-900">{{ product.name }}</h1>
          <BaseBadge v-if="!product.inStock" tag="out-of-stock" />
          <BaseBadge v-else tag="new" label="In Stock" />
        </div>

        <p class="mt-3 text-2xl font-semibold text-brand-900">
          {{ formatPrice(product.price, product.currency) }}
        </p>

        <p class="mt-5 leading-relaxed text-brand-600">{{ product.description }}</p>

        <div class="mt-8">
          <h2 class="text-sm font-semibold text-brand-900">Size</h2>
          <div v-if="product.sizes.length > 0" class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              type="button"
              class="rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              :class="
                selectedSize === size
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-brand-300 text-brand-700 hover:border-brand-500'
              "
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
          <p v-else class="mt-2 text-sm text-brand-500">One size — no size selection needed.</p>
        </div>

        <div class="mt-6">
          <h2 class="text-sm font-semibold text-brand-900">Color</h2>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="color in product.colors"
              :key="color"
              type="button"
              class="rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              :class="
                selectedColor === color
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-brand-300 text-brand-700 hover:border-brand-500'
              "
              @click="selectedColor = color"
            >
              {{ color }}
            </button>
          </div>
        </div>

        <div class="mt-8 rounded-md border border-brand-200 bg-brand-50 p-4">
          <p
            v-if="!product.inStock"
            class="flex items-center gap-2 text-sm font-medium text-accent-700"
          >
            <Icon name="lucide:package-x" class="size-4" />
            This product is currently out of stock.
          </p>
          <p
            v-else-if="product.sizes.length > 0 && !selectedSize"
            class="flex items-center gap-2 text-sm text-brand-600"
          >
            <Icon name="lucide:info" class="size-4" />
            Please select a size above.
          </p>
          <p v-else class="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Icon name="lucide:check-circle" class="size-4" />
            Ready to order — {{ formatPrice(product.price, product.currency) }}.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <RelatedProducts :products="relatedProducts" />
    </div>
  </div>
</template>
