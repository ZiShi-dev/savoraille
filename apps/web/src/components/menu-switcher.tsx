'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { Check, ChevronDown, MoreHorizontal, Pencil, Plus, Trash2, UtensilsCrossed, X } from 'lucide-react';
import { useState } from 'react';

import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';

export function MenuSwitcher() {
  const { tr } = useI18n();
  const { menus, lines, activeMenuId, setActiveMenu, createMenu, renameMenu, deleteMenu } = useCart();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMenuId, setEditingMenuId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const activeMenu = menus.find((menu) => menu.id === activeMenuId) ?? menus[0];
  const countItems = (menuId: string) => lines
    .filter((line) => line.menuId === menuId)
    .reduce((sum, line) => sum + line.quantity, 0);
  const activeCount = activeMenu ? countItems(activeMenu.id) : 0;
  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);

  const openCreate = () => {
    setSelectorOpen(false);
    setActionMenuId(null);
    setEditingMenuId(null);
    setName('');
    setDialogOpen(true);
  };
  const openRename = (menuId: string, currentName: string) => {
    setSelectorOpen(false);
    setActionMenuId(null);
    setEditingMenuId(menuId);
    setName(currentName);
    setDialogOpen(true);
  };
  const save = () => {
    if (!name.trim()) return;
    if (editingMenuId) renameMenu(editingMenuId, name);
    else createMenu(name);
    setDialogOpen(false);
  };
  const deleteTarget = menus.find((menu) => menu.id === deleteTargetId);

  return (
    <>
      <section className="mt-8 rounded-2xl border border-[#1E3A5F]/12 bg-white p-4 shadow-[0_10px_28px_rgba(30,58,95,0.08)] sm:p-5" aria-label={tr('Vos menus')}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Menus du panier')}</p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-[#1E3A5F]">{tr('Choisissez le menu à composer.')}</h2>
          </div>
          <button type="button" onClick={openCreate} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1E3A5F] px-3.5 py-3 text-xs font-bold text-[#FAF6EC] outline-none transition-colors hover:bg-[#152f50] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
            <Plus className="size-4" />
            <span className="hidden sm:inline">{tr('Nouveau menu')}</span>
            <span className="sm:hidden">{tr('Créer')}</span>
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <Popover.Root open={selectorOpen} onOpenChange={setSelectorOpen}>
            <Popover.Trigger asChild>
              <button type="button" className="flex min-h-16 w-full items-center gap-3 rounded-xl border border-[#C6A15B]/65 bg-[#FAF6EC] px-3 py-2.5 text-start outline-none transition hover:border-[#C6A15B] hover:shadow-[0_8px_20px_rgba(30,58,95,0.08)] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={tr('Choisir un menu')}>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><UtensilsCrossed className="size-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.65rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Menu actif')}</span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-[#1E3A5F]">{activeMenu ? tr(activeMenu.name) : ''}</span>
                  <span className="block text-[0.68rem] text-[#241F19]/50">{activeCount} {tr(activeCount === 1 ? 'article' : 'articles')}</span>
                </span>
                <ChevronDown className={`size-5 shrink-0 text-[#7C2438] transition-transform duration-200 ${selectorOpen ? 'rotate-180' : ''}`} />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content align="start" sideOffset={8} collisionPadding={16} className="z-[160] w-[var(--radix-popover-trigger-width)] rounded-2xl border border-[#C6A15B]/40 bg-[#FAF6EC] p-2 shadow-[0_22px_65px_rgba(15,38,65,0.24)] outline-none">
                <p className="px-2 pb-2 pt-1 text-[0.68rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Tous vos menus')}</p>
                <div className="max-h-72 space-y-1 overflow-y-auto overscroll-contain pe-1 savoraille-scrollbar">
                  {menus.map((menu) => {
                    const active = menu.id === activeMenuId;
                    const count = countItems(menu.id);
                    return (
                      <div key={menu.id} className={`flex items-center rounded-xl border ${active ? 'border-[#C6A15B]/70 bg-white' : 'border-transparent hover:bg-white/70'}`}>
                        <button type="button" onClick={() => { setActiveMenu(menu.id); setSelectorOpen(false); }} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                          <span className={`grid size-8 shrink-0 place-items-center rounded-full ${active ? 'bg-[#1E3A5F] text-[#C6A15B]' : 'bg-[#1E3A5F]/7 text-[#1E3A5F]'}`}>{active ? <Check className="size-4" /> : <UtensilsCrossed className="size-3.5" />}</span>
                          <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-[#1E3A5F]">{tr(menu.name)}</span><span className="block text-[0.68rem] text-[#241F19]/45">{count} {tr(count === 1 ? 'article' : 'articles')}</span></span>
                        </button>
                        <Popover.Root open={actionMenuId === menu.id} onOpenChange={(open) => setActionMenuId(open ? menu.id : null)}>
                          <Popover.Trigger asChild>
                            <button type="button" aria-label={`${tr('Actions du menu')} ${tr(menu.name)}`} className="me-1 grid size-9 shrink-0 place-items-center rounded-lg text-[#7C2438] outline-none hover:bg-[#7C2438]/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><MoreHorizontal className="size-4" /></button>
                          </Popover.Trigger>
                          <Popover.Portal>
                            <Popover.Content align="end" sideOffset={6} collisionPadding={12} className="z-[170] min-w-44 rounded-xl border border-[#1E3A5F]/12 bg-white p-1.5 shadow-[0_16px_45px_rgba(15,38,65,0.2)] outline-none">
                              <button type="button" onClick={() => openRename(menu.id, menu.name)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold text-[#1E3A5F] outline-none hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Pencil className="size-4" />{tr('Renommer')}</button>
                              {menus.length > 1 ? <button type="button" onClick={() => { setActionMenuId(null); setSelectorOpen(false); setDeleteTargetId(menu.id); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold text-[#7C2438] outline-none hover:bg-[#7C2438]/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Trash2 className="size-4" />{tr('Supprimer')}</button> : null}
                            </Popover.Content>
                          </Popover.Portal>
                        </Popover.Root>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 border-t border-[#1E3A5F]/10 pt-2">
                  <button type="button" onClick={openCreate} className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-start text-sm font-bold text-[#7C2438] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" />{tr('Créer un nouveau menu')}</button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <p className="hidden text-end text-xs leading-5 text-[#241F19]/45 sm:block">{menus.length} {tr(menus.length === 1 ? 'menu' : 'menus')}<br />{totalItems} {tr(totalItems === 1 ? 'article' : 'articles')}</p>
        </div>

      </section>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[170] bg-[#071C33]/78 backdrop-blur-md" /><Dialog.Content className="fixed inset-x-4 top-1/2 z-[180] mx-auto max-w-md -translate-y-1/2 rounded-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] p-6 shadow-[0_28px_80px_rgba(3,16,31,0.4)] outline-none"><div className="flex items-start justify-between gap-4"><div><Dialog.Title className="font-display text-3xl font-semibold text-[#1E3A5F]">{tr(editingMenuId ? 'Renommer le menu' : 'Créer un nouveau menu')}</Dialog.Title><Dialog.Description className="mt-2 text-sm text-[#241F19]/55">{tr('Donnez-lui un nom facile à reconnaître.')}</Dialog.Description></div><Dialog.Close className="grid size-9 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F]"><X className="size-4" /></Dialog.Close></div><label className="mt-5 block text-sm font-bold text-[#1E3A5F]">{tr('Nom du menu')}<input autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); save(); } }} placeholder={tr('Ex. Menu de Lina')} className="mt-2 h-12 w-full rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30" /></label><button type="button" onClick={save} disabled={!name.trim()} className="mt-5 w-full rounded-lg bg-[#7C2438] px-5 py-4 font-bold text-[#FAF6EC] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:opacity-40">{tr(editingMenuId ? 'Enregistrer le nom' : 'Créer le menu')}</button></Dialog.Content></Dialog.Portal></Dialog.Root>
      <Dialog.Root open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTargetId(null); }}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[170] bg-[#071C33]/82 backdrop-blur-md" /><Dialog.Content className="fixed inset-x-4 top-1/2 z-[180] mx-auto max-w-md -translate-y-1/2 rounded-3xl border border-[#7C2438]/35 bg-[#FAF6EC] p-6 shadow-[0_28px_80px_rgba(3,16,31,0.42)] outline-none"><span className="grid size-12 place-items-center rounded-full bg-[#7C2438]/10 text-[#7C2438]"><Trash2 className="size-5" /></span><Dialog.Title className="font-display mt-4 text-3xl font-semibold text-[#1E3A5F]">{tr('Supprimer ce menu ?')}</Dialog.Title><Dialog.Description className="mt-3 text-sm leading-6 text-[#241F19]/60">{tr('Tous les plats de ce menu seront retirés de votre panier.')} {deleteTarget ? <strong className="text-[#1E3A5F]">{tr(deleteTarget.name)}</strong> : null}</Dialog.Description><div className="mt-6 grid gap-2 sm:grid-cols-2"><Dialog.Close className="rounded-lg border border-[#1E3A5F]/14 bg-white px-5 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Annuler')}</Dialog.Close><button type="button" onClick={() => { if (deleteTarget) deleteMenu(deleteTarget.id); setDeleteTargetId(null); }} className="rounded-lg bg-[#7C2438] px-5 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Supprimer le menu')}</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
    </>
  );
}
