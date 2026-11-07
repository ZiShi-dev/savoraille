'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useGSAP } from '@gsap/react';
import { CalendarDays, LogIn, LogOut, Menu, ShoppingBag, UserPlus, UserRound, X } from 'lucide-react';
import { LocalizedLink } from './localized-link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { enterFade, slideDrawer } from '@/lib/site-motion';
import { ensureGsapPlugins } from '@/lib/gsap-register';

import { BrandSeal } from './brand-seal';
import { useAuth } from './auth-provider';
import { useCart } from './cart-provider';
import { useI18n } from './i18n-provider';
import { LanguageSwitcher } from './language-switcher';
import { stripLocaleFromPath } from '@/lib/i18n-routing';
import { siteConfig } from '@/lib/site-config';

ensureGsapPlugins();

const navigation = [
  { label: 'Accueil', href: '/#accueil', sectionId: 'accueil' },
  { label: 'La carte', href: '/carte', sectionId: null },
  { label: 'Notre histoire', href: '/histoire', sectionId: null },
  { label: 'Contact', href: '/contact', sectionId: null },
];

export function SiteHeader() {
  const mobileOverlayRef = useRef<HTMLButtonElement>(null);
  const mobileAsideRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('/#accueil');
  const [scrolled, setScrolled] = useState(false);
  const { tr, locale } = useI18n();
  const { itemCount } = useCart();
  const { user, openAuth, signOut } = useAuth();
  const pathname = usePathname();
  const barePath = stripLocaleFromPath(pathname).replace(/\/$/, '') || '/';
  const isRtl = locale === 'ar';
  const darkHeroPage = barePath === '/' || barePath === '/histoire' || barePath === '/contact';
  const blendsWithPage = !scrolled && (darkHeroPage || barePath === '/carte' || barePath.startsWith('/commander/'));
  const isTransparent = blendsWithPage && darkHeroPage;

  const openMobileAuth = (mode: 'signin' | 'signup') => {
    setMobileOpen(false);
    window.setTimeout(() => openAuth(mode), 180);
  };

  useEffect(() => {
    document.body.toggleAttribute('data-mobile-menu-open', mobileOpen);
    return () => document.body.removeAttribute('data-mobile-menu-open');
  }, [mobileOpen]);

  useGSAP(() => {
    if (!mobileOpen) return;
    if (mobileOverlayRef.current) enterFade(mobileOverlayRef.current);
    if (mobileAsideRef.current) slideDrawer(mobileAsideRef.current, isRtl ? '-100%' : '100%');
  }, { dependencies: [mobileOpen, isRtl], revertOnUpdate: true });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (barePath !== '/') {
      setActiveHref(navigation.find((item) => {
        const itemPath = item.href.replace(/#.*$/, '').replace(/\/$/, '') || '/';
        return itemPath === barePath;
      })?.href ?? '');
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
  }, [barePath]);

  const linkTone = isTransparent
    ? 'text-[#E4DDD0] hover:text-[#FAF6EC]'
    : 'text-[#1E3A5F] hover:text-[#102B4D]';
  const activeTone = isTransparent ? 'text-[#C6A15B]' : 'text-[#1E3A5F]';
  const iconButtonTone = isTransparent
    ? 'text-[#FAF6EC]/85 hover:bg-white/10'
    : 'text-[#1E3A5F] hover:bg-[#1E3A5F]/6';

  return (
    <header
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${isTransparent ? 'tone-dark' : ''} fixed inset-x-0 z-50 transition-[background-color,box-shadow,border-color,top] duration-300 ${siteConfig.portfolioMode ? 'top-8' : 'top-0'} ${
        blendsWithPage
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-[#C6A15B]/28 bg-[#FAF6EC]/95 shadow-[0_8px_30px_rgba(30,58,95,0.08)] backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto grid h-[4.5rem] max-w-[1280px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-3 sm:px-5 lg:px-8">
        <LocalizedLink
          href="/#accueil"
          className="group flex min-w-0 items-center gap-2.5 rounded-lg sm:gap-3"
          aria-label={`Savoraille · ${tr('Accueil')}`}
        >
          <BrandSeal inverse={isTransparent} className="size-11 shrink-0 lg:size-12" />
          <span className={`font-display hidden truncate text-lg leading-none font-semibold lg:block ${isTransparent ? 'text-[#FAF6EC]' : 'text-[#1E3A5F]'}`}>Savoraille</span>
        </LocalizedLink>

        <nav className="hidden min-w-0 justify-self-center xl:block" aria-label={tr('Navigation principale')}>
          <ul className="flex items-center justify-center gap-4 2xl:gap-7">
            {navigation.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href} className="shrink-0">
                  <LocalizedLink
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block py-2 text-sm font-bold tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${active ? activeTone : linkTone}`}
                  >
                    {tr(item.label)}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px origin-center bg-[#C6A15B] transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </LocalizedLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-1.5">
          <LanguageSwitcher variant={isTransparent ? 'dark' : 'light'} compact />

          {user ? (
            <div className={`hidden items-center gap-0.5 rounded-full p-0.5 2xl:flex ${isTransparent ? 'bg-white/8' : 'bg-[#1E3A5F]/5'}`}>
              <span className={`flex min-w-0 items-center gap-1.5 px-1.5 py-1 ${isTransparent ? 'text-[#FAF6EC]' : 'text-[#1E3A5F]'}`}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#C6A15B] text-sm font-bold text-[#241F19]">{user.name.charAt(0).toUpperCase()}</span>
                <span className="hidden max-w-28 truncate text-xs font-semibold 2xl:block">{user.name}</span>
              </span>
              <button
                type="button"
                onClick={signOut}
                className={`grid size-9 place-items-center rounded-full  transition-colors focus-visible:ring-2 focus-visible:ring-[#7C2438] ${iconButtonTone}`}
                aria-label={tr('Se déconnecter')}
                title={tr('Se déconnecter')}
              >
                <LogOut aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-0.5 2xl:flex">
              <button
                type="button"
                onClick={() => openAuth('signin')}
                className={`rounded-full px-3 py-2 text-xs font-bold  transition-colors focus-visible:ring-2 focus-visible:ring-[#7C2438] ${isTransparent ? 'text-[#FAF6EC]/85 hover:bg-white/10' : 'text-[#1E3A5F]/75 hover:bg-[#1E3A5F]/6'}`}
              >
                {tr('Se connecter')}
              </button>
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className={`rounded-full px-3.5 py-2 text-xs font-bold  transition-colors focus-visible:ring-2 focus-visible:ring-[#7C2438] ${isTransparent ? 'bg-[#FAF6EC] text-[#1E3A5F] hover:bg-white' : 'bg-[#1E3A5F] text-[#FAF6EC] hover:bg-[#102B4D]'}`}
              >
                {tr('S’inscrire')}
              </button>
            </div>
          )}

          {!user ? (
            <button
              type="button"
              onClick={() => openAuth('signin')}
              className={`grid size-11 place-items-center rounded-full transition-colors 2xl:hidden ${iconButtonTone}`}
              aria-label={tr('Espace client')}
              title={tr('Espace client')}
            >
              <UserRound aria-hidden="true" className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={signOut}
              className={`grid size-11 place-items-center rounded-full text-sm font-bold 2xl:hidden ${isTransparent ? 'bg-[#C6A15B] text-[#241F19]' : 'bg-[#1E3A5F] text-[#FAF6EC]'}`}
              aria-label={tr('Se déconnecter')}
              title={tr('Se déconnecter')}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          )}

          <LocalizedLink
            href="/commandes"
            className={`relative grid size-11 place-items-center rounded-full transition-colors ${iconButtonTone}`}
            aria-label={tr('Ma commande')}
            title={tr('Ma commande')}
          >
            <ShoppingBag aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.8} />
            {itemCount > 0 ? (
              <span
                className="absolute -top-0.5 -end-0.5 grid min-w-4 place-items-center rounded-full bg-[#7C2438] px-1 py-0.5 text-[0.58rem] font-bold text-[#FAF6EC]"
                aria-live="polite"
                aria-atomic="true"
              >
                {itemCount}
              </span>
            ) : null}
          </LocalizedLink>

          <LocalizedLink
            href="/reservation"
            className="btn btn-primary hidden lg:inline-flex"
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            <span>{tr('Réserver')}</span>
          </LocalizedLink>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className={`grid size-11 place-items-center rounded-full transition-colors xl:hidden ${iconButtonTone}`}
                aria-label={tr('Ouvrir le menu')}
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay asChild>
                    <button
                      ref={mobileOverlayRef}
                      type="button"
                      className="fixed inset-0 z-[70] bg-[#102B4D]/55 backdrop-blur-[2px] xl:hidden"
                      aria-label={tr('Fermer le menu')}
                      onClick={() => setMobileOpen(false)}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild aria-describedby={undefined}>
                    <aside
                      ref={mobileAsideRef}
                      dir={isRtl ? 'rtl' : 'ltr'}
                      className="fixed inset-y-0 end-0 z-[70] flex w-full max-w-[min(100vw,22rem)] flex-col bg-[#FAF6EC] shadow-[-12px_0_40px_rgba(30,58,95,0.18)]  xl:hidden"
                    >
                      <div className="flex items-center justify-between border-b border-[#1E3A5F]/10 px-5 py-4">
                        <Dialog.Title className="flex items-center gap-3">
                          <BrandSeal className="size-11" />
                          <span>
                            <span className="font-display block text-xl leading-none font-semibold text-[#1E3A5F]">Savoraille</span>
                            <span className="font-script mt-0.5 block text-xs text-[#7C2438]">{tr('La merveille des saveurs')}</span>
                          </span>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            className="grid size-10 place-items-center rounded-full text-[#1E3A5F]  transition-colors hover:bg-[#1E3A5F]/6 focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                            aria-label={tr('Fermer le menu')}
                          >
                            <X aria-hidden="true" className="size-5" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label={tr('Navigation mobile')}>
                        <ul className="grid gap-1">
                          {navigation.map((item) => {
                            const active = activeHref === item.href;
                            return (
                              <li key={item.href}>
                                <Dialog.Close asChild>
                                  <LocalizedLink
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`block rounded-xl px-4 py-3.5 font-display text-2xl font-semibold  transition-colors focus-visible:ring-2 focus-visible:ring-[#7C2438] ${
                                      active ? 'bg-[#1E3A5F] text-[#FAF6EC]' : 'text-[#1E3A5F] hover:bg-[#1E3A5F]/6'
                                    }`}
                                  >
                                    {tr(item.label)}
                                  </LocalizedLink>
                                </Dialog.Close>
                              </li>
                            );
                          })}
                        </ul>
                      </nav>

                      <div className="space-y-3 border-t border-[#1E3A5F]/10 p-5">
                        <section className="rounded-2xl bg-[#1E3A5F]/5 p-4" aria-labelledby="mobile-account-title">
                          <h2 id="mobile-account-title" className="text-xs font-bold tracking-[0.16em] text-[#7C2438] uppercase">{tr('Espace client')}</h2>
                          {user ? (
                            <div className="mt-3 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-xs text-[#1E3A5F]/55">{tr('Bonjour')}</p>
                                <p className="truncate font-display text-xl font-semibold text-[#1E3A5F]">{user.name}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => { signOut(); setMobileOpen(false); }}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#1E3A5F]/12 px-3 py-2 text-xs font-bold text-[#1E3A5F]  hover:bg-white focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                              >
                                <LogOut aria-hidden="true" className="size-4" />
                                {tr('Se déconnecter')}
                              </button>
                            </div>
                          ) : (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => openMobileAuth('signin')}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1E3A5F]/12 px-3 py-2.5 text-xs font-bold text-[#1E3A5F]  hover:bg-white focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                              >
                                <LogIn aria-hidden="true" className="size-4" />
                                {tr('Se connecter')}
                              </button>
                              <button
                                type="button"
                                onClick={() => openMobileAuth('signup')}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A5F] px-3 py-2.5 text-xs font-bold text-[#FAF6EC]  hover:bg-[#102B4D] focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                              >
                                <UserPlus aria-hidden="true" className="size-4" />
                                {tr('S’inscrire')}
                              </button>
                            </div>
                          )}
                        </section>

                        <Dialog.Close asChild>
                          <LocalizedLink
                            href="/reservation"
                            className="flex items-center justify-center gap-2 rounded-full bg-[#7C2438] px-4 py-3.5 text-sm font-bold text-[#FAF6EC]  focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                          >
                            <CalendarDays aria-hidden="true" className="size-4" />
                            {tr('Réserver une table')}
                          </LocalizedLink>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <LocalizedLink
                            href="/commandes"
                            className="flex items-center justify-center gap-2 rounded-full border border-[#1E3A5F]/12 px-4 py-3.5 text-sm font-bold text-[#1E3A5F]  hover:bg-white focus-visible:ring-2 focus-visible:ring-[#7C2438]"
                          >
                            <ShoppingBag aria-hidden="true" className="size-4" />
                            {tr('Ma commande')}
                            {itemCount > 0 ? (
                              <span className="rounded-full bg-[#7C2438] px-2 py-0.5 text-xs font-bold text-[#FAF6EC]">{itemCount}</span>
                            ) : null}
                          </LocalizedLink>
                        </Dialog.Close>
                      </div>
                    </aside>
                  </Dialog.Content>
                </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
