import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { ProfileCard } from '../components/ProfileCard'
import { SearchBar } from '../components/SearchBar'
import { useProductsContext } from '../hooks/useProductsContext'
import { currentUser } from '../lib/user'
import type { Product } from '../types/product'

const menus = [
  { label: '학교 인증 정보', icon: ShieldCheck },
  { label: '알림 설정', icon: Bell },
  { label: '이용 안내', icon: HelpCircle },
  { label: '로그아웃', icon: LogOut },
]

export const MyPage = () => {
  const { products, likedProductIds, likedProducts } = useProductsContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [notice, setNotice] = useState('')
  const normalizedTerm = searchTerm.trim().toLowerCase()

  const myProducts = useMemo(
    () => products.filter((product) => product.seller.id === currentUser.id),
    [products],
  )
  const filteredMyProducts = useMemo(
    () =>
      myProducts.filter((product) => matchesProductSearch(product, searchTerm)),
    [myProducts, searchTerm],
  )
  const filteredLikedProducts = useMemo(
    () =>
      likedProducts.filter((product) =>
        matchesProductSearch(product, searchTerm),
      ),
    [likedProducts, searchTerm],
  )
  const isSearching = normalizedTerm.length > 0

  const handleMenuClick = (label: string) => {
    setNotice(`${label} 기능은 준비 중입니다.`)
    window.setTimeout(() => setNotice(''), 1800)
  }

  return (
    <>
      <Header title="대소마켓">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="내 상품, 찜한 상품 검색"
        />
      </Header>
      <div className="space-y-6 px-5 py-5">
        <ProfileCard />

        {notice ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-900">
            {notice}
          </div>
        ) : null}

        <section>
          <SectionTitle
            title="내가 등록한 상품"
            count={filteredMyProducts.length}
          />
          {filteredMyProducts.length > 0 ? (
            <div className="rounded-3xl border border-gray-100 px-4">
              {filteredMyProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked={likedProductIds.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={isSearching ? '검색 결과가 없어요' : '등록한 상품이 없어요'}
              description={
                isSearching
                  ? '내가 등록한 상품에서 다른 검색어로 찾아보세요'
                  : '기숙사와 교실에서 쓰지 않는 물건을 올려보세요'
              }
            />
          )}
        </section>

        <section>
          <SectionTitle title="찜한 상품" count={filteredLikedProducts.length} />
          {filteredLikedProducts.length > 0 ? (
            <div className="rounded-3xl border border-gray-100 px-4">
              {filteredLikedProducts.map((product) => (
                <ProductCard key={product.id} product={product} isLiked />
              ))}
            </div>
          ) : (
            <EmptyState
              title={isSearching ? '검색 결과가 없어요' : '찜한 상품이 없어요'}
              description={
                isSearching
                  ? '찜한 상품에서 다른 검색어로 찾아보세요'
                  : '관심 있는 상품을 찜하면 여기에서 모아볼 수 있어요'
              }
            />
          )}
        </section>

        <section>
          <SectionTitle title="거래 내역" count={0} />
          <EmptyState
            title="아직 거래 내역이 없어요"
            description="첫 교내 거래를 시작해보세요"
          />
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white">
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-4">
            <Settings size={18} className="text-blue-900" />
            <h2 className="text-base font-black tracking-normal text-gray-950">
              설정
            </h2>
          </div>
          <div>
            {menus.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleMenuClick(label)}
                className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-4 text-left last:border-b-0 hover:bg-gray-50"
              >
                <Icon size={19} className="text-gray-500" />
                <span className="flex-1 text-sm font-bold text-gray-800">
                  {label}
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

const matchesProductSearch = (product: Product, searchTerm: string) => {
  const normalizedTerm = searchTerm.trim().toLowerCase()

  if (!normalizedTerm) {
    return true
  }

  return [
    product.title,
    product.category,
    product.location,
    product.description,
    product.seller.nickname,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedTerm)
}

interface SectionTitleProps {
  title: string
  count: number
}

const SectionTitle = ({ title, count }: SectionTitleProps) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-lg font-black tracking-normal text-gray-950">{title}</h2>
    <span className="text-2xl font-black leading-none text-blue-900">
      {count}
    </span>
  </div>
)
