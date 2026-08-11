<script setup lang="ts">
const { categories } = useCategories()
const route = useRoute()
const router = useRouter()

const isMenuOpen = ref(false)
const searchQuery = ref('')

function submitSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
  searchQuery.value = ''
}

function closeMenu() {
  isMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-brand-200 bg-white/95 backdrop-blur">
    <div class="container-page flex h-16 items-center gap-4">
      <button
        type="button"
        class="rounded-md p-2 text-brand-700 hover:bg-brand-100 lg:hidden"
        aria-label="Open menu"
        @click="isMenuOpen = true"
      >
        <Icon name="lucide:menu" class="size-6" />
      </button>

      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-900"
      >
        <Icon name="lucide:shopping-bag" class="size-6 text-accent-600" />
        My Catalogue
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.slug}`"
          class="rounded-md px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 hover:text-brand-900"
          :class="route.path.startsWith(`/categories/${category.slug}`) ? 'text-accent-600' : ''"
        >
          {{ category.name }}
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="rounded-md px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 hover:text-brand-900"
          :class="route.path === '/about' ? 'text-accent-600' : ''"
        >
          About
        </NuxtLink>
      </nav>

      <form class="ml-auto hidden w-full max-w-xs md:block" role="search" @submit.prevent="submitSearch">
        <BaseInput
          v-model="searchQuery"
          name="header-search"
          type="search"
          icon="lucide:search"
          placeholder="Search products…"
          aria-label="Search products"
        />
      </form>

      <NuxtLink
        to="/products"
        class="hidden rounded-md px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 md:inline-flex lg:hidden"
      >
        Products
      </NuxtLink>
    </div>

    <MobileNav :open="isMenuOpen" :search-query="searchQuery" @close="closeMenu" />
  </header>
</template>
