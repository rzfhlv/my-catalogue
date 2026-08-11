import type { FilterState, Product, SortBy } from '~/types/product'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const ALL_COLORS = [
  'White',
  'Off-White',
  'Navy',
  'Sage',
  'Sand',
  'Indigo',
  'Beige',
  'Khaki',
  'Olive',
  'Black',
  'Charcoal',
  'Camo',
  'Forest',
  'Light Wash',
  'Mid Wash',
  'Natural',
  'Brown',
]

export function createDefaultFilterState(): FilterState {
  return {
    categoryIds: [],
    sizes: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
    query: '',
    sortBy: 'newest',
  }
}

export function filterAndSort(products: Product[], state: FilterState): Product[] {
  const query = state.query.trim().toLowerCase()

  const filtered = products.filter((product) => {
    if (state.categoryIds.length > 0 && !state.categoryIds.includes(product.categoryId)) {
      return false
    }
    if (state.sizes.length > 0 && !state.sizes.some((size) => product.sizes.includes(size))) {
      return false
    }
    if (state.colors.length > 0 && !state.colors.some((color) => product.colors.includes(color))) {
      return false
    }
    if (state.minPrice !== null && product.price < state.minPrice) {
      return false
    }
    if (state.maxPrice !== null && product.price > state.maxPrice) {
      return false
    }
    if (query) {
      const haystack = [product.name, product.description, ...product.tags, product.categoryId]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) {
        return false
      }
    }
    return true
  })

  return [...filtered].sort((a, b) => {
    switch (state.sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'newest':
      default:
        return b.createdAt.localeCompare(a.createdAt)
    }
  })
}

export function getFilterOptions(products: Product[]) {
  const sizes = new Set<string>()
  const colors = new Set<string>()
  let minPrice = Infinity
  let maxPrice = -Infinity

  for (const product of products) {
    for (const size of product.sizes) {
      if (ALL_SIZES.includes(size)) {
        sizes.add(size)
      }
    }
    for (const color of product.colors) {
      if (ALL_COLORS.includes(color)) {
        colors.add(color)
      }
    }
    minPrice = Math.min(minPrice, product.price)
    maxPrice = Math.max(maxPrice, product.price)
  }

  return {
    sizes: [...sizes].sort((a, b) => ALL_SIZES.indexOf(a) - ALL_SIZES.indexOf(b)),
    colors: [...colors],
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice: maxPrice === -Infinity ? 0 : maxPrice,
  }
}

type QueryValue = string | null | undefined
type QueryValueOrArray = QueryValue | QueryValue[]

function splitList(value: QueryValueOrArray): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((item): item is string => item !== null)
  }
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseNumber(value: QueryValueOrArray): number | null {
  if (!value || Array.isArray(value)) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function isValidSortBy(value: QueryValueOrArray): value is SortBy {
  return value !== undefined && !Array.isArray(value) && ALL_SORT_BY.includes(value as SortBy)
}

const ALL_SORT_BY: SortBy[] = ['newest', 'price-asc', 'price-desc', 'name-asc']

export interface UseProductFiltersOptions {
  lockedCategoryIds?: string[]
  includeQuery?: boolean
}

export function useProductFilters(options: UseProductFiltersOptions = {}) {
  const route = useRoute()
  const router = useRouter()

  const initialQuery =
    options.includeQuery === false ? '' : typeof route.query.q === 'string' ? route.query.q : ''

  const state = ref<FilterState>({
    categoryIds: options.lockedCategoryIds ?? splitList(route.query.categories),
    sizes: splitList(route.query.sizes),
    colors: splitList(route.query.colors),
    minPrice: parseNumber(route.query.min),
    maxPrice: parseNumber(route.query.max),
    query: initialQuery,
    sortBy: isValidSortBy(route.query.sort) ? route.query.sort : 'newest',
  })

  function syncUrl() {
    const query: Record<string, string | string[] | number> = {}
    if (state.value.categoryIds.length > 0) {
      query.categories = state.value.categoryIds
    }
    if (state.value.sizes.length > 0) {
      query.sizes = state.value.sizes
    }
    if (state.value.colors.length > 0) {
      query.colors = state.value.colors
    }
    if (state.value.minPrice !== null) {
      query.min = state.value.minPrice
    }
    if (state.value.maxPrice !== null) {
      query.max = state.value.maxPrice
    }
    if (state.value.query.trim()) {
      query.q = state.value.query.trim()
    }
    if (state.value.sortBy !== 'newest') {
      query.sort = state.value.sortBy
    }
    if (route.query.page !== undefined && route.query.page !== null && !Array.isArray(route.query.page)) {
      query.page = route.query.page
    }

    router.replace({ query })
  }

  watch(
    state,
    () => {
      syncUrl()
    },
    { deep: true },
  )

  function toggleCategory(id: string) {
    const current = state.value.categoryIds
    state.value.categoryIds = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]
  }

  function toggleSize(size: string) {
    const current = state.value.sizes
    state.value.sizes = current.includes(size) ? current.filter((item) => item !== size) : [...current, size]
  }

  function toggleColor(color: string) {
    const current = state.value.colors
    state.value.colors = current.includes(color)
      ? current.filter((item) => item !== color)
      : [...current, color]
  }

  function setMinPrice(value: number | null) {
    state.value.minPrice = value
  }

  function setMaxPrice(value: number | null) {
    state.value.maxPrice = value
  }

  function setQuery(value: string) {
    state.value.query = value
  }

  function setSortBy(value: SortBy) {
    state.value.sortBy = value
  }

  function reset() {
    state.value = {
      ...createDefaultFilterState(),
      query: state.value.query,
      categoryIds: options.lockedCategoryIds ?? [],
    }
  }

  return {
    state,
    toggleCategory,
    toggleSize,
    toggleColor,
    setMinPrice,
    setMaxPrice,
    setQuery,
    setSortBy,
    reset,
  }
}
