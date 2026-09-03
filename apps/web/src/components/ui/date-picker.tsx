'use client';

import * as Popover from '@radix-ui/react-popover';
import { format, isValid, parseISO } from 'date-fns';
import { arSA, enUS, fr } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

type Locale = 'fr' | 'en' | 'ar';

const dateLocales = { fr, en: enUS, ar: arSA };

export function DatePicker({ value, onChange, label, locale, min }: { value: string; onChange: (value: string) => void; label: string; locale: Locale; min?: string }) {
  const rtl = locale === 'ar';
  const parsedDate = value ? parseISO(value) : undefined;
  const selected = parsedDate && isValid(parsedDate) ? parsedDate : undefined;
  const parsedMinimum = min ? parseISO(min) : undefined;
  const minimum = parsedMinimum && isValid(parsedMinimum) ? parsedMinimum : undefined;
  const dateLocale = dateLocales[locale];
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(selected ?? minimum ?? new Date());
  const calendarLabels = {
    labelNav: () => locale === 'ar' ? 'التنقل في التقويم' : locale === 'fr' ? 'Navigation du calendrier' : 'Calendar navigation',
    labelPrevious: () => locale === 'ar' ? 'الشهر السابق' : locale === 'fr' ? 'Mois précédent' : 'Previous month',
    labelNext: () => locale === 'ar' ? 'الشهر التالي' : locale === 'fr' ? 'Mois suivant' : 'Next month',
    labelDayButton: (date: Date, modifiers: Record<string, boolean>) => {
      const details = [
        modifiers.today ? (locale === 'ar' ? 'اليوم' : locale === 'fr' ? 'aujourd’hui' : 'today') : '',
        modifiers.selected ? (locale === 'ar' ? 'محدد' : locale === 'fr' ? 'sélectionné' : 'selected') : '',
      ].filter(Boolean);
      return `${format(date, 'PPPP', { locale: dateLocale })}${details.length ? `, ${details.join(', ')}` : ''}`;
    },
  };
  const navigationButtonClass = 'grid size-9 place-items-center rounded-lg border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none transition-colors hover:bg-[#1E3A5F] hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:pointer-events-none disabled:opacity-30';

  return (
    <Popover.Root open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen);
      if (nextOpen) setMonth(selected ?? minimum ?? new Date());
    }}>
      <Popover.Trigger asChild>
        <button type="button" aria-label={label} className="mt-2 flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-all hover:border-[#C6A15B]/65 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35">
          <span className={selected ? '' : 'text-[#241F19]/38'}>{selected ? format(selected, 'PPP', { locale: dateLocale }) : label}</span>
          <CalendarDays className="size-4 shrink-0 text-[#C6A15B]" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={7} align={rtl ? 'end' : 'start'} collisionPadding={12} className="z-[160] rounded-2xl border border-[#C6A15B]/35 bg-[#FFFDFC] p-3 text-[#241F19] shadow-[0_20px_55px_rgba(30,58,95,0.24)] outline-none" dir={rtl ? 'rtl' : 'ltr'}>
          <DayPicker
            mode="single"
            selected={selected}
            month={month}
            onMonthChange={setMonth}
            disabled={minimum ? { before: minimum } : undefined}
            locale={dateLocale}
            labels={calendarLabels}
            dir={rtl ? 'rtl' : 'ltr'}
            showOutsideDays
            onSelect={(date) => {
              if (!date) return;
              onChange(format(date, 'yyyy-MM-dd'));
              setOpen(false);
            }}
            components={{
              Nav: ({ onPreviousClick, onNextClick, previousMonth, nextMonth }) => {
                const previousButton = <button key="previous" type="button" disabled={!previousMonth} aria-label={calendarLabels.labelPrevious()} onClick={onPreviousClick} className={navigationButtonClass}>{rtl ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}</button>;
                const nextButton = <button key="next" type="button" disabled={!nextMonth} aria-label={calendarLabels.labelNext()} onClick={onNextClick} className={navigationButtonClass}>{rtl ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}</button>;
                return <nav aria-label={calendarLabels.labelNav()} dir="ltr" className="absolute inset-x-1 top-1 z-10 flex items-center justify-between">{rtl ? [nextButton, previousButton] : [previousButton, nextButton]}</nav>;
              },
            }}
            classNames={{
              root: 'relative p-1',
              months: 'flex',
              month: 'space-y-3',
              month_caption: 'relative flex h-10 items-center justify-center px-10',
              caption_label: 'font-display text-lg font-semibold text-[#1E3A5F]',
              month_grid: 'w-full border-collapse',
              weekdays: 'flex',
              weekday: 'w-10 py-2 text-center text-[0.68rem] font-bold text-[#C4703F]',
              week: 'mt-1 flex w-full',
              day: 'relative size-10 p-0 text-center text-sm',
              day_button: 'grid size-10 place-items-center rounded-lg outline-none transition-colors hover:bg-[#C6A15B]/18 focus-visible:ring-2 focus-visible:ring-[#C6A15B]',
              selected: '[&>button]:bg-[#1E3A5F] [&>button]:font-bold [&>button]:text-[#FAF6EC] [&>button]:hover:bg-[#1E3A5F]',
              today: '[&>button]:border [&>button]:border-[#C6A15B] [&>button]:font-bold',
              outside: 'text-[#241F19]/28',
              disabled: 'pointer-events-none text-[#241F19]/20 line-through',
            }}
          />
          <Popover.Arrow className="fill-[#FFFDFC]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
