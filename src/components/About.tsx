import { Shield, Truck, HeadphonesIcon } from 'lucide-react'
import { useStore } from '../hooks/useStore'

export default function About() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 50, background: 'var(--accent-light)', color: 'var(--accent-dark)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t('درباره ما', 'About Us')}</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{t('ولت مارکت — اعتماد می‌فروشیم', 'Volt Market — We Sell Trust')}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>{t('ولت مارکت از ۱۴۰۲ شروع کرد با یه هدف ساده: گجت‌های اصلی و باکیفیت رو با قیمت درست به دست همه برسونه. ما واسطه نیستیم، اعتماد می‌فروشیم.', "Volt Market started in 2024 with a simple goal: deliver genuine, quality gadgets at fair prices. We're not middlemen — we sell trust.")}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Shield, title_fa: 'ضمانت اصالت کالا', title_en: 'Authenticity Guarantee', desc_fa: 'همه محصولات اورجینال و دارای گارانتی', desc_en: 'All products original with warranty' },
                { icon: Truck, title_fa: 'ارسال سریع', title_en: 'Fast Delivery', desc_fa: 'ارسال به سراسر ایران', desc_en: 'Nationwide delivery' },
                { icon: HeadphonesIcon, title_fa: 'پشتیبانی ۲۴/۷', title_en: '24/7 Support', desc_fa: 'تیم پشتیبانی همیشه در دسترس', desc_en: 'Support team always available' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={22} color="var(--accent-dark)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{t(item.title_fa, item.title_en)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{t(item.desc_fa, item.desc_en)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, var(--mint-800), var(--mint-600))', borderRadius: 'var(--radius-lg)', padding: '48px 32px', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>V</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Volt Market</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>{t('تکنولوژی رو درست انتخاب کن', 'Choose Tech Right')}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32 }}>
              <div><div style={{ fontSize: 28, fontWeight: 800 }}>500+</div><div style={{ fontSize: 11, opacity: 0.6 }}>{t('محصول', 'Products')}</div></div>
              <div><div style={{ fontSize: 28, fontWeight: 800 }}>10K+</div><div style={{ fontSize: 11, opacity: 0.6 }}>{t('مشتری', 'Customers')}</div></div>
              <div><div style={{ fontSize: 28, fontWeight: 800 }}>98%</div><div style={{ fontSize: 11, opacity: 0.6 }}>{t('رضایت', 'Satisfaction')}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
