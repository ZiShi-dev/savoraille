'use client';

import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { useI18n } from './i18n-provider';

const contactCards = [
  { icon: Phone, label: 'Téléphone', value: '+33 0 00 00 00 00', action: 'Appelez-nous', href: 'tel:+33000000000' },
  { icon: Mail, label: 'E-mail', value: 'bonjour@savoraille.fr', action: 'Écrivez-nous', href: 'mailto:bonjour@savoraille.fr' },
  { icon: MapPin, label: 'Adresse', value: 'Votre adresse · Votre ville, France', action: 'Nous rejoindre', href: '#adresse' },
  { icon: Clock3, label: 'Horaires', value: 'Mar–Dim · service continu de 12 h à 23 h', action: 'Réserver une table', href: '/#reservation' },
];

export function ContactPageContent() {
  const { tr } = useI18n();

  return (
    <main className="bg-[#FAF6EC] pt-24">
      <section className="relative overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24">
        <div className="pointer-events-none absolute -end-20 -top-24 size-96 rounded-full border border-[#C6A15B]/20" /><div className="pointer-events-none absolute end-10 top-10 size-64 rounded-full border border-[#C6A15B]/18" />
        <div className="relative mx-auto max-w-[1200px]">
          <p className="font-script text-3xl text-[#C6A15B]">{tr('Nous contacter')}</p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">{tr('Parlons de votre prochaine table.')}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#FAF6EC]/70 sm:text-lg">{tr('Une réservation, un événement privé ou une question sur la carte ? Notre équipe vous répond avec plaisir.')}</p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24" aria-labelledby="contact-options-title">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="contact-options-title" className="sr-only">{tr('Nos coordonnées')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ icon: Icon, label, value, action, href }) => {
              const content = <><div className="grid size-12 place-items-center rounded-full border border-[#C6A15B]/50 text-[#7C2438]"><Icon className="size-5" strokeWidth={1.7} /></div><p className="mt-6 text-xs font-bold tracking-[0.15em] text-[#C4703F] uppercase">{tr(label)}</p><h3 className="font-display mt-2 text-2xl leading-tight font-semibold text-[#1E3A5F]">{tr(value)}</h3><span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#7C2438]">{tr(action)}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></span></>;
              const className = 'group flex min-h-64 flex-col rounded-2xl border border-[#1E3A5F]/12 bg-white/60 p-6 shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-all hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:shadow-[0_16px_36px_rgba(30,58,95,0.14)] focus-visible:ring-2 focus-visible:ring-[#C6A15B]';
              return href.startsWith('/') ? <Link key={label} href={href} className={className}>{content}</Link> : <a key={label} href={href} className={className}>{content}</a>;
            })}
          </div>
        </div>
      </section>

      <section id="adresse" className="px-6 pb-20 sm:pb-24">
        <div className="relative mx-auto grid max-w-[1200px] overflow-hidden rounded-2xl bg-[#7C2438] p-8 text-[#FAF6EC] shadow-[0_18px_55px_rgba(124,36,56,0.22)] sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-16">
          <div><p className="font-script text-3xl text-[#C6A15B]">{tr('Votre table vous attend')}</p><h2 className="font-display mt-3 max-w-2xl text-4xl leading-none font-semibold sm:text-5xl">{tr('Un repas, un événement, une attention particulière ?')}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#FAF6EC]/72">{tr('Notre équipe vous accompagne pour préparer un moment à votre goût.')}</p></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col"><a href="tel:+33000000000" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FAF6EC] px-6 py-4 font-bold text-[#7C2438]"><Phone className="size-5" />{tr('Appelez-nous')}</a><Link href="/carte" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FAF6EC]/35 px-6 py-4 font-bold text-[#FAF6EC]">{tr('Voir la carte')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link></div>
        </div>
      </section>
    </main>
  );
}
