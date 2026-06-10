import { Headphones, Watch, Zap, HardDrive, Cable } from 'lucide-react'
import { useStore } from '../hooks/useStore'

const categoryData = [
  { icon: Headphones, name_fa: 'هنذفری و هدست', name_en: 'Headphones & Headset', desc_fa: 'بی‌سیم، نویزکنسلینگ، گیمینگ', desc_en: 'Wireless, ANC, Gaming', color: '#22c55e' },
  { icon: Watch, name_fa: 'ساعت هوشمند', name_en: 'Smartwatch', desc_fa: 'اندروید و iOS، سنسور سلامتی', desc_en: 'Android & iOS, Health Sensors', color: '#3b82f6' },
  { icon: Zap, name_fa: 'شارژر', name_en: 'Chargers', desc_fa: 'دیواری، فندکی، پاوربانک', desc_en: 'Wall, Car, Powerbank', color: '#f59e0b' },
  { icon: HardDrive, name_fa: 'فلش و کارت حافظه', name_en: 'Flash & Memory', desc_fa: 'تا ۱ ترابایت، سرعت بالا', desc_en: 'Up to 1TB, High Speed', color: '#8b5cf6' },
  { icon: Cable, name_fa: 'کابل شارژ', name_en: 'Cables', desc_fa: 'تایپ‌سی، لایتنینگ، میکرو', desc_en: 'Type-C, Lightning, Micro', color: '#ec4899' },
]

export default function Categories() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 50, background: 'var(--accent-light)', color: 'var(--accent-dark)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t('دسته‌بندی‌ها', 'Categories')}</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'var(--text-primary)' }}>{t('چی می‌فروشیم؟', 'What do we sell?')}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {categoryData.map((cat, i) => (
            <div key={i} className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center', border: '1px solid var(--border)', transition: 'var(--transition)', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = cat.color + '40' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: cat.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <cat.icon size={28} color={cat.color} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{t(cat.name_fa, cat.name_en)}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>{t(cat.desc_fa, cat.desc_en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
