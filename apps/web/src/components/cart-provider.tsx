'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { menuSections } from './summer-menu-experience';

type CartLine = { itemId: string; quantity: number };
type CartValue = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  addItem: (itemId: string, quantity?: number) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const prices = new Map(menuSections.flatMap((section) => section.items.map((item) => [item.id, Number.parseFloat(item.price)])));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('savoraille-cart');
      if (saved) {
        const parsed = JSON.parse(saved) as CartLine[];
        setLines(parsed.filter((line) => prices.has(line.itemId) && Number.isInteger(line.quantity) && line.quantity > 0));
      }
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem('savoraille-cart', JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + (prices.get(line.itemId) ?? 0) * line.quantity, 0),
    addItem: (itemId, quantity = 1) => setLines((current) => {
      const existing = current.find((line) => line.itemId === itemId);
      return existing
        ? current.map((line) => line.itemId === itemId ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { itemId, quantity }];
    }),
    setQuantity: (itemId, quantity) => setLines((current) => quantity <= 0
      ? current.filter((line) => line.itemId !== itemId)
      : current.map((line) => line.itemId === itemId ? { ...line, quantity } : line)),
    removeItem: (itemId) => setLines((current) => current.filter((line) => line.itemId !== itemId)),
    clearCart: () => setLines([]),
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
