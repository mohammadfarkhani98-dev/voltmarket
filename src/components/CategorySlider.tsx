import { useRef } from 'react'
import { useStore } from '../hooks/useStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { id: 1, name_fa: 'هنذفری', name_en: 'Headphones', image: '/images/categories/headphones.jpg' },
  { id: 2, name_fa: 'ساعت هوشمند', name_en: 'Smartwatches', image: '/images/categories/smartwatch.jpg' },
  { id: 3, name_fa: 'پاوربانک', name_en: 'Power Banks', image: '/images/categories/powerbank.jpg' },
  { id: 4, name_fa: 'فلش مموری', name_en: 'Flash Drives', image: '/images/categories/flashdrive.jpg' },
  { id: 5, name_fa: 'کابل شارژ', name_en: 'Cables', image: '/images/categories/cable.jpg' },
  { id: 6, name_fa: 'کیف و کاور', name_en: 'Cases', image: '/images/categories/case.jpg' },
]

export default function CategorySlider() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 280
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section style={{ padding: '60px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* هدر */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('دسته‌بندی محصولات', 'Product Categories')}
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => scroll('left')}
              style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* اسلایدر */}
        <div 
          ref={sliderRef}
          style={{ 
            display: 'flex', 
            gap: 20, 
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: 8
          }}
        >
          {categories.map((cat) => (
            <div 
              key={cat.id}
              style={{ 
                flex: '0 0 auto',
                width: 240,
                scrollSnapAlign: 'start',
                cursor: 'pointer'
              }}
            >
              {/* عکس */}
              <div style={{ 
                width: '100%', 
                height: 240, 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                marginBottom: 12
              }}>
                <img 
                  src={cat.image} 
                  alt={t(cat.name_fa, cat.name_en)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="240"%3E%3Crect width="240" height="240" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3E' + t(cat.name_fa, cat.name_en) + '%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              {/* نام */}
              <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>
                {t(cat.name_fa, cat.name_en)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
