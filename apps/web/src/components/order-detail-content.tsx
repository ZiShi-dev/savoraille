'use client';

import { ArrowLeft, ArrowRight, Check, CircleDashed, Info, Minus, Plus, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useCart, type CartCustomization } from './cart-provider';
import { getDishAllergens, getDishExtras } from './dish-customizations';
import { useI18n } from './i18n-provider';
import { MenuAssignmentDialog } from './menu-assignment-dialog';
import { menuItems, menuSections } from './summer-menu-experience';

export function OrderDetailContent({ itemId }: { itemId: string }) {
  const { locale, tr } = useI18n();
  const { lines, activeMenuId, itemCount, total } = useCart();
  const item = menuItems.find((candidate) => candidate.id === itemId);
  const itemSection = menuSections.find((section) => section.items.some((candidate) => candidate.id === itemId));
  const [quantity, setQuantity] = useState(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState(itemSection?.id ?? menuSections[0]?.id ?? 'aperitifs');
  const [added, setAdded] = useState(false);
  const [suggestionAdded, setSuggestionAdded] = useState<string | null>(null);
  const [pendingAdd, setPendingAdd] = useState<{ itemId: string; itemName: string; quantity: number; kind: 'main' | 'suggestion'; customization?: CartCustomization } | null>(null);

  const money = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);

  if (!item || !itemSection) {
    return <main className="grid min-h-[70svh] place-items-center bg-[#FAF6EC] px-6 pt-28 text-center"><div><h1 className="font-display text-5xl font-semibold text-[#1E3A5F]">{tr('Plat introuvable')}</h1><Link href="/carte" className="mt-6 inline-flex rounded-lg bg-[#1E3A5F] px-5 py-3 font-bold text-[#FAF6EC]">{tr('Retour à la carte')}</Link></div></main>;
  }

  const unitPrice = Number.parseFloat(item.price);
  const extras = getDishExtras(itemSection.id);
  const allergens = getDishAllergens(itemSection.id);
  const selectedExtras = extras.filter((extra) => selectedExtraIds.includes(extra.id));
  const supplementTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const activeLines = lines.filter((line) => line.menuId === activeMenuId);
  const sectionStates = menuSections.map((section) => ({
    section,
    count: activeLines.filter((line) => section.items.some((candidate) => candidate.id === line.itemId)).reduce((sum, line) => sum + line.quantity, 0),
  }));
  const completedSections = sectionStates.filter(({ count }) => count > 0).length;
  const activeState = sectionStates.find(({ section }) => section.id === activeSection) ?? sectionStates[0]!;
  const suggestions = activeState.section.items.filter((candidate) => candidate.id !== item.id).slice(0, 3);

  const addCurrentItem = () => {
    setPendingAdd({
      itemId: item.id,
      itemName: item.name,
      quantity,
      kind: 'main',
      customization: selectedExtras.length > 0 ? {
        optionIds: selectedExtras.map((extra) => extra.id),
        optionLabels: selectedExtras.map((extra) => extra.label),
        unitSupplement: supplementTotal,
      } : undefined,
    });
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtraIds((current) => current.includes(extraId) ? current.filter((id) => id !== extraId) : [...current, extraId]);
    setAdded(false);
  };

  const addSuggestion = (suggestionId: string) => {
    const suggestion = menuItems.find((candidate) => candidate.id === suggestionId);
    if (suggestion) setPendingAdd({ itemId: suggestion.id, itemName: suggestion.name, quantity: 1, kind: 'suggestion' });
  };

  return (
    <main className="bg-[#FAF6EC] pt-28 text-[#241F19]">
      <section className="px-6 pb-14 pt-6 sm:pb-20" aria-labelledby="dish-title">
        <div className="mx-auto max-w-[1200px]">
          <Link href="/carte" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" />{tr('Retour à la carte')}</Link>
          <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-white shadow-[0_18px_50px_rgba(30,58,95,0.14)] lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[520px]">
              <Image src={item.image} alt={tr(item.name)} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102B4D]/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 start-5 rounded-full border border-[#C6A15B]/55 bg-[#102B4D]/85 px-4 py-2 text-xs font-bold tracking-[0.1em] text-[#C6A15B] uppercase backdrop-blur-md">{tr(itemSection.shortLabel)}</span>
            </div>
            <div className="flex flex-col p-6 sm:p-9 lg:p-10">
              <div className="flex items-start justify-between gap-5">
                <div><p className="text-xs font-bold tracking-[0.16em] text-[#C4703F] uppercase">{tr(item.eyebrow)}</p><h1 id="dish-title" className="font-display mt-2 text-4xl leading-none font-semibold text-[#1E3A5F] sm:text-5xl">{tr(item.name)}</h1></div>
                <span className="shrink-0 rounded-full bg-[#7C2438] px-4 py-2 text-lg font-bold text-[#FAF6EC]">{item.price}</span>
              </div>
              <p className="mt-6 text-base leading-8 text-[#241F19]/68">{tr(item.detail)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#1E3A5F]/12 bg-[#FAF6EC] px-3 py-1.5 text-xs font-bold text-[#1E3A5F]">{tr('Préparé à la minute')}</span>
                <span className="rounded-full border border-[#C4703F]/20 bg-[#C4703F]/8 px-3 py-1.5 text-xs font-bold text-[#8C4829]">{tr('Cuisine de saison')}</span>
              </div>

              <div className="mt-7 rounded-2xl border border-[#C6A15B]/35 bg-[#FAF6EC] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><SlidersHorizontal className="size-4" /></span>
                  <div><h2 className="font-display text-2xl leading-none font-semibold text-[#1E3A5F]">{tr('Personnalisez votre assiette')}</h2><p className="mt-1.5 text-sm leading-6 text-[#241F19]/58">{tr('Cochez les suppléments que vous souhaitez ajouter.')}</p></div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {extras.map((extra) => {
                    const selected = selectedExtraIds.includes(extra.id);
                    return (
                      <label key={extra.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 outline-none transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#C6A15B] ${selected ? 'border-[#C6A15B] bg-white shadow-[0_6px_18px_rgba(30,58,95,0.08)]' : 'border-[#1E3A5F]/10 bg-white/55 hover:border-[#C6A15B]/60'}`}>
                        <input type="checkbox" checked={selected} onChange={() => toggleExtra(extra.id)} className="sr-only" />
                        <span className={`grid size-6 shrink-0 place-items-center rounded-md border ${selected ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FAF6EC]' : 'border-[#1E3A5F]/25 bg-white text-transparent'}`}><Check className="size-3.5" /></span>
                        <span className="min-w-0 flex-1 text-sm font-bold text-[#1E3A5F]">{tr(extra.label)}</span>
                        <span className="shrink-0 text-xs font-bold text-[#7C2438]">{extra.price === 0 ? tr('Offert') : `+${money(extra.price)}`}</span>
                      </label>
                    );
                  })}
                </div>
                {selectedExtras.length > 0 && <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#1E3A5F] px-4 py-3 text-sm text-[#FAF6EC]"><span><strong>{selectedExtras.length}</strong> {tr(selectedExtras.length === 1 ? 'supplément choisi' : 'suppléments choisis')}</span><strong className="text-[#C6A15B]">+{money(supplementTotal)} {tr('par assiette')}</strong></div>}
              </div>

              {allergens.length > 0 && <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#7C2438]/16 bg-[#7C2438]/[0.045] p-4"><Info className="mt-0.5 size-4 shrink-0 text-[#7C2438]" /><div><p className="text-xs font-bold text-[#7C2438]">{tr('Allergènes')}</p><p className="mt-1 text-xs leading-5 text-[#241F19]/58">{allergens.map((allergen) => tr(allergen)).join(' · ')}. {tr('Informez notre équipe de toute allergie.')}</p></div></div>}

              <div className="gold-divider my-7" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#1E3A5F]/55 uppercase">{tr('Quantité')}</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center rounded-lg border border-[#1E3A5F]/15 bg-[#FAF6EC] p-1">
                  <button type="button" onClick={() => { setQuantity((current) => Math.max(1, current - 1)); setAdded(false); }} aria-label={tr('Diminuer la quantité')} className="grid size-11 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Minus className="size-4" /></button>
                  <span className="min-w-10 text-center font-bold tabular-nums text-[#1E3A5F]" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => { setQuantity((current) => current + 1); setAdded(false); }} aria-label={tr('Augmenter la quantité')} className="grid size-11 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" /></button>
                </div>
                <p className="text-end"><span className="block text-xs text-[#241F19]/50">{supplementTotal > 0 ? `${tr('Plat et suppléments')} · ${tr('Sous-total')}` : tr('Sous-total')}</span><span className="font-display text-3xl font-bold text-[#7C2438]">{money((unitPrice + supplementTotal) * quantity)}</span></p>
              </div>
              <button type="button" onClick={addCurrentItem} className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-bold text-[#FAF6EC] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 ${added ? 'bg-[#C4703F]' : 'bg-[#7C2438] hover:bg-[#681d2f]'}`}><span aria-live="polite" className="inline-flex items-center gap-2">{added ? <Check className="size-5" /> : <ShoppingBag className="size-5" />}{tr(added ? 'Ajouté à votre commande' : 'Ajouter à ma commande')}</span></button>
              <div className="mt-auto pt-7 text-sm text-[#241F19]/60"><span className="font-bold text-[#1E3A5F]">{itemCount}</span> {tr('articles dans votre commande')} · <span className="font-bold text-[#7C2438]">{money(total)}</span><Link href="/commandes" className="ms-3 font-bold text-[#1E3A5F] underline decoration-[#C6A15B] underline-offset-4">{tr('Voir ma commande')}</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102B4D] px-6 py-12 text-[#FAF6EC] sm:py-16" aria-labelledby="suggestions-title">
        <div className="pointer-events-none absolute -end-24 -top-28 size-80 rounded-full border border-[#C6A15B]/18" />
        <div className="pointer-events-none absolute -end-10 -top-16 size-56 rounded-full border border-[#C6A15B]/22" />
        <div className="mx-auto max-w-[1200px]">
          <div className="relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div><div className="flex items-center gap-3 text-[#C6A15B]"><Sparkles className="size-4" /><p className="text-xs font-bold tracking-[0.16em] uppercase">{tr('Pour compléter votre repas')}</p></div><h2 id="suggestions-title" className="font-display mt-2 text-3xl leading-none font-semibold sm:text-4xl">{tr('Ajoutez une envie à votre menu.')}</h2></div>
            <div className="flex w-fit items-center gap-3 rounded-xl border border-[#C6A15B]/28 bg-white/[0.055] px-4 py-3"><div className="grid size-12 place-items-center rounded-full p-[3px]" style={{ background: `conic-gradient(#C6A15B ${completedSections / menuSections.length * 360}deg, rgba(250,246,236,0.12) 0deg)` }} role="img" aria-label={`${completedSections} / ${menuSections.length} ${tr('catégories complétées')}`}><div className="grid size-full place-items-center rounded-full bg-[#102B4D]"><p className="font-display text-lg font-bold text-[#C6A15B]">{completedSections}<span className="text-[0.65rem] text-[#FAF6EC]/45">/{menuSections.length}</span></p></div></div><div><p className="text-xs font-bold text-[#C6A15B]">{tr('Progression de votre menu')}</p><p className="mt-0.5 text-xs text-[#FAF6EC]/48">{tr(completedSections === menuSections.length ? 'Votre menu est complet.' : 'À compléter')}</p></div></div>
          </div>

          <div className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0" role="tablist" aria-label={tr('Catégories de suggestions')}>
            {sectionStates.map(({ section, count }) => {
              const selected = activeSection === section.id;
              return <button key={section.id} type="button" role="tab" aria-selected={selected} onClick={() => setActiveSection(section.id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2.5 text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'border-[#C6A15B] bg-[#C6A15B] text-[#241F19]' : 'border-[#FAF6EC]/18 text-[#FAF6EC]/72 hover:bg-white/8'}`}>{count > 0 ? <Check className="size-3.5 text-[#C4703F]" /> : <CircleDashed className="size-3.5" />}{tr(section.shortLabel)}</button>;
            })}
          </div>

          <div className="-mx-6 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0" aria-live="polite">
            {suggestions.map((suggestion) => (
              <article key={suggestion.id} className="grid min-w-[86%] snap-center grid-cols-[88px_1fr_auto] items-center gap-3 rounded-xl border border-[#FAF6EC]/14 bg-white/[0.055] p-3 sm:min-w-0">
                <Link href={`/commander/${suggestion.id}`} className="relative aspect-square overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Image src={suggestion.image} alt={tr(suggestion.name)} fill sizes="88px" className="object-cover" /></Link>
                <div className="min-w-0"><p className="truncate text-[0.65rem] font-bold tracking-[0.1em] text-[#C6A15B] uppercase">{tr(suggestion.eyebrow)}</p><Link href={`/commander/${suggestion.id}`} className="font-display mt-1 block text-lg leading-tight font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr(suggestion.name)}</Link><p className="mt-1 text-sm font-bold text-[#DFA17A]">{suggestion.price}</p></div>
                <button type="button" onClick={() => addSuggestion(suggestion.id)} aria-label={`${tr('Ajouter')} ${tr(suggestion.name)}`} className={`grid size-10 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${suggestionAdded === suggestion.id ? 'bg-[#C4703F] text-white' : 'bg-[#7C2438] text-white hover:bg-[#681d2f]'}`}>{suggestionAdded === suggestion.id ? <Check className="size-4" /> : <Plus className="size-4" />}</button>
              </article>
            ))}
          </div>

          <div className="relative mt-6 flex flex-col gap-3 border-t border-[#C6A15B]/22 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-[#FAF6EC]/55">{tr('Repérez en un regard ce qui est déjà choisi et ce qu’il vous reste à découvrir.')}</p><Link href="/carte#composer-menu" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C6A15B]/55 px-5 py-3 text-sm font-bold text-[#C6A15B] outline-none hover:bg-[#C6A15B] hover:text-[#241F19] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Compléter mon menu')}<ArrowRight className="size-4 rtl:-scale-x-100" /></Link></div>
        </div>
      </section>
      <MenuAssignmentDialog open={!!pendingAdd} onOpenChange={(open) => { if (!open) setPendingAdd(null); }} itemId={pendingAdd?.itemId ?? null} itemName={pendingAdd?.itemName} quantity={pendingAdd?.quantity} customization={pendingAdd?.customization} onAdded={() => { if (pendingAdd?.kind === 'main') setAdded(true); else if (pendingAdd) setSuggestionAdded(pendingAdd.itemId); }} />
    </main>
  );
}
