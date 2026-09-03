'use client';

import { useI18n } from './i18n-provider';

export function SkipLink() {
  const { tr } = useI18n();

  return (
    <a
      href="#contenu-principal"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#FAF6EC] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#1E3A5F] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
    >
      {tr('Aller au contenu principal')}
    </a>
  );
}
