import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../hooks/useStore'
import type { Article } from '../types'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const { lang } = useStore()
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  useEffect(() => { supabase.from('articles').select('*').order('published_at', { ascending: false }).then(({ data }) => { if (data) setArticles(data as Article[]) }) }, [])

  return (
    <div style={{ paddingTop: 88 }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 8 }}>{t('مقالات و راهنمای خرید', 'Articles & Buying Guides')}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>{t('راهنمای خرید و مقالات تخصصی درباره گجت‌های دیجیتال', 'Buying guides and expert articles about digital gadgets')}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {articles.map((article) => (
            <article key={article.id} id={article.slug} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {article.image_url && <div style={{ height: 240, background: 'var(--bone-100)', overflow: 'hidden' }}><img src={article.image_url} alt={lang === 'fa' ? article.title_fa : article.title_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, color: 'var(--text-light)', fontSize: 12 }}><Clock size={12} />{new Date(article.published_at).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}{article.author && <span style={{ marginInlineStart: 12 }}>{article.author}</span>}</div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>{lang === 'fa' ? article.title_fa : article.title_en}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>{article.excerpt}</p>
                  {article.content && <div style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 14 }}>{article.content}</div>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
