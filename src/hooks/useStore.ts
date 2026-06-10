import { create } from 'zustand';
import type { CartItem } from '../types';

interface AppState {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (product_id: string) => void;
  updateQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showCartModal: boolean;
  setShowCartModal: (show: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  lang: 'fa',
  setLang: (lang) => set({ lang }),
  cart: JSON.parse(localStorage.getItem('volt_cart') || '[]'),
  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find((c) => c.product_id === item.product_id);
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map((c) =>
        c.product_id === item.product_id
          ? { ...c, quantity: c.quantity + item.quantity }
          : c
      );
    } else {
      newCart = [...cart, item];
    }
    localStorage.setItem('volt_cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  removeFromCart: (product_id) => {
    const newCart = get().cart.filter((c) => c.product_id !== product_id);
    localStorage.setItem('volt_cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  updateQuantity: (product_id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(product_id);
      return;
    }
    const newCart = get().cart.map((c) =>
      c.product_id === product_id ? { ...c, quantity } : c
    );
    localStorage.setItem('volt_cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  clearCart: () => {
    localStorage.removeItem('volt_cart');
    set({ cart: [] });
  },
  cartCount: () => get().cart.reduce((sum, c) => sum + c.quantity, 0),
  cartTotal: () => get().cart.reduce((sum, c) => sum + c.price * c.quantity, 0),
  showAuthModal: false,
  setShowAuthModal: (show) => set({ showAuthModal: show }),
  showCartModal: false,
  setShowCartModal: (show) => set({ showCartModal: show }),
}));
