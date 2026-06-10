import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useStore } from '../hooks/useStore'
import { supabase } from '../lib/supabase'

export default function CartModal() {
  const { showCartModal, setShowCartModal, cart, updateQuantity, removeFromCart, clearCart, cartTotal, lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)
  const total = cartTotal()

  if (!showCartModal) return null

  const formatPrice = (price: number) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(price)

  const handleCheckout = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) { setShowCartModal(false); useStore.getState().setShowAuthModal(true); return }
    const { data: order } = await supabase.from('orders').insert({ user_id: user.user.id, total_price: total, status: 'pending' }).select().single()
    if (order) {
      const items = cart.map((c) => ({ order_id: order.id, product_id: c.product_id, product_name: c.name_fa, price: c.price, quantity: c.quantity }))
      await supabase.from('order_items').insert(items)
      clearCart()
      alert(t('سفارش شما ثبت شد!', 'Your order has been placed!'))
      setShowCartModal(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: lang === 'fa' ? 'left' : 'right' }} onClick={(e) => { if (e.target === e.currentTarget) setShowCartModal(false) }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 420, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ShoppingBag size={20} color="var(--accent-dark)" /><h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('سبد خرید', 'Shopping Cart')} ({cart.length})</h3></div>
          <button onClick={() => setShowCartModal(false)} style={{ color: 'var(--text-light)', padding: 4 }}><X size={20} /></button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-light)' }}><ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} /><p style={{ fontSize: 15, fontWeight: 500 }}>{t('سبد خرید خالی است', 'Cart is empty')}</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((item) => (
                <div key={item.product_id} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <img src={item.image_url} alt={item.name_fa} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{item.name_fa}</h4>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-dark)', marginBottom: 8 }}>{formatPrice(item.price)} {t('تومان', 'Toman')}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', background: '#fff' }}><Minus size={14} /></button>
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', background: '#fff' }}><Plus size={14} /></button>
                      <button onClick={() => removeFromCart(item.product_id)} style={{ marginRight: 'auto', color: '#dc2626', padding: 4 }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t('جمع کل', 'Total')}:</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-dark)' }}>{formatPrice(total)} {t('تومان', 'Toman')}</span>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))', color: '#fff', fontWeight: 700, fontSize: 15, transition: 'var(--transition)' }}>{t('ثبت سفارش', 'Place Order')}</button>
          </div>
        )}
      </div>
    </div>
  )
}
