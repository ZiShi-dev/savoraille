'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CalendarDays, Check, Clock3, Heart, MapPin, Phone, Sparkles, UserRound, UsersRound, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from './auth-provider';
import { useI18n } from './i18n-provider';
import { useRestaurant } from './restaurant-provider';
import { DatePicker } from './ui/date-picker';
import { FormSelect } from './ui/form-select';

type ReservationReason = 'dinner' | 'romantic' | 'business' | 'private';
type ReservationStep = 'reason' | 'form' | 'done';

const reasons = [
  { id: 'dinner' as const, icon: UtensilsCrossed, title: 'Un déjeuner ou un dîner', description: 'Pour savourer la carte et simplement prendre le temps.', image: '/images/reservations/dinner.png' },
  { id: 'romantic' as const, icon: Heart, title: 'Un moment à deux', description: 'Une table plus intime pour une occasion qui compte.', image: '/images/reservations/romantic.png' },
  { id: 'business' as const, icon: BriefcaseBusiness, title: 'Un repas professionnel', description: 'Un cadre calme et un service adapté à votre rythme.', image: '/images/reservations/business.png' },
  { id: 'private' as const, icon: Sparkles, title: 'Un événement privé', description: 'Un moment sur mesure pour votre groupe et vos envies.', image: '/images/reservations/private-event.png' },
];

const schema = z.object({
  date: z.string().min(1, 'Choisissez une date.'),
  time: z.string().min(1, 'Choisissez une heure.'),
  guests: z.string().min(1, 'Indiquez le nombre de personnes.'),
  name: z.string().trim().min(2, 'Indiquez votre nom.'),
  phone: z.string().trim().min(8, 'Indiquez un téléphone valide.'),
  email: z.string().trim().email('Indiquez une adresse e-mail valide.'),
  notes: z.string().max(500).optional(),
});

type ReservationValues = z.infer<typeof schema>;

