'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';
import { LanguageSwitcher } from './language-switcher';

const navigation = [
  { label: 'Accueil', href: '/#accueil', sectionId: 'accueil' },
  { label: 'La carte', href: '/carte', sectionId: null },
  { label: 'Notre histoire', href: '/#histoire', sectionId: 'histoire' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('/#accueil');
  const { tr } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setActiveHref(pathname === '/carte' ? '/carte' : '');
      return;
    }

    const sections = navigation
      .map((item) => item.sectionId ? document.getElementById(item.sectionId) : null)
      .filter((section): section is HTMLElement => Boolean(section));
    const syncHash = () => {
      const href = `/${window.location.hash || '#accueil'}`;
      if (navigation.some((item) => item.href === href)) setActiveHref(href);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveHref(`/#${visibleSection.target.id}`);
      },
      { rootMargin: '-28% 0px -62% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('hashchange', syncHash);
    syncHash();

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', syncHash);
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between rounded-2xl border border-[#1E3A5F]/12 bg-[#FAF6EC]/92 px-3 shadow-[0_8px_24px_rgba(30,58,95,0.12)] backdrop-blur-xl sm:px-4">
        <Link href="/#accueil" className="group flex items-center gap-3 rounded-lg pe-2 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={`Savoraille · ${tr('Accueil')}`}>
          <BrandSeal className="size-14 shrink-0 transition-transform duration-300 group-hover:scale-[1.04]" />
          <span className="block min-w-0">
            <span className="font-display block text-[1.15rem] leading-none font-semibold text-[#1E3A5F] sm:text-[1.4rem]">Savoraille</span>
            <span className="font-script mt-0.5 block whitespace-nowrap text-xs leading-none text-[#7C2438] sm:text-sm">{tr('La merveille des saveurs')}</span>
          </span>
        </Link>

        <NavigationMenu.Root className="hidden lg:block" aria-label={tr('Navigation principale')}>
          <NavigationMenu.List className="flex items-center gap-1 rounded-xl border border-[#1E3A5F]/8 bg-white/55 p-1">
            {navigation.map((item) => {
              const active = activeHref === item.href;
              return <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link href={item.href} aria-current={active ? 'page' : undefined} className={`relative block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${active ? 'bg-[#1E3A5F] text-[#FAF6EC] shadow-sm' : 'text-[#1E3A5F]/75 hover:bg-white hover:text-[#1E3A5F]'}`}>
                    {tr(item.label)}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>;
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/#commander" className="hidden items-center gap-2 rounded-lg border border-[#1E3A5F]/15 px-3.5 py-3 text-sm font-semibold text-[#1E3A5F] transition-colors hover:border-[#C6A15B]/60 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none xl:flex">
            <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={1.8} />{tr('Commander')}
          </Link>
          <Link href="/#reservation" className="hidden items-center gap-2 rounded-lg bg-[#7C2438] px-4 py-3 text-sm font-semibold text-[#FAF6EC] shadow-[0_8px_20px_rgba(124,36,56,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#691d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:outline-none sm:flex">
            {tr('Réserver')}<ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button type="button" className="grid size-11 place-items-center rounded-lg border border-[#1E3A5F]/12 bg-white text-[#1E3A5F] outline-none transition-colors hover:bg-[#F4EEDF] focus-visible:ring-2 focus-visible:ring-[#C6A15B] lg:hidden" aria-label={tr('Ouvrir le menu')}>
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Trigger>

            <AnimatePresence>
              {mobileOpen ? (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild>
                    <motion.div className="fixed inset-0 z-50 bg-[#1E3A5F]/45 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                  </Dialog.Overlay>
                  <Dialog.Content asChild aria-describedby={undefined}>
                    <motion.div className="fixed inset-x-3 top-3 z-50 overflow-hidden rounded-2xl border border-[#C6A15B]/30 bg-[#1E3A5F] p-4 shadow-2xl outline-none sm:inset-x-6 sm:top-4 lg:hidden" initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="flex items-center gap-3 text-lg font-semibold tracking-tight text-[#FAF6EC]">
                          <BrandSeal inverse className="size-14" />
                          <span>
                            <span className="font-display block text-2xl leading-none">Savoraille</span>
                            <span className="font-script mt-1 block text-sm font-normal text-[#C6A15B]">{tr('La merveille des saveurs')}</span>
                          </span>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button type="button" className="grid size-10 place-items-center rounded-lg border border-[#FAF6EC]/15 bg-white/8 text-[#FAF6EC] outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={tr('Fermer le menu')}>
                            <X aria-hidden="true" className="size-5" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <nav className="mt-8" aria-label={tr('Navigation mobile')}>
                        <ul className="grid gap-1">
                          {navigation.map((item, index) => {
                            const active = activeHref === item.href;
                            return <li key={item.href}>
                              <Dialog.Close asChild>
                                <Link href={item.href} aria-current={active ? 'page' : undefined} className={`group flex items-center justify-between rounded-lg px-3 py-3.5 text-lg font-medium text-[#FAF6EC] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${active ? 'bg-white/10' : 'hover:bg-white/8'}`}>
                                  <span className="flex items-center gap-3"><span className="text-xs tabular-nums text-[#C6A15B]">0{index + 1}</span>{tr(item.label)}</span>
                                  <ArrowUpRight aria-hidden="true" className="size-4 text-[#C6A15B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                              </Dialog.Close>
                            </li>;
                          })}
                        </ul>
                      </nav>

                      <Dialog.Close asChild>
                        <Link href="/#reservation" className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-4 py-4 font-semibold text-[#FAF6EC] shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F]">
                          <CalendarDays aria-hidden="true" className="size-5" />{tr('Réserver une table')}
                        </Link>
                      </Dialog.Close>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              ) : null}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
