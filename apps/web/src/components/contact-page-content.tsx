'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, MessageSquareText, Send, Sparkles } from 'lucide-react';
import { AppImage } from './app-image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { useI18n } from './i18n-provider';
import { useRestaurant } from './restaurant-provider';

const contactCards = [
  { icon: Mail, label: 'E-mail', value: 'bonjour@savoraille.fr', action: 'Écrivez-nous', href: 'mailto:bonjour@savoraille.fr' },
  { icon: Clock3, label: 'Délai de réponse', value: 'Sous 24 heures, du mardi au dimanche', action: 'Notre équipe vous répond personnellement', href: '#ecrire' },
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export function ContactPageContent() {
  const { tr } = useI18n();
  const { openPicker } = useRestaurant();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      setFormError(tr('Veuillez remplir tous les champs obligatoires.'));
      form?.reportValidity();
      return;
    }
    setFormError('');
    setSent(true);
  };

  return (
    <main id="contenu-principal" className="overflow-hidden bg-[#FAF6EC] pt-20 text-[#241F19]">
      <section className="relative isolate min-h-[600px] overflow-hidden bg-[#102B4D] text-[#FAF6EC]">
        <AppImage src="/images/reservations/private-event.png" alt={tr('Une table préparée pour recevoir les invités chez Savoraille')} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,45,.94)_0%,rgba(7,25,45,.74)_52%,rgba(7,25,45,.25)_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,25,45,.94)_0%,rgba(7,25,45,.74)_52%,rgba(7,25,45,.25)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/70 via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[600px] max-w-[1200px] items-end px-6 pb-16 pt-24 sm:pb-20 lg:px-8">
          <motion.div {...reveal} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A15B]/45 bg-[#102B4D]/55 px-3.5 py-2 text-[0.68rem] font-bold tracking-[0.16em] uppercase backdrop-blur-md"><Sparkles className="size-3.5 text-[#C6A15B]" />{tr('Une équipe à votre écoute')}</div>
            <p className="font-script mt-7 text-3xl text-[#C6A15B] sm:text-4xl">{tr('Nous contacter')}</p>
            <h1 className="font-display mt-3 max-w-4xl text-5xl leading-[0.9] font-semibold text-balance sm:text-7xl lg:text-[5.2rem]">{tr('Parlons de votre prochaine table.')}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#FAF6EC]/76 sm:text-lg">{tr('Une réservation, un événement privé ou une question sur la carte ? Notre équipe vous répond avec plaisir.')}</p>
            <Link href="#ecrire" className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none transition-colors hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#FAF6EC]">{tr('Écrivez-nous')}<ArrowDown className="size-4" /></Link>
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      <section id="ecrire" className="relative px-6 py-16 sm:py-24 lg:px-8" aria-labelledby="contact-form-title">
        <motion.div {...reveal} className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-[0.18em] text-[#7C2438] uppercase">{tr('Un mot pour notre équipe')}</p>
            <h2 id="contact-form-title" className="font-display mt-3 text-4xl leading-none font-semibold text-[#1E3A5F] text-balance sm:text-5xl">{tr('Comment pouvons-nous vous aider ?')}</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#241F19]/62">{tr('Choisissez le sujet de votre demande. Nous la confierons directement à la bonne personne.')}</p>

            <div className="mt-8 space-y-3">
              {contactCards.map(({ icon: Icon, label, value, action, href }) => (
                <a key={label} href={href} className="group flex items-center gap-4 rounded-2xl border border-[#1E3A5F]/10 bg-white/65 p-4 outline-none transition-all hover:border-[#C6A15B]/60 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#C6A15B]/45 text-[#7C2438]"><Icon className="size-4.5" strokeWidth={1.7} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[0.65rem] font-bold tracking-[0.12em] text-[#C4703F] uppercase">{tr(label)}</span><span className="mt-0.5 block text-sm font-bold text-[#1E3A5F] sm:truncate">{tr(value)}</span><span className="mt-0.5 block text-xs text-[#241F19]/45">{tr(action)}</span></span>
                  <ArrowUpRight className="size-4 shrink-0 text-[#C6A15B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#1E3A5F]/12 bg-white p-5 shadow-[0_24px_60px_rgba(30,58,95,0.13)] sm:p-8 lg:p-10">
            {sent ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center" role="status">
                <span className="grid size-20 place-items-center rounded-full bg-[#C4703F]/12 text-[#C4703F]"><CheckCircle2 className="size-9" strokeWidth={1.7} /></span>
                <p className="font-script mt-6 text-3xl text-[#7C2438]">{tr('Merci pour votre message.')}</p>
                <h3 className="font-display mt-3 text-4xl font-semibold text-[#1E3A5F]">{tr('Nous revenons vers vous très vite.')}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#241F19]/58">{tr('Votre demande a bien été préparée dans ce prototype local. La connexion au service d’envoi sera ajoutée avec le backend.')}</p>
                <button type="button" onClick={() => { setSent(false); setFormError(''); }} className="mt-7 rounded-lg border border-[#1E3A5F]/14 bg-[#FAF6EC] px-5 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Écrire un autre message')}</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="flex items-start gap-4 border-b border-[#1E3A5F]/10 pb-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><MessageSquareText className="size-5" /></span>
                  <div><h3 className="font-display text-3xl font-semibold text-[#1E3A5F]">{tr('Votre demande')}</h3><p className="mt-1 text-xs leading-5 text-[#241F19]/48">{tr('Tous les champs marqués d’un astérisque sont requis.')}</p></div>
                </div>

                {formError ? (
                  <p role="alert" className="mt-5 rounded-lg border border-[#7C2438]/25 bg-[#7C2438]/8 px-4 py-3 text-sm font-medium text-[#7C2438]">
                    {formError}
                  </p>
                ) : null}

                <div className="mt-6 grid min-w-0 gap-5 sm:grid-cols-2">
                  <label className="block min-w-0 text-sm font-bold text-[#1E3A5F]">{tr('Prénom et nom')} *<input required name="name" autoComplete="name" aria-invalid={formError ? true : undefined} placeholder={tr('Votre nom')} className="mt-2 h-12 w-full min-w-0 max-w-full rounded-lg border border-[#1E3A5F]/14 bg-[#FAF6EC]/45 px-4 text-sm text-[#241F19] outline-none transition-all placeholder:text-[#241F19]/35 hover:border-[#C6A15B]/60 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30" /></label>
                  <label className="block min-w-0 text-sm font-bold text-[#1E3A5F]">{tr('E-mail')} *<input required type="email" name="email" autoComplete="email" aria-invalid={formError ? true : undefined} placeholder="vous@exemple.fr" className="mt-2 h-12 w-full min-w-0 max-w-full rounded-lg border border-[#1E3A5F]/14 bg-[#FAF6EC]/45 px-4 text-sm text-[#241F19] outline-none transition-all placeholder:text-[#241F19]/35 hover:border-[#C6A15B]/60 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30" /></label>
                </div>

                <label className="mt-5 block min-w-0 text-sm font-bold text-[#1E3A5F]">{tr('Votre message')} *<textarea required name="message" rows={6} aria-invalid={formError ? true : undefined} placeholder={tr('Racontez-nous ce que vous préparez, nous vous répondrons avec soin.')} className="mt-2 w-full min-w-0 max-w-full resize-y rounded-xl border border-[#1E3A5F]/14 bg-[#FAF6EC]/45 px-4 py-3 text-sm leading-6 text-[#241F19] outline-none transition-all placeholder:text-[#241F19]/35 hover:border-[#C6A15B]/60 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30" /></label>

                <div className="mt-6 flex flex-col gap-4 border-t border-[#1E3A5F]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-[0.7rem] leading-5 text-[#241F19]/45">{tr('Prototype local : aucun message n’est encore transmis. Vos informations restent dans votre navigateur.')}</p>
                  <button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-6 py-4 text-sm font-bold text-[#FAF6EC] outline-none transition-colors hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Envoyer le message')}<Send className="size-4 rtl:-scale-x-100" /></button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      <section id="adresse" className="bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24 lg:px-8" aria-labelledby="address-title">
        <motion.div {...reveal} className="mx-auto grid max-w-[1200px] overflow-hidden rounded-3xl border border-[#C6A15B]/25 bg-[#0B2746] shadow-[0_24px_65px_rgba(3,16,31,0.3)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <AppImage src="/images/savoraille-dining-room-3d.png" alt={tr('La salle du restaurant Savoraille')} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/65 via-transparent to-transparent" />
            <span className="absolute bottom-5 start-5 inline-flex items-center gap-2 rounded-full border border-[#FAF6EC]/25 bg-[#102B4D]/72 px-4 py-2 text-xs font-bold backdrop-blur-md"><MapPin className="size-4 text-[#C6A15B]" />{tr('Votre restaurant Savoraille')}</span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="font-script text-3xl text-[#C6A15B]">{tr('Nous retrouver')}</p>
            <h2 id="address-title" className="font-display mt-3 text-4xl leading-none font-semibold text-balance sm:text-5xl">{tr('La porte est ouverte, votre table vous attend.')}</h2>
            <div className="mt-8 space-y-5 border-y border-[#C6A15B]/20 py-7">
              <div className="flex gap-4"><MapPin className="mt-0.5 size-5 shrink-0 text-[#C6A15B]" /><div><p className="text-xs font-bold tracking-[0.13em] text-[#C6A15B] uppercase">{tr('Adresse')}</p><p className="mt-1 text-sm leading-6 text-[#FAF6EC]/70">{tr('Votre adresse · Votre ville, France')}</p></div></div>
              <div className="flex gap-4"><Clock3 className="mt-0.5 size-5 shrink-0 text-[#C6A15B]" /><div><p className="text-xs font-bold tracking-[0.13em] text-[#C6A15B] uppercase">{tr('Horaires')}</p><p className="mt-1 text-sm leading-6 text-[#FAF6EC]/70">{tr('Mar–Dim · service continu de 12 h à 23 h')}</p></div></div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservation" className="inline-flex items-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#FAF6EC]">{tr('Réserver une table')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
              <button type="button" onClick={() => openPicker()} className="inline-flex items-center gap-2 rounded-lg border border-[#FAF6EC]/28 px-5 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none hover:bg-[#FAF6EC]/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Trouver le restaurant le plus proche')}<MapPin className="size-4" /></button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
