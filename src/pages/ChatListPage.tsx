import { Link } from 'react-router'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'

export const ChatListPage = () => (
  <>
    <Header title="채팅" />
    <div className="px-5 py-5">
      <EmptyState
        title="아직 채팅이 없어요"
        description="관심 있는 상품에서 채팅을 시작해보세요"
        action={
          <Link to="/">
            <Button>상품 둘러보기</Button>
          </Link>
        }
      />
    </div>
  </>
)
