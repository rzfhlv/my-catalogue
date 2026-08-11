<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { products } = useProducts()

const query = computed(() => {
  const q = route.query.q
  return typeof q === 'string' ? q.trim() : ''
})

const filters = useProductFilters()

watch(
  query,
  (value) => {
    filters.setQuery(value)
  },
  { immediate: true },
)

const results = computed(() =>
  query.value ? filterAndSort(products, { ...filters.state.value, query: query.value }) : [],
)

useSeoMeta({
  title: () => (query.value ? `Search: ${query.value}` : 'Search'),
  description: 'Search the catalogue for your next favourite piece.',
  ogTitle: () =>
    query.value ? `Search: ${query.value} · My Catalogue` : 'Search · My Catalogue',
  ogDescription: 'Search the catalogue for your next favourite piece.',
})
</script>

<template>
  <div class="container-page py-10">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold text-brand-900">Search</h1>
      <form class="mt-6" role="search" @submit.prevent>
        <BaseInput
          :model-value="query"
          type="search"
          icon="lucide:search"
          placeholder="Search by name, tag or keyword…"
          name="page-search"
          aria-label="Search products"
          @update:model-value="router.push({ query: { q: $event } })"
        />
      </form>
    </div>

    <div class="mt-10">
      <template v-if="query">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-brand-900">
            {{ results.length }} {{ results.length === 1 ? 'result' : 'results' }} for “{{ query }}”
          </h2>
        </div>
        <ProductGrid :products="results">
          <template #empty>
            <NuxtLink
              to="/products"
              class="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
            >
              Browse all products
              <Icon name="lucide:arrow-right" class="size-4" />
            </NuxtLink>
          </template>
        </ProductGrid>
      </template>

      <div v-else class="py-16 text-center">
        <Icon name="lucide:search" class="mx-auto size-12 text-brand-300" />
        <h2 class="mt-4 text-lg font-semibold text-brand-900">What are you looking for?</h2>
        <p class="mt-1 text-sm text-brand-500">
          Search by product name, tag or keyword — e.g. “jacket” or “best-seller”.
        </p>
      </div>
    </div>
  </div>
</template>
