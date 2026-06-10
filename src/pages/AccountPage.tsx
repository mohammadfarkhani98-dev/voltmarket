import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Package, LogOut, Settings } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Order, Profile } from '../types'

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [tab, setTab] = useState<'orders' | 'profile'>('orders')
  const navigate = useNavigate()
  const { lang, setShowAuthModal } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { setShowAuthModal(true); navigate('/'); return }
      supabase.from('profiles').select('*').eq('id', data.user.id).single().then(({ data: prof }) => { if (prof) setProfile(prof as Profile) })
      supabase.from('orders').select('*').eq('user_id', data.user.id).order('created_at', { ascending: false }).then(({ data: ords }) => { if (ords) setOrders(ords as Order[]) })
    })
  }, [navigate, setShowAuthModal])

  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/') }
  const formatPrice = (price: number) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(price)
  const statusLabels: Record<string, { fa: string; en: string; color: string }> = { pending: { fa: 'در انتظار بررسی', en: 'Pending', color: '#f59e0b' }, processing: { fa: 'در حال پردازش', en: 'Processing', color: '#3b82f6' }, shipped: { fa: 'ارسال شده', en: 'Shipped', color: '#8b5cf6' }, delivered: { fa: 'تحویل داده شده', en: 'Delivered', color: '#22c55e' } }

  return (
    <div style={{ paddingTop: 88 }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 32 }}>{t('حساب کاربری', 'My Account')}</h1>
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={28} color="var(--accent-dark)" /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{profile?.full_name || t('کاربر', 'User')}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{profile?.phone || '-'}</div>
              {profile?.role && profile.role !== 'customer' && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: profile.role === 'admin' ? '#fef2f2' : '#eff6ff', color: profile.role === 'admin' ? '#dc2626' : '#2563eb', fontWeight: 600 }}>{profile.role.toUpperCase()}</span>}
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', fontWeight: 600, fontSize: 13 }}><LogOut size={16} />{t('خروج', 'Logout')}</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button onClick={() => setTab('orders')} style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: tab === 'orders' ? 'var(--accent)' : 'var(--bone-100)', color: tab === 'orders' ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Package size={16} />{t('سفارشات', 'Orders')}</button>
          <button onClick={() => setTab('profile')} style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: tab === 'profile' ? 'var(--accent)' : 'var(--bone-100)', color: tab === 'profile' ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Settings size={16} />{t('تنظیمات', 'Settings')}</button>
        </div>
        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-light)' }}><Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} /><p>{t('هنوز سفارشی ثبت نکردید', 'No orders yet')}</p><Link to="/products" style={{ color: 'var(--accent-dark)', fontWeight: 600, marginTop: 12, display: 'inline-block' }}>{t('مشاهده محصولات', 'View Products')}</Link></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {orders.map((order) => { const st = statusLabels[order.status] || statusLabels.pending; return (
                  <div key={order.id} style={{ background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div><div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t('سفارش', 'Order')} #{order.id.slice(0, 8)}</div><div style={{ fontSize: 12, color: 'var(--text-light)' }}>{new Date(order.created_at).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ padding: '4px 12px', borderRadius: 6, background: st.color + '15', color: st.color, fontSize: 12, fontWeight: 600 }}>{t(st.fa, st.en)}</span><span style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(order.total_price)} {t('تومان', 'Toman')}</span></div>
                  </div>
                )})}
              </div>
            )}
          </div>
        )}
        {tab === 'profile' && <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: 24 }}><p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t('برای ویرایش اطلاعات حساب کاربری خود، از تنظیمات Supabase Auth استفاده کنید.', 'To edit your account information, use Supabase Auth settings.')}</p></div>}
      </div>
    </div>
  )
}
