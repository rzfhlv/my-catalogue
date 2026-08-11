export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export type SortBy = 'newest' | 'price-asc' | 'price-desc' | 'name-asc'

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
  sortBy: SortBy
}
