'use client';

import { ArrowUpRight, Clock3, LocateFixed, MapPin, Navigation, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useI18n } from './i18n-provider';

type Restaurant = {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  services: string[];
  latitude: number;
  longitude: number;
};

const restaurants: Restaurant[] = [
  {
    id: 'paris-marais',
    name: 'Savoraille Paris',
    area: 'Le Marais',
    address: '24 rue du Temple · Paris 4e',
    hours: 'Mar–Dim · 12 h–23 h',
    services: ['Sur place', 'À emporter', 'Livraison'],
    latitude: 48.8593,
    longitude: 2.3532,
  },
  {
    id: 'lyon-presquile',
    name: 'Savoraille Lyon',
    area: 'Presqu’île',
    address: '18 rue Mercière · Lyon 2e',
    hours: 'Mar–Dim · 12 h–23 h',
    services: ['Sur place', 'À emporter'],
    latitude: 45.7624,
    longitude: 4.8328,
  },
  {
    id: 'bordeaux-chartrons',
    name: 'Savoraille Bordeaux',
    area: 'Les Chartrons',
    address: '31 quai des Chartrons · Bordeaux',
    hours: 'Mar–Dim · 12 h–23 h',
    services: ['Sur place', 'À emporter', 'Livraison'],
    latitude: 44.8508,
    longitude: -0.5715,
  },
];

function distanceInKilometres(latitude: number, longitude: number, restaurant: Restaurant) {
  const radius = 6371;
  const toRadians = (value: number) => value * Math.PI / 180;
  const latitudeDelta = toRadians(restaurant.latitude - latitude);
  const longitudeDelta = toRadians(restaurant.longitude - longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(latitude)) * Math.cos(toRadians(restaurant.latitude)) * Math.sin(longitudeDelta / 2) ** 2;

  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function RestaurantLocator() {
  const { locale, tr } = useI18n();
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'error'>('idle');

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
        setLocationState('idle');
      },
      () => setLocationState('error'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  const formatDistance = (distance: number) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: distance < 10 ? 1 : 0,
  }).format(distance);

  return (
    <section id="restaurants" className="overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24 lg:py-28" aria-labelledby="restaurants-title">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-script text-3xl text-[#C6A15B]">{tr('Près de chez vous')}</p>
            <h2 id="restaurants-title" className="font-display mt-3 max-w-xl text-4xl leading-none font-semibold sm:text-6xl">{tr('Trouvez votre Savoraille.')}</h2>
          </div>
          <div className="lg:justify-self-end lg:text-end">
            <p className="max-w-xl text-sm leading-7 text-[#FAF6EC]/70 sm:text-base">{tr('Choisissez l’adresse la plus pratique pour réserver, commander ou venir nous retrouver.')}</p>
            <button type="button" onClick={locate} disabled={locationState === 'loading'} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none transition-colors hover:bg-[#d5b36e] focus-visible:ring-2 focus-visible:ring-[#FAF6EC] disabled:cursor-wait disabled:opacity-70">
              <LocateFixed className={`size-5 ${locationState === 'loading' ? 'animate-pulse' : ''}`} strokeWidth={1.8} />
              {tr(locationState === 'loading' ? 'Recherche en cours…' : 'Utiliser ma position')}
            </button>
            {locationState === 'error' ? <p role="status" className="mt-3 text-sm text-[#F2C7CF]">{tr('Position indisponible. Vous pouvez choisir une adresse ci-dessous.')}</p> : null}
          </div>
        </div>

        <div className="gold-divider gold-divider-dark my-10 sm:my-12" aria-hidden="true" />

        <div className="grid gap-4 lg:grid-cols-3">
          {listedRestaurants.map((restaurant, index) => {
            const nearest = position && index === 0;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

            return (
              <article key={restaurant.id} className={`group relative flex min-h-[370px] flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_12px_32px_rgba(4,18,35,0.25)] transition-transform hover:-translate-y-1 sm:p-7 ${nearest ? 'border-[#C6A15B] bg-[#FAF6EC] text-[#241F19]' : 'border-[#FAF6EC]/12 bg-white/[0.055]'}`}>
                <div className="pointer-events-none absolute -end-12 -top-12 size-36 rounded-full border border-[#C6A15B]/25" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className={`grid size-12 shrink-0 place-items-center rounded-full border ${nearest ? 'border-[#C6A15B]/55 text-[#7C2438]' : 'border-[#C6A15B]/40 text-[#C6A15B]'}`}><MapPin className="size-6" strokeWidth={1.7} /></div>
                  {nearest ? <span className="flex flex-col items-end gap-1"><span className="rounded-full bg-[#C4703F] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[#FAF6EC] uppercase">{tr('Le plus proche')}</span><span className="text-sm font-bold text-[#7C2438]">{formatDistance(restaurant.distance ?? 0)} km</span></span> : restaurant.distance !== null ? <span className="text-sm font-bold text-[#C6A15B]">{formatDistance(restaurant.distance)} km</span> : null}
                </div>

                <p className={`mt-7 text-xs font-bold tracking-[0.16em] uppercase ${nearest ? 'text-[#C4703F]' : 'text-[#C6A15B]'}`}>{tr(restaurant.area)}</p>
                <h3 className={`font-display mt-2 text-3xl font-semibold ${nearest ? 'text-[#1E3A5F]' : 'text-[#FAF6EC]'}`}>{restaurant.name}</h3>
                <p className={`mt-3 flex items-start gap-2 text-sm leading-6 ${nearest ? 'text-[#241F19]/68' : 'text-[#FAF6EC]/68'}`}><Navigation className="mt-0.5 size-4 shrink-0 text-[#C6A15B]" strokeWidth={1.7} />{tr(restaurant.address)}</p>
                <p className={`mt-2 flex items-center gap-2 text-sm ${nearest ? 'text-[#241F19]/68' : 'text-[#FAF6EC]/68'}`}><Clock3 className="size-4 shrink-0 text-[#C6A15B]" strokeWidth={1.7} />{tr(restaurant.hours)}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={tr('Services disponibles')}>
                  {restaurant.services.map((service) => <li key={service} className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${nearest ? 'border-[#1E3A5F]/12 text-[#1E3A5F]/75' : 'border-[#FAF6EC]/15 text-[#FAF6EC]/75'}`}>{tr(service)}</li>)}
                </ul>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-7">
                  <a href={directionsUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${nearest ? 'border-[#1E3A5F]/18 text-[#1E3A5F]' : 'border-[#FAF6EC]/20 text-[#FAF6EC]'}`}>{tr('Itinéraire')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></a>
                  <Link href={`/carte?restaurant=${restaurant.id}`} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${nearest ? 'bg-[#7C2438] text-[#FAF6EC]' : 'bg-[#FAF6EC] text-[#1E3A5F]'}`}><ShoppingBag className="size-4" strokeWidth={1.8} />{tr('Commander ici')}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
