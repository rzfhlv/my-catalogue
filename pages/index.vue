<script setup lang="ts">
const { getFeatured, getNewArrivals } = useProducts()
const { categories } = useCategories()

const featured = computed(() => getFeatured(4))
const newArrivals = computed(() => getNewArrivals(4))

useSeoMeta({
  title: 'Home',
  description:
    'Browse shirts, pants, jackets and accessories — a modern clothing catalogue.',
  ogTitle: 'My Catalogue',
  ogDescription:
    'Browse shirts, pants, jackets and accessories — a modern clothing catalogue.',
  ogType: 'website',
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-brand-900">
      <div class="container-page relative z-10 py-20 text-center sm:py-28">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent-500">
          New Season · New Looks
        </p>
        <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Dress for every day.
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-lg text-brand-300">
          A curated catalogue of shirts, pants, jackets and accessories — thoughtfully made,
          honestly priced.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/products"
            class="inline-flex items-center gap-2 rounded-md bg-accent-600 px-6 py-3 font-medium text-white transition-colors hover:bg-accent-700"
          >
            Browse catalogue
            <Icon name="lucide:arrow-right" class="size-4" />
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="inline-flex items-center gap-2 rounded-md border border-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-800"
          >
            About us
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="container-page py-14" aria-labelledby="categories-heading">
      <div class="mb-6 flex items-end justify-between">
        <h2 id="categories-heading" class="text-2xl font-bold text-brand-900">Shop by category</h2>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </section>

    <section class="bg-white py-14" aria-labelledby="featured-heading">
      <div class="container-page">
        <div class="mb-6 flex items-end justify-between">
          <h2 id="featured-heading" class="text-2xl font-bold text-brand-900">Best sellers</h2>
          <NuxtLink
            to="/products"
            class="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            View all
            <Icon name="lucide:arrow-right" class="size-4" />
          </NuxtLink>
        </div>
        <ProductGrid :products="featured" />
      </div>
    </section>

    <section class="container-page py-14" aria-labelledby="new-arrivals-heading">
      <div class="mb-6 flex items-end justify-between">
        <h2 id="new-arrivals-heading" class="text-2xl font-bold text-brand-900">New arrivals</h2>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          View all
          <Icon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>
      <ProductGrid :products="newArrivals" />
    </section>
  </div>
</template>
