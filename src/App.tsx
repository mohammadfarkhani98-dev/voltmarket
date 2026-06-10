import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import AuthModal from './components/AuthModal'
import CartModal from './components/CartModal'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ArticlesPage from './pages/ArticlesPage'
import AccountPage from './pages/AccountPage'
import CategorySlider from './components/CategorySlider'
import { useStore } from './hooks/useStore'

function App() {
  const lang = useStore((s) => s.lang)

  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
      <CategorySlider />
      <Footer />
      <MobileNav />
      <AuthModal />
      <CartModal />
    </div>
  )
}

export default App
