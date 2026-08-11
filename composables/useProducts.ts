import type { Product } from '~/types/product'
import rawProducts from '~/data/products.json'

let cached: Product[] | null = null

export function useProducts() {
  const products = cached ?? (cached = rawProducts as Product[])

  function getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug)
  }

  function getProductsByCategory(categoryId: string): Product[] {
    return products.filter((product) => product.categoryId === categoryId)
  }

  function getFeatured(limit: number = 4): Product[] {
    return products
      .filter((product) => product.tags.includes('best-seller'))
      .slice(0, limit)
  }

  function getNewArrivals(limit: number = 4): Product[] {
    return [...products]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit)
  }

  function getRelated(product: Product, limit: number = 4): Product[] {
    return products
      .filter(
        (candidate) =>
          candidate.categoryId === product.categoryId &&
          candidate.id !== product.id &&
          candidate.inStock,
      )
      .slice(0, limit)
  }

  return {
    products,
    getProductBySlug,
    getProductsByCategory,
    getFeatured,
    getNewArrivals,
    getRelated,
  }
}
