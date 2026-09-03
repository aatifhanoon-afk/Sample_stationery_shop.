import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface UIContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  detailProductId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState<string | null>(null);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openDetail = useCallback((id: string) => setDetailProductId(id), []);
  const closeDetail = useCallback(() => setDetailProductId(null), []);

  return (
    <UIContext.Provider
      value={{ cartOpen, openCart, closeCart, detailProductId, openDetail, closeDetail }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
