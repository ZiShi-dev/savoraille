import type { Metadata } from 'next';

import { localizedPath, locales, type Locale } from '@/lib/i18n-routing';
import { siteConfig, withBasePath } from '@/lib/site-config';

const staticRoutes = [
  '/',
  '/carte/',
  '/reservation/',
  '/commandes/',
  '/histoire/',
  '/contact/',
] as const;

const openGraphLocales: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  ar: 'ar_SA',
};

type PageKey = 'home' | 'carte' | 'reservation' | 'commandes' | 'histoire' | 'contact';

const pageCopy: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    fr: {
      title: 'Savoraille — La merveille des saveurs',
      description: 'Restaurant français : carte de saison, réservation en ligne et commande à emporter chez Savoraille.',
    },
    en: {
      title: 'Savoraille — A world of wonderful flavours',
      description: 'French restaurant: seasonal menu, online booking and takeaway at Savoraille.',
    },
    ar: {
      title: 'سافوراي — عجائب النكهات',
      description: 'مطعم فرنسي: قائمة موسمية، حجز عبر الإنترنت وطلبات للاستلام من سافوراي.',
    },
  },
  carte: {
    fr: { title: 'La carte', description: 'Découvrez la carte de saison et les sélections surprises de Savoraille.' },
    en: { title: 'Menu', description: 'Discover Savoraille’s seasonal menu and surprise selections.' },
    ar: { title: 'قائمة الطعام', description: 'اكتشفوا قائمة سافوراي الموسمية والاختيارات المفاجئة.' },
  },
  reservation: {
    fr: { title: 'Réservation', description: 'Réservez votre table chez Savoraille : déjeuner, dîner, moment à deux ou événement privé.' },
    en: { title: 'Reservation', description: 'Book your table at Savoraille: lunch, dinner, date night or private event.' },
    ar: { title: 'الحجز', description: 'احجزوا طاولتكم في سافوراي: غداء، عشاء، لحظة خاصة أو مناسبة خاصة.' },
  },
  commandes: {
    fr: { title: 'Ma commande', description: 'Consultez vos plats, quantités et le total de votre commande Savoraille.' },
    en: { title: 'My order', description: 'Review your dishes, quantities and Savoraille order total.' },
    ar: { title: 'طلبي', description: 'اطّلعوا على أطباقكم وكمياتكم وإجمالي طلب سافوراي.' },
  },
  histoire: {
    fr: { title: 'Notre histoire', description: 'Découvrez l’histoire, les valeurs et la cuisine française vivante de Savoraille.' },
    en: { title: 'Our story', description: 'Discover Savoraille’s story, values and vibrant French cooking.' },
    ar: { title: 'قصتنا', description: 'اكتشفوا قصة سافوراي وقيمها ومطبخها الفرنسي الحي.' },
  },
  contact: {
    fr: { title: 'Contact', description: 'Contactez Savoraille pour une réservation, une question ou un événement privé.' },
    en: { title: 'Contact', description: 'Contact Savoraille for a booking, a question or a private event.' },
    ar: { title: 'اتصل بنا', description: 'تواصلوا مع سافوراي للحجز أو لأي سؤال أو مناسبة خاصة.' },
  },
};

export function getStaticRoutes() {
  return staticRoutes;
}

export function getPageCopy(page: PageKey, locale: Locale) {
  return pageCopy[page][locale];
}

function hreflangAlternates(path: string) {
  return Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, path)]));
}

export function pageMetadata(locale: Locale, path: string, metadata: Metadata = {}): Metadata {
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      locale: openGraphLocales[locale],
    },
    alternates: {
      ...metadata.alternates,
      canonical: localizedPath(locale, path),
      languages: hreflangAlternates(path),
    },
    robots: siteConfig.portfolioMode
      ? { index: false, follow: false }
      : metadata.robots ?? { index: true, follow: true },
  };
}

export function restaurantJsonLd(locale: Locale = 'fr') {
  const url = siteConfig.siteUrl.replace(/\/$/, '');
  const descriptions: Record<Locale, string> = {
    fr: 'Restaurant français : carte de saison, réservation et commande en ligne.',
    en: 'French restaurant: seasonal menu, booking and online ordering.',
    ar: 'مطعم فرنسي: قائمة موسمية، حجز وطلب عبر الإنترنت.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: descriptions[locale],
    url: `${url}${localizedPath(locale, '/')}`,
    image: `${url}${withBasePath('/images/savoraille-dining-room-3d.png')}`,
    servesCuisine: 'French',
    priceRange: '€€',
    email: 'bonjour@savoraille.fr',
    inLanguage: locale,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '23:00',
      },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${url}${localizedPath(locale, '/reservation/')}`,
    },
  };
}
