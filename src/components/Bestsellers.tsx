import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Product } from '../types'

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const { lang, addToCart } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => {
    supabase.from('products').select('*, category:categories(*)').eq('is_bestseller', true).order('sort_order').then(({ data }) => { if (data) setProducts(data as Product[]) })
  }, [])

  const scroll = (dir: number) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' }) }
  const formatPrice = (price: number) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(price)
  const discount = (price: number, original: number) => Math.round(((original - price) / original) * 100)

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 50, background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t('پرفروش‌ترین‌ها', 'Bestsellers')}</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800 }}>{t('پرفروش‌ترین کالاها', 'Bestselling Products')}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => scroll(lang === 'fa' ? 1 : -1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: 'var(--text-secondary)' }}><ChevronRight size={18} /></button>
            <button onClick={() => scroll(lang === 'fa' ? -1 : 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: 'var(--text-secondary)' }}><ChevronLeft size={18} /></button>
          </div>
        </div>

        <div ref={scrollRef} style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 16, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {products.map((product) => (
            <div key={product.id} className="fade-up" style={{ minWidth: 260, maxWidth: 260, scrollSnapAlign: 'start', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <Link to={`/products/${product.slug}`}>
                <div style={{ height: 200, background: 'var(--bone-100)', position: 'relative', overflow: 'hidden' }}>
                  <img src={product.image_url} alt={lang === 'fa' ? product.name_fa : product.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }} loading="lazy" />
                  {product.original_price && <div style={{ position: 'absolute', top: 12, right: 12, background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{discount(product.price, product.original_price)}%-</div>}
                </div>
              </Link>
              <div style={{ padding: 16 }}>
                <Link to={`/products/${product.slug}`}><h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, lineHeight: 1.5, minHeight: 40, color: 'var(--text-primary)' }}>{lang === 'fa' ? product.name_fa : product.name_en}</h3></Link>
                <p style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 12, lineHeight: 1.4 }}>{product.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}><Star size={14} fill="#f59e0b" color="#f59e0b" /><span style={{ fontSize: 12, fontWeight: 600 }}>{product.rating}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent-dark)' }}>{formatPrice(product.price)}</div>
                    {product.original_price && <div style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'line-through' }}>{formatPrice(product.original_price)}</div>}
                    <div style={{ fontSize: 10, color: 'var(--text-light)' }}>{t('تومان', 'Toman')}</div>
                  </div>
                  <button onClick={() => addToCart({ product_id: product.id, quantity: 1, name_fa: product.name_fa, price: product.price, image_url: product.image_url })}
                    style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-dark)', transition: 'var(--transition)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent-dark)' }}>
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 50, background: '#fef2f2', color: '#dc2626', fontWeight: 600, fontSize: 14, transition: 'var(--transition)' }}>{t('مشاهده همه', 'View All')}</Link>
        </div>
      </div>
    </section>
  )
}
