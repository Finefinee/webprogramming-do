import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { ProductsProvider } from './hooks/ProductsProvider'
import { ChatDetailPage } from './pages/ChatDetailPage'
import { ChatListPage } from './pages/ChatListPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { MyPage } from './pages/MyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { SellPage } from './pages/SellPage'

//이 부분은 App 컴포넌트입니다. 라우팅과 레이아웃을 설정하는 곳이에요. 각 페이지 컴포넌트를 라우트로 연결해주고, ProductsProvider로 감싸서 제품 관련 상태를 관리할 수 있도록 했어요. 필요에 따라 페이지를 추가하거나 수정할 수 있습니다. 

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/chat" element={<ChatListPage />} />
            <Route path="/chat/:id" element={<ChatDetailPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default App
