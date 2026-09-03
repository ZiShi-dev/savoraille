'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useEffect } from 'react';

import { useI18n, type Locale } from './i18n-provider';

export function LanguageSwitcher({ variant = 'light', compact = false }: { variant?: 'light' | 'dark'; compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const languages: Array<{ code: Locale; short: string; label: string; native: string }> = [
    { code: 'fr', short: 'FR', label: 'Français', native: 'Français' },
    { code: 'en', short: 'EN', label: 'English', native: 'English' },
    { code: 'ar', short: 'AR', label: 'Arabe', native: 'العربية' },
  ];
  const selected = languages.find((language) => language.code === locale) ?? languages[0]!;

  useEffect(() => () => {
    document.documentElement.removeAttribute('data-language-menu-open');
    document.body.style.removeProperty('overflow-y');
    document.body.style.removeProperty('margin-right');
  }, []);

  const handleOpenChange = (open: boolean) => {
    document.documentElement.toggleAttribute('data-language-menu-open', open);

    window.requestAnimationFrame(() => {
      if (open && document.documentElement.hasAttribute('data-language-menu-open')) {
        document.body.style.setProperty('overflow-y', 'scroll', 'important');
        document.body.style.setProperty('margin-right', '0px', 'important');
        return;
      }

      document.body.style.removeProperty('overflow-y');
      document.body.style.removeProperty('margin-right');
    });
  };

  const isDark = variant === 'dark';

  return (
    <Select.Root value={locale} onValueChange={(value) => setLocale(value as Locale)} onOpenChange={handleOpenChange} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Select.Trigger className={`group inline-flex shrink-0 items-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${
        compact ? 'size-10 justify-center gap-0 px-0' : 'h-10 gap-1.5 px-2.5'
      } ${
        isDark
          ? 'text-[#FAF6EC]/85 hover:bg-white/10'
          : 'border border-[#1E3A5F]/10 bg-white/70 text-[#1E3A5F] hover:border-[#C6A15B]/45 hover:bg-white'
      }`} aria-label="Langue · Language · اللغة">
        {!compact ? (
          <Languages aria-hidden="true" className={`size-4 shrink-0 ${isDark ? 'text-[#C6A15B]' : 'text-[#7C2438]'}`} strokeWidth={1.8} />
        ) : null}
        <span className="text-xs font-bold">{selected.short}</span>
        {!compact ? (
          <span className={`hidden max-w-20 truncate text-xs font-semibold 2xl:inline ${isDark ? 'text-[#FAF6EC]/55' : 'text-[#1E3A5F]/55'}`}>{selected.native}</span>
        ) : null}
        {!compact ? (
          <Select.Icon asChild><ChevronDown aria-hidden="true" className={`size-3.5 transition-transform group-data-[state=open]:rotate-180 ${isDark ? 'text-[#FAF6EC]/45' : 'text-[#1E3A5F]/45'}`} /></Select.Icon>
        ) : null}
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
