'use client';

import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';
import { menuItems, menuSections } from './summer-menu-experience';

export function OrderDetailContent({ itemId }: { itemId: string }) {
  const { locale, tr } = useI18n();
  const { addItem, itemCount, total } = useCart();
  const item = menuItems.find((candidate) => candidate.id === itemId);
  const itemSection = menuSections.find((section) => section.items.some((candidate) => candidate.id === itemId));
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(itemSection?.id ?? menuSections[0]?.id ?? 'aperitifs');
  const [added, setAdded] = useState(false);
  const [suggestionAdded, setSuggestionAdded] = useState<string | null>(null);

  const money = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);

  if (!item || !itemSection) {
    return <main className="grid min-h-[70svh] place-items-center bg-[#FAF6EC] px-6 pt-28 text-center"><div><h1 className="font-display text-5xl font-semibold text-[#1E3A5F]">{tr('Plat introuvable')}</h1><Link href="/carte" className="mt-6 inline-flex rounded-lg bg-[#1E3A5F] px-5 py-3 font-bold text-[#FAF6EC]">{tr('Retour à la carte')}</Link></div></main>;
  }

  const unitPrice = Number.parseFloat(item.price);
  const suggestions = menuSections.find((section) => section.id === activeSection)?.items.filter((candidate) => candidate.id !== item.id).slice(0, 3) ?? [];

  const addCurrentItem = () => {
    addItem(item.id, quantity);
    setAdded(true);
  };

  const addSuggestion = (suggestionId: string) => {
    addItem(suggestionId);
    setSuggestionAdded(suggestionId);
  };

  return (
    <main className="bg-[#FAF6EC] pt-28 text-[#241F19]">
      <section className="px-6 pb-14 pt-6 sm:pb-20" aria-labelledby="dish-title">
        <div className="mx-auto max-w-[1200px]">
          <Link href="/carte#menu-complet" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" />{tr('Retour à la carte')}</Link>
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
              <div className="gold-divider my-7" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.15em] text-[#1E3A5F]/55 uppercase">{tr('Quantité')}</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center rounded-lg border border-[#1E3A5F]/15 bg-[#FAF6EC] p-1">
                  <button type="button" onClick={() => { setQuantity((current) => Math.max(1, current - 1)); setAdded(false); }} aria-label={tr('Diminuer la quantité')} className="grid size-11 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Minus className="size-4" /></button>
                  <span className="min-w-10 text-center font-bold tabular-nums text-[#1E3A5F]" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => { setQuantity((current) => current + 1); setAdded(false); }} aria-label={tr('Augmenter la quantité')} className="grid size-11 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" /></button>
                </div>
                <p className="text-end"><span className="block text-xs text-[#241F19]/50">{tr('Sous-total')}</span><span className="font-display text-3xl font-bold text-[#7C2438]">{money(unitPrice * quantity)}</span></p>
              </div>
              <button type="button" onClick={addCurrentItem} className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-bold text-[#FAF6EC] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 ${added ? 'bg-[#C4703F]' : 'bg-[#7C2438] hover:bg-[#681d2f]'}`}><span aria-live="polite" className="inline-flex items-center gap-2">{added ? <Check className="size-5" /> : <ShoppingBag className="size-5" />}{tr(added ? 'Ajouté à votre commande' : 'Ajouter à ma commande')}</span></button>
              <div className="mt-auto pt-7 text-sm text-[#241F19]/60"><span className="font-bold text-[#1E3A5F]">{itemCount}</span> {tr('articles dans votre commande')} · <span className="font-bold text-[#7C2438]">{money(total)}</span><Link href="/commandes" className="ms-3 font-bold text-[#1E3A5F] underline decoration-[#C6A15B] underline-offset-4">{tr('Voir ma commande')}</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-20" aria-labelledby="suggestions-title">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3 text-[#C6A15B]"><Sparkles className="size-5" /><p className="text-xs font-bold tracking-[0.16em] uppercase">{tr('Pour compléter votre repas')}</p></div>
          <h2 id="suggestions-title" className="font-display mt-3 text-4xl font-semibold sm:text-5xl">{tr('Ajoutez une envie à votre menu.')}</h2>
          <div className="mt-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={tr('Catégories de suggestions')}>
            {menuSections.map((section) => <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} aria-pressed={activeSection === section.id} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${activeSection === section.id ? 'border-[#C6A15B] bg-[#C6A15B] text-[#241F19]' : 'border-[#FAF6EC]/18 text-[#FAF6EC]/75 hover:bg-white/8'}`}>{tr(section.shortLabel)}</button>)}
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {suggestions.map((suggestion) => (
              <article key={suggestion.id} className="overflow-hidden rounded-2xl border border-[#FAF6EC]/12 bg-white/[0.055]">
                <Link href={`/commander/${suggestion.id}`} className="group block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C6A15B]">
                  <div className="relative aspect-[16/9] overflow-hidden"><Image src={suggestion.image} alt={tr(suggestion.name)} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#102B4D]/75 to-transparent" /><span className="absolute bottom-3 end-3 rounded-full bg-[#7C2438] px-3 py-1.5 text-sm font-bold">{suggestion.price}</span></div>
                  <div className="p-5 pb-3"><p className="text-xs font-bold tracking-[0.12em] text-[#C6A15B] uppercase">{tr(suggestion.eyebrow)}</p><h3 className="font-display mt-1 text-2xl font-semibold">{tr(suggestion.name)}</h3></div>
                </Link>
                <div className="px-5 pb-5"><button type="button" onClick={() => addSuggestion(suggestion.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#C6A15B] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{suggestionAdded === suggestion.id ? <Check className="size-4" /> : <Plus className="size-4" />}{tr(suggestionAdded === suggestion.id ? 'Ajouté' : 'Ajouter rapidement')}</button></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
