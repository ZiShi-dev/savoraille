'use client';

import { ArrowRight, ArrowUp, Globe, Mail } from 'lucide-react';
import { LocalizedLink } from './localized-link';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';
import { restaurants } from './restaurant-data';
import { siteConfig } from '@/lib/site-config';

const footerLinks = [
  { label: 'La carte', href: '/carte' },
  { label: 'Réservation', href: '/reservation' },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mes commandes', href: '/commandes' },
];

const footerHeading = 'text-sm font-bold tracking-[0.18em] text-[#E4DDD0] uppercase';
const footerLink = 'inline-flex min-h-11 items-center text-base text-[#E4DDD0] transition-colors hover:text-[#FAF6EC]';

export function SiteFooter() {
  const { tr } = useI18n();

  return (
    <footer className="tone-dark bg-[#1E3A5F] px-6 pt-16 pb-24 text-[#FAF6EC] sm:pt-20 sm:pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-8 border-b border-[#C6A15B]/30 pb-12 md:flex-row md:items-end md:justify-between">
          <LocalizedLink href="/#accueil" className="flex w-fit items-center gap-5 rounded-xl">
            <BrandSeal inverse className="size-20 shrink-0 sm:size-24" />
            <span>
              <span className="font-display block text-5xl leading-none font-semibold sm:text-6xl">Savoraille</span>
              <span className="font-script mt-1 block text-2xl text-[#E4DDD0]">{tr('La merveille des saveurs')}</span>
            </span>
          </LocalizedLink>
          <LocalizedLink href="/reservation" className="btn btn-primary w-fit">
            <span>{tr('Réserver une table')}</span><ArrowRight className="size-4 rtl:rotate-180" />
          </LocalizedLink>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr]">
          <nav aria-label={tr('Plan du site')}>
            <p className={footerHeading}>{tr('Plan du site')}</p>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}><LocalizedLink href={link.href} className={footerLink}>{tr(link.label)}</LocalizedLink></li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className={footerHeading}>{tr('Nous trouver')}</p>
            <ul className="mt-5 grid gap-6 sm:grid-cols-3">
              {restaurants.map((restaurant) => (
                <li key={restaurant.id} className="text-sm leading-6">
                  <span className="font-display block text-2xl font-semibold text-[#FAF6EC]">{restaurant.city}</span>
                  <span className="block text-[#E4DDD0]">{tr(restaurant.address)}</span>
                  <span className="block text-[#E4DDD0]">{tr(restaurant.hours)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-start-2 sm:row-start-1 lg:col-start-auto lg:row-start-auto">
            <p className={footerHeading}>{tr('Contact')}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="mailto:bonjour@savoraille.fr" className={`${footerLink} inline-flex items-center gap-2`}><Mail aria-hidden="true" className="size-4 text-[#C6A15B]" />bonjour@savoraille.fr</a>
              </li>
              {siteConfig.portfolioMode ? (
                <li>
                  <a href={siteConfig.vorzixUrl} target="_blank" rel="noreferrer" className={`${footerLink} inline-flex items-center gap-2`}><Globe aria-hidden="true" className="size-4 text-[#C6A15B]" />{tr('Réalisation')} · VORZIX</a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#FAF6EC]/10 pt-6 text-sm text-[#E4DDD0] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Savoraille. {tr('Tous droits réservés.')} {tr('Cuisine française, trois adresses.')}</p>
          <p><a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="underline decoration-[#E4DDD0]/40 underline-offset-4 hover:text-[#FAF6EC]">{tr('Photographies : Unsplash')}</a></p>
          <div className="flex items-center gap-5">
            {siteConfig.portfolioMode ? (
              <p>
                {tr('Site d’entreprise')} ·{' '}
                <a href={siteConfig.vorzixUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#FAF6EC] underline decoration-[#E4DDD0] underline-offset-4">VORZIX</a>
              </p>
            ) : null}
            <LocalizedLink href="/#accueil" className="inline-flex min-h-11 items-center gap-1.5 text-[#E4DDD0] transition-colors hover:text-[#FAF6EC]">
              {tr('Haut de page')}<ArrowUp aria-hidden="true" className="size-3.5" />
            </LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
