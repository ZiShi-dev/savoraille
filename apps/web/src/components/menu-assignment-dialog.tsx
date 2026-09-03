'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Check, Plus, ShoppingBag, UtensilsCrossed, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCart, type CartCustomization } from './cart-provider';
import { useI18n } from './i18n-provider';

export function MenuAssignmentDialog({ open, onOpenChange, itemId, itemName, quantity = 1, customization, onAdded }: { open: boolean; onOpenChange: (open: boolean) => void; itemId: string | null; itemName?: string; quantity?: number; customization?: CartCustomization; onAdded?: () => void }) {
  const { tr } = useI18n();
  const { menus, lines, activeMenuId, setActiveMenu, createMenu, addItem } = useCart();
  const [selectedMenuId, setSelectedMenuId] = useState(activeMenuId);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (open) {
      setSelectedMenuId(activeMenuId);
      setNewName('');
    }
  }, [activeMenuId, open]);

  const addToSelectedMenu = () => {
    if (!itemId || !selectedMenuId) return;
    addItem(itemId, quantity, selectedMenuId, customization);
    setActiveMenu(selectedMenuId);
    onAdded?.();
    onOpenChange(false);
  };
  const createAndSelect = () => {
    if (!newName.trim()) return;
    const menuId = createMenu(newName);
    setSelectedMenuId(menuId);
    setNewName('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[170] bg-[#071C33]/78 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-[180] mx-auto w-auto max-w-lg -translate-y-1/2 rounded-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] p-5 text-[#241F19] shadow-[0_28px_80px_rgba(3,16,31,0.4)] outline-none sm:p-7" dir="inherit">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Organiser votre commande')}</p><Dialog.Title className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F]">{tr('Ajouter à quel menu ?')}</Dialog.Title><Dialog.Description className="mt-2 text-sm leading-6 text-[#241F19]/58">{itemName ? `${tr(itemName)} · ` : ''}{tr('Choisissez le menu de la personne ou du groupe concerné.')}</Dialog.Description></div>
            <Dialog.Close className="grid size-10 shrink-0 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><X className="size-4" /><span className="sr-only">{tr('Fermer')}</span></Dialog.Close>
          </div>

          <div className="mt-6 grid gap-2" role="radiogroup" aria-label={tr('Choisir un menu')}>
            {menus.map((menu) => {
              const selected = menu.id === selectedMenuId;
              const count = lines.filter((line) => line.menuId === menu.id).reduce((sum, line) => sum + line.quantity, 0);
              return <button key={menu.id} type="button" role="radio" aria-checked={selected} onClick={() => setSelectedMenuId(menu.id)} className={`flex items-center gap-3 rounded-xl border p-3 text-start outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'border-[#C6A15B] bg-white shadow-[0_8px_22px_rgba(30,58,95,0.1)]' : 'border-[#1E3A5F]/10 bg-white/45 hover:border-[#C6A15B]/60'}`}>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${selected ? 'bg-[#1E3A5F] text-[#C6A15B]' : 'bg-[#1E3A5F]/7 text-[#1E3A5F]'}`}>{selected ? <Check className="size-5" /> : <UtensilsCrossed className="size-4" />}</span>
                <span className="min-w-0 flex-1"><span className="block truncate font-bold text-[#1E3A5F]">{tr(menu.name)}</span><span className="mt-0.5 block text-xs text-[#241F19]/48">{count} {tr(count === 1 ? 'article' : 'articles')}</span></span>
              </button>;
            })}
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-[#C6A15B]/55 bg-[#FFFDFC] p-3">
            <label className="text-xs font-bold text-[#1E3A5F]">{tr('Créer un nouveau menu nommé')}</label>
            <div className="mt-2 flex gap-2"><input value={newName} onChange={(event) => setNewName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); createAndSelect(); } }} placeholder={tr('Ex. Menu de Lina')} className="h-11 min-w-0 flex-1 rounded-lg border border-[#1E3A5F]/14 bg-white px-3 text-sm outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30" /><button type="button" onClick={createAndSelect} disabled={!newName.trim()} className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#C6A15B] text-[#241F19] outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] disabled:opacity-40"><Plus className="size-5" /><span className="sr-only">{tr('Créer')}</span></button></div>
          </div>

          <button type="button" onClick={addToSelectedMenu} disabled={!itemId || !selectedMenuId} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 font-bold text-[#FAF6EC] outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:opacity-40"><ShoppingBag className="size-5" />{tr('Ajouter à ce menu')}</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
