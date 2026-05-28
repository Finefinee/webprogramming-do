import type { ReactNode } from 'react'
import { ProductsContext } from './productsContext'
import { useProducts } from './useProducts'

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const value = useProducts()

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
