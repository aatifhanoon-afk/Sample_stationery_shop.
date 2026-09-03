import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem, Order, StoreInfo } from '../types';
import { SEED_PRODUCTS, SEED_STORE_INFO } from '../data/seed';

const STORAGE_KEYS = {
  products: 'pp_products',
  cart: 'pp_cart',
  orders: 'pp_orders',
  storeInfo: 'pp_storeInfo',
  seeded: 'pp_seeded',
};

interface StoreContextValue {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  storeInfo: StoreInfo;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleOutOfStock: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(SEED_STORE_INFO);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seeded = localStorage.getItem(STORAGE_KEYS.seeded);
    if (!seeded) {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(SEED_PRODUCTS));
      localStorage.setItem(STORAGE_KEYS.storeInfo, JSON.stringify(SEED_STORE_INFO));
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.seeded, 'true');
      setProducts(SEED_PRODUCTS);
      setCart([]);
      setOrders([]);
      setStoreInfo(SEED_STORE_INFO);
    } else {
      setProducts(loadFromStorage(STORAGE_KEYS.products, SEED_PRODUCTS));
      setCart(loadFromStorage(STORAGE_KEYS.cart, []));
      setOrders(loadFromStorage(STORAGE_KEYS.orders, []));
      setStoreInfo(loadFromStorage(STORAGE_KEYS.storeInfo, SEED_STORE_INFO));
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }, [products, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders, ready]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleOutOfStock = useCallback((id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, outOfStock: !p.outOfStock, stock: p.outOfStock ? p.stock : 0 } : p))
    );
  }, []);

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center bg-cream-50" />;
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        storeInfo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleOutOfStock,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
