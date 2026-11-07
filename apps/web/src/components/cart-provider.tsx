'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { menuItems } from '@/lib/menu-data';

export type CartCustomization = {
  optionIds: string[];
  optionLabels: string[];
  unitSupplement: number;
};
export type CartLine = { itemId: string; quantity: number; customization?: CartCustomization };

type CartValue = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  addItem: (itemId: string, quantity?: number, customization?: CartCustomization) => void;
  setQuantity: (itemId: string, quantity: number, optionIds?: string[]) => void;
  removeItem: (itemId: string, optionIds?: string[]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const prices = new Map(menuItems.map((item) => [item.id, Number.parseFloat(item.price)]));

function optionKey(optionIds?: string[]) {
  return (optionIds ?? []).slice().sort().join('|');
}

function lineKey(line: Pick<CartLine, 'itemId' | 'customization'>) {
  return `${line.itemId}::${optionKey(line.customization?.optionIds)}`;
}

function validQuantity(quantity: unknown): quantity is number {
  return Number.isInteger(quantity) && (quantity as number) > 0;
}

function sanitizeCustomization(value: unknown): CartCustomization | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const customization = value as Partial<CartCustomization>;
  if (!Array.isArray(customization.optionIds) || !Array.isArray(customization.optionLabels)) return undefined;
  const unitSupplement = Number.isFinite(customization.unitSupplement) && (customization.unitSupplement ?? 0) >= 0 ? customization.unitSupplement ?? 0 : 0;
  return {
    optionIds: customization.optionIds.filter((entry): entry is string => typeof entry === 'string'),
    optionLabels: customization.optionLabels.filter((entry): entry is string => typeof entry === 'string'),
    unitSupplement,
  };
}

function toLine(value: unknown): CartLine | null {
  if (!value || typeof value !== 'object') return null;
  const line = value as { itemId?: unknown; quantity?: unknown; customization?: unknown };
  if (typeof line.itemId !== 'string' || !prices.has(line.itemId) || !validQuantity(line.quantity)) return null;
  const customization = sanitizeCustomization(line.customization);
  return customization ? { itemId: line.itemId, quantity: line.quantity, customization } : { itemId: line.itemId, quantity: line.quantity };
}

function mergeLines(lines: CartLine[]) {
  const merged: CartLine[] = [];
  for (const line of lines) {
    const existing = merged.find((candidate) => lineKey(candidate) === lineKey(line));
    if (existing) existing.quantity += line.quantity;
    else merged.push({ ...line });
  }
  return merged;
}

function readSavedLines(raw: string) {
  const parsed = JSON.parse(raw) as unknown;
  const source = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === 'object' && Array.isArray((parsed as { lines?: unknown }).lines)
      ? (parsed as { lines: unknown[] }).lines
      : [];
  return mergeLines(source.flatMap((line) => {
    const next = toLine(line);
    return next ? [next] : [];
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('savoraille-cart');
      setLines(saved ? readSavedLines(saved) : []);
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem('savoraille-cart', JSON.stringify({ version: 4, lines }));
  }, [lines, ready]);

  const value = useMemo<CartValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + ((prices.get(line.itemId) ?? 0) + (line.customization?.unitSupplement ?? 0)) * line.quantity, 0),
    addItem: (itemId, quantity = 1, customization) => setLines((current) => {
      if (!prices.has(itemId) || quantity <= 0) return current;
      const next = customization ? { itemId, quantity, customization } : { itemId, quantity };
      const existing = current.find((line) => lineKey(line) === lineKey(next));
      return existing
        ? current.map((line) => lineKey(line) === lineKey(next) ? { ...line, quantity: line.quantity + quantity, customization } : line)
        : [...current, next];
    }),
    setQuantity: (itemId, quantity, optionIds) => setLines((current) => {
      const key = `${itemId}::${optionKey(optionIds)}`;
      return quantity <= 0
        ? current.filter((line) => lineKey(line) !== key)
        : current.map((line) => lineKey(line) === key ? { ...line, quantity } : line);
    }),
    removeItem: (itemId, optionIds) => setLines((current) => current.filter((line) => lineKey(line) !== `${itemId}::${optionKey(optionIds)}`)),
    clearCart: () => setLines([]),
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
