<script setup lang="ts">
const year = new Date().getFullYear()
const { categories } = useCategories()
</script>

<template>
  <footer class="border-t border-brand-200 bg-brand-900 text-brand-300">
    <div class="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="flex items-center gap-2 text-lg font-bold text-white">
          <Icon name="lucide:shopping-bag" class="size-6 text-accent-500" />
          My Catalogue
        </p>
        <p class="mt-3 text-sm leading-relaxed">
          A curated clothing catalogue — shirts, pants, jackets and accessories for everyday life.
        </p>
      </div>

      <nav aria-label="Categories">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">
          Categories
        </p>
        <ul class="space-y-2 text-sm">
          <li v-for="category in categories" :key="category.id">
            <NuxtLink :to="`/categories/${category.slug}`" class="hover:text-white">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Shop">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">Shop</p>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/products" class="hover:text-white">All Products</NuxtLink></li>
          <li><NuxtLink to="/search" class="hover:text-white">Search</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-white">About</NuxtLink></li>
        </ul>
      </nav>

      <div>
        <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">Contact</p>
        <address class="space-y-2 text-sm not-italic">
          <p>Jl. Catalogue No. 12</p>
          <p>Jakarta, Indonesia</p>
          <p><a class="hover:text-white" href="mailto:hello@mycatalogue.example">hello@mycatalogue.example</a></p>
        </address>
      </div>
    </div>

    <div class="border-t border-brand-800">
      <p class="container-page py-4 text-center text-xs text-brand-500">
        © {{ year }} My Catalogue. All rights reserved.
      </p>
    </div>
  </footer>
</template>
