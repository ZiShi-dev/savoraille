'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Check, Clock3, LocateFixed, MapPin, Navigation, X } from 'lucide-react';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';
import { distanceInKilometres, restaurants, type Restaurant } from './restaurant-data';

type RestaurantContextValue = {
  selectedRestaurant: Restaurant | null;
  openPicker: () => void;
};

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const { locale, tr } = useI18n();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [distances, setDistances] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = window.localStorage.getItem('savoraille-restaurant');
    if (saved && restaurants.some((restaurant) => restaurant.id === saved)) setSelectedId(saved);
    else setOpen(true);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && selectedId) window.localStorage.setItem('savoraille-restaurant', selectedId);
  }, [ready, selectedId]);

  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === selectedId) ?? null;
  const nearestId = Object.entries(distances).sort((first, second) => first[1] - second[1])[0]?.[0];
  const orderedRestaurants = useMemo(() => [...restaurants].sort((first, second) => (distances[first.id] ?? 0) - (distances[second.id] ?? 0)), [distances]);
  const formatDistance = (distance: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: distance < 10 ? 1 : 0 }).format(distance);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocationState('error');
      return;
    }
    setLocationState('loading');
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setDistances(Object.fromEntries(restaurants.map((restaurant) => [restaurant.id, distanceInKilometres(coords.latitude, coords.longitude, restaurant)])));
      setLocationState('idle');
    }, () => setLocationState('error'), { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
  };

  const choose = (restaurantId: string) => {
    setSelectedId(restaurantId);
    setOpen(false);
  };

  const value = useMemo<RestaurantContextValue>(() => ({ selectedRestaurant, openPicker: () => setOpen(true) }), [selectedRestaurant]);

  return (
    <RestaurantContext.Provider value={value}>
      {children}
      <button type="button" onClick={() => setOpen(true)} aria-label={`${tr('Changer de restaurant')} · ${selectedRestaurant?.name ?? tr('Aucun restaurant sélectionné')}`} title={selectedRestaurant ? `${selectedRestaurant.name} · ${tr(selectedRestaurant.area)}` : tr('Choisir un restaurant')} className="group fixed bottom-20 end-5 z-[60] grid size-14 place-items-center rounded-full border border-[#C6A15B]/70 bg-[#7C2438] text-[#FAF6EC] shadow-[0_14px_35px_rgba(30,58,95,0.32)] outline-none transition-all hover:-translate-y-1 hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EC] sm:end-6 sm:size-16">
        <span className="pointer-events-none absolute inset-1 rounded-full border border-[#FAF6EC]/15" />
        {!selectedRestaurant ? <span className="absolute inset-0 animate-ping rounded-full border border-[#C6A15B]/55 motion-reduce:animate-none" /> : null}
        <MapPin aria-hidden="true" className="relative size-6 transition-transform group-hover:scale-110 sm:size-7" strokeWidth={1.7} />
        <span className={`absolute end-1 top-1 size-3 rounded-full border-2 border-[#7C2438] ${selectedRestaurant ? 'bg-[#C4703F]' : 'bg-[#C6A15B]'}`} />
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-[#071C33]/80 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in" />
          <Dialog.Content dir={locale === 'ar' ? 'rtl' : 'ltr'} className="fixed inset-x-3 top-1/2 z-[90] max-h-[92svh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#C6A15B]/40 bg-[#FAF6EC] shadow-[0_30px_100px_rgba(3,16,31,0.55)] outline-none sm:inset-x-6 lg:left-1/2 lg:right-auto lg:w-[min(1040px,calc(100vw-48px))] lg:-translate-x-1/2 rtl:lg:left-auto rtl:lg:right-1/2 rtl:lg:translate-x-1/2">
            <div className="relative overflow-hidden bg-[#102B4D] px-5 pb-7 pt-5 text-[#FAF6EC] sm:px-8 sm:pb-9 sm:pt-7">
              <div className="pointer-events-none absolute -end-20 -top-28 size-72 rounded-full border border-[#C6A15B]/22" />
              <div className="pointer-events-none absolute -end-10 -top-16 size-56 rounded-full border border-[#C6A15B]/28" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-4"><BrandSeal inverse className="size-16 shrink-0 sm:size-20" /><div><p className="font-script text-2xl text-[#C6A15B] sm:text-3xl">{tr('Bienvenue chez Savoraille')}</p><Dialog.Title className="font-display mt-1 text-3xl leading-none font-semibold sm:text-5xl">{tr('Choisissez votre restaurant.')}</Dialog.Title></div></div>
                <Dialog.Close asChild><button type="button" aria-label={tr('Fermer')} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#FAF6EC]/18 bg-white/8 outline-none hover:bg-white/14 focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><X className="size-5" /></button></Dialog.Close>
              </div>
              <Dialog.Description className="relative mt-5 max-w-2xl text-sm leading-6 text-[#FAF6EC]/66 sm:ms-24 sm:text-base">{tr('Nous afficherons la carte, les horaires et les options de commande du restaurant le plus pratique pour vous.')}</Dialog.Description>
            </div>

            <div className="p-4 sm:p-7">
              <div className="flex flex-col gap-4 rounded-xl border border-[#1E3A5F]/12 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><LocateFixed className="size-5" /></span><div><p className="font-bold text-[#1E3A5F]">{tr('Trouvez le plus proche')}</p><p className="mt-0.5 text-xs text-[#241F19]/55">{tr('Votre position sert uniquement à calculer la distance.')}</p></div></div>
                <button type="button" onClick={locate} disabled={locationState === 'loading'} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3 text-sm font-bold text-[#241F19] outline-none hover:bg-[#d4b16d] focus-visible:ring-2 focus-visible:ring-[#7C2438] disabled:opacity-65"><LocateFixed className={`size-4 ${locationState === 'loading' ? 'animate-pulse' : ''}`} />{tr(locationState === 'loading' ? 'Recherche en cours…' : 'Utiliser ma position')}</button>
              </div>
              {locationState === 'error' ? <p role="status" className="mt-3 text-sm font-medium text-[#7C2438]">{tr('Position indisponible. Choisissez un restaurant ci-dessous.')}</p> : null}

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {orderedRestaurants.map((restaurant) => {
                  const current = selectedId === restaurant.id;
                  const nearest = nearestId === restaurant.id;
                  const distance = distances[restaurant.id];
                  return <article key={restaurant.id} className={`relative flex flex-col rounded-2xl border p-5 transition-all ${current ? 'border-[#7C2438] bg-[#FFFDFC] shadow-[0_12px_32px_rgba(124,36,56,0.12)]' : nearest ? 'border-[#C6A15B] bg-[#FFFDF7]' : 'border-[#1E3A5F]/12 bg-white'}`}>
                    <div className="flex items-start justify-between gap-3"><span className={`grid size-11 place-items-center rounded-full ${current ? 'bg-[#7C2438] text-[#FAF6EC]' : 'bg-[#1E3A5F] text-[#C6A15B]'}`}><MapPin className="size-5" /></span>{nearest ? <span className="rounded-full bg-[#C4703F] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.1em] text-white uppercase">{tr('Le plus proche')}</span> : current ? <span className="inline-flex items-center gap-1 rounded-full bg-[#7C2438]/10 px-3 py-1.5 text-[0.65rem] font-bold text-[#7C2438] uppercase"><Check className="size-3" />{tr('Votre choix')}</span> : null}</div>
                    <p className="mt-5 text-xs font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr(restaurant.area)}</p><h3 className="font-display mt-1 text-3xl font-semibold text-[#1E3A5F]">{restaurant.name}</h3>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#241F19]/60"><Navigation className="mt-0.5 size-4 shrink-0 text-[#C6A15B]" />{tr(restaurant.address)}</p><p className="mt-2 flex items-center gap-2 text-sm text-[#241F19]/60"><Clock3 className="size-4 shrink-0 text-[#C6A15B]" />{tr(restaurant.hours)}</p>
                    {distance !== undefined ? <p className="mt-3 text-sm font-bold text-[#7C2438]">{formatDistance(distance)} km</p> : null}
                    <ul className="mt-4 flex flex-wrap gap-1.5">{restaurant.services.map((service) => <li key={service} className="rounded-full border border-[#1E3A5F]/10 bg-[#FAF6EC] px-2.5 py-1 text-[0.65rem] font-semibold text-[#1E3A5F]/70">{tr(service)}</li>)}</ul>
                    <button type="button" onClick={() => choose(restaurant.id)} className={`mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${current ? 'border border-[#7C2438]/20 text-[#7C2438]' : 'bg-[#7C2438] text-[#FAF6EC]'}`}>{current ? <Check className="size-4" /> : <MapPin className="size-4" />}{tr(current ? 'Restaurant sélectionné' : 'Choisir ce restaurant')}</button>
                  </article>;
                })}
              </div>
              {!selectedRestaurant ? <p className="mt-5 text-center text-xs text-[#241F19]/46">{tr('Vous pourrez modifier ce choix à tout moment depuis l’icône de localisation.')}</p> : null}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const value = useContext(RestaurantContext);
  if (!value) throw new Error('useRestaurant must be used inside RestaurantProvider');
  return value;
}
