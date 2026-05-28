import { createContext } from 'react'
import type { useProducts } from './useProducts'

export type ProductsContextValue = ReturnType<typeof useProducts>

export const ProductsContext = createContext<ProductsContextValue | null>(null)
