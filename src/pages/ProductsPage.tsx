import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Product, Category } from '../types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { lang, addToCart } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => { supabase.from('categories').select('*').order('sort_order').then(({ data }) => { if (data) setCategories(data as Category[]) }) }, [])

  useEffect(() => {
    setLoading(true)
    let query = supabase.from('products').select('*, category:categories(*)').order('sort_order')
    if (selectedCategory) query = query.eq('category_id', selectedCategory)
    query.then(({ data }) => { if (data) setProducts(data as Product[]); setLoading(false) })
  }, [selectedCategory])

  const formatPrice = (price: number) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(price)
  const discount = (price: number, original: number) => Math.round(((original - price) / original) * 100)

  return (
    <div style={{ paddingTop: 88 }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 8 }}>{t('همه محصولات', 'All Products')}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>{t('گجت‌های دیجیتال باکیفیت و اورجینال', 'Quality genuine digital gadgets')}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
          <Filter size={18} color="var(--text-light)" />
          <button onClick={() => setSelectedCategory(null)} style={{ padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, background: !selectedCategory ? 'var(--accent)' : 'var(--bone-100)', color: !selectedCategory ? '#fff' : 'var(--text-secondary)', transition: 'var(--transition)' }}>{t('همه', 'All')}</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, background: selectedCategory === cat.id ? 'var(--accent)' : 'var(--bone-100)', color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)', transition: 'var(--transition)' }}>{lang === 'fa' ? cat.name_fa : cat.name_en}</button>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-light)' }}>{t('در حال بارگذاری...', 'Loading...')}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {products.map((product) => (
              <div key={product.id} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'var(--transition)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <Link to={`/products/${product.slug}`}>
                  <div style={{ height: 200, background: 'var(--bone-100)', position: 'relative', overflow: 'hidden' }}>
                    <img src={product.image_url} alt={lang === 'fa' ? product.name_fa : product.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    {product.original_price && <div style={{ position: 'absolute', top: 12, right: 12, background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{discount(product.price, product.original_price)}%-</div>}
                    {product.is_new && <div style={{ position: 'absolute', top: 12, left: 12, background: '#2563eb', color: '#fff', padding: '2px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{t('جدید', 'New')}</div>}
                  </div>
                </Link>
                <div style={{ padding: 16 }}>
                  <Link to={`/products/${product.slug}`}><h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, lineHeight: 1.5, minHeight: 40 }}>{lang === 'fa' ? product.name_fa : product.name_en}</h3></Link>
                  <p style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 12 }}>{product.description}</p>
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
        )}
      </div>
    </div>
  )
}
