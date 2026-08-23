'use client';

import { ArrowRight, Check, CircleDashed, Minus, Plus, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';
import { menuItems, menuSections } from './summer-menu-experience';

export function OrdersPageContent() {
  const { locale, tr } = useI18n();
  const { lines, itemCount, total, addItem, setQuantity, removeItem, clearCart } = useCart();
  const [activeSectionId, setActiveSectionId] = useState('aperitifs');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const money = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
  const detailedLines = lines.flatMap((line) => {
    const item = menuItems.find((candidate) => candidate.id === line.itemId);
    return item ? [{ ...line, item }] : [];
  });
  const sectionStates = menuSections.map((section) => ({
    section,
    count: detailedLines.filter(({ item }) => section.items.some((candidate) => candidate.id === item.id)).reduce((sum, line) => sum + line.quantity, 0),
  }));
  const completedSections = sectionStates.filter(({ count }) => count > 0).length;
  const missingSections = sectionStates.filter(({ count }) => count === 0);
  const activeMissingSection = missingSections.find(({ section }) => section.id === activeSectionId) ?? missingSections[0];

  return (
    <main className="min-h-[75svh] bg-[#FAF6EC] px-6 pb-20 pt-32 text-[#241F19] sm:pt-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-5 border-b border-[#C6A15B]/45 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="font-script text-3xl text-[#7C2438]">{tr('Votre panier sent déjà bon.')}</p><h1 className="font-display mt-2 text-5xl leading-none font-semibold text-[#1E3A5F] sm:text-6xl">{tr('Ma commande')}</h1><p className="mt-4 text-sm text-[#241F19]/60">{itemCount} {tr('articles sélectionnés')}</p></div>
          {detailedLines.length > 0 ? <button type="button" onClick={clearCart} className="inline-flex w-fit items-center gap-2 rounded-lg text-sm font-bold text-[#7C2438] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Trash2 className="size-4" />{tr('Vider la commande')}</button> : null}
        </div>

        {detailedLines.length === 0 ? (
          <section className="mx-auto grid max-w-xl place-items-center py-20 text-center">
            <span className="grid size-20 place-items-center rounded-full border border-[#C6A15B]/50 bg-white text-[#1E3A5F]"><ShoppingBag className="size-9" strokeWidth={1.5} /></span>
            <h2 className="font-display mt-6 text-4xl font-semibold text-[#1E3A5F]">{tr('Votre commande est vide.')}</h2>
            <p className="mt-3 leading-7 text-[#241F19]/62">{tr('Parcourez la carte et choisissez les assiettes qui vous font envie.')}</p>
            <Link href="/carte" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#1E3A5F] px-6 py-4 font-bold text-[#FAF6EC]">{tr('Découvrir la carte')}<ArrowRight className="size-4 rtl:-scale-x-100" /></Link>
          </section>
        ) : (
          <>
          <section className="mt-8 overflow-hidden rounded-2xl border border-[#C6A15B]/45 bg-[#102B4D] p-4 text-[#FAF6EC] shadow-[0_16px_42px_rgba(30,58,95,0.16)] sm:p-7" aria-labelledby="meal-progress-title">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 sm:gap-7">
              <div className="min-w-0"><div className="flex items-center gap-2 text-[#C6A15B]"><Sparkles className="size-4 shrink-0" /><p className="text-[0.68rem] font-bold tracking-[0.13em] uppercase sm:text-xs sm:tracking-[0.15em]">{tr('Votre parcours gourmand')}</p></div><h2 id="meal-progress-title" className="font-display mt-2 text-2xl leading-none font-semibold sm:text-4xl">{tr('Composez votre menu complet.')}</h2><p className="mt-2 hidden max-w-2xl text-sm leading-6 text-[#FAF6EC]/62 sm:block">{tr('Repérez en un regard ce qui est déjà choisi et ce qu’il vous reste à découvrir.')}</p></div>
              <div className="grid size-20 shrink-0 place-items-center rounded-full p-[5px] sm:size-24" style={{ background: `conic-gradient(#C6A15B ${completedSections / menuSections.length * 360}deg, rgba(250,246,236,0.12) 0deg)` }} role="img" aria-label={`${completedSections} / ${menuSections.length} ${tr('catégories complétées')}`}><div className="grid size-full place-items-center rounded-full bg-[#102B4D] text-center"><p className="font-display text-2xl leading-none font-bold text-[#C6A15B] sm:text-3xl">{completedSections}<span className="text-sm text-[#FAF6EC]/40">/{menuSections.length}</span><span className="mt-1 block font-sans text-[0.52rem] font-semibold text-[#FAF6EC]/50 sm:text-[0.6rem]">{tr('complété')}</span></p></div></div>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#FAF6EC]/55 sm:hidden">{tr('Touchez une catégorie manquante pour voir nos suggestions.')}</p>
            <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5" role="group" aria-label={tr('Progression de votre menu')}>
              {sectionStates.map(({ section, count }) => {
                const completed = count > 0;
                const active = !completed && activeMissingSection?.section.id === section.id;
                return <button key={section.id} type="button" onClick={() => !completed && setActiveSectionId(section.id)} aria-pressed={active} className={`flex min-h-20 min-w-40 snap-start items-center gap-3 rounded-xl border p-3 text-start outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:min-h-24 sm:min-w-0 sm:flex-col sm:items-start sm:justify-between ${completed ? 'border-[#C4703F]/55 bg-[#C4703F]/14' : active ? 'border-[#C6A15B] bg-[#C6A15B]/12 shadow-[inset_0_0_0_1px_rgba(198,161,91,0.22)]' : 'border-dashed border-[#FAF6EC]/18 bg-white/[0.035] hover:bg-white/[0.07]'}`}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full ${completed ? 'bg-[#C4703F] text-[#FAF6EC]' : 'border border-[#C6A15B]/45 text-[#C6A15B]'}`}>{completed ? <Check className="size-4" /> : <CircleDashed className="size-4" />}</span>
                  <span className="min-w-0 sm:mt-2"><span className="block text-sm leading-tight font-bold">{tr(section.shortLabel)}</span><span className={`mt-0.5 block text-[0.68rem] ${completed ? 'text-[#DFA17A]' : 'text-[#FAF6EC]/45'}`}>{completed ? `${count} ${tr(count > 1 ? 'ajoutés' : 'ajouté')}` : tr('À compléter')}</span></span>
                </button>;
              })}
            </div>

            {activeMissingSection ? (
              <div className="mt-5 rounded-xl border border-[#C6A15B]/30 bg-[#FAF6EC] p-4 text-[#241F19] shadow-[0_12px_30px_rgba(3,16,31,0.18)] sm:mt-6 sm:p-5">
                <div className="flex items-center justify-between gap-4"><div><p className="text-[0.65rem] font-bold tracking-[0.12em] text-[#C4703F] uppercase sm:text-xs">{tr('Suggestion pour compléter')}</p><h3 className="font-display mt-1 text-2xl font-semibold text-[#1E3A5F]">{tr(activeMissingSection.section.label)}</h3></div><Link href={`/carte?section=${activeMissingSection.section.id}#menu-complet`} className="shrink-0 rounded-full border border-[#1E3A5F]/12 px-3 py-2 text-xs font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir tout')}</Link></div>
                <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                  {activeMissingSection.section.items.slice(0, 3).map((suggestion) => <article key={suggestion.id} className="flex min-w-[84%] snap-center items-center gap-3 rounded-xl border border-[#1E3A5F]/10 bg-white p-2.5 shadow-[0_5px_16px_rgba(30,58,95,0.07)] sm:min-w-0">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg"><Image src={suggestion.image} alt={tr(suggestion.name)} fill sizes="56px" className="object-cover" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#1E3A5F]">{tr(suggestion.name)}</p><p className="mt-0.5 text-xs font-bold text-[#7C2438]">{suggestion.price}</p></div>
                    <button type="button" onClick={() => { addItem(suggestion.id); setQuickAddedId(suggestion.id); }} aria-label={`${tr('Ajouter')} ${tr(suggestion.name)}`} className={`grid size-10 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${quickAddedId === suggestion.id ? 'bg-[#C4703F] text-[#FAF6EC]' : 'bg-[#7C2438] text-[#FAF6EC]'}`}>{quickAddedId === suggestion.id ? <Check className="size-4" /> : <Plus className="size-4" />}</button>
                  </article>)}
                </div>
              </div>
            ) : <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#C4703F]/45 bg-[#C4703F]/12 p-4 text-[#FAF6EC]"><span className="grid size-10 place-items-center rounded-full bg-[#C4703F]"><Check className="size-5" /></span><div><p className="font-bold">{tr('Votre menu est complet.')}</p><p className="text-sm text-[#FAF6EC]/58">{tr('Chaque moment du repas est prêt à être savouré.')}</p></div></div>}
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <section className="grid gap-4" aria-label={tr('Articles de votre commande')}>
              {detailedLines.map(({ item, quantity }) => {
                const unitPrice = Number.parseFloat(item.price);
                return <article key={item.id} className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-[#1E3A5F]/12 bg-white p-3 shadow-[0_8px_24px_rgba(30,58,95,0.08)] sm:grid-cols-[128px_1fr_auto] sm:items-center sm:gap-5 sm:p-4">
                  <Link href={`/commander/${item.id}`} className="relative aspect-square overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Image src={item.image} alt={tr(item.name)} fill sizes="128px" className="object-cover" /></Link>
                  <div className="min-w-0"><Link href={`/commander/${item.id}`} className="font-display text-xl font-semibold text-[#1E3A5F] outline-none hover:text-[#7C2438] focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:text-2xl">{tr(item.name)}</Link><p className="mt-1 text-sm font-bold text-[#7C2438]">{item.price}</p><button type="button" onClick={() => removeItem(item.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#241F19]/48 outline-none hover:text-[#7C2438] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Trash2 className="size-3.5" />{tr('Retirer')}</button></div>
                  <div className="col-span-2 flex items-center justify-between border-t border-[#1E3A5F]/8 pt-3 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-end">
                    <div className="inline-flex items-center rounded-lg border border-[#1E3A5F]/14 bg-[#FAF6EC] p-1">
                      <button type="button" onClick={() => setQuantity(item.id, quantity - 1)} aria-label={tr('Diminuer la quantité')} className="grid size-9 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Minus className="size-4" /></button>
                      <span className="min-w-8 text-center text-sm font-bold tabular-nums">{quantity}</span>
                      <button type="button" onClick={() => setQuantity(item.id, quantity + 1)} aria-label={tr('Augmenter la quantité')} className="grid size-9 place-items-center rounded-md text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" /></button>
                    </div>
                    <p className="font-display text-2xl font-bold text-[#1E3A5F] sm:mt-3">{money(unitPrice * quantity)}</p>
                  </div>
                </article>;
              })}
              <Link href="/carte" className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#7C2438] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" />{tr('Ajouter un autre plat')}</Link>
            </section>

            <aside className="sticky top-28 overflow-hidden rounded-2xl bg-[#102B4D] p-6 text-[#FAF6EC] shadow-[0_18px_45px_rgba(30,58,95,0.2)] sm:p-7" aria-labelledby="summary-title">
              <div className="pointer-events-none absolute -end-14 -top-14 size-36 rounded-full border border-[#C6A15B]/25" />
              <h2 id="summary-title" className="font-display text-3xl font-semibold">{tr('Récapitulatif')}</h2>
              <dl className="mt-6 grid gap-4 text-sm"><div className="flex justify-between gap-4 text-[#FAF6EC]/65"><dt>{tr('Sous-total')}</dt><dd>{money(total)}</dd></div><div className="flex justify-between gap-4 text-[#FAF6EC]/65"><dt>{tr('Frais de service')}</dt><dd>{money(0)}</dd></div><div className="gold-divider gold-divider-dark" /><div className="flex items-end justify-between gap-4"><dt className="font-bold">{tr('Total')}</dt><dd className="font-display text-4xl font-bold text-[#C6A15B]">{money(total)}</dd></div></dl>
              <button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 font-bold text-[#FAF6EC] outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Continuer la commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
              <p className="mt-4 text-center text-xs leading-5 text-[#FAF6EC]/48">{tr('Vous pourrez choisir le retrait ou la livraison à l’étape suivante.')}</p>
            </aside>
          </div>
          </>
        )}
      </div>
    </main>
  );
}
