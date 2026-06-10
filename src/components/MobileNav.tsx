import { useNavigate, useLocation } from 'react-router-dom'
import { Home, User, Package, ShoppingCart } from 'lucide-react'
import { useStore } from '../hooks/useStore'

export default function MobileNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, cartCount } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)
  const count = cartCount()

  const navItems = [
    { icon: Home, label: t('صفحه اصلی', 'Home'), path: '/' },
    { icon: User, label: t('حساب کاربری', 'Account'), path: '/account' },
    { icon: Package, label: t('پیگیری سفارش', 'Track Order'), path: '/account' },
    { icon: ShoppingCart, label: t('سبد خرید', 'Cart'), action: 'cart' as const },
  ]

  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 64, padding: '0 8px' }} className="mobile-nav">
      {navItems.map((item, i) => {
        const isActive = item.path === location.pathname
        return (
          <button key={i} onClick={() => { if (item.action === 'cart') useStore.getState().setShowCartModal(true); else if (item.path) navigate(item.path) }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 12px', borderRadius: 8, background: 'none', color: isActive ? 'var(--accent-dark)' : 'var(--text-light)', transition: 'var(--transition)', position: 'relative', fontSize: 10, fontWeight: isActive ? 600 : 400 }}>
            <item.icon size={20} />
            <span>{item.label}</span>
            {item.action === 'cart' && count > 0 && <span style={{ position: 'absolute', top: 0, right: 4, background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}
          </button>
        )
      })}
      <style>{`@media (min-width: 769px) { .mobile-nav { display: none !important; } }`}</style>
    </nav>
  )
}
