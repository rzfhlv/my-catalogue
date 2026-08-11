# My Catalogue

A product catalogue website for a clothing store — browse, search, filter and view
products across Shirts, Pants, Jackets and Accessories.

Built with **Nuxt 4**, **TypeScript** and **Tailwind CSS**. Catalogue only — no cart,
checkout or authentication in this phase.

## Tech stack

- **Framework:** Nuxt 4 (`srcDir: '.'` — root-level `pages/`, `components/`, etc.)
- **Language:** TypeScript (`<script setup lang="ts">` throughout)
- **Styling:** Tailwind CSS via `@nuxtjs/tailwindcss`
- **Images:** `@nuxt/image` (optimized), local SVG placeholders in `public/images/products/`
- **Icons:** `@nuxt/icon` + `@iconify-json/lucide`
- **Data:** static JSON in `data/` accessed only through composables
- **State:** Nuxt built-ins (`useState`, `ref`, composables)

## Setup

Make sure to install dependencies (pnpm recommended):

```bash
pnpm install
```

## Development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Production build (server) |
| `pnpm generate` | Pre-render the app to static HTML in `.output/public` |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run `vue-tsc` type checking |

## Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero, featured categories, best sellers, new arrivals |
| `/products` | Full catalogue with filters, sort, search and pagination |
| `/products/[slug]` | Product detail — gallery, size/color selectors, related products |
| `/categories/[slug]` | Products pre-filtered by category |
| `/search?q=…` | Search results page |
| `/about` | About / contact page |
| `*` | Custom 404 / error page (`error.vue`) |

## Data & swapping to a real API

All product/category data is read through the composables in `composables/` —
**never** by importing the JSON directly from pages or components:

- `composables/useCategories.ts` — categories + `getCategoryBySlug`
- `composables/useProducts.ts` — products + `getProductBySlug`, `getFeatured`, `getRelated`, …
- `composables/useProductFilters.ts` — reactive filter state, URL-query sync, `filterAndSort`

To move to a real API/CMS later, only the bodies of these composables need to change —
the rest of the app is untouched.

## Folder structure

```
app.vue                # root component (layout + page + global meta)
nuxt.config.ts         # Nuxt config (srcDir: '.', modules, route rules, head)
data/                  # static JSON seed data (categories, products)
types/product.ts       # shared TypeScript interfaces
utils/formatPrice.ts   # IDR currency formatting
composables/           # data access + filter/sort logic (the only data layer)
components/
  layout/              # AppHeader, MobileNav, AppFooter
  product/             # ProductCard, ProductGrid, ProductGallery, ProductFilters, …
  category/            # CategoryCard
  ui/                  # BaseButton, BaseBadge, BaseInput, SkeletonCard, Pagination
layouts/default.vue    # header + page + footer
pages/                 # routes (see table above)
public/images/products # SVG placeholder images
error.vue              # custom 404 / error page
```
