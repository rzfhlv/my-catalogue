<script setup lang="ts">
import type { SortBy } from '~/types/product'

const route = useRoute()
const router = useRouter()

const { products } = useProducts()
const { categories } = useCategories()

const filters = useProductFilters()
const options = getFilterOptions(products)

const pageSize = 12
const page = computed(() => {
  const parsed = Number(route.query.page)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
})

const filteredProducts = computed(() => filterAndSort(products, filters.state.value))

const totalResults = computed(() => filteredProducts.value.length)

const totalPages = computed(() => Math.max(1, Math.ceil(totalResults.value / pageSize)))

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

const activePage = computed(() => Math.min(page.value, totalPages.value))

function onPageChange(nextPage: number) {
  router.push({
    query: { ...route.query, page: nextPage > 1 ? String(nextPage) : undefined },
  })
}

function onSortChange(sortBy: SortBy) {
  filters.setSortBy(sortBy)
  if (page.value !== 1) {
    router.push({ query: { ...route.query, page: undefined } })
  }
}

watch(
  () => route.query,
  () => {
    if (page.value !== activePage.value) {
      router.replace({ query: { ...route.query, page: activePage.value > 1 ? String(activePage.value) : undefined } })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

useSeoMeta({
  title: 'Products',
  description: 'Browse the full catalogue — filter by category, size, color and price.',
  ogTitle: 'Products · My Catalogue',
  ogDescription: 'Browse the full catalogue — filter by category, size, color and price.',
})
</script>

<template>
  <div class="container-page py-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-brand-900">All products</h1>
      <p class="mt-1 text-brand-500">
        {{ totalResults }} {{ totalResults === 1 ? 'item' : 'items' }} available
      </p>
    </div>

    <div class="flex flex-col gap-8 lg:flex-row">
      <aside class="lg:w-64 lg:shrink-0">
        <ProductFilters
          :categories="categories"
          :options="options"
          :filters="filters"
        />
      </aside>

      <div class="flex-1">
        <div class="mb-4 flex items-center justify-between gap-4">
          <p class="text-sm text-brand-500" aria-live="polite">
            Showing
            {{ paginatedProducts.length === 0 ? 0 : (page - 1) * pageSize + 1 }}–
            {{ Math.min(page * pageSize, totalResults) }} of {{ totalResults }}
          </p>
          <ProductSort :model-value="filters.state.value.sortBy" @change="onSortChange" />
        </div>

        <ProductGrid :products="paginatedProducts">
          <template #empty>
            <BaseButton
              variant="secondary"
              class="mt-4"
              @click="
                filters.reset()
              "
            >
              Clear all filters
            </BaseButton>
          </template>
        </ProductGrid>

        <div class="mt-10">
          <Pagination
            :total="totalResults"
            :page="activePage"
            :page-size="pageSize"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
