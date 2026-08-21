'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

import { BrandSeal } from './brand-seal';

const navigation = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'La carte', href: '#carte' },
  { label: 'Notre histoire', href: '#histoire' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between rounded-2xl border border-[#1E3A5F]/12 bg-[#FAF6EC]/92 px-3 shadow-[0_8px_24px_rgba(30,58,95,0.12)] backdrop-blur-xl sm:px-4">
        <a href="#accueil" className="group flex items-center gap-3 rounded-lg pr-2 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Savoraille, retour à l'accueil">
          <BrandSeal className="size-14 shrink-0 transition-transform duration-300 group-hover:scale-[1.04]" />
          <span className="block min-w-0">
            <span className="font-display block text-[1.15rem] leading-none font-semibold text-[#1E3A5F] sm:text-[1.4rem]">Savoraille</span>
            <span className="font-script mt-0.5 block whitespace-nowrap text-xs leading-none text-[#7C2438] sm:text-sm">La merveille des saveurs</span>
          </span>
        </a>

        <NavigationMenu.Root className="hidden lg:block" aria-label="Navigation principale">
          <NavigationMenu.List className="flex items-center gap-1 rounded-xl border border-[#1E3A5F]/8 bg-white/55 p-1">
            {navigation.map((item, index) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <a href={item.href} className={`relative block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${index === 0 ? 'bg-[#1E3A5F] text-[#FAF6EC] shadow-sm' : 'text-[#1E3A5F]/75 hover:bg-white hover:text-[#1E3A5F]'}`}>
                    {item.label}
                  </a>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <a href="#commander" className="hidden items-center gap-2 rounded-lg border border-[#1E3A5F]/15 px-3.5 py-3 text-sm font-semibold text-[#1E3A5F] transition-colors hover:border-[#C6A15B]/60 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none xl:flex">
            <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={1.8} />Commander
          </a>
          <a href="#reservation" className="hidden items-center gap-2 rounded-lg bg-[#7C2438] px-4 py-3 text-sm font-semibold text-[#FAF6EC] shadow-[0_8px_20px_rgba(124,36,56,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#691d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:outline-none sm:flex">
            Réserver<ArrowUpRight aria-hidden="true" className="size-4" />
          </a>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button type="button" className="grid size-11 place-items-center rounded-lg border border-[#1E3A5F]/12 bg-white text-[#1E3A5F] outline-none transition-colors hover:bg-[#F4EEDF] focus-visible:ring-2 focus-visible:ring-[#C6A15B] lg:hidden" aria-label="Ouvrir le menu">
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
                            <span className="font-script mt-1 block text-sm font-normal text-[#C6A15B]">La merveille des saveurs</span>
                          </span>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button type="button" className="grid size-10 place-items-center rounded-lg border border-[#FAF6EC]/15 bg-white/8 text-[#FAF6EC] outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Fermer le menu">
                            <X aria-hidden="true" className="size-5" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <nav className="mt-8" aria-label="Navigation mobile">
                        <ul className="grid gap-1">
                          {navigation.map((item, index) => (
                            <li key={item.href}>
                              <Dialog.Close asChild>
                                <a href={item.href} className="group flex items-center justify-between rounded-lg px-3 py-3.5 text-lg font-medium text-[#FAF6EC] outline-none transition-colors hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                                  <span className="flex items-center gap-3"><span className="text-xs tabular-nums text-[#C6A15B]">0{index + 1}</span>{item.label}</span>
                                  <ArrowUpRight aria-hidden="true" className="size-4 text-[#C6A15B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                              </Dialog.Close>
                            </li>
                          ))}
                        </ul>
                      </nav>

                      <Dialog.Close asChild>
                        <a href="#reservation" className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-4 py-4 font-semibold text-[#FAF6EC] shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F]">
                          <CalendarDays aria-hidden="true" className="size-5" />Réserver une table
                        </a>
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
