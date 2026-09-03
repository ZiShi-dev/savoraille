'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { menuSections } from './summer-menu-experience';

export type CartMenu = { id: string; name: string };
export type CartCustomization = {
  optionIds: string[];
  optionLabels: string[];
  unitSupplement: number;
};
export type CartLine = { menuId: string; itemId: string; quantity: number; customization?: CartCustomization };

type PersistedCart = {
  version: 2 | 3;
  menus: CartMenu[];
  lines: CartLine[];
  activeMenuId: string;
};

type CartValue = {
  menus: CartMenu[];
  activeMenuId: string;
  lines: CartLine[];
  itemCount: number;
  total: number;
  setActiveMenu: (menuId: string) => void;
  createMenu: (name: string) => string;
  renameMenu: (menuId: string, name: string) => void;
  deleteMenu: (menuId: string) => void;
  addItem: (itemId: string, quantity?: number, menuId?: string, customization?: CartCustomization) => void;
  setQuantity: (menuId: string, itemId: string, quantity: number) => void;
  removeItem: (menuId: string, itemId: string) => void;
  clearCart: () => void;
};

const DEFAULT_MENU: CartMenu = { id: 'menu-default', name: 'Mon menu' };
const CartContext = createContext<CartValue | null>(null);
const prices = new Map(menuSections.flatMap((section) => section.items.map((item) => [item.id, Number.parseFloat(item.price)])));

function validLine(line: Partial<CartLine>): line is CartLine {
  return typeof line.menuId === 'string' && prices.has(line.itemId ?? '') && Number.isInteger(line.quantity) && (line.quantity ?? 0) > 0;
}

function sanitizeLine(line: CartLine): CartLine {
  const customization = line.customization;
  if (!customization || !Array.isArray(customization.optionIds) || !Array.isArray(customization.optionLabels)) return { menuId: line.menuId, itemId: line.itemId, quantity: line.quantity };
  const unitSupplement = Number.isFinite(customization.unitSupplement) && customization.unitSupplement >= 0 ? customization.unitSupplement : 0;
  return {
    menuId: line.menuId,
    itemId: line.itemId,
    quantity: line.quantity,
    customization: {
      optionIds: customization.optionIds.filter((value): value is string => typeof value === 'string'),
      optionLabels: customization.optionLabels.filter((value): value is string => typeof value === 'string'),
      unitSupplement,
    },
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<CartMenu[]>([DEFAULT_MENU]);
  const [activeMenuId, setActiveMenuId] = useState(DEFAULT_MENU.id);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('savoraille-cart');
      if (saved) {
        const parsed = JSON.parse(saved) as PersistedCart | { itemId: string; quantity: number }[];
        if (Array.isArray(parsed)) {
          setMenus([DEFAULT_MENU]);
          setActiveMenuId(DEFAULT_MENU.id);
          setLines(parsed.map((line) => ({ ...line, menuId: DEFAULT_MENU.id })).filter(validLine));
        } else if ((parsed.version === 2 || parsed.version === 3) && Array.isArray(parsed.menus) && parsed.menus.length > 0) {
          const restoredMenus = parsed.menus.filter((menu) => typeof menu.id === 'string' && typeof menu.name === 'string' && menu.name.trim());
          const safeMenus = restoredMenus.length > 0 ? restoredMenus : [DEFAULT_MENU];
          const menuIds = new Set(safeMenus.map((menu) => menu.id));
          setMenus(safeMenus);
          setActiveMenuId(menuIds.has(parsed.activeMenuId) ? parsed.activeMenuId : safeMenus[0]!.id);
          setLines(parsed.lines.filter((line) => menuIds.has(line.menuId)).filter(validLine).map(sanitizeLine));
        }
      }
    } catch {
      setMenus([DEFAULT_MENU]);
      setActiveMenuId(DEFAULT_MENU.id);
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const persisted: PersistedCart = { version: 3, menus, lines, activeMenuId };
    window.localStorage.setItem('savoraille-cart', JSON.stringify(persisted));
  }, [activeMenuId, lines, menus, ready]);

  const value = useMemo<CartValue>(() => ({
    menus,
    activeMenuId,
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + ((prices.get(line.itemId) ?? 0) + (line.customization?.unitSupplement ?? 0)) * line.quantity, 0),
    setActiveMenu: (menuId) => {
      if (menus.some((menu) => menu.id === menuId)) setActiveMenuId(menuId);
    },
    createMenu: (name) => {
      const id = `menu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const cleanName = name.trim() || `Menu ${menus.length + 1}`;
      setMenus((current) => [...current, { id, name: cleanName }]);
      setActiveMenuId(id);
      return id;
    },
    renameMenu: (menuId, name) => {
      const cleanName = name.trim();
      if (cleanName) setMenus((current) => current.map((menu) => menu.id === menuId ? { ...menu, name: cleanName } : menu));
    },
    deleteMenu: (menuId) => setMenus((current) => {
      if (current.length <= 1 || !current.some((menu) => menu.id === menuId)) return current;
      const remaining = current.filter((menu) => menu.id !== menuId);
      setLines((currentLines) => currentLines.filter((line) => line.menuId !== menuId));
      setActiveMenuId((currentActiveId) => currentActiveId === menuId ? remaining[0]!.id : currentActiveId);
      return remaining;
    }),
    addItem: (itemId, quantity = 1, menuId = activeMenuId, customization) => setLines((current) => {
      const existing = current.find((line) => line.menuId === menuId && line.itemId === itemId);
      return existing
        ? current.map((line) => line.menuId === menuId && line.itemId === itemId ? { ...line, quantity: line.quantity + quantity, customization } : line)
        : [...current, { menuId, itemId, quantity, customization }];
    }),
    setQuantity: (menuId, itemId, quantity) => setLines((current) => quantity <= 0
      ? current.filter((line) => !(line.menuId === menuId && line.itemId === itemId))
      : current.map((line) => line.menuId === menuId && line.itemId === itemId ? { ...line, quantity } : line)),
    removeItem: (menuId, itemId) => setLines((current) => current.filter((line) => !(line.menuId === menuId && line.itemId === itemId))),
    clearCart: () => setLines([]),
  }), [activeMenuId, lines, menus]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
