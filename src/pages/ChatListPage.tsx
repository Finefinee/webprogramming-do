import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'

export const ChatListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const hasSearchTerm = searchTerm.trim().length > 0

  return (
    <>
      <Header title="대소마켓">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="채팅 상대, 상품명 검색"
        />
      </Header>
      <div className="px-5 py-5">
        <EmptyState
          title={hasSearchTerm ? '검색 결과가 없어요' : '아직 채팅이 없어요'}
          description={
            hasSearchTerm
              ? '다른 검색어로 채팅을 찾아보세요'
              : '관심 있는 상품에서 채팅을 시작해보세요'
          }
          action={
            <Link to="/">
              <Button>상품 둘러보기</Button>
            </Link>
          }
        />
      </div>
    </>
  )
}
