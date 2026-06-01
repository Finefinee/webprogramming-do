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
