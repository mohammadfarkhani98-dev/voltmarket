import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, lang } = useStore()
  const [mode, setMode] = useState<'login' | 'register'>('register')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  if (!showAuthModal) return null

  const handleAuth = async () => {
    setError(''); setSuccess(''); setLoading(true)
    try {
      const email = `${phone}@voltmarket.app`
      if (mode === 'register') {
        const { error: regError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name, phone } } })
        if (regError) throw regError
        setSuccess(t('ثبت‌نام موفق! وارد شدید.', 'Registration successful!'))
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
        setSuccess(t('وارد شدید!', 'Logged in!'))
      }
      setTimeout(() => { setShowAuthModal(false); setSuccess('') }, 1500)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message.includes('Invalid') ? t('شماره یا رمز اشتباه است', 'Invalid phone or password') : message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setShowAuthModal(false) }}>
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 32, width: '100%', maxWidth: 420, position: 'relative' }}>
        <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: 16, left: 16, color: 'var(--text-light)', padding: 4 }}><X size={20} /></button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--mint-500), var(--mint-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20, margin: '0 auto 12px' }}>V</div>
          <h3 style={{ fontSize: 20, fontWeight: 700 }}>{mode === 'register' ? t('ثبت‌نام', 'Register') : t('ورود', 'Login')}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>{t('نام کامل', 'Full Name')}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('نام خود را وارد کنید', 'Enter your name')} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'var(--transition)' }} onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>{t('شماره تلفن', 'Phone Number')}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09123456789" dir="ltr" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 14, fontFamily: 'inherit', outline: 'none', textAlign: lang === 'fa' ? 'right' : 'left', transition: 'var(--transition)' }} onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>{t('رمز عبور', 'Password')}</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('رمز عبور خود را وارد کنید', 'Enter your password')} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'var(--transition)' }} onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', top: 10, left: 12, color: 'var(--text-light)', padding: 0 }}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          {error && <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', fontSize: 13 }}>{error}</div>}
          {success && <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--mint-50)', color: 'var(--mint-700)', fontSize: 13 }}>{success}</div>}
          <button onClick={handleAuth} disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))', color: '#fff', fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1, transition: 'var(--transition)' }}>{loading ? t('لطفاً صبر کنید...', 'Please wait...') : mode === 'register' ? t('ثبت‌نام', 'Register') : t('ورود', 'Login')}</button>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)' }}>
            {mode === 'register' ? (
              <span>{t('حساب دارید؟', 'Have an account?')} <button onClick={() => { setMode('login'); setError('') }} style={{ color: 'var(--accent-dark)', fontWeight: 600, fontSize: 13 }}>{t('وارد شوید', 'Login')}</button></span>
            ) : (
              <span>{t('حساب ندارید؟', "Don't have an account?")} <button onClick={() => { setMode('register'); setError('') }} style={{ color: 'var(--accent-dark)', fontWeight: 600, fontSize: 13 }}>{t('ثبت‌نام کنید', 'Register')}</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
