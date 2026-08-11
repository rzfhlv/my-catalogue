<script setup lang="ts">
const props = defineProps<{
  open: boolean
  searchQuery?: string
}>()

const emit = defineEmits<{
  close: []
  search: [query: string]
}>()

const { categories } = useCategories()
const route = useRoute()
const router = useRouter()

const localQuery = ref(props.searchQuery ?? '')

watch(
  () => props.searchQuery,
  (value) => {
    if (value !== undefined) localQuery.value = value
  },
)

function submitSearch() {
  const q = localQuery.value.trim()
  emit('search', q)
  if (q) {
    router.push({ path: '/search', query: { q } })
  }
  emit('close')
}

watch(
  () => route.fullPath,
  () => emit('close'),
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

watchEffect(() => {
  if (!import.meta.client) return
  if (props.open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-out duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity ease-in duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-sm"
        aria-hidden="true"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-active-class="transition ease-in-out duration-300"
      enter-from-class="-translate-x-full"
      leave-active-class="transition ease-in-out duration-200"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="open"
        ref="panel"
        class="fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[85%] flex-col bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <div class="flex items-center justify-between border-b border-brand-200 p-4">
          <span class="text-lg font-bold text-brand-900">Menu</span>
          <button
            type="button"
            class="rounded-md p-2 text-brand-700 hover:bg-brand-100"
            aria-label="Close menu"
            @click="emit('close')"
          >
            <Icon name="lucide:x" class="size-5" />
          </button>
        </div>

        <form class="border-b border-brand-200 p-4" role="search" @submit.prevent="submitSearch">
          <BaseInput
            v-model="localQuery"
            name="mobile-search"
            type="search"
            icon="lucide:search"
            placeholder="Search products…"
            aria-label="Search products"
          />
        </form>

        <nav class="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
          <NuxtLink
            to="/"
            class="block rounded-md px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="block rounded-md px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            All Products
          </NuxtLink>
          <p class="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
            Categories
          </p>
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/categories/${category.slug}`"
            class="block rounded-md px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            {{ category.name }}
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="block rounded-md px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            About
          </NuxtLink>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>
