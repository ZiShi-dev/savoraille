'use client';

import { Globe } from 'lucide-react';
import { LocalizedLink } from './localized-link';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  const { tr } = useI18n();

  return (
    <footer className="bg-[#1E3A5F] px-6 py-14 text-[#FAF6EC]">
      <div className="mx-auto grid max-w-[1200px] gap-10 border-b border-[#C6A15B]/30 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <LocalizedLink href="/#accueil" className="flex w-fit items-center gap-5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
          <BrandSeal inverse className="size-24 shrink-0" />
          <div><p className="font-display text-4xl font-semibold">Savoraille</p><p className="font-script mt-1 text-2xl text-[#C6A15B]">{tr('La merveille des saveurs')}</p></div>
        </LocalizedLink>
        <div><p className="text-xs font-bold tracking-[0.18em] text-[#C6A15B] uppercase">{tr('Nous trouver')}</p><p className="mt-4 text-sm leading-7 text-[#FAF6EC]/70">{tr('Votre adresse')}<br />{tr('Votre ville, France')}</p></div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#C6A15B] uppercase">
            {siteConfig.portfolioMode ? tr('Réalisation') : tr('Nous suivre')}
          </p>
          {siteConfig.portfolioMode ? (
            <a
              href={siteConfig.vorzixUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#FAF6EC]/75 hover:text-[#FAF6EC]"
            >
              <Globe className="size-5" aria-hidden />
              VORZIX
            </a>
          ) : null}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 pt-6 text-xs text-[#FAF6EC]/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Savoraille. {tr('Tous droits réservés.')}</p>
        <div className="flex flex-col gap-2 sm:items-end">
          <p>{tr('Restaurant français moderne.')}</p>
          {siteConfig.portfolioMode ? (
            <p>
              {tr('Site d’entreprise')} ·{' '}
              <a
                href={siteConfig.vorzixUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#C6A15B] outline-none transition-colors hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
              >
                VORZIX
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
