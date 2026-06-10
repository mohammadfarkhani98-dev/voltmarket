import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react'
import { useStore } from '../hooks/useStore'
import { supabase } from '../lib/supabase'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, cartCount, setShowAuthModal, setShowCartModal } = useStore()
  const navigate = useNavigate()
  const count = cartCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  const navLinks = [
    { label: t('صفحه اصلی', 'Home'), href: '/' },
    { label: t('محصولات', 'Products'), href: '/products' },
    { label: t('مقالات', 'Articles'), href: '/articles' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'var(--transition)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, var(--mint-500), var(--mint-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18 }}>V</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: scrolled ? 'var(--text-primary)' : '#fff' }}>Volt Market</div>
            <div style={{ fontSize: 10, color: scrolled ? 'var(--mint-600)' : 'var(--mint-300)', fontWeight: 500 }}>{t('تکنولوژی رو درست انتخاب کن', 'Choose Tech Right')}</div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} style={{ fontSize: 14, fontWeight: 500, color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)', transition: 'var(--transition)' }}>{link.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: scrolled ? 'var(--bone-100)' : 'rgba(255,255,255,0.15)', color: scrolled ? 'var(--text-secondary)' : '#fff', fontSize: 12, fontWeight: 500, transition: 'var(--transition)' }}>
            <Globe size={14} />{lang === 'fa' ? 'EN' : 'فا'}
          </button>
          <button onClick={() => setShowCartModal(true)} style={{ position: 'relative', padding: 8, borderRadius: 'var(--radius-sm)', background: scrolled ? 'var(--bone-100)' : 'rgba(255,255,255,0.15)', color: scrolled ? 'var(--text-secondary)' : '#fff', transition: 'var(--transition)' }}>
            <ShoppingCart size={20} />
            {count > 0 && <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}
          </button>
          <button onClick={() => { supabase.auth.getUser().then(({ data }) => { if (data.user) navigate('/account'); else setShowAuthModal(true) }) }} style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: scrolled ? 'var(--bone-100)' : 'rgba(255,255,255,0.15)', color: scrolled ? 'var(--text-secondary)' : '#fff', transition: 'var(--transition)' }}>
            <User size={20} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: scrolled ? 'var(--bone-100)' : 'rgba(255,255,255,0.15)', color: scrolled ? 'var(--text-secondary)' : '#fff', transition: 'var(--transition)', display: 'none' }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '16px 0' }} className="mobile-menu">
          <div className="container">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{link.label}</Link>
            ))}
          </div>
        </div>
      )}

      <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }`}</style>
    </header>
  )
}
