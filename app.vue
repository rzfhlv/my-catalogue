<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  ogTitle: 'My Catalogue',
  ogDescription:
    'Browse shirts, pants, jackets and accessories — a modern clothing catalogue.',
})
</script>

<template>
  <NuxtLayout>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to main content
    </a>
    <NuxtPage />
  </NuxtLayout>
</template>
