'use client';

import { ArrowRight, Check, CircleDashed, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';
import { menuSections } from './summer-menu-experience';

export function MealBuilder() {
  const { tr } = useI18n();
  const { lines, menus, activeMenuId } = useCart();
  const activeLines = useMemo(() => lines.filter((line) => line.menuId === activeMenuId), [activeMenuId, lines]);
  const activeMenu = menus.find((menu) => menu.id === activeMenuId);
  const itemCount = activeLines.reduce((sum, line) => sum + line.quantity, 0);

  const sectionStates = useMemo(() => menuSections.map((section) => ({
    section,
    count: activeLines
      .filter((line) => section.items.some((item) => item.id === line.itemId))
      .reduce((sum, line) => sum + line.quantity, 0),
  })), [activeLines]);
  const completedSections = sectionStates.filter(({ count }) => count > 0).length;

  return (
    <section id="composer-menu" className="relative overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-20 lg:py-24" aria-labelledby="meal-progress-title">
      <div className="pointer-events-none absolute -start-28 top-12 size-80 rounded-full border border-[#C6A15B]/16" />
      <div className="pointer-events-none absolute -start-16 top-24 size-56 rounded-full border border-[#C6A15B]/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#C6A15B]/55" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#C6A15B]"><Sparkles className="size-4" /><p className="text-xs font-bold tracking-[0.17em] uppercase">{tr('Votre parcours gourmand')} · {activeMenu ? tr(activeMenu.name) : ''}</p></div>
            <h2 id="meal-progress-title" className="font-display mt-3 text-4xl leading-none font-semibold sm:text-5xl lg:text-6xl">{tr('Composez votre menu complet.')}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#FAF6EC]/66 sm:text-base">{tr('Repérez en un regard ce qui est déjà choisi et ce qu’il vous reste à découvrir.')}</p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#C6A15B]/28 bg-white/[0.055] p-3 pe-5 backdrop-blur-sm">
            <div className="grid size-20 shrink-0 place-items-center rounded-full p-[5px]" style={{ background: `conic-gradient(#C6A15B ${completedSections / menuSections.length * 360}deg, rgba(250,246,236,0.12) 0deg)` }} role="img" aria-label={`${completedSections} / ${menuSections.length} ${tr('catégories complétées')}`}>
              <div className="grid size-full place-items-center rounded-full bg-[#102B4D]"><p className="font-display text-2xl font-bold text-[#C6A15B]">{completedSections}<span className="text-sm text-[#FAF6EC]/42">/{menuSections.length}</span></p></div>
            </div>
            <div><p className="text-xs font-bold tracking-[0.1em] text-[#C6A15B] uppercase">{tr('Progression de votre menu')}</p><p className="mt-1 text-sm text-[#FAF6EC]/58">{completedSections === menuSections.length ? tr('Votre menu est complet.') : tr('Repérez en un regard ce qui est déjà choisi et ce qu’il vous reste à découvrir.')}</p></div>
          </div>
        </div>

        <nav className="-mx-6 mt-9 flex snap-x gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5" aria-label={tr('Progression de votre menu')}>
          {sectionStates.map(({ section, count }) => {
            const completed = count > 0;
            return <Link key={section.id} href={`/carte?section=${section.id}#menu-complet`} className="group flex min-w-40 snap-start items-center gap-3 rounded-xl border border-[#FAF6EC]/14 bg-white/[0.035] p-3 text-start outline-none transition-all hover:-translate-y-0.5 hover:border-[#C6A15B]/65 hover:bg-white/[0.075] focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:min-w-0 sm:flex-col sm:items-start">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${completed ? 'bg-[#C4703F] text-white' : 'border border-[#C6A15B]/48 text-[#C6A15B]'}`}>{completed ? <Check className="size-4" /> : <CircleDashed className="size-4" />}</span>
              <span className="min-w-0 flex-1"><span className="block text-sm leading-tight font-bold">{tr(section.shortLabel)}</span><span className={`mt-1 block text-[0.68rem] ${completed ? 'text-[#DFA17A]' : 'text-[#FAF6EC]/42'}`}>{completed ? `${count} ${tr(count > 1 ? 'ajoutés' : 'ajouté')}` : tr('À compléter')}</span></span>
              <ArrowRight className="size-4 text-[#C6A15B]/65 transition-transform group-hover:translate-x-0.5 sm:mt-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>;
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#FAF6EC]/12 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-[#FAF6EC]/62"><ShoppingBag className="size-4 text-[#C6A15B]" /><span><strong className="text-[#FAF6EC]">{itemCount}</strong> {tr('articles dans votre commande')}</span></p>
          <Link href="/commandes" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-3 text-sm font-bold text-[#FAF6EC] outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir ma commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></Link>
        </div>
      </div>
    </section>
  );
}
