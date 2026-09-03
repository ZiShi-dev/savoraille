import type { Metadata } from 'next';

import { ReservationPageContent } from '@/components/reservation-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Réservation',
  description: 'Réservez votre table chez Savoraille : déjeuner, dîner, moment à deux ou événement privé.',
};

export default function ReservationPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenu-principal"><ReservationPageContent /></main>
      <SiteFooter />
    </>
  );
}
