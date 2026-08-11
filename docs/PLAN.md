# Implementation Plan — Product Catalogue Website

> Source of requirements: `docs/REQUIREMENTS.md`

## Decisions (confirmed/locked)
- **Framework:** Nuxt `4.5.2` with `srcDir: '.'` so the required root-level structure (`app.vue`, `pages/`, `components/`, etc.) is used — Nuxt 4's documented "matches Nuxt 3 behavior exactly" mode.
- **Images:** Local branded SVG placeholders in `public/images/products/`.
- **Search:** dedicated `/search` page (header search navigates there); also accepts `/products?q=…`.
- **Pagination:** 12 products/page.
- **Icons:** `@nuxt/icon` + `@iconify-json/lucide`.
- **Data access:** synchronous JSON imports cached inside composables (the swap point for a future API).

## Dependencies
- runtime: `nuxt@4.5.2`, `@nuxtjs/tailwindcss@^6.14`, `@nuxt/image@^2.1`, `@nuxt/icon@^2.5`, `@iconify-json/lucide`
- dev: `typescript`, `vue-tsc`, `@nuxt/eslint`, `eslint`, `prettier`, `eslint-config-prettier`, `prettier-plugin-tailwindcss`

## Phase 1 — Scaffold & config
- `package.json` (scripts: `dev`, `build`, `generate`, `preview`, `postinstall: nuxt prepare`, `lint`, `typecheck`), `.gitignore`
- `nuxt.config.ts` — `srcDir: '.'`, modules (`@nuxtjs/tailwindcss`, `@nuxt/image`, `@nuxt/icon`, `@nuxt/eslint`), `app.head` defaults (title template, meta description, og tags, favicon), prerender/routeRules for all routes, compatibility
- `tsconfig.json`, `tailwind.config.ts` (content paths + theme), `assets/css/main.css` (Tailwind + base styles), `eslint.config.mjs`, `.prettierrc`, `app.vue` (NuxtLayout + NuxtPage + global meta + skip-link)

## Phase 2 — Types, utils, data
- `types/product.ts` — `Category`, `Product`, `SortBy`, `FilterState` (from requirements §9)
- `utils/formatPrice.ts` — IDR via `Intl.NumberFormat('id-ID')` → `Rp 250.000`
- `data/categories.json` — 4 categories: shirts, pants, jackets, accessories
- `data/products.json` — 12 products (shirts×4, pants×3, jackets×3, accessories×2), 2–3 images each, tags (`new`/`best-seller`/`sale`), 2 out-of-stock samples
- Generate SVG placeholders (`prod-XXX-N.svg`) via a one-off node script

## Phase 3 — Data layer (composables)
- `useCategories.ts` — cached categories, `getCategoryBySlug`
- `useProducts.ts` — cached products; `getProductBySlug`, `getProductsByCategory`, `getFeatured(limit)`, `getRelated(product, limit=4)` (same category, exclude self)
- `useProductFilters.ts` — reactive `FilterState` + URL-query sync (`useRoute`/`useRouter`); `toggleCategory`, size/color/price/query/sort setters, `reset`; pure `filterAndSort(products, state)`; option helpers (available sizes/colors, min/max price)

## Phase 4 — UI + layout components
- `ui/`: `BaseButton`, `BaseBadge`, `BaseInput`, `SkeletonCard`, `Pagination`
- `layout/`: `AppHeader` (logo, category nav, search, hamburger), `MobileNav` (drawer), `AppFooter`

## Phase 5 — Product/category components
- `product/`: `ProductCard` (NuxtImg lazy, badges, stock overlay), `ProductGrid` (skeletons + empty-state slot), `ProductGallery` (main + thumbnails + arrows), `ProductFilters` (category checkboxes, size/color chips, price inputs, reset; collapsible on mobile), `ProductSort`, `RelatedProducts`
- `category/CategoryCard`

## Phase 6 — Pages & layouts
- `layouts/default.vue` — header/slot/footer
- `pages/index.vue` — hero, featured categories, "New Arrivals"
- `pages/products/index.vue` — filters + sort + grid + pagination, state in URL query, `useSeoMeta`
- `pages/products/[slug].vue` — breadcrumb, gallery, info, stock badge, selectable sizes/colors, related; `createError({statusCode:404})` for missing; OG tags
- `pages/categories/[slug].vue` — breadcrumb, pre-filtered grid (category locked), sort + pagination
- `pages/search.vue` — results for `q`, empty state
- `pages/about.vue` — static content

## Phase 7 — Error page & README
- `error.vue` — custom 404/error (matches requirements structure)
- `README.md` — install/dev/build/preview instructions + note on swapping composables for a real API

## Phase 8 — Verification
- `pnpm install` → `pnpm lint`, `pnpm typecheck`, `pnpm generate` (prerender static), boot `pnpm dev` and curl-check every route (`/`, `/products`, a product, a category, `/search?q=…`, `/about`, 404)
- Confirm structure matches `REQUIREMENTS.md` §8 exactly

## Deviations from requirements (noted)
- Nuxt `4.5.2` instead of "Nuxt 3" (confirmed with user), configured for identical folder structure/behavior.
- Tailwind v4 via `@nuxtjs/tailwindcss` v6 (current stable) — `tailwind.config.ts` retained as required.
