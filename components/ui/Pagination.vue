<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    total: number
    page: number
    pageSize?: number
  }>(),
  {
    pageSize: 12,
  },
)

const emit = defineEmits<{
  'update:page': [page: number]
  change: [page: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const canPrevious = computed(() => props.page > 1)
const canNext = computed(() => props.page < totalPages.value)

function goTo(page: number) {
  if (page < 1 || page > totalPages.value || page === props.page) return
  emit('update:page', page)
  emit('change', page)
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-1"
    aria-label="Pagination"
  >
    <BaseButton variant="secondary" size="sm" :disabled="!canPrevious" @click="goTo(page - 1)">
      <Icon name="lucide:chevron-left" class="size-4" />
      <span class="sr-only">Previous page</span>
    </BaseButton>

    <span class="px-3 text-sm text-brand-600">
      Page {{ page }} of {{ totalPages }}
    </span>

    <BaseButton variant="secondary" size="sm" :disabled="!canNext" @click="goTo(page + 1)">
      <Icon name="lucide:chevron-right" class="size-4" />
      <span class="sr-only">Next page</span>
    </BaseButton>
  </nav>
</template>
