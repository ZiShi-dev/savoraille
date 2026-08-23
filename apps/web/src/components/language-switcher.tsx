'use client';

import { Languages } from 'lucide-react';

import { useI18n, type Locale } from './i18n-provider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <label className="relative flex h-11 items-center gap-1.5 rounded-lg border border-[#1E3A5F]/12 bg-white px-2 text-[#1E3A5F] focus-within:ring-2 focus-within:ring-[#C6A15B]" aria-label="Langue · Language · اللغة">
      <Languages aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="appearance-none bg-transparent pe-1 text-xs font-bold uppercase outline-none" aria-label="Langue · Language · اللغة">
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
    </label>
  );
}
