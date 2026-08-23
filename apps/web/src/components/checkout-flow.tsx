'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { ArrowLeft, ArrowRight, Bike, CalendarDays, Check, ChevronDown, Clock3, MapPin, Phone, ShoppingBag, Store, UserRound, UsersRound, UtensilsCrossed, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useI18n } from './i18n-provider';
import { useRestaurant } from './restaurant-provider';

type ServiceMode = 'dine-in' | 'takeaway' | 'delivery';
type CheckoutStep = 'service' | 'details' | 'done';

function localDateValue(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

const baseSchema = z.object({
  date: z.string().min(1, 'Choisissez une date.'),
  time: z.string().min(1, 'Choisissez une heure.'),
  guests: z.string().optional(),
  name: z.string().trim().min(2, 'Indiquez votre nom.'),
  phone: z.string().trim().min(8, 'Indiquez un téléphone valide.'),
  address: z.string().trim().optional(),
  notes: z.string().max(500).optional(),
});
type CheckoutValues = z.infer<typeof baseSchema>;

function StyledSelect({ value, onChange, options, label, rtl }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; label: string; rtl: boolean }) {
  return (
    <Select.Root value={value} onValueChange={onChange} dir={rtl ? 'rtl' : 'ltr'}>
      <Select.Trigger aria-label={label} className="mt-2 flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-colors focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35"><Select.Value /><Select.Icon><ChevronDown className="size-4 text-[#C6A15B]" /></Select.Icon></Select.Trigger>
      <Select.Portal><Select.Content position="popper" sideOffset={6} className="z-[140] max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#C6A15B]/35 bg-[#FFFDFC] p-1.5 text-[#241F19] shadow-[0_18px_45px_rgba(30,58,95,0.22)]"><Select.Viewport>{options.map((option) => <Select.Item key={option.value} value={option.value} className="relative flex cursor-default select-none items-center rounded-lg py-2.5 pe-8 ps-3 text-sm outline-none data-[highlighted]:bg-[#1E3A5F] data-[highlighted]:text-[#FAF6EC]"><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator className="absolute end-2"><Check className="size-4 text-[#C6A15B]" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal>
    </Select.Root>
  );
}

export function CheckoutFlow({ itemCount, total }: { itemCount: number; total: number }) {
  const { locale, tr } = useI18n();
  const { selectedRestaurant, openPicker } = useRestaurant();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('service');
  const [service, setService] = useState<ServiceMode | null>(null);
  const [reference, setReference] = useState('');
  const rtl = locale === 'ar';
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(total);
  const today = localDateValue();
  const fieldClass = 'mt-2 h-12 w-full rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-colors placeholder:text-[#241F19]/38 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35';
  const schema = useMemo(() => baseSchema.superRefine((values, context) => {
    if (service === 'dine-in' && !values.guests) context.addIssue({ code: 'custom', path: ['guests'], message: 'Indiquez le nombre de personnes.' });
    if (service === 'delivery' && (!values.address || values.address.length < 8)) context.addIssue({ code: 'custom', path: ['address'], message: 'Indiquez une adresse de livraison.' });
  }), [service]);
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<CheckoutValues>({ resolver: zodResolver(schema), defaultValues: { date: today, time: '20:00', guests: '2', name: '', phone: '', address: '', notes: '' } });

  const chooseService = (mode: ServiceMode) => { setService(mode); reset({ date: today, time: mode === 'takeaway' ? 'asap' : '20:00', guests: '2', name: '', phone: '', address: '', notes: '' }); setStep('details'); };
  const submit = () => { setReference(`SV-${Date.now().toString().slice(-5)}`); setStep('done'); };
  const closeCompleted = () => { setOpen(false); window.setTimeout(() => { setStep('service'); setService(null); setReference(''); reset(); }, 250); };
  const changeRestaurant = () => { setOpen(false); openPicker(() => setOpen(true)); };
  const error = (name: keyof CheckoutValues) => errors[name]?.message ? <span role="alert" className="mt-1.5 block text-xs font-semibold text-[#7C2438]">{tr(errors[name]?.message ?? '')}</span> : null;
  const timeOptions = ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => ({ value: time, label: time }));
  const pickupOptions = [{ value: 'asap', label: tr('Dès que possible · 25–35 min') }, ...['18:30', '19:00', '19:30', '20:00', '20:30'].map((time) => ({ value: time, label: time }))];
  const guestOptions = Array.from({ length: 8 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }));
  const serviceLabel = service === 'dine-in' ? 'Sur place' : service === 'delivery' ? 'Livraison' : 'À emporter';
  const serviceIcon = service === 'dine-in' ? <UtensilsCrossed className="size-5" /> : service === 'delivery' ? <Bike className="size-5" /> : <Store className="size-5" />;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild><button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 font-bold text-[#FAF6EC] outline-none transition-colors hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Continuer la commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#071C33]/82 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content dir={rtl ? 'rtl' : 'ltr'} className="fixed inset-x-0 bottom-0 z-[110] max-h-[94svh] overflow-y-auto rounded-t-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] text-[#241F19] shadow-[0_-20px_70px_rgba(3,16,31,0.35)] outline-none sm:inset-x-6 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(960px,calc(100vw-48px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl rtl:sm:left-auto rtl:sm:right-1/2 rtl:sm:translate-x-1/2">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#1E3A5F]/10 bg-[#FAF6EC]/95 px-5 py-4 backdrop-blur-lg sm:px-7">
            <div className="flex min-w-0 items-center gap-3">{step === 'details' ? <button type="button" onClick={() => setStep('service')} aria-label={tr('Retour au choix du service')} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" /></button> : null}<div className="min-w-0"><p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{step === 'done' ? tr('Commande préparée') : `${tr('Étape')} ${step === 'service' ? '1' : '2'} / 2`}</p><Dialog.Title className="font-display truncate text-2xl leading-none font-semibold text-[#1E3A5F] sm:text-3xl">{tr(step === 'service' ? 'Comment souhaitez-vous savourer votre commande ?' : step === 'details' ? 'Finalisez votre commande.' : 'Votre commande est prête à être confirmée.')}</Dialog.Title><Dialog.Description className="sr-only">{tr('Choisissez votre expérience. Nous afficherons ensuite uniquement les informations nécessaires.')}</Dialog.Description></div></div>
            <Dialog.Close asChild><button type="button" aria-label={tr('Fermer')} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><X className="size-4" /></button></Dialog.Close>
          </div>

          {step === 'service' ? (
            <div className="p-5 sm:p-8">
              <p className="max-w-2xl text-sm leading-6 text-[#241F19]/62">{tr('Choisissez votre expérience. Nous afficherons ensuite uniquement les informations nécessaires.')}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">{([
                { mode: 'dine-in' as const, icon: <UtensilsCrossed className="size-6" />, title: 'Sur place', detail: 'Choisissez votre heure et le nombre de convives. Votre table vous attendra.', action: 'Choisir sur place', color: 'bg-[#1E3A5F] text-[#C6A15B]' },
                { mode: 'takeaway' as const, icon: <ShoppingBag className="size-6" />, title: 'À emporter', detail: 'Choisissez votre heure de retrait. Nous préparons tout juste avant votre arrivée.', action: 'Choisir à emporter', color: 'bg-[#7C2438] text-white' },
                { mode: 'delivery' as const, icon: <Bike className="size-6" />, title: 'Livraison', detail: 'Choisissez la date, l’heure et l’adresse où vous souhaitez être livré.', action: 'Choisir la livraison', color: 'bg-[#C4703F] text-white' },
              ]).map((option) => <button key={option.mode} type="button" onClick={() => chooseService(option.mode)} className="group rounded-2xl border border-[#1E3A5F]/12 bg-white p-5 text-start shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-all hover:-translate-y-1 hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><span className={`grid size-12 place-items-center rounded-full ${option.color}`}>{option.icon}</span><span className="font-display mt-4 block text-2xl font-semibold text-[#1E3A5F]">{tr(option.title)}</span><span className="mt-2 block min-h-16 text-xs leading-5 text-[#241F19]/58">{tr(option.detail)}</span><span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#7C2438]">{tr(option.action)}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" /></span></button>)}</div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C6A15B]/25 bg-[#FFFDF7] p-4"><p className="text-sm text-[#241F19]/58"><strong className="text-[#1E3A5F]">{itemCount}</strong> {tr('articles sélectionnés')}</p><p className="font-display text-2xl font-bold text-[#7C2438]">{money}</p></div>
            </div>
          ) : step === 'details' && service ? (
            <form onSubmit={handleSubmit(submit)} noValidate className="grid lg:grid-cols-[1fr_300px]">
              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3 rounded-xl border border-[#1E3A5F]/12 bg-white p-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><MapPin className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold text-[#C4703F] uppercase">{tr('Restaurant sélectionné')}</p><p className="truncate font-bold text-[#1E3A5F]">{selectedRestaurant?.name ?? tr('Aucun restaurant sélectionné')}</p><p className="mt-0.5 truncate text-xs text-[#241F19]/50">{selectedRestaurant ? tr(selectedRestaurant.address) : tr('Choisissez un restaurant avant de continuer.')}</p></div><button type="button" onClick={changeRestaurant} className="shrink-0 text-xs font-bold text-[#7C2438] underline decoration-[#C6A15B] underline-offset-4">{tr('Modifier')}</button></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-[#C6A15B]" />{tr(service === 'delivery' ? 'Date de livraison' : service === 'takeaway' ? 'Date de retrait' : 'Date')}</span><input {...register('date')} type="date" min={today} aria-invalid={!!errors.date} className={fieldClass} />{error('date')}</label>
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr(service === 'delivery' ? 'Heure de livraison' : service === 'takeaway' ? 'Heure de retrait' : 'Heure')}</span><Controller name="time" control={control} render={({ field }) => <StyledSelect value={field.value} onChange={field.onChange} options={service === 'takeaway' ? pickupOptions : timeOptions} label={tr('Heure')} rtl={rtl} />} />{error('time')}</label>
                  {service === 'dine-in' ? <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2"><span className="flex items-center gap-2"><UsersRound className="size-4 text-[#C6A15B]" />{tr('Nombre de personnes')}</span><Controller name="guests" control={control} render={({ field }) => <StyledSelect value={field.value ?? '2'} onChange={field.onChange} options={guestOptions} label={tr('Nombre de personnes')} rtl={rtl} />} />{error('guests')}</label> : null}
                  {service === 'delivery' ? <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2"><span className="flex items-center gap-2"><MapPin className="size-4 text-[#C6A15B]" />{tr('Adresse de livraison')}</span><input {...register('address')} autoComplete="street-address" placeholder={tr('Rue, numéro, ville et code postal')} aria-invalid={!!errors.address} className={fieldClass} />{error('address')}</label> : null}
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><UserRound className="size-4 text-[#C6A15B]" />{tr('Votre nom')}</span><input {...register('name')} autoComplete="name" placeholder={tr('Nom et prénom')} aria-invalid={!!errors.name} className={fieldClass} />{error('name')}</label>
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Phone className="size-4 text-[#C6A15B]" />{tr('Téléphone')}</span><input {...register('phone')} type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00" aria-invalid={!!errors.phone} className={fieldClass} />{error('phone')}</label>
                  <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2">{tr('Allergies ou demande particulière')}<textarea {...register('notes')} rows={3} placeholder={tr('Facultatif')} className="mt-2 w-full resize-none rounded-lg border border-[#1E3A5F]/14 bg-white px-4 py-3 text-sm outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35" /></label>
                </div>
              </div>
              <aside className="border-t border-[#1E3A5F]/10 bg-[#102B4D] p-5 text-[#FAF6EC] lg:border-s lg:border-t-0 lg:p-7"><span className="grid size-12 place-items-center rounded-full bg-[#C6A15B] text-[#241F19]">{serviceIcon}</span><p className="font-display mt-4 text-2xl font-semibold">{tr(serviceLabel)}</p><p className="mt-1 text-xs text-[#FAF6EC]/48">{selectedRestaurant?.name ?? tr('Restaurant à choisir')}</p><dl className="mt-6 grid gap-3 text-sm"><div className="flex justify-between gap-3 text-[#FAF6EC]/58"><dt>{tr('Articles')}</dt><dd>{itemCount}</dd></div><div className="gold-divider gold-divider-dark" /><div className="flex items-end justify-between gap-3"><dt className="font-bold">{tr('Total')}</dt><dd className="font-display text-3xl font-bold text-[#C6A15B]">{money}</dd></div></dl><button type="submit" disabled={!selectedRestaurant} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 text-sm font-bold text-white outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:cursor-not-allowed disabled:opacity-45">{tr('Vérifier ma commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button><p className="mt-3 text-center text-[0.68rem] leading-5 text-[#FAF6EC]/42">{tr('Prototype local · aucune commande ne sera transmise.')}</p></aside>
            </form>
          ) : (
            <div className="grid place-items-center p-8 text-center sm:p-12"><span className="grid size-20 place-items-center rounded-full bg-[#C4703F] text-white shadow-[0_12px_32px_rgba(196,112,63,0.3)]"><Check className="size-9" /></span><p className="font-display mt-6 text-4xl font-semibold text-[#1E3A5F]">{tr('Tout est prêt.')}</p><p className="mt-3 max-w-md text-sm leading-6 text-[#241F19]/60">{tr(service === 'dine-in' ? 'Nous gardons votre table et préparons votre commande.' : service === 'delivery' ? 'Nous livrerons votre commande à la date et à l’heure choisies.' : 'Nous préparerons votre commande pour l’heure de retrait choisie.')}</p><p className="mt-5 rounded-full bg-[#1E3A5F]/7 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#1E3A5F]">{tr('Référence')} · {reference}</p><button type="button" onClick={closeCompleted} className="mt-7 rounded-lg bg-[#1E3A5F] px-7 py-4 font-bold text-[#FAF6EC] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Fermer')}</button></div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
