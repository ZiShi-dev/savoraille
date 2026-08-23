'use client';

import { ArrowUpRight, Clock3, LocateFixed, MapPin, Navigation, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useI18n } from './i18n-provider';
import { distanceInKilometres, restaurants, type Restaurant } from './restaurant-data';

export function RestaurantLocator() {
  const { locale, tr } = useI18n();
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [selectedId, setSelectedId] = useState(restaurants[0]?.id ?? '');

  const listedRestaurants = useMemo(() => restaurants
    .map((restaurant) => ({
      ...restaurant,
      distance: position ? distanceInKilometres(position.latitude, position.longitude, restaurant) : null,
    }))
    .sort((first, second) => (first.distance ?? 0) - (second.distance ?? 0)), [position]);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocationState('error');
      return;
    }

    setLocationState('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ latitude: coords.latitude, longitude: coords.longitude });
        const nearest = restaurants.reduce((current, restaurant) => (
          distanceInKilometres(coords.latitude, coords.longitude, restaurant)
            < distanceInKilometres(coords.latitude, coords.longitude, current) ? restaurant : current
        ));
        setSelectedId(nearest.id);
        setLocationState('idle');
      },
      () => setLocationState('error'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  const formatDistance = (distance: number) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: distance < 10 ? 1 : 0,
  }).format(distance);

  const chooseRestaurant = (restaurant: Restaurant) => {
    setSelectedId(restaurant.id);
    document.getElementById(`restaurant-${restaurant.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <section id="restaurants" className="overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24 lg:py-28" aria-labelledby="restaurants-title">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-script text-3xl text-[#C6A15B]">{tr('Près de chez vous')}</p>
            <h2 id="restaurants-title" className="font-display mt-3 max-w-xl text-4xl leading-none font-semibold sm:text-6xl">{tr('Trouvez votre Savoraille.')}</h2>
          </div>
          <div className="lg:justify-self-end lg:text-end">
            <p className="max-w-xl text-sm leading-7 text-[#FAF6EC]/70 sm:text-base">{tr('Choisissez l’adresse la plus pratique pour réserver, commander ou venir nous retrouver.')}</p>
          </div>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-[#C6A15B]/30 bg-[#FAF6EC] p-4 text-[#241F19] shadow-[0_16px_42px_rgba(3,16,31,0.28)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><MapPin className="size-6" strokeWidth={1.7} /></span>
            <div>
              <p className="font-display text-xl font-semibold text-[#1E3A5F]">{tr('Où souhaitez-vous nous retrouver ?')}</p>
              <p className="mt-1 text-xs text-[#241F19]/58">{tr('Sélectionnez une ville ou trouvez automatiquement l’adresse la plus proche.')}</p>
            </div>
          </div>
          <button type="button" onClick={locate} disabled={locationState === 'loading'} className="mt-4 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none transition-colors hover:bg-[#d5b36e] focus-visible:ring-2 focus-visible:ring-[#7C2438] disabled:cursor-wait disabled:opacity-70 sm:mt-0 sm:w-auto">
            <LocateFixed className={`size-5 ${locationState === 'loading' ? 'animate-pulse' : ''}`} strokeWidth={1.8} />
            {tr(locationState === 'loading' ? 'Recherche en cours…' : 'Utiliser ma position')}
          </button>
        </div>
        {locationState === 'error' ? <p role="status" className="mt-3 text-sm text-[#F2C7CF]">{tr('Position indisponible. Vous pouvez choisir une adresse ci-dessous.')}</p> : null}

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={tr('Choisir une ville')}>
          {restaurants.map((restaurant) => {
            const selected = selectedId === restaurant.id;
            return <button key={restaurant.id} type="button" onClick={() => chooseRestaurant(restaurant)} aria-pressed={selected} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'border-[#C6A15B] bg-[#C6A15B] text-[#241F19]' : 'border-[#FAF6EC]/18 bg-white/5 text-[#FAF6EC]/78 hover:bg-white/10 hover:text-[#FAF6EC]'}`}>{restaurant.name.replace('Savoraille ', '')}<span className="mx-2 text-current/35">·</span>{tr(restaurant.area)}</button>;
          })}
        </div>

        <p className="mt-5 text-xs font-semibold tracking-[0.08em] text-[#FAF6EC]/50 uppercase lg:hidden">{tr('Faites glisser pour découvrir nos adresses')}</p>

        <div className="-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {listedRestaurants.map((restaurant, index) => {
            const nearest = position && index === 0;
            const selected = selectedId === restaurant.id;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

            return (
              <article id={`restaurant-${restaurant.id}`} key={restaurant.id} className={`group relative flex min-h-[370px] min-w-[86vw] snap-center flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_12px_32px_rgba(4,18,35,0.25)] transition-all hover:-translate-y-1 sm:min-w-[58vw] sm:p-7 lg:min-w-0 ${selected ? 'border-[#C6A15B] bg-[#FAF6EC] text-[#241F19] shadow-[0_18px_45px_rgba(3,16,31,0.34)]' : 'border-[#FAF6EC]/12 bg-white/[0.055]'}`}>
                <div className="pointer-events-none absolute -end-12 -top-12 size-36 rounded-full border border-[#C6A15B]/25" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className={`grid size-12 shrink-0 place-items-center rounded-full border ${selected ? 'border-[#C6A15B]/55 text-[#7C2438]' : 'border-[#C6A15B]/40 text-[#C6A15B]'}`}><MapPin className="size-6" strokeWidth={1.7} /></div>
                  {selected ? <span className="flex flex-col items-end gap-1"><span className="rounded-full bg-[#C4703F] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[#FAF6EC] uppercase">{tr(nearest ? 'Le plus proche' : 'Adresse sélectionnée')}</span>{nearest ? <span className="text-sm font-bold text-[#7C2438]">{formatDistance(restaurant.distance ?? 0)} km</span> : null}</span> : restaurant.distance !== null ? <span className="text-sm font-bold text-[#C6A15B]">{formatDistance(restaurant.distance)} km</span> : null}
                </div>

                <p className={`mt-7 text-xs font-bold tracking-[0.16em] uppercase ${selected ? 'text-[#C4703F]' : 'text-[#C6A15B]'}`}>{tr(restaurant.area)}</p>
                <h3 className={`font-display mt-2 text-3xl font-semibold ${selected ? 'text-[#1E3A5F]' : 'text-[#FAF6EC]'}`}>{restaurant.name}</h3>
                <p className={`mt-3 flex items-start gap-2 text-sm leading-6 ${selected ? 'text-[#241F19]/68' : 'text-[#FAF6EC]/68'}`}><Navigation className="mt-0.5 size-4 shrink-0 text-[#C6A15B]" strokeWidth={1.7} />{tr(restaurant.address)}</p>
                <p className={`mt-2 flex items-center gap-2 text-sm ${selected ? 'text-[#241F19]/68' : 'text-[#FAF6EC]/68'}`}><Clock3 className="size-4 shrink-0 text-[#C6A15B]" strokeWidth={1.7} />{tr(restaurant.hours)}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={tr('Services disponibles')}>
                  {restaurant.services.map((service) => <li key={service} className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${selected ? 'border-[#1E3A5F]/12 text-[#1E3A5F]/75' : 'border-[#FAF6EC]/15 text-[#FAF6EC]/75'}`}>{tr(service)}</li>)}
                </ul>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-7">
                  <a href={directionsUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'border-[#1E3A5F]/18 text-[#1E3A5F]' : 'border-[#FAF6EC]/20 text-[#FAF6EC]'}`}>{tr('Itinéraire')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></a>
                  <Link href={`/carte?restaurant=${restaurant.id}`} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${selected ? 'bg-[#7C2438] text-[#FAF6EC]' : 'bg-[#FAF6EC] text-[#1E3A5F]'}`}><ShoppingBag className="size-4" strokeWidth={1.8} />{tr('Commander ici')}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
