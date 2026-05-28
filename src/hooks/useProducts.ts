import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loadLikedProductIds,
  loadProducts,
  saveLikedProductIds,
  saveProducts,
} from '../lib/storage'
import type { Product } from '../types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => loadProducts())
  const [likedProductIds, setLikedProductIds] = useState<string[]>(() =>
    loadLikedProductIds(),
  )

  useEffect(() => {
    saveProducts(products)
  }, [products])

  useEffect(() => {
    saveLikedProductIds(likedProductIds)
  }, [likedProductIds])

  const addProduct = useCallback((product: Product) => {
    setProducts((currentProducts) => [product, ...currentProducts])
  }, [])

  const getProduct = useCallback(
    (productId: string | undefined) =>
      products.find((product) => product.id === productId),
    [products],
  )

  const toggleLike = useCallback((productId: string) => {
    setLikedProductIds((currentIds) => {
      const isLiked = currentIds.includes(productId)
      return isLiked
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId]
    })

    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== productId) {
          return product
        }

        const isLiked = likedProductIds.includes(productId)
        return {
          ...product,
          likes: Math.max(0, product.likes + (isLiked ? -1 : 1)),
        }
      }),
    )
  }, [likedProductIds])

  const likedProducts = useMemo(
    () =>
      products.filter((product) => likedProductIds.includes(product.id)),
    [likedProductIds, products],
  )

  return {
    products,
    likedProductIds,
    likedProducts,
    addProduct,
    getProduct,
    toggleLike,
  }
}
