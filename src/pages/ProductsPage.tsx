import { useSearchParams } from 'react-router-dom'

// نمونه محصولات
const products = [
  {
    id: 1,
    name_fa: 'هندزفری بلوتوثی انکر Soundcore R60i NC',
    name_en: 'Anker Soundcore R60i NC Bluetooth Earbuds',
    price: 4760000,
    image: '/images/products/soundcore-r60i.jpg',
    category: 'headphones',
    rating: 4.8,
    isNew: true
  }
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lang = 'fa'
  
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)
  
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'popular'

  const filters = [
    { id: 'all', label_fa: 'همه', label_en: 'All' },
    { id: 'popular', label_fa: 'محبوب‌ترین', label_en: 'Popular' },
    { id: 'newest', label_fa: 'جدیدترین', label_en: 'Newest' },
    { id: 'cheapest', label_fa: 'ارزان‌ترین', label_en: 'Cheapest' },
    { id: 'expensive', label_fa: 'گران‌ترین', label_en: 'Most Expensive' },
  ]

  const handleFilterChange = (filterId: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (filterId === 'all') {
      newParams.delete('sort')
    } else {
      newParams.set('sort', filterId)
    }
    setSearchParams(newParams)
  }

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, marginBottom: 8 }}>
        {t('همه محصولات', 'All Products')}
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        {t('گجت‌های دیجیتال باکیفیت و اورجینال', 'Quality & Original Digital Gadgets')}
      </p>

      <div style={{ 
        display: 'flex', 
        gap: 8, 
        marginBottom: 32,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        paddingBottom: 4
      }}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            style={{
              padding: '8px 20px',
              borderRadius: 50,
              border: 'none',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: (sort === filter.id || (filter.id === 'all' && !sort)) 
                ? 'var(--mint-500)' 
                : 'var(--bg-secondary)',
              color: (sort === filter.id || (filter.id === 'all' && !sort)) 
                ? '#fff' 
                : 'var(--text-primary)',
              transition: 'all 0.2s'
            }}
          >
            {t(filter.label_fa, filter.label_en)}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: 20 
      }}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: '1px solid var(--border)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* عکس محصول - هم‌سایز با کادر */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1 / 1', // مربع
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={product.image} 
                alt={t(product.name_fa, product.name_en)}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' // هم‌سایز با کادر
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              {product.isNew && (
                <span style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'var(--mint-500)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600
                }}>
                  {t('جدید', 'New')}
                </span>
              )}
            </div>

            {/* اطلاعات محصول */}
            <div style={{ padding: 16 }}>
              <h3 style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                marginBottom: 8,
                lineHeight: 1.4,
                minHeight: 40
              }}>
                {t(product.name_fa, product.name_en)}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ 
                  fontSize: 16, 
                  fontWeight: 800, 
                  color: 'var(--mint-600)' 
                }}>
                  {formatPrice(product.price)}
                </span>
                
                <span style={{ 
                  fontSize: 12, 
                  color: 'var(--text-secondary)' 
                }}>
                  ⭐ {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
