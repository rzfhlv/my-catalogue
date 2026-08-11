import type { Category } from '~/types/product'
import rawCategories from '~/data/categories.json'

let cached: Category[] | null = null

export function useCategories() {
  const categories = cached ?? (cached = rawCategories as Category[])

  function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((category) => category.slug === slug)
  }

  function getCategoryById(id: string): Category | undefined {
    return categories.find((category) => category.id === id)
  }

  return {
    categories,
    getCategoryBySlug,
    getCategoryById,
  }
}
