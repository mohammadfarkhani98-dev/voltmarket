import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Truck, Shield, HeadphonesIcon } from 'lucide-react'

// نمونه محصولات
const products = [
  {
    id: 1,
    name_fa: 'هندزفری بلوتوثی انکر Soundcore R60i NC',
    name_en: 'Anker Soundcore R60i NC Bluetooth Earbuds',
    price: 4760000,
    originalPrice: 5500000,
    image: '/images/products/soundcore-r60i.jpg',
    category: 'headphones',
    rating: 4.8,
    reviews: 128,
    isNew: true,
    inStock: true,
    description_fa: 'هدفون بلوتوثی Anker R60i NC یک گزینه کارآمد و خوش‌ساخت برای کاربری است که به کیفیت صدا، حذف نویز مؤثر و امکانات روز دنیای صوتی نیاز دارد. این مدل در دسته هدفون‌های توگوشی (Earbud) قرار می‌گیرد و با بهره‌گیری از درایوهای ۱۱ میلی‌متری، صدایی شفاف، قدرتمند و متعادل در بازه فرکانسی ۲۰ تا ۲۰۰۰۰ هرتز ارائه می‌دهد. یکی از ویژگی‌های برجسته این هدفون، پشتیبانی از نویز کنسلینگ فعال (ANC) است که با فناوری Adaptive ANC تا سه برابر توانیایی بهتری در حذف نویز محیطی نسبت به مدل‌های معمول ...',
    description_en: 'Anker Soundcore R60i NC Bluetooth Earbuds with excellent sound quality and active noise cancellation. 35-hour battery and ergonomic design.',
    features: [
      { icon: Shield, title_fa: 'ضمانت اصالت', title_en: 'Authenticity' },
      { icon: Truck, title_fa: 'ارسال سریع', title_en: 'Fast Delivery' },
      { icon: HeadphonesIcon, title_fa: 'پشتیبانی ۲۴/۷', title_en: '24/7 Support' }
    ],
    specs: [
      { label_fa: 'نوع هدفون، هدست و هندزفری', value_fa: 'تو گوشی (Earbud/Earphone)' },
      { label_fa: 'اقلام همراه هدفون، هندزفری و هدست', value_fa: 'کابل شارژ، محفظه شارژ، پد گوشی یدکی' },
      { label_fa: 'منبع انرژی', value_fa: 'باتری قابل شارژ' },
      { label_fa: 'پاسخ فرکانسی', value_fa: '۲۰-۲۰۰۰۰ هرتز' },
      { label_fa: 'قابلیت نویز کنسلینگ', value_fa: 'نویز کنسلینگ فعال (ANC)' },
      { label_fa: 'قطر درایور', value_fa: '۱۱ میلی‌متر' },
      { label_fa: 'ویژگی‌های خاص', value_fa: 'نشانگر LED، پشتیبانی از فرمان لمسی' },
      { label_fa: 'محدوده عملکرد', value_fa: '۱۰ متر' },
      { label_fa: 'نوع گوشی', value_fa: 'دو گوشی' },
      { label_fa: 'عمر باتری محفظه شارژ', value_fa: '۵۰ ساعت' },
      { label_fa: 'زمان مورد نیاز برای شارژ محفظه', value_fa: '۱.۵ ساعت' },
      { label_fa: 'قابلیت‌های شارژ', value_fa: 'شارژ باسیم' },
      { label_fa: 'درگاه شارژ', value_fa: 'USB Type-C' },
      { label_fa: 'نسخه بلوتوث', value_fa: '۶.۱' },
      { label_fa: 'سایر مشخصات', value_fa: 'پشتیبانی از LDAC / پشتیبانی از Hi-Res Audio / دارای Adaptive ANC / پشتیبانی از Spatial Audio / دارای گواهی IP۵۵' },
      { label_fa: 'جنس بدنه', value_fa: 'پلاستیک' },
      { label_fa: 'نوع کابل', value_fa: 'USB Type-C' },
      { label_fa: 'نوع اتصال', value_fa: 'بی‌سیم' },
      { label_fa: 'رابط‌ها', value_fa: 'بلوتوث' },
      { label_fa: 'امپدانس', value_fa: '۱۴.۲ اهم' },
      { label_fa: 'مناسب برای', value_fa: 'کاربری عمومی' },
      { label_fa: 'قابلیت‌های مقاومتی', value_fa: 'مقاوم در برابر آب' },
    ]
  }
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const lang = 'fa'
  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en)

  const product = products.find(p => 
    p.id.toString() === slug
  ) || products[0]

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="container" style={{ padding: '24px 0 80px' }}>
      {/* دکمه برگشت */}
      <button 
        onClick={() => navigate(-1)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          marginBottom: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          color: 'var(--text-secondary)'
        }}
      >
        <ArrowLeft size={20} />
        {t('بازگشت', 'Back')}
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 40 
      }}>
        {/* عکس محصول */}
        <div style={{ 
          background: '#fff', 
          borderRadius: 24, 
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: '1 / 1'
        }}>
          <img 
            src={product.image} 
            alt={t(product.name_fa, product.name_en)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* اطلاعات محصول */}
        <div>
          {/* نام */}
          <h1 style={{ 
            fontSize: 'clamp(20px, 3vw, 28px)', 
            fontWeight: 800, 
            marginBottom: 12,
            lineHeight: 1.3
          }}>
            {t(product.name_fa, product.name_en)}
          </h1>

          {/* امتیاز */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            marginBottom: 16 
          }}>
            <Star size={18} fill="var(--mint-500)" color="var(--mint-500)" />
            <span style={{ fontWeight: 600 }}>{product.rating}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              ({product.reviews} {t('نظر', 'reviews')})
            </span>
          </div>

          {/* قیمت */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ 
                fontSize: 28, 
                fontWeight: 800, 
                color: 'var(--mint-600)' 
              }}>
                {new Intl.NumberFormat('fa-IR').format(product.price)} {t('تومان', 'Toman')}
              </span>
              {discount > 0 && (
                <span style={{ 
                  background: 'var(--mint-500)', 
                  color: '#fff', 
                  padding: '4px 8px', 
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {discount}% {t('تخفیف', 'OFF')}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span style={{ 
                textDecoration: 'line-through', 
                color: 'var(--text-secondary)',
                fontSize: 16
              }}>
                {new Intl.NumberFormat('fa-IR').format(product.originalPrice)} {t('تومان', 'Toman')}
              </span>
            )}
          </div>

          {/* ویژگی‌ها */}
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            marginBottom: 24,
            flexWrap: 'wrap'
          }}>
            {product.features.map((feature, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                padding: '8px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: 12
              }}>
                <feature.icon size={18} color="var(--mint-500)" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {t(feature.title_fa, feature.title_en)}
                </span>
              </div>
            ))}
          </div>

          {/* دکمه خرید */}
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))',
              color: '#fff',
              borderRadius: 50,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              marginBottom: 16
            }}
          >
            {t('افزودن به سبد خرید', 'Add to Cart')}
          </button>

          {/* وضعیت موجودی */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            color: product.inStock ? 'var(--mint-600)' : 'red'
          }}>
            <div style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: product.inStock ? 'var(--mint-500)' : 'red' 
            }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>
              {product.inStock ? t('موجود در انبار', 'In Stock') : t('ناموجود', 'Out of Stock')}
            </span>
          </div>
        </div>
      </div>

      {/* توضیحات */}
      <div style={{ marginTop: 40, padding: '24px 0', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          {t('معرفی', 'Introduction')}
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          lineHeight: 1.8, 
          fontSize: 15,
          maxWidth: 800
        }}>
          {t(product.description_fa, product.description_en)}
        </p>
      </div>

      {/* مشخصات فنی */}
      <div style={{ marginTop: 24, padding: '24px 0', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          {t('مشخصات', 'Specifications')}
        </h2>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 0
        }}>
          {product.specs.map((spec, i) => (
            <div key={i} style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '12px 16px',
              background: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                {spec.label_fa}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, textAlign: 'right' }}>
                {spec.value_fa}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
