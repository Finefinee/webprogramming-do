import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'
import type { Product } from '../types/product'

interface ProductState {
  products: Product[]
  likedProductIds: string[]
}

interface ProductActions {
  addProduct: (product: Product) => void
  getProduct: (productId: string | undefined) => Product | undefined
  toggleLike: (productId: string) => void
}

const initialProductState: ProductState = {
  products: [],
  likedProductIds: [],
}

export const useProductStore = create(
  persist(
    combine(
      initialProductState,
      (set, get): ProductActions => ({
        addProduct: (product) => {
          set((state) => ({
            products: [product, ...state.products],
          }))
        },

        getProduct: (productId) =>
          get().products.find((product) => product.id === productId),

        toggleLike: (productId) => {
          const { likedProductIds } = get()
          const isLiked = likedProductIds.includes(productId)

          set((state) => ({
            likedProductIds: isLiked
              ? state.likedProductIds.filter((id) => id !== productId)
              : [...state.likedProductIds, productId],
            products: state.products.map((product) => {
              if (product.id !== productId) {
                return product
              }

              return {
                ...product,
                likes: Math.max(0, product.likes + (isLiked ? -1 : 1)),
              }
            }),
          }))
        },
      }),
    ),
    {
      name: 'ds-market-store-v1',
      partialize: (state) => ({
        products: state.products,
        likedProductIds: state.likedProductIds,
      }),
    },
  ),
)
