import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Star, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Product } from '../types'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [qty, setQty] = useState(1)
  const { lang, addToCart } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => {
    if (!slug) return
    supabase.from('products').select('*, category:categories(*)').eq('slug', slug).single().then(({ data }) => {
      if (data) {
        setProduct(data as Product)
        supabase.from('products').select('*, category:categories(*)').eq('category_id', data.category_id).neq('id', data.id).limit(4).then(({ data: rel }) => { if (rel) setRelated(rel as Product[]) })
      }
    })
  }, [slug])

  if (!product) return <div style={{ paddingTop: 88, textAlign: 'center', padding: 120 }}><p style={{ color: 'var(--text-light)' }}>{t('در حال بارگذاری...', 'Loading...')}</p></div>

  const formatPrice = (price: number) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(price)
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0

  return (
    <div style={{ paddingTop: 88 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, color: 'var(--text-light)' }}>
          <Link to="/" style={{ color: 'var(--text-light)' }}>{t('صفحه اصلی', 'Home')}</Link><ArrowRight size={14} />
          <Link to="/products" style={{ color: 'var(--text-light)' }}>{t('محصولات', 'Products')}</Link><ArrowRight size={14} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lang === 'fa' ? product.name_fa : product.name_en}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, marginBottom: 64 }}>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bone-100)', position: 'relative', aspectRatio: '1' }}>
            <img src={product.image_url} alt={lang === 'fa' ? product.name_fa : product.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {product.original_price && <div style={{ position: 'absolute', top: 16, right: 16, background: '#dc2626', color: '#fff', padding: '4px 12px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>{discount}%-</div>}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {product.is_bestseller && <span style={{ padding: '2px 10px', borderRadius: 6, background: '#fef2f2', color: '#dc2626', fontSize: 12, fontWeight: 600 }}>{t('پرفروش', 'Bestseller')}</span>}
              {product.is_new && <span style={{ padding: '2px 10px', borderRadius: 6, background: '#eff6ff', color: '#2563eb', fontSize: 12, fontWeight: 600 }}>{t('جدید', 'New')}</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>{lang === 'fa' ? product.name_fa : product.name_en}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map((i) => <Star key={i} size={16} fill={i <= Math.floor(product.rating) ? '#f59e0b' : 'var(--bone-200)'} color={i <= Math.floor(product.rating) ? '#f59e0b' : 'var(--bone-200)'} />)}</div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: 'var(--text-light)' }}>({product.review_count} {t('نظر', 'reviews')})</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{product.description}</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--accent-dark)' }}>{formatPrice(product.price)} {t('تومان', 'Toman')}</div>
              {product.original_price && <div style={{ fontSize: 16, color: 'var(--text-light)', textDecoration: 'line-through' }}>{formatPrice(product.original_price)} {t('تومان', 'Toman')}</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t('تعداد', 'Quantity')}:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bone-100)', color: 'var(--text-secondary)', fontSize: 18, fontWeight: 700 }}>-</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bone-100)', color: 'var(--text-secondary)', fontSize: 18, fontWeight: 700 }}>+</button>
              </div>
            </div>
            <button onClick={() => addToCart({ product_id: product.id, quantity: qty, name_fa: product.name_fa, price: product.price, image_url: product.image_url })}
              style={{ width: '100%', padding: 14, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))', color: '#fff', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'var(--transition)', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }}>
              <ShoppingCart size={20} />{t('افزودن به سبد خرید', 'Add to Cart')}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
              {[{ icon: Shield, text: t('ضمانت اصالت', 'Authenticity') }, { icon: Truck, text: t('ارسال سریع', 'Fast Delivery') }, { icon: RotateCcw, text: t('بازگشت کالا', 'Returns') }].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 12, borderRadius: 8, background: 'var(--bone-50)' }}>
                  <item.icon size={18} color="var(--accent-dark)" /><span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{t('محصولات مشابه', 'Related Products')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} style={{ background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'var(--transition)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ height: 160, background: 'var(--bone-100)' }}><img src={p.image_url} alt={lang === 'fa' ? p.name_fa : p.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>
                  <div style={{ padding: 12 }}><h3 style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>{lang === 'fa' ? p.name_fa : p.name_en}</h3><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-dark)' }}>{formatPrice(p.price)}</div></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
