'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Languages } from 'lucide-react';

import { useI18n, type Locale } from './i18n-provider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const languages: Array<{ code: Locale; short: string; label: string; native: string }> = [
    { code: 'fr', short: 'FR', label: 'Français', native: 'Français' },
    { code: 'en', short: 'EN', label: 'English', native: 'English' },
    { code: 'ar', short: 'AR', label: 'Arabe', native: 'العربية' },
  ];
  const selected = languages.find((language) => language.code === locale) ?? languages[0]!;

  return (
    <Select.Root value={locale} onValueChange={(value) => setLocale(value as Locale)} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Select.Trigger className="group inline-flex h-11 items-center gap-2 rounded-lg border border-[#1E3A5F]/12 bg-white px-2.5 text-[#1E3A5F] outline-none transition-colors hover:border-[#C6A15B]/60 hover:bg-[#FFFDF8] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Langue · Language · اللغة">
        <Languages aria-hidden="true" className="size-4 shrink-0 text-[#7C2438]" strokeWidth={1.8} />
        <span className="text-xs font-bold">{selected.short}</span>
        <span className="hidden max-w-20 truncate text-xs font-semibold text-[#1E3A5F]/68 2xl:inline">{selected.native}</span>
        <Select.Icon asChild><ChevronDown aria-hidden="true" className="size-3.5 text-[#1E3A5F]/55 transition-transform group-data-[state=open]:rotate-180" /></Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" sideOffset={8} align="end" className="z-[90] min-w-52 overflow-hidden rounded-xl border border-[#C6A15B]/35 bg-[#FAF6EC]/98 p-1.5 text-[#1E3A5F] shadow-[0_18px_50px_rgba(30,58,95,0.22)] backdrop-blur-xl">
          <div className="px-3 pb-2 pt-1.5 text-[0.62rem] font-bold tracking-[0.15em] text-[#7C2438] uppercase">Langue · Language · اللغة</div>
          <Select.Viewport>
            {languages.map((language) => (
              <Select.Item key={language.code} value={language.code} className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-2.5 py-2.5 pe-9 outline-none transition-colors data-[highlighted]:bg-[#1E3A5F] data-[highlighted]:text-[#FAF6EC] data-[state=checked]:bg-[#C6A15B]/18">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#C6A15B]/45 bg-white/70 text-[0.62rem] font-bold text-[#7C2438]">{language.short}</span>
                <Select.ItemText>
                  <span className="block text-sm font-bold">{language.native}</span>
                  <span className="block text-[0.65rem] opacity-55">{language.label}</span>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute end-3 text-[#7C2438] data-[highlighted]:text-[#C6A15B]"><Check className="size-4" strokeWidth={2.2} /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
