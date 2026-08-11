export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: '.',
  css: ['~/assets/css/main.css'],

  components: [{ path: '~/components', pathPrefix: false }],

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@nuxt/eslint'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · My Catalogue',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Browse shirts, pants, jackets and accessories — a modern clothing catalogue.',
        },
        { name: 'theme-color', content: '#0f172a' },
        {
          property: 'og:site_name',
          content: 'My Catalogue',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'My Catalogue' },
        {
          property: 'og:description',
          content:
            'Browse shirts, pants, jackets and accessories — a modern clothing catalogue.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/products': { prerender: true },
    '/categories/**': { prerender: true },
    '/products/**': { prerender: true },
    '/search': { prerender: true },
    '/about': { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
    preset: 'netlify',
  },

  image: {
    quality: 80,
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },
})
