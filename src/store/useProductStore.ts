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

// 상품 데이터와 찜 상태를 전역에서 사용할 수 있도록 Zustand store를 생성한다.
// create: React 컴포넌트에서 사용할 수 있는 커스텀 훅 형태의 store를 만든다.
export const useProductStore = create(
  // persist: 새로고침 후에도 상품 목록과 찜 목록이 유지되도록 localStorage에 저장한다.
  persist(
    // combine: 초기 상태(initialProductState)와 상태를 변경하는 액션들을 하나의 store로 합친다.
    combine(
      initialProductState,
      (set, get): ProductActions => ({
        // 새 상품을 등록할 때 사용하는 액션이다.
        // 기존 상품 배열 앞에 새 상품을 추가해서 최신 등록 상품이 목록 상단에 보이게 한다.
        addProduct: (product) => {
          set((state) => ({
            products: [product, ...state.products],
          }))
        },

        // 상품 상세 페이지에서 URL의 productId로 특정 상품을 찾을 때 사용한다.
        // get()으로 현재 store 상태를 읽고, products 배열에서 id가 같은 상품을 반환한다.
        getProduct: (productId) =>
          get().products.find((product) => product.id === productId),

        // 찜 버튼을 눌렀을 때 찜 추가/해제를 한 번에 처리하는 액션이다.
        toggleLike: (productId) => {
          // 현재 사용자가 찜한 상품 id 목록을 가져온다.
          const { likedProductIds } = get()
          // 이미 찜한 상품이면 true, 아직 찜하지 않은 상품이면 false가 된다.
          const isLiked = likedProductIds.includes(productId)

          set((state) => ({
            // 이미 찜한 상품이면 목록에서 제거하고, 아니면 목록 끝에 productId를 추가한다.
            likedProductIds: isLiked
              ? state.likedProductIds.filter((id) => id !== productId)
              : [...state.likedProductIds, productId],
            // 상품 카드와 상세 페이지에 표시되는 찜 개수도 함께 갱신한다.
            products: state.products.map((product) => {
              // 선택한 상품이 아니면 기존 상품 데이터를 그대로 유지한다.
              if (product.id !== productId) {
                return product
              }

              return {
                ...product,
                // 찜 해제 시 likes가 음수가 되지 않도록 Math.max로 최소값을 0으로 제한한다.
                likes: Math.max(0, product.likes + (isLiked ? -1 : 1)),
              }
            }),
          }))
        },
      }),
    ),
    {
      // localStorage에 저장될 key 이름이다.
      name: 'ds-market-store-v1',
      partialize: (state) => ({
        products: state.products,
        likedProductIds: state.likedProductIds,
      }),
    },
  ),
)
