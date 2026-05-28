import type { Seller } from '../types/product'

export const currentUser: Seller = {
  id: 'dsm-current-student',
  nickname: 'DGSW 9기 학생',
  verified: true,
}

export const formatPrice = (price: number) => {
  if (price === 0) {
    return '무료나눔'
  }

  return `${price.toLocaleString('ko-KR')}원`
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
