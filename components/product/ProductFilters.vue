<script setup lang="ts">
import type { Category } from '~/types/product'

const props = defineProps<{
  categories: Category[]
  options: {
    sizes: string[]
    colors: string[]
    minPrice: number
    maxPrice: number
  }
  filters: ReturnType<typeof useProductFilters>
  lockedCategoryId?: string
}>()

const isOpen = ref(false)

const minPriceModel = ref('')
const maxPriceModel = ref('')
let priceApplyTimeout: ReturnType<typeof setTimeout> | null = null

function applyPrice() {
  if (priceApplyTimeout) clearTimeout(priceApplyTimeout)
  priceApplyTimeout = setTimeout(() => {
    const min = Number(minPriceModel.value)
    const max = Number(maxPriceModel.value)
    props.filters.setMinPrice(minPriceModel.value !== '' && Number.isFinite(min) ? min : null)
    props.filters.setMaxPrice(maxPriceModel.value !== '' && Number.isFinite(max) ? max : null)
  }, 300)
}

function resetFilters() {
  props.filters.reset()
  minPriceModel.value = ''
  maxPriceModel.value = ''
}
</script>

<template>
  <div class="rounded-lg border border-brand-200 bg-white">
    <button
      type="button"
      class="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-brand-900 lg:hidden"
      :aria-expanded="isOpen"
      aria-controls="product-filters"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center gap-2">
        <Icon name="lucide:sliders-horizontal" class="size-4" />
        Filters
      </span>
      <Icon :name="isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4" />
    </button>

    <div
      :id="`filters-panel-${lockedCategoryId ?? 'all'}`"
      class="border-t border-brand-200 lg:border-t-0"
      :class="isOpen ? 'block' : 'hidden lg:block'"
    >
      <div class="space-y-6 p-4">
        <section v-if="!lockedCategoryId" aria-label="Filter by category">
          <h3 class="mb-2 text-sm font-semibold text-brand-900">Category</h3>
          <div class="space-y-2">
            <label
              v-for="category in categories"
              :key="category.id"
              class="flex cursor-pointer items-center gap-2 text-sm text-brand-700"
            >
              <input
                type="checkbox"
                class="size-4 rounded border-brand-300 text-accent-600 focus:ring-accent-600"
                :checked="filters.state.value.categoryIds.includes(category.id)"
                @change="filters.toggleCategory(category.id)"
              >
              {{ category.name }}
            </label>
          </div>
        </section>

        <section aria-label="Filter by size">
          <h3 class="mb-2 text-sm font-semibold text-brand-900">Size</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in options.sizes"
              :key="size"
              type="button"
              class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
              :class="
                filters.state.value.sizes.includes(size)
                  ? 'border-accent-600 bg-accent-50 text-accent-700'
                  : 'border-brand-300 text-brand-700 hover:border-brand-400'
              "
              @click="filters.toggleSize(size)"
            >
              {{ size }}
            </button>
          </div>
        </section>

        <section aria-label="Filter by color">
          <h3 class="mb-2 text-sm font-semibold text-brand-900">Color</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in options.colors"
              :key="color"
              type="button"
              class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
              :class="
                filters.state.value.colors.includes(color)
                  ? 'border-accent-600 bg-accent-50 text-accent-700'
                  : 'border-brand-300 text-brand-700 hover:border-brand-400'
              "
              @click="filters.toggleColor(color)"
            >
              {{ color }}
            </button>
          </div>
        </section>

        <section aria-label="Filter by price">
          <h3 class="mb-2 text-sm font-semibold text-brand-900">Price range</h3>
          <div class="grid grid-cols-2 gap-2">
            <BaseInput
              v-model="minPriceModel"
              name="min-price"
              type="number"
              :placeholder="`Min ${options.minPrice.toLocaleString('id-ID')}`"
              label="Min"
              @update:model-value="applyPrice"
            />
            <BaseInput
              v-model="maxPriceModel"
              name="max-price"
              type="number"
              :placeholder="`Max ${options.maxPrice.toLocaleString('id-ID')}`"
              label="Max"
              @update:model-value="applyPrice"
            />
          </div>
        </section>

        <BaseButton
          variant="secondary"
          size="sm"
          class="w-full"
          @click="resetFilters"
        >
          <Icon name="lucide:rotate-ccw" class="size-4" />
          Reset filters
        </BaseButton>
      </div>
    </div>
  </div>
</template>
