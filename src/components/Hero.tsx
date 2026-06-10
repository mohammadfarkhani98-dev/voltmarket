import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'

export default function Hero() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f1a12 0%, #1a2e1c 40%, #0d1f10 100%)', overflow: 'hidden', paddingTop: 72 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: `radial-gradient(circle at 25% 25%, var(--mint-400) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--mint-400) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15), transparent 70%)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%)', filter: 'blur(80px)' }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 16px' }}>
        {/* عنوان اصلی - یک خطی */}
        <h1 style={{ 
          fontSize: 'clamp(22px, 5vw, 56px)', 
          fontWeight: 900, 
          color: '#fff', 
          lineHeight: 1.2, 
          marginBottom: 20, 
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {t('گجت‌هایی که زندگی رو راحت‌تر می‌کنن', 'Gadgets that make life easier')}
        </h1>

        <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
          {t('هنذفری، ساعت هوشمند، فلش مموری و هرچی برای زندگی دیجیتالیت لازم داری — با قیمت مناسب و ارسال سریع', 'Headphones, smartwatches, flash drives & everything for your digital life — at fair prices with fast delivery')}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 28px', borderRadius: 50, background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))', color: '#fff', fontWeight: 600, fontSize: 14, transition: 'var(--transition)', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }}>
            {t('مشاهده محصولات', 'View Products')} <span style={{ fontSize: 16 }}>←</span>
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            { num: '500+', label: t('محصول', 'Products') },
            { num: '10K+', label: t('مشتری', 'Customers') },
            { num: '24h', label: t('ارسال', 'Delivery') },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--mint-400)' }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  )
}
