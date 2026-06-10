export interface Category {
  id: string;
  name_fa: string;
  name_en: string;
  slug: string;
  icon: string;
  description: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name_fa: string;
  name_en: string;
  slug: string;
  category_id: string;
  price: number;
  original_price: number | null;
  image_url: string;
  description: string | null;
  is_bestseller: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  stock: number;
  sort_order: number;
  category?: Category;
}

export interface Article {
  id: string;
  title_fa: string;
  title_en: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  author: string | null;
  published_at: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  name_fa: string;
  price: number;
  image_url: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  shipping_address: string | null;
  phone: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin' | 'seo';
  created_at: string;
}