function localDateValue() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function ReservationPageContent() {
  const { requireAuth } = useAuth();
  const { locale, tr } = useI18n();
  const { selectedRestaurant, openPicker } = useRestaurant();
  const [step, setStep] = useState<ReservationStep>('reason');
  const [reason, setReason] = useState<ReservationReason | null>(null);
  const [reference, setReference] = useState('');
  const flowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const today = localDateValue();
  const chosenReason = reasons.find((item) => item.id === reason);
  const fieldClass = 'mt-2 h-12 w-full rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-colors placeholder:text-[#241F19]/38 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35';
  const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm<ReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: today, time: '20:00', guests: '2', name: '', phone: '', email: '', notes: '' },
  });
  const values = watch();
  const transition = { duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] as const };
  const variants = {
    enter: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.99 },
  };
  const error = (name: keyof ReservationValues) => errors[name]?.message ? <span role="alert" className="mt-1.5 block text-xs font-semibold text-[#7C2438]">{tr(errors[name]?.message ?? '')}</span> : null;
  const timeOptions = ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((time) => ({ value: time, label: time }));
  const guestOptions = Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }));

  const chooseReason = (nextReason: ReservationReason) => {
    setReason(nextReason);
    setStep('form');
    window.setTimeout(() => flowRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 80);
  };
  const submit = () => requireAuth('reservation', () => {
    setReference(`RSV-${Date.now().toString().slice(-6)}`);
    setStep('done');
  });
  const restart = () => {
    setReason(null);
    setReference('');
    reset({ date: today, time: '20:00', guests: '2', name: '', phone: '', email: '', notes: '' });
    setStep('reason');
  };

  return (
    <section className="min-h-screen bg-[#FAF6EC] px-4 pb-20 pt-32 text-[#241F19] sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-3xl bg-[#102B4D] px-5 py-9 text-[#FAF6EC] shadow-[0_20px_60px_rgba(30,58,95,0.2)] sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -end-20 -top-28 size-80 rounded-full border border-[#C6A15B]/18" />
          <div className="pointer-events-none absolute -end-8 -top-16 size-60 rounded-full border border-[#C6A15B]/24" />
          <div className="relative max-w-3xl">
            <p className="font-script text-3xl text-[#C6A15B] sm:text-4xl">{tr('Votre table vous attend')}</p>
            <h1 className="font-display mt-3 text-4xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">{tr('Quel plaisir vous ferait envie aujourd’hui ?')}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#FAF6EC]/68 sm:text-base">{tr('Dites-nous ce que vous souhaitez célébrer ou partager. Nous adapterons la suite de votre réservation.')}</p>
          </div>
        </div>

        <div ref={flowRef} className="mt-6 scroll-mt-28 overflow-hidden rounded-3xl border border-[#1E3A5F]/12 bg-[#FFFDFC] shadow-[0_16px_50px_rgba(30,58,95,0.11)] sm:mt-8">
          <div className="flex items-center justify-between gap-4 border-b border-[#1E3A5F]/10 px-5 py-4 sm:px-8">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{step === 'reason' ? `${tr('Étape')} 1 / 2` : step === 'form' ? `${tr('Étape')} 2 / 2` : tr('Demande préparée')}</p>
              <p className="font-display mt-1 text-2xl font-semibold text-[#1E3A5F]">{tr(step === 'reason' ? 'Pourquoi souhaitez-vous réserver ?' : step === 'form' ? 'Complétez votre demande.' : 'Votre demande est prête.')}</p>
            </div>
            {step === 'form' ? <button type="button" onClick={() => setStep('reason')} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#1E3A5F]/12 px-3 py-2.5 text-xs font-bold text-[#1E3A5F] outline-none hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" />{tr('Retour')}</button> : null}
          </div>

          <AnimatePresence initial={false} mode="wait">
            {step === 'reason' ? (
              <motion.div key="reasons" variants={variants} initial="enter" animate="center" exit="exit" transition={transition} className="p-5 sm:p-8">
                <p className="max-w-2xl text-sm leading-6 text-[#241F19]/60">{tr('Choisissez l’occasion qui ressemble le mieux à votre venue.')}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {reasons.map((item) => {
                    const Icon = item.icon;
                    return <button key={item.id} type="button" onClick={() => chooseReason(item.id)} className="group flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-white text-start shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-all hover:-translate-y-1 hover:border-[#C6A15B] hover:shadow-[0_16px_36px_rgba(30,58,95,0.16)] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-[#102B4D]">
                        <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#071C33]/58 via-transparent to-transparent" />
                        <span className="absolute bottom-3 end-3 grid size-11 place-items-center rounded-full border border-[#FAF6EC]/35 bg-[#1E3A5F]/88 text-[#C6A15B] shadow-lg backdrop-blur-md"><Icon className="size-5" strokeWidth={1.7} /></span>
                      </span>
                      <span className="flex flex-1 flex-col p-5">
                        <span className="font-display block text-2xl leading-tight font-semibold text-[#1E3A5F]">{tr(item.title)}</span>
                        <span className="mt-2 block text-xs leading-5 text-[#241F19]/55">{tr(item.description)}</span>
                        <span className="mt-auto pt-5 text-xs font-bold text-[#7C2438]">{tr('Choisir')} <ArrowRight className="ms-1 inline size-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" /></span>
                      </span>
                    </button>;
                  })}
                </div>
              </motion.div>
            ) : step === 'form' && chosenReason ? (
              <motion.form key={`form-${reason}`} variants={variants} initial="enter" animate="center" exit="exit" transition={transition} onSubmit={handleSubmit(submit)} noValidate className="grid lg:grid-cols-[1fr_330px]">
                <div className="p-5 sm:p-8">
                  <div className="relative aspect-[16/8] min-h-44 overflow-hidden rounded-2xl border border-[#C6A15B]/35 bg-[#102B4D] sm:aspect-[16/5]">
                    <Image src={chosenReason.image} alt={tr(chosenReason.title)} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/90 via-[#071C33]/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 text-[#FAF6EC] sm:p-6">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#C6A15B] text-[#241F19]"><chosenReason.icon className="size-5" /></span>
                      <div><p className="text-xs font-bold tracking-[0.12em] text-[#C6A15B] uppercase">{tr('Votre occasion')}</p><p className="font-display mt-0.5 text-2xl font-semibold">{tr(chosenReason.title)}</p></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#1E3A5F]/12 bg-white p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><MapPin className="size-5" /></span>
                    <div className="min-w-0 flex-1"><p className="text-xs font-bold text-[#C4703F] uppercase">{tr('Restaurant sélectionné')}</p><p className="truncate font-bold text-[#1E3A5F]">{selectedRestaurant?.name ?? tr('Aucun restaurant sélectionné')}</p><p className="truncate text-xs text-[#241F19]/50">{selectedRestaurant ? tr(selectedRestaurant.address) : tr('Choisissez un restaurant avant de continuer.')}</p></div>
                    <button type="button" onClick={() => openPicker()} className="shrink-0 text-xs font-bold text-[#7C2438] underline decoration-[#C6A15B] underline-offset-4">{tr('Modifier')}</button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-[#C6A15B]" />{tr('Date')}</span><Controller name="date" control={control} render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} label={tr('Date')} locale={locale} min={today} />} />{error('date')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Heure')}</span><Controller name="time" control={control} render={({ field }) => <FormSelect value={field.value} onChange={field.onChange} options={timeOptions} label={tr('Heure')} rtl={locale === 'ar'} />} />{error('time')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2"><span className="flex items-center gap-2"><UsersRound className="size-4 text-[#C6A15B]" />{tr('Nombre de personnes')}</span><Controller name="guests" control={control} render={({ field }) => <FormSelect value={field.value} onChange={field.onChange} options={guestOptions} label={tr('Nombre de personnes')} rtl={locale === 'ar'} />} />{error('guests')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><UserRound className="size-4 text-[#C6A15B]" />{tr('Votre nom')}</span><input {...register('name')} autoComplete="name" placeholder={tr('Nom et prénom')} className={fieldClass} />{error('name')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Phone className="size-4 text-[#C6A15B]" />{tr('Téléphone')}</span><input {...register('phone')} type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00" className={fieldClass} />{error('phone')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2">{tr('Adresse e-mail')}<input {...register('email')} type="email" autoComplete="email" placeholder="vous@exemple.fr" className={fieldClass} />{error('email')}</label>
                    <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2">{tr('Votre demande')}<textarea {...register('notes')} rows={4} placeholder={tr('Allergies, gâteau, emplacement souhaité ou autre attention…')} className="mt-2 w-full resize-none rounded-lg border border-[#1E3A5F]/14 bg-white px-4 py-3 text-sm outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35" /></label>
                  </div>
                </div>

                <aside className="border-t border-[#1E3A5F]/10 bg-[#102B4D] p-6 text-[#FAF6EC] lg:border-s lg:border-t-0 lg:p-8">
                  <p className="text-xs font-bold tracking-[0.14em] text-[#C6A15B] uppercase">{tr('Votre réservation')}</p>
                  <p className="font-display mt-2 text-3xl font-semibold">{tr(chosenReason.title)}</p>
                  <dl className="mt-7 grid gap-4 text-sm">
                    <div className="flex items-center justify-between gap-3"><dt className="text-[#FAF6EC]/55">{tr('Date')}</dt><dd className="font-bold">{values.date || '—'}</dd></div>
                    <div className="flex items-center justify-between gap-3"><dt className="text-[#FAF6EC]/55">{tr('Heure')}</dt><dd className="font-bold">{values.time}</dd></div>
                    <div className="flex items-center justify-between gap-3"><dt className="text-[#FAF6EC]/55">{tr('Convives')}</dt><dd className="font-bold">{values.guests}</dd></div>
                  </dl>
                  <div className="gold-divider gold-divider-dark mt-6" />
                  <button type="submit" disabled={!selectedRestaurant} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 text-sm font-bold text-white outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:cursor-not-allowed disabled:opacity-45">{tr('Envoyer ma demande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
                  <p className="mt-3 text-center text-[0.68rem] leading-5 text-[#FAF6EC]/45">{tr('Prototype local · aucune réservation ne sera transmise.')}</p>
                </aside>
              </motion.form>
            ) : (
              <motion.div key="done" variants={variants} initial="enter" animate="center" exit="exit" transition={transition} className="grid place-items-center px-5 py-14 text-center sm:py-20">
                <motion.span initial={reduceMotion ? undefined : { scale: 0.65, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 250, damping: 18 }} className="grid size-20 place-items-center rounded-full bg-[#C4703F] text-white shadow-[0_12px_32px_rgba(196,112,63,0.3)]"><Check className="size-9" /></motion.span>
                <h2 className="font-display mt-6 text-4xl font-semibold text-[#1E3A5F] sm:text-5xl">{tr('Votre demande est prête.')}</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[#241F19]/60">{tr('Notre équipe vous recontactera pour confirmer la disponibilité et préparer votre table.')}</p>
                <p className="mt-5 rounded-full bg-[#1E3A5F]/7 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#1E3A5F]">{tr('Référence')} · {reference}</p>
                <button type="button" onClick={restart} className="mt-7 rounded-lg bg-[#1E3A5F] px-6 py-4 text-sm font-bold text-[#FAF6EC] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Faire une autre demande')}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
