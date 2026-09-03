'use client';

import Image from 'next/image';
import { Armchair, Check, LockKeyhole, UsersRound } from 'lucide-react';

import { useI18n } from './i18n-provider';

export type DiningTable = {
  id: string;
  seats: number;
  status: 'available' | 'reserved';
  x: number;
  y: number;
};

const tables: DiningTable[] = [
  { id: 'T01', seats: 4, status: 'available', x: 16, y: 75 },
  { id: 'T02', seats: 4, status: 'available', x: 51, y: 74 },
  { id: 'T03', seats: 4, status: 'reserved', x: 88, y: 75 },
  { id: 'T04', seats: 4, status: 'available', x: 20, y: 53 },
  { id: 'T05', seats: 6, status: 'reserved', x: 51, y: 54 },
  { id: 'T06', seats: 6, status: 'available', x: 51, y: 41 },
  { id: 'T07', seats: 8, status: 'available', x: 78, y: 47 },
  { id: 'T08', seats: 4, status: 'reserved', x: 24, y: 45 },
  { id: 'T09', seats: 2, status: 'available', x: 31, y: 34 },
];

export function TableSelector({ guests, value, onChange }: { guests: number; value: string | null; onChange: (tableId: string) => void }) {
  const { locale, tr } = useI18n();
  const selected = tables.find((table) => table.id === value) ?? null;

  return (
    <section aria-labelledby="table-map-title" className="p-4 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Votre salle')}</p>
          <h3 id="table-map-title" className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F] sm:text-4xl">{tr('Choisissez votre table.')}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#241F19]/60">{tr('Sélectionnez une table disponible adaptée à votre groupe.')}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.68rem] font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C4703F]/12 px-3 py-2 text-[#8A4628]"><span className="size-2 rounded-full bg-[#C4703F]" />{tr('Disponible')}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7C2438]/10 px-3 py-2 text-[#7C2438]"><span className="size-2 rounded-full bg-[#7C2438]" />{tr('Réservée')}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C6A15B]/20 px-3 py-2 text-[#6A5224]"><span className="size-2 rounded-full bg-[#C6A15B]" />{tr('Votre choix')}</span>
        </div>
      </div>

      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl border border-[#C6A15B]/40 bg-[#102B4D] shadow-[0_18px_45px_rgba(30,58,95,0.2)]">
        <Image src="/images/savoraille-dining-room-3d.png" alt={tr('Vue 3D de la salle Savoraille et de ses tables')} fill priority sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/24 via-transparent to-[#071C33]/8" />
        {tables.map((table) => {
          const tooSmall = table.seats < guests;
          const disabled = table.status === 'reserved' || tooSmall;
          const active = value === table.id;
          const status = table.status === 'reserved' ? tr('Réservée') : tooSmall ? tr('Capacité insuffisante') : tr('Disponible');
          return (
            <button
              key={table.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(table.id)}
              aria-pressed={active}
              aria-label={`${tr('Table')} ${table.id.slice(1)}, ${table.seats} ${tr('places')}, ${status}`}
              style={{ left: `${table.x}%`, top: `${table.y}%` }}
              className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-1.5 py-1 text-center shadow-[0_5px_16px_rgba(3,16,31,0.38)] outline-none backdrop-blur-md transition-all focus-visible:ring-2 focus-visible:ring-[#FAF6EC] sm:px-2.5 sm:py-1.5 ${active ? 'scale-110 border-[#FAF6EC] bg-[#C6A15B] text-[#241F19]' : table.status === 'reserved' ? 'cursor-not-allowed border-[#FAF6EC]/35 bg-[#7C2438]/92 text-white opacity-90' : tooSmall ? 'cursor-not-allowed border-white/25 bg-[#241F19]/75 text-white opacity-65' : 'border-[#FAF6EC]/50 bg-[#C4703F]/94 text-white hover:z-20 hover:scale-110'}`}
            >
              <span className="flex items-center justify-center gap-1 text-[0.58rem] font-extrabold leading-none sm:text-[0.68rem]">{active ? <Check className="size-2.5 sm:size-3" /> : table.status === 'reserved' ? <LockKeyhole className="size-2.5 sm:size-3" /> : null}{table.id}</span>
              <span className="mt-0.5 flex items-center justify-center gap-0.5 text-[0.52rem] font-semibold leading-none sm:text-[0.62rem]"><Armchair className="size-2.5 sm:size-3" />{table.seats}<span className="hidden sm:inline"> · {status}</span></span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div aria-live="polite" className={`flex min-h-16 items-center gap-3 rounded-xl border p-3.5 ${selected ? 'border-[#C6A15B]/55 bg-[#FFFDF7]' : 'border-[#1E3A5F]/12 bg-white'}`}>
          <span className={`grid size-10 shrink-0 place-items-center rounded-full ${selected ? 'bg-[#C6A15B] text-[#241F19]' : 'bg-[#1E3A5F]/8 text-[#1E3A5F]'}`}>{selected ? <Check className="size-5" /> : <UsersRound className="size-5" />}</span>
          <div>
            <p className="text-sm font-bold text-[#1E3A5F]">{selected ? `${tr('Table')} ${selected.id.slice(1)} · ${selected.seats} ${tr('places')}` : tr('Aucune table sélectionnée')}</p>
            <p className="mt-0.5 text-xs text-[#241F19]/52">{selected ? tr('Cette table sera gardée le temps de votre confirmation.') : tr('Les tables indisponibles ne peuvent pas être sélectionnées.')}</p>
          </div>
        </div>
        <p className="text-center text-xs font-semibold text-[#241F19]/52 sm:text-end">{guests} {tr(guests > 1 ? 'convives' : 'convive')} · {locale === 'ar' ? tr('المقاعد موضحة على كل طاولة') : tr('Le nombre de places figure sur chaque table.')}</p>
      </div>
    </section>
  );
}
