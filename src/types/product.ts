export const CATEGORIES = [
  '전체',
  '전공서적',
  '전자기기',
  '교복/의류',
  '기숙사',
  '생활용품',
  '무료나눔',
] as const

export const PRODUCT_CATEGORIES = CATEGORIES.filter(
  (category) => category !== '전체',
) as ProductCategory[]

export const CONDITIONS = ['새 상품', '거의 새 것', '사용감 있음'] as const

export const LOCATIONS = [
  '실습동 1층',
  '실습동 2층',
  '실습동 3층',
  '모듈러동 1층',
  '모듈러동 2층',
  '시청각실',
  '기숙사 2층',
  '기숙사 3층',
  '기타 직접 입력',
] as const

export type Category = (typeof CATEGORIES)[number]
export type ProductCategory = Exclude<Category, '전체'>
export type ProductCondition = (typeof CONDITIONS)[number]
export type ProductStatus = '판매중' | '예약중' | '거래완료'

export interface Seller {
  id: string
  nickname: string
  verified: boolean
}

export interface Product {
  id: string
  title: string
  price: number
  category: ProductCategory
  status: ProductStatus
  condition: ProductCondition
  location: string
  availableTime: string
  seller: Seller
  description: string
  image: string
  images: string[]
  createdAt: string
  likes: number
  chats: number
}

export interface ProductFormValues {
  title: string
  price: string
  category: '' | ProductCategory
  condition: '' | ProductCondition
  location: string
  customLocation: string
  availableTime: string
  description: string
  images: string[]
}
