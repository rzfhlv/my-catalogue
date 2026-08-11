<script setup lang="ts">
import type { Category, SortBy } from '~/types/product'

const route = useRoute()
const router = useRouter()

const { products } = useProducts()
const { categories, getCategoryBySlug } = useCategories()

const category = computed<Category>(() => {
  const found = getCategoryBySlug(route.params.slug as string)
  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
      fatal: true,
    })
  }
  return found
})

const categoryProducts = computed(() =>
  products.filter((product) => product.categoryId === category.value.id),
)

const filters = useProductFilters({
  lockedCategoryIds: [category.value.id],
})

const options = getFilterOptions(categoryProducts.value)

const pageSize = 12
const page = computed(() => {
  const parsed = Number(route.query.page)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
})

const filteredProducts = computed(() => filterAndSort(categoryProducts.value, filters.state.value))

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

useSeoMeta({
  title: () => category.value.name,
  description: () => category.value.description,
  ogTitle: () => `${category.value.name} · My Catalogue`,
  ogDescription: () => category.value.description,
})
</script>

<template>
  <div class="container-page py-10">
    <nav class="mb-6 flex items-center gap-2 text-sm text-brand-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-brand-900">Home</NuxtLink>
      <Icon name="lucide:chevron-right" class="size-4" />
      <span class="font-medium text-brand-900">{{ category.name }}</span>
    </nav>

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-brand-900">{{ category.name }}</h1>
      <p class="mt-1 max-w-2xl text-brand-500">{{ category.description }}</p>
    </div>

    <div class="flex flex-col gap-8 lg:flex-row">
      <aside class="lg:w-64 lg:shrink-0">
        <ProductFilters
          :categories="categories"
          :options="options"
          :filters="filters"
          :locked-category-id="category.id"
        />
      </aside>

      <div class="flex-1">
        <div class="mb-4 flex items-center justify-between gap-4">
          <p class="text-sm text-brand-500" aria-live="polite">
            {{ totalResults }} {{ totalResults === 1 ? 'item' : 'items' }}
          </p>
          <ProductSort :model-value="filters.state.value.sortBy" @change="onSortChange" />
        </div>

        <ProductGrid :products="paginatedProducts">
          <template #empty>
            <BaseButton variant="secondary" class="mt-4" @click="filters.reset()">
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
