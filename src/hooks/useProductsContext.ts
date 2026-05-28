import { useContext } from 'react'
import { ProductsContext } from './productsContext'

export const useProductsContext = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProductsContext must be used inside ProductsProvider')
  }

  return context
}
