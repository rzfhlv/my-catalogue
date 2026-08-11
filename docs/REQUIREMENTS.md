# Product Catalogue Website — Requirements

## 1. Project Overview
Build a **product catalogue website** for a clothing store (e.g. shirts/`baju`, pants/`celana`, and other apparel categories). This is a **catalogue only** — no cart, checkout, or payment functionality is required in this phase. The goal is to let visitors browse, search, and filter products, and view product details.

## 2. Tech Stack
- **Framework:** Nuxt 3 (latest stable version)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Source:** Static local data (JSON files) — no backend/database/API calls in this phase, but the data layer must be abstracted so it can later be swapped for a real API/CMS with minimal changes
- **Package Manager:** pnpm (fallback: npm if pnpm unavailable)
- **Image handling:** `@nuxt/image` for optimized static images
- **State management:** Nuxt's built-in `useState` / composables (no Pinia/Vuex unless complexity requires it)
- **Icons:** any lightweight icon set (e.g. `lucide-vue-next` or `heroicons`)

## 3. Goals
1. Display a catalogue of products grouped by category (e.g. Shirts, Pants, Jackets, Accessories).
2. Allow browsing all products with pagination or infinite scroll.
3. Allow filtering by category, size, color, and price range.
4. Allow searching products by name/keyword.
5. Show a detailed product page with images, description, price, available sizes/colors, and related products.
6. Fully responsive design (mobile, tablet, desktop).
7. Clean, maintainable, scalable folder structure following Nuxt 3 conventions.
8. SEO-friendly (proper meta tags, semantic HTML, Open Graph tags).
9. Good performance (lazy-loaded images, optimized static assets).

## 4. Non-Goals (Out of Scope for this phase)
- Shopping cart / checkout / payment gateway
- User authentication / accounts
- Admin panel / CMS integration
- Real backend or database (data is static JSON for now)
- Multi-language / i18n (can be a future enhancement)

## 5. Data Model (Static JSON)

Store static data under `/data` or `/server/data` (see folder structure below). Example schema:

### `data/categories.json`
```json
[
  { "id": "shirts", "name": "Shirts", "slug": "shirts" },
  { "id": "pants", "name": "Pants", "slug": "pants" },
  { "id": "jackets", "name": "Jackets", "slug": "jackets" },
  { "id": "accessories", "name": "Accessories", "slug": "accessories" }
]
```

### `data/products.json`
```json
[
  {
    "id": "prod-001",
    "name": "Classic White Shirt",
    "slug": "classic-white-shirt",
    "categoryId": "shirts",
    "description": "A timeless classic white shirt made from premium cotton.",
    "price": 250000,
    "currency": "IDR",
    "images": [
      "/images/products/prod-001-1.jpg",
      "/images/products/prod-001-2.jpg"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["White", "Off-White"],
    "tags": ["new", "best-seller"],
    "inStock": true,
    "createdAt": "2025-01-10"
  }
]
```

Field notes:
- `price` stored as a plain number (smallest currency unit avoided for simplicity; assume whole IDR).
- `slug` used for the product detail route (`/products/[slug]`).
- `tags` used for badges like "New" or "Sale" and for future filtering.

## 6. Pages / Routes

| Route | Description |
|---|---|
| `/` | Home page — hero/banner, featured categories, featured/new products |
| `/products` | Full catalogue with filter sidebar, search bar, sorting, pagination |
| `/products/[slug]` | Product detail page — images gallery, info, related products |
| `/categories/[slug]` | Products filtered by a specific category |
| `/search` | Search results page (or handled as a query param on `/products?q=...`) |
| `/about` | (optional) Simple about/contact page |
| `/404` | Custom not-found page |

## 7. Core Features & Behavior

### 7.1 Product Listing (`/products`)
- Grid layout of product cards (image, name, category, price).
- Filters: category (multi-select), size, color, price range slider.
- Sort options: newest, price low-to-high, price high-to-low, name A-Z.
- Search input filtering by product name/tags.
- Pagination (e.g. 12–24 products per page) or "Load More" button.
- Empty state UI when no products match filters.

### 7.2 Product Detail (`/products/[slug]`)
- Image gallery/carousel (multiple images, thumbnail navigation).
- Product name, price, description, available sizes, available colors.
- "In stock" / "Out of stock" badge.
- Related products section (same category, excluding current product).
- Breadcrumb navigation (Home > Category > Product).

