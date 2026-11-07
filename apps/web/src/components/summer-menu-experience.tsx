'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';

import { AppImage } from '@/components/app-image';
import { useI18n } from '@/components/i18n-provider';
import { LocalizedLink } from '@/components/localized-link';
import { ensureGsapPlugins } from '@/lib/gsap-register';
import { menuItems, menuSections, type MenuItem, type MenuSection } from '@/lib/menu-data';
import { attachMenuPanelMotion, fadePanelOut, scheduleScrollRefresh } from '@/lib/site-motion';

export type { MenuItem, MenuSection };
export { menuItems, menuSections } from '@/lib/menu-data';

ensureGsapPlugins();

const PREVIEW_COUNT = 4;

function Leader() {
  return <span aria-hidden="true" className="mx-3 min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-[#1E3A5F]/30" />;
}

type SummerMenuExperienceProps = {
  standalone?: boolean;
};

export function SummerMenuExperience({ standalone = false }: SummerMenuExperienceProps) {
  const { tr } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(menuSections[0]?.id ?? 'aperitifs');
  const HeadingTag = standalone ? 'h1' : 'h2';

  const { contextSafe } = useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const detachPointer = attachMenuPanelMotion(panel);
    const refreshCleanup = scheduleScrollRefresh();
    return () => {
      detachPointer?.();
      refreshCleanup();
      ScrollTrigger.refresh();
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

  const preview = section.items.slice(0, PREVIEW_COUNT);
  const featured = preview[0];
  const rest = preview.slice(1);
  if (!featured) return null;

  const remaining = section.items.length - PREVIEW_COUNT;

  return (
    <section
      ref={rootRef}
      id="carte"
      data-motion="reveal"
      className="bg-[#FAF6EC] px-4 py-16 text-[#241F19] sm:px-6 sm:py-20 lg:py-24"
      aria-labelledby="summer-menu-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-[#7C2438]">{tr('La carte')}</p>
            <HeadingTag id="summer-menu-title" className="font-display mt-2 text-4xl font-semibold leading-none text-[#1E3A5F] sm:text-5xl lg:text-6xl">
              {tr('L’assiette du moment')}
            </HeadingTag>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#241F19]/65 sm:text-base">
              {tr('Même présentation que sur la page La carte. Quatre plats par rubrique.')}
            </p>
          </div>
          <LocalizedLink
            href="/carte#menu-complet"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1E3A5F]/12 bg-white px-5 py-3 text-sm font-bold text-[#1E3A5F] shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-colors hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
          >
            {tr('Voir toute la carte')}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </LocalizedLink>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={tr('La carte')}>
          {menuSections.map((item) => {
            const selected = item.id === section.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(item.id)}
                className={`min-h-11 shrink-0 snap-start rounded-full border px-4 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'border-[#1E3A5F] bg-[#1E3A5F] text-[#FAF6EC]' : 'border-[#1E3A5F]/15 bg-white text-[#1E3A5F]'}`}
              >
                {tr(item.shortLabel)}
              </button>
            );
          })}
        </div>

        <div data-gsap-custom ref={panelRef} className="mt-8 sm:mt-10">
          <p className="font-script text-3xl text-[#7C2438]">{tr(section.subtitle)}</p>
          <h3 className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F] sm:text-4xl">{tr(section.label)}</h3>

          <article data-featured data-dish className="mt-6 overflow-hidden rounded-3xl bg-[#1E3A5F] text-[#FAF6EC] shadow-[0_18px_50px_rgba(30,58,95,0.14)] sm:mt-8">
            <LocalizedLink href={`/commander/${featured.id}`} className="grid outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
                <AppImage data-photo data-featured-photo src={featured.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B4D]/65 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-end p-6 sm:p-8">
                <p className="text-[0.68rem] font-bold tracking-[0.16em] text-[#C6A15B] uppercase">{tr(featured.eyebrow)}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h4 className="font-display text-3xl font-semibold leading-none sm:text-4xl">{tr(featured.name)}</h4>
                  <Leader />
                  <span className="font-display shrink-0 text-2xl text-[#C6A15B]">{featured.price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#FAF6EC]/72 sm:text-base">{tr(featured.detail)}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#FAF6EC]">
                  {tr('Voir et commander')}
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </span>
              </div>
            </LocalizedLink>
          </article>

          {rest.length > 0 ? (
            <ul className="mt-2 sm:mt-4">
              {rest.map((item) => (
                <li key={item.id} data-dish className="border-b border-[#1E3A5F]/10">
                  <LocalizedLink href={`/commander/${item.id}`} className="group flex items-baseline gap-3 py-5 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:py-6">
                    <span className="relative hidden size-16 shrink-0 overflow-hidden rounded-2xl bg-[#1E3A5F] sm:block">
                      <div data-photo className="absolute inset-0">
                        <AppImage src={item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-[0.65rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr(item.eyebrow)}</span>
                      <span className="font-display mt-0.5 block text-2xl text-[#1E3A5F] group-hover:text-[#7C2438]">{tr(item.name)}</span>
                    </span>
                    <Leader />
                    <span className="font-display shrink-0 text-xl text-[#7C2438]">{item.price}</span>
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          ) : null}

          {remaining > 0 ? (
            <p className="mt-6 text-center text-sm text-[#241F19]/58">
              {tr('Et')} <strong className="text-[#1E3A5F]">{remaining}</strong> {tr(remaining === 1 ? 'autre plat dans cette rubrique.' : 'autres plats dans cette rubrique.')}
              {' '}
              <LocalizedLink href="/carte#menu-complet" className="font-bold text-[#7C2438] underline decoration-[#C6A15B] underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                {tr('Voir la rubrique complète')}
              </LocalizedLink>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
