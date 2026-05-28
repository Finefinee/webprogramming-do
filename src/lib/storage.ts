import type { Product } from '../types/product'

const PRODUCTS_KEY = 'dsm-market-products-v1'
const LIKED_PRODUCTS_KEY = 'dsm-market-liked-products-v1'

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage

export const loadProducts = (): Product[] => {
  if (!canUseStorage()) {
    return []
  }

  try {
    const rawProducts = window.localStorage.getItem(PRODUCTS_KEY)
    if (!rawProducts) {
      return []
    }

    const products = JSON.parse(rawProducts)
    return Array.isArray(products) ? products : []
  } catch {
    return []
  }
}

export const saveProducts = (products: Product[]) => {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export const loadLikedProductIds = (): string[] => {
  if (!canUseStorage()) {
    return []
  }

  try {
    const rawIds = window.localStorage.getItem(LIKED_PRODUCTS_KEY)
    if (!rawIds) {
      return []
    }

    const ids = JSON.parse(rawIds)
    return Array.isArray(ids) ? ids : []
  } catch {
    return []
  }
}

export const saveLikedProductIds = (ids: string[]) => {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(ids))
}
