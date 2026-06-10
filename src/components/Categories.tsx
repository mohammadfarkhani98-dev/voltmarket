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

export default function Categories() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 160
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section style={{ padding: '40px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* هدر */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('دسته‌بندی محصولات', 'Product Categories')}
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => scroll('left')}
              style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => scroll('right')}
              style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* اسلایدر */}
        <div 
          ref={sliderRef}
          style={{ 
            display: 'flex', 
            gap: 16, 
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
                width: 140,
                scrollSnapAlign: 'start',
                cursor: 'pointer'
              }}
            >
              {/* عکس - متوسط */}
              <div style={{ 
                width: 140, 
                height: 140, 
                borderRadius: 16, 
                overflow: 'hidden',
                background: '#f5f5f5',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={cat.image} 
                  alt={t(cat.name_fa, cat.name_en)}
                  style={{ 
                    width: '85%', 
                    height: '85%', 
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              {/* نام */}
              <div style={{ 
                textAlign: 'center', 
                fontWeight: 600, 
                fontSize: 13, 
                color: 'var(--text-primary)',
                lineHeight: 1.4
              }}>
                {t(cat.name_fa, cat.name_en)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
