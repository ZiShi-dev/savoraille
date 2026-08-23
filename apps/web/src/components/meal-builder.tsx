'use client';

import { ArrowRight, Check, CircleDashed, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';
import { menuSections } from './summer-menu-experience';

export function MealBuilder() {
  const { tr } = useI18n();
  const { lines, itemCount, addItem } = useCart();
  const [activeSectionId, setActiveSectionId] = useState(menuSections[0]?.id ?? 'aperitifs');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const sectionStates = useMemo(() => menuSections.map((section) => ({
    section,
    count: lines
      .filter((line) => section.items.some((item) => item.id === line.itemId))
      .reduce((sum, line) => sum + line.quantity, 0),
  })), [lines]);
  const completedSections = sectionStates.filter(({ count }) => count > 0).length;
  const activeState = sectionStates.find(({ section }) => section.id === activeSectionId) ?? sectionStates[0]!;

  const quickAdd = (itemId: string) => {
    addItem(itemId);
    setQuickAddedId(itemId);
    window.setTimeout(() => setQuickAddedId((current) => current === itemId ? null : current), 1400);
  };

  return (
    <section id="composer-menu" className="relative overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-20 lg:py-24" aria-labelledby="meal-progress-title">
      <div className="pointer-events-none absolute -start-28 top-12 size-80 rounded-full border border-[#C6A15B]/16" />
      <div className="pointer-events-none absolute -start-16 top-24 size-56 rounded-full border border-[#C6A15B]/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#C6A15B]/55" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#C6A15B]"><Sparkles className="size-4" /><p className="text-xs font-bold tracking-[0.17em] uppercase">{tr('Votre parcours gourmand')}</p></div>
            <h2 id="meal-progress-title" className="font-display mt-3 text-4xl leading-none font-semibold sm:text-5xl lg:text-6xl">{tr('Composez votre menu complet.')}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#FAF6EC]/66 sm:text-base">{tr('Repérez en un regard ce qui est déjà choisi et ce qu’il vous reste à découvrir.')}</p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#C6A15B]/28 bg-white/[0.055] p-3 pe-5 backdrop-blur-sm">
            <div className="grid size-20 shrink-0 place-items-center rounded-full p-[5px]" style={{ background: `conic-gradient(#C6A15B ${completedSections / menuSections.length * 360}deg, rgba(250,246,236,0.12) 0deg)` }} role="img" aria-label={`${completedSections} / ${menuSections.length} ${tr('catégories complétées')}`}>
              <div className="grid size-full place-items-center rounded-full bg-[#102B4D]"><p className="font-display text-2xl font-bold text-[#C6A15B]">{completedSections}<span className="text-sm text-[#FAF6EC]/42">/{menuSections.length}</span></p></div>
            </div>
            <div><p className="text-xs font-bold tracking-[0.1em] text-[#C6A15B] uppercase">{tr('Progression de votre menu')}</p><p className="mt-1 text-sm text-[#FAF6EC]/58">{completedSections === menuSections.length ? tr('Votre menu est complet.') : tr('Touchez une catégorie manquante pour voir nos suggestions.')}</p></div>
          </div>
        </div>

        <div className="-mx-6 mt-9 flex snap-x gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5" role="tablist" aria-label={tr('Progression de votre menu')}>
          {sectionStates.map(({ section, count }) => {
            const selected = activeState.section.id === section.id;
            const completed = count > 0;
            return <button key={section.id} type="button" role="tab" aria-selected={selected} aria-controls="meal-builder-panel" onClick={() => setActiveSectionId(section.id)} className={`flex min-w-40 snap-start items-center gap-3 rounded-xl border p-3 text-start outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:min-w-0 sm:flex-col sm:items-start ${selected ? 'border-[#C6A15B] bg-[#C6A15B]/14 shadow-[0_10px_26px_rgba(3,16,31,0.2)]' : 'border-[#FAF6EC]/14 bg-white/[0.035] hover:border-[#C6A15B]/45 hover:bg-white/[0.065]'}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${completed ? 'bg-[#C4703F] text-white' : 'border border-[#C6A15B]/48 text-[#C6A15B]'}`}>{completed ? <Check className="size-4" /> : <CircleDashed className="size-4" />}</span>
              <span className="min-w-0"><span className="block text-sm leading-tight font-bold">{tr(section.shortLabel)}</span><span className={`mt-1 block text-[0.68rem] ${completed ? 'text-[#DFA17A]' : 'text-[#FAF6EC]/42'}`}>{completed ? `${count} ${tr(count > 1 ? 'ajoutés' : 'ajouté')}` : tr('À compléter')}</span></span>
            </button>;
          })}
        </div>

        <div id="meal-builder-panel" role="tabpanel" className="mt-5 overflow-hidden rounded-2xl border border-[#C6A15B]/38 bg-[#FAF6EC] text-[#241F19] shadow-[0_22px_55px_rgba(3,16,31,0.28)]">
          <div className="flex flex-col gap-3 border-b border-[#1E3A5F]/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div><p className="text-[0.68rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr(activeState.count > 0 ? 'Votre choix' : 'Suggestion pour compléter')}</p><h3 className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F]">{tr(activeState.section.label)}</h3></div>
            <Link href={`/carte?section=${activeState.section.id}#menu-complet`} className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#1E3A5F]/14 px-4 py-2.5 text-xs font-bold text-[#1E3A5F] outline-none hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir tout')}<ArrowRight className="size-3.5 rtl:-scale-x-100" /></Link>
          </div>

          <div className="grid gap-px bg-[#1E3A5F]/10 sm:grid-cols-3">
            {activeState.section.items.slice(0, 3).map((item) => {
              const added = quickAddedId === item.id;
              return <article key={item.id} className="group relative grid grid-cols-[76px_1fr_auto] items-center gap-3 bg-[#FFFDFC] p-3 sm:flex sm:min-w-0 sm:flex-col sm:items-stretch sm:p-4">
                <Link href={`/commander/${item.id}`} className="relative aspect-square overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:aspect-[16/10]"><Image src={item.image} alt={tr(item.name)} fill sizes="(min-width: 640px) 33vw, 76px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></Link>
                <div className="min-w-0 sm:flex sm:flex-1 sm:flex-col"><p className="truncate text-sm font-bold text-[#1E3A5F] sm:mt-1 sm:whitespace-normal sm:font-display sm:text-xl sm:leading-tight">{tr(item.name)}</p><p className="mt-1 text-xs leading-5 text-[#241F19]/55 max-sm:hidden">{tr(item.detail)}</p><p className="mt-1 text-sm font-bold text-[#7C2438] sm:mt-auto sm:pt-3">{item.price}</p></div>
                <button type="button" onClick={() => quickAdd(item.id)} aria-label={`${tr('Ajouter')} ${tr(item.name)}`} className={`grid size-10 shrink-0 place-items-center rounded-full text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:absolute sm:bottom-4 sm:end-4 ${added ? 'bg-[#C4703F]' : 'bg-[#7C2438] hover:bg-[#681d2f]'}`}>{added ? <Check className="size-4" /> : <Plus className="size-4" />}</button>
              </article>;
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#FAF6EC]/12 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-[#FAF6EC]/62"><ShoppingBag className="size-4 text-[#C6A15B]" /><span><strong className="text-[#FAF6EC]">{itemCount}</strong> {tr('articles dans votre commande')}</span></p>
          <Link href="/commandes" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-3 text-sm font-bold text-[#FAF6EC] outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir ma commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></Link>
        </div>
      </div>
    </section>
  );
}
