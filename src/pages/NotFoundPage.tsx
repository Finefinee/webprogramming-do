import { Link } from 'react-router'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'

export const NotFoundPage = () => (
  <>
    <Header title="대소마켓" />
    <div className="px-5 py-5">
      <EmptyState
        title="페이지를 찾을 수 없어요"
        description="주소를 다시 확인하거나 홈으로 이동해주세요"
        action={
          <Link to="/">
            <Button>홈으로 이동</Button>
          </Link>
        }
      />
    </div>
  </>
)
