<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const activeIndex = ref(0)
const activeImage = computed(() => props.product.images[activeIndex.value] ?? props.product.images[0])

function selectImage(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-brand-200 bg-brand-100">
      <NuxtImg
        :src="activeImage"
        :alt="`${product.name} — image ${activeIndex + 1}`"
        class="aspect-[4/5] w-full object-cover"
      />
    </div>

    <div
      v-if="product.images.length > 1"
      class="mt-3 flex gap-3 overflow-x-auto pb-1"
      role="group"
      aria-label="Product images"
    >
      <button
        v-for="(image, index) in product.images"
        :key="image"
        type="button"
        class="shrink-0 overflow-hidden rounded-md border-2 transition-colors"
        :class="index === activeIndex ? 'border-accent-600' : 'border-transparent hover:border-brand-300'"
        :aria-label="`View image ${index + 1}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="selectImage(index)"
      >
        <NuxtImg :src="image" alt="" class="h-20 w-16 object-cover" loading="lazy" />
      </button>
    </div>
  </div>
</template>
