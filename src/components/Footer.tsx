import { Phone, Mail, MapPin, MessageCircle, Camera, Video, Send } from 'lucide-react'
import { useStore } from '../hooks/useStore'

export default function Footer() {
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  return (
    <footer style={{ background: 'var(--bone-900)', color: 'var(--bone-300)', padding: '64px 0 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('پشتیبانی مشتری', 'Customer Support')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Phone, text: '051-91096285', label: t('تلفن', 'Phone') },
                { icon: MessageCircle, text: '051-91096285', label: t('واتساپ', 'WhatsApp') },
                { icon: Mail, text: 'hi@voltmarket.ir', label: t('ایمیل', 'Email') },
                { icon: MapPin, text: t('مشهد، بلوار احمدآباد، بهشت ۲، پلاک ۵', 'Mashhad, Ahmadabad Blvd, Behesht 2, No.5'), label: t('آدرس', 'Address') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <item.icon size={16} style={{ marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--bone-500)', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--bone-200)' }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('خدمات مشتریان', 'Customer Service')}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[t('پرسش‌های متداول', 'FAQ'), t('پیگیری سفارشات', 'Track Orders'), t('شرایط بازگردانی کالا', 'Return Policy'), t('شرایط خدمات و گارانتی', 'Warranty & Service'), t('محصولات', 'Products'), t('شکایات و پیشنهادات', 'Complaints'), t('خدمات پس از فروش', 'After-Sales')].map((item, i) => (
                <li key={i}><a href="#" style={{ fontSize: 13, color: 'var(--bone-400)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--bone-400)'}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('دسترسی سریع', 'Quick Access')}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[t('درباره ولت مارکت', 'About'), t('تماس با ما', 'Contact'), t('فرصت‌های شغلی', 'Careers'), t('راهنمای خرید', 'Buying Guide'), t('نظرسنجی خدمات پس از فروش', 'Survey')].map((item, i) => (
                <li key={i}><a href="#" style={{ fontSize: 13, color: 'var(--bone-400)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--bone-400)'}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{t('شبکه‌های اجتماعی', 'Social Media')}</h4>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              {[
                { icon: Camera, label: 'Instagram' },
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Video, label: 'YouTube' },
                { icon: Send, label: 'Telegram' },
              ].map((item, i) => (
                <a key={i} href="#" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bone-400)', transition: 'var(--transition)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--bone-400)' }}>
                  <item.icon size={18} />
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--mint-500), var(--mint-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>V</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Volt Market</div>
                <div style={{ fontSize: 10, color: 'var(--mint-500)' }}>{t('تکنولوژی رو درست انتخاب کن', 'Choose Tech Right')}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--bone-500)' }}>
          <div>&copy; 2024 Volt Market. {t('تمامی حقوق محفوظ است.', 'All rights reserved.')}</div>
          <div>voltmarket.com</div>
        </div>
      </div>
    </footer>
  )
}
