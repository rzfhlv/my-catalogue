<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Learn about My Catalogue and how we curate our clothing collection.',
  ogTitle: 'About · My Catalogue',
  ogDescription: 'Learn about My Catalogue and how we curate our clothing collection.',
})
</script>

<template>
  <div class="container-page py-14">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold text-brand-900">About My Catalogue</h1>
      <div class="mt-6 space-y-5 leading-relaxed text-brand-600">
        <p>
          My Catalogue is a modern clothing catalogue built around a simple idea: well-made
          everyday essentials, presented clearly and honestly. No gimmicks, no noise — just
          good shirts, pants, jackets and accessories.
        </p>
        <p>
          Every piece in the catalogue is chosen for fit, fabric and value. We keep the range
          tight so you can find what you need quickly, and trust that the quality is already
          handled.
        </p>
        <h2 class="pt-2 text-xl font-semibold text-brand-900">Our categories</h2>
        <ul class="list-disc space-y-1 pl-6">
          <li><strong class="text-brand-900">Shirts</strong> — classic and relaxed fits in premium cottons and linen.</li>
          <li><strong class="text-brand-900">Pants</strong> — chinos, trousers and cargos for every day.</li>
          <li><strong class="text-brand-900">Jackets</strong> — denim, bombers and utility layers.</li>
          <li><strong class="text-brand-900">Accessories</strong> — bags and belts to finish the look.</li>
        </ul>
        <h2 class="pt-2 text-xl font-semibold text-brand-900">Contact</h2>
        <p>
          Have a question or need help choosing? Reach out at
          <a
            href="mailto:hello@mycatalogue.example"
            class="font-medium text-accent-600 hover:text-accent-700"
          >
            hello@mycatalogue.example
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>
