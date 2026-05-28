import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/Button'
import { CategoryChips } from '../components/CategoryChips'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { useProductsContext } from '../hooks/useProductsContext'
import type { Category } from '../types/product'

export const HomePage = () => {
  const { products, likedProductIds } = useProductsContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === '전체' || product.category === selectedCategory
      const matchesSearch =
        !normalizedTerm ||
        [
          product.title,
          product.category,
          product.location,
          product.description,
          product.seller.nickname,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedTerm)

      return matchesCategory && matchesSearch
    })
  }, [products, searchTerm, selectedCategory])

  const hasProducts = products.length > 0

  return (
    <>
      <Header title="대소마켓">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </Header>

      <div className="space-y-5 px-5 py-5">
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black tracking-normal text-gray-950">
                교내 상품
              </h2>
              <p className="text-xs font-medium text-gray-500">
                직접 등록한 상품만 목록에 표시됩니다
              </p>
            </div>
            {hasProducts ? (
              <span className="text-sm font-bold text-blue-900">
                {filteredProducts.length}개
              </span>
            ) : null}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked={likedProductIds.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                hasProducts
                  ? '검색 결과가 없어요'
                  : '아직 등록된 상품이 없어요'
              }
              description={
                hasProducts
                  ? '다른 검색어나 카테고리로 다시 찾아보세요'
                  : '첫 번째 상품을 등록해보세요'
              }
              action={
                <Link to="/sell">
                  <Button>
                    <Plus size={18} />
                    판매 등록하기
                  </Button>
                </Link>
              }
            />
          )}
        </section>
      </div>

    </>
  )
}