### 7.3 Category Page (`/categories/[slug]`)
- Reuses the product listing component, pre-filtered by category.

### 7.4 Home Page (`/`)
- Hero banner section.
- Highlighted categories (with images/links).
- Featured/new arrivals section (subset of products, e.g. `tags` includes `"new"`).

### 7.5 Shared UI
- Header with logo, nav links to categories, search bar.
- Footer with basic links/info.
- Responsive mobile navigation (hamburger menu).
- Loading skeletons for product grids/images.

## 8. Folder Structure (Nuxt 3 standard, maintainable)

```
project-root/
├── app.vue
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── assets/
│   └── css/
│       └── main.css
├── public/
│   └── images/
│       └── products/
├── data/
│   ├── categories.json
│   └── products.json
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── MobileNav.vue
│   ├── product/
│   │   ├── ProductCard.vue
│   │   ├── ProductGrid.vue
│   │   ├── ProductGallery.vue
│   │   ├── ProductFilters.vue
│   │   ├── ProductSort.vue
│   │   └── RelatedProducts.vue
│   ├── category/
│   │   └── CategoryCard.vue
│   └── ui/
│       ├── BaseButton.vue
│       ├── BaseBadge.vue
│       ├── BaseInput.vue
│       ├── SkeletonCard.vue
│       └── Pagination.vue
├── composables/
│   ├── useProducts.ts        # data access layer (get/filter/sort products)
│   ├── useCategories.ts      # data access layer for categories
│   └── useProductFilters.ts  # filter/sort/search state logic
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── products/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── categories/
│   │   └── [slug].vue
│   └── about.vue
├── types/
│   └── product.ts            # TypeScript interfaces (Product, Category)
├── utils/
│   └── formatPrice.ts        # e.g. IDR currency formatting
└── error.vue                 # custom 404 / error page
```

### Structure conventions
- **`composables/`** is the single data-access layer. All pages/components read product/category data through composables (e.g. `useProducts()`), never by importing the JSON directly. This keeps the future swap to a real API isolated to the composables layer.
- **`types/`** holds shared TypeScript interfaces (`Product`, `Category`, `FilterState`) used across composables and components.
- **`components/`** grouped by domain (`product`, `category`, `layout`, `ui`) rather than flat, for maintainability as the app grows.
- Use `<script setup lang="ts">` in all components/pages.
- Use auto-imports provided by Nuxt (no manual import of composables/components needed).

## 9. TypeScript Interfaces (example)

```ts
// types/product.ts
export interface Category {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  categoryId: string
  description: string
  price: number
  currency: string
  images: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  inStock: boolean
  createdAt: string
}

export interface FilterState {
  categoryIds: string[]
  sizes: string[]
  colors: string[]
  minPrice: number | null
  maxPrice: number | null
  query: string
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name-asc'
}
```

## 10. Non-Functional Requirements
- **Performance:** Lighthouse performance score ≥ 90 on product listing and detail pages.
- **SEO:** Use `useSeoMeta` / `useHead` per page for title, description, and Open Graph tags.
- **Accessibility:** Semantic HTML, alt text on all product images, keyboard-navigable filters/menus.
- **Responsiveness:** Mobile-first design; must work well at 375px, 768px, and 1280px+ widths.
- **Code quality:** ESLint + Prettier configured; consistent naming conventions (PascalCase components, camelCase composables/functions).
- **Maintainability:** No business logic inside `.vue` template files beyond simple bindings — logic lives in composables/utils.

## 11. Deliverables
1. A working Nuxt 3 project matching the folder structure above.
2. Static JSON seed data with at least 8–12 sample products across at least 3 categories, with placeholder images.
3. All pages/routes listed in Section 6 implemented and functional.
4. Responsive, styled UI using Tailwind CSS.
5. README with setup instructions (`install`, `dev`, `build`, `preview`).

## 12. Future Enhancements (not required now, but design should not block these)
- Replace static JSON data layer with a real API/headless CMS (Strapi, Sanity, etc.) — only the `composables/` layer should need changes.
- Add shopping cart and checkout flow.
- Add i18n (Bahasa Indonesia / English toggle).
- Add wishlist/favorites (local storage based).
- Add admin dashboard for managing products.
