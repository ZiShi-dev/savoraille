'use client';

import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { useI18n } from './i18n-provider';
import { siteConfig } from '@/lib/site-config';

export function PortfolioBanner() {
  const { tr } = useI18n();

  if (!siteConfig.portfolioMode) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] border-b border-[#C6A15B]/25 bg-[#102B4D] text-[#FAF6EC]">
      <div className="mx-auto flex h-8 max-w-[1280px] items-center justify-between gap-3 px-4 text-[0.62rem] font-semibold tracking-[0.12em] uppercase sm:px-6">
        <Link
          href={siteConfig.vorzixUrl}
          className="inline-flex min-w-0 items-center gap-1.5 text-[#FAF6EC]/72 outline-none transition-colors hover:text-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
        >
          <ArrowLeft aria-hidden="true" className="size-3 shrink-0 rtl:rotate-180" />
          <span className="truncate">VORZIX</span>
        </Link>
        <p className="hidden items-center gap-1.5 text-[#FAF6EC]/58 sm:inline-flex">
          <Sparkles aria-hidden="true" className="size-3 text-[#C6A15B]" />
          {tr('Démo interactive · Restaurant')}
        </p>
        <span className="truncate text-[#C6A15B]">{tr('Site d’entreprise')}</span>
      </div>
    </div>
  );
}
