import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/parisienne/400.css';

import './globals.css';

export const metadata: Metadata = {
  title: 'Savoraille — La merveille des saveurs',
  description: 'Restaurant français moderne : réservation, commande à emporter et livraison.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
