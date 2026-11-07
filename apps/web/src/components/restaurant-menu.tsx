'use client';

import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';

import { AppImage } from '@/components/app-image';
import { useI18n } from '@/components/i18n-provider';
import { LocalizedLink } from '@/components/localized-link';
import { ensureGsapPlugins } from '@/lib/gsap-register';
import { menuSections } from '@/lib/menu-data';
import { attachMenuPanelMotion, fadePanelOut } from '@/lib/site-motion';
import { siteConfig } from '@/lib/site-config';

ensureGsapPlugins();

export function RestaurantMenu() {
  const { tr } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(menuSections[0]?.id ?? 'aperitifs');
  const stickyTop = siteConfig.portfolioMode ? 'top-[6.5rem]' : 'top-[4.5rem]';

  const { contextSafe } = useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const detachPointer = attachMenuPanelMotion(panel);
    return () => {
      detachPointer?.();
    };
  }, { scope: rootRef, dependencies: [activeId], revertOnUpdate: true });

  const choose = (id: string) => {
    if (id === activeId) return;
    contextSafe(() => {
      const panel = panelRef.current;
      if (!panel) {
        setActiveId(id);
        return;
      }
      fadePanelOut(panel, () => setActiveId(id));
    })();
  };

  const section = menuSections.find((item) => item.id === activeId) ?? menuSections[0];
  if (!section) return null;
  const featured = section.items[0];
  const rest = section.items.slice(1);
  if (!featured) return null;

  return (
    <section ref={rootRef} id="menu-complet" data-gsap-custom className={`bg-[#FAF6EC] px-4 pb-16 text-[#241F19] sm:px-6 sm:pb-20 ${siteConfig.portfolioMode ? 'pt-36' : 'pt-28'}`} aria-labelledby="full-menu-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <p className="font-script text-3xl text-[#7C2438]">{tr('La carte')}</p>
          <h1 id="full-menu-title" className="font-display mt-2 text-4xl leading-none font-semibold text-[#1E3A5F] sm:text-6xl">{tr('Toute la carte.')}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#241F19]/65 sm:text-base">{tr(section.subtitle)}</p>
        </div>

        <div className={`sticky ${stickyTop} z-30 -mx-4 mt-8 border-y border-[#C6A15B]/35 bg-[#FAF6EC]/92 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6`}>
          <div className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={tr('La carte')}>
            {menuSections.map((item) => {
              const selected = item.id === section.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(item.id)}
                  className={`min-h-11 shrink-0 snap-start rounded-full border px-4 text-sm font-bold  focus-visible:ring-2 focus-visible:ring-[#7C2438] ${selected ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FAF6EC]' : 'border-[#1E3A5F]/15 bg-white text-[#1E3A5F]'}`}
                >
                  {tr(item.shortLabel)}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{tr(section.label)}</p>
        <div ref={panelRef} id="carte-panel" className="mt-8 sm:mt-10">
          <p className="font-script text-3xl text-[#7C2438]">{tr(section.subtitle)}</p>
          <h3 className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F] sm:text-5xl">{tr(section.label)}</h3>

          <article data-featured data-dish className="mt-8 overflow-hidden rounded-3xl bg-[#1E3A5F] text-[#FAF6EC] shadow-[0_18px_50px_rgba(30,58,95,0.16)]">
            <LocalizedLink href={`/commander/${featured.id}`} className="grid  focus-visible:ring-2 focus-visible:ring-[#7C2438] lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem]">
                <AppImage data-photo data-featured-photo src={featured.image} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover will-change-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B4D]/70 via-transparent to-[#102B4D]/15 lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <p className="text-[0.68rem] font-bold tracking-[0.16em] text-[#C6A15B] uppercase">{tr(featured.eyebrow)}</p>
                <h4 className="font-display mt-3 text-4xl leading-none font-semibold sm:text-5xl">{tr(featured.name)}</h4>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[#FAF6EC]/72 sm:text-base">{tr(featured.detail)}</p>
                <p className="font-display mt-8 text-3xl font-semibold text-[#C6A15B]">{featured.price}</p>
                <span className="mt-6 text-sm font-bold text-[#FAF6EC]">{tr('Voir et commander')}</span>
              </div>
            </LocalizedLink>
          </article>

          <ul className="mt-4 sm:mt-8">
            {rest.map((item) => (
              <li key={item.id} data-dish className="border-b border-[#1E3A5F]/10">
                <LocalizedLink href={`/commander/${item.id}`} className="grid gap-5 py-7  focus-visible:ring-2 focus-visible:ring-[#7C2438] sm:py-9 md:grid-cols-[18rem_1fr] md:items-center md:gap-10">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#1E3A5F]">
                    <AppImage data-photo src={item.image} alt="" fill sizes="(min-width: 768px) 18rem, 100vw" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-bold tracking-[0.16em] text-[#C4703F] uppercase">{tr(item.eyebrow)}</p>
                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-3xl leading-none font-semibold text-[#1E3A5F] sm:text-4xl">{tr(item.name)}</h4>
                      <p className="font-display shrink-0 text-2xl font-semibold text-[#7C2438]">{item.price}</p>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#241F19]/68 sm:text-base">{tr(item.detail)}</p>
                    <span className="mt-4 inline-block text-sm font-bold text-[#1E3A5F]">{tr('Voir et commander')}</span>
                  </div>
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
