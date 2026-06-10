import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Article } from '../types'

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => {
    supabase.from('articles').select('*').order('published_at', { ascending: false }).limit(3).then(({ data }) => { if (data) setArticles(data as Article[]) })
  }, [])

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 50, background: '#fefce8', color: '#ca8a04', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t('مقالات', 'Articles')}</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800 }}>{t('آخرین مقالات', 'Latest Articles')}</h2>
          </div>
          <Link to="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--accent-dark)' }}>{t('مشاهده همه', 'View All')}<ArrowLeft size={16} /></Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {articles.map((article) => (
            <Link key={article.id} to={`/articles#${article.slug}`} className="fade-up" style={{ display: 'block', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ height: 180, background: 'var(--bone-100)', overflow: 'hidden' }}>
                {article.image_url && <img src={article.image_url} alt={lang === 'fa' ? article.title_fa : article.title_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: 'var(--text-light)', fontSize: 12 }}><Clock size={12} />{new Date(article.published_at).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.5, color: 'var(--text-primary)' }}>{lang === 'fa' ? article.title_fa : article.title_en}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
