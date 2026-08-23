'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ListFilter, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useI18n } from './i18n-provider';
import { menuSections } from './summer-menu-experience';

const allMenuItems = menuSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, sectionId: section.id, sectionLabel: section.shortLabel })),
);

export function FullMenuCatalog() {
  const { tr } = useI18n();
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('all');
  const visibleItems = useMemo(
    () => activeSection === 'all' ? allMenuItems : allMenuItems.filter((item) => item.sectionId === activeSection),
    [activeSection],
  );

  return (
    <section id="menu-complet" className="relative overflow-hidden bg-[#FAF6EC] px-6 py-16 text-[#241F19] sm:py-20 lg:py-24" aria-labelledby="full-menu-title">
      <div className="pointer-events-none absolute -end-32 top-20 size-96 rounded-full border border-[#C6A15B]/20" />
      <div className="pointer-events-none absolute -end-20 top-32 size-72 rounded-full border border-[#C6A15B]/18" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#7C2438]"><UtensilsCrossed className="size-4" strokeWidth={1.7} /><p className="text-xs font-bold tracking-[0.18em] uppercase">{tr('La carte complète')}</p></div>
            <h2 id="full-menu-title" className="font-display mt-3 text-4xl leading-none font-semibold text-[#1E3A5F] sm:text-5xl lg:text-6xl">{tr('Tous les plats, au même endroit.')}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#241F19]/68 sm:text-base">{tr('Parcourez toutes nos assiettes et filtrez la carte selon votre envie du moment.')}</p>
          </div>
          <p className="flex w-fit items-center gap-2 rounded-full border border-[#1E3A5F]/12 bg-white/60 px-4 py-2 text-sm font-semibold text-[#1E3A5F]" aria-live="polite"><span className="font-display text-xl font-bold text-[#7C2438]">{visibleItems.length}</span>{tr('plats disponibles')}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#1E3A5F]/12 bg-white/55 p-3 shadow-[0_8px_24px_rgba(30,58,95,0.08)] sm:p-4">
          <div className="mb-3 flex items-center gap-2 px-1 text-xs font-bold tracking-[0.12em] text-[#1E3A5F]/55 uppercase"><ListFilter className="size-4" />{tr('Filtrer les plats')}</div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={tr('Filtrer les plats')}>
            <button type="button" onClick={() => setActiveSection('all')} aria-pressed={activeSection === 'all'} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${activeSection === 'all' ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FAF6EC]' : 'border-[#1E3A5F]/14 bg-[#FAF6EC] text-[#1E3A5F] hover:border-[#C6A15B]'}`}>{tr('Toute la carte')}</button>
            {menuSections.map((section) => (
              <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} aria-pressed={activeSection === section.id} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${activeSection === section.id ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FAF6EC]' : 'border-[#1E3A5F]/14 bg-[#FAF6EC] text-[#1E3A5F] hover:border-[#C6A15B]'}`}>{tr(section.shortLabel)}</button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, index) => (
              <motion.article
                layout
                key={item.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.28, delay: reduceMotion ? 0 : Math.min(index, 5) * 0.035 }}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-white/65 shadow-[0_8px_24px_rgba(30,58,95,0.09)] transition-[border-color,box-shadow] hover:border-[#C6A15B]/65 hover:shadow-[0_16px_36px_rgba(30,58,95,0.15)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.image} alt={tr(item.name)} fill loading="lazy" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/72 via-transparent to-transparent" />
                  <span className="absolute start-4 top-4 rounded-full border border-[#C6A15B]/55 bg-[#071C33]/78 px-3 py-1.5 text-[0.625rem] font-bold tracking-[0.08em] text-[#C6A15B] uppercase backdrop-blur-md">{tr(item.sectionLabel)}</span>
                  <span className="absolute bottom-4 end-4 rounded-full bg-[#7C2438] px-3 py-1.5 text-sm font-bold text-[#FAF6EC] shadow-lg">{item.price}</span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[0.625rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr(item.eyebrow)}</p>
                  <h3 className="font-display mt-1.5 text-2xl leading-tight font-semibold text-[#1E3A5F]">{tr(item.name)}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#241F19]/65">{tr(item.detail)}</p>
                  <Link href="/#commander" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#7C2438] outline-none transition-colors hover:text-[#1E3A5F] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Commander ce plat')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
