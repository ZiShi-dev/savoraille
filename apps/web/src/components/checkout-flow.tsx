'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, Phone, ShoppingBag, Store, UserRound, UsersRound, UtensilsCrossed, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { useI18n } from './i18n-provider';
import { useRestaurant } from './restaurant-provider';

type ServiceMode = 'dine-in' | 'takeaway';
type CheckoutStep = 'service' | 'details' | 'done';

export function CheckoutFlow({ itemCount, total }: { itemCount: number; total: number }) {
  const { locale, tr } = useI18n();
  const { selectedRestaurant, openPicker } = useRestaurant();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('service');
  const [service, setService] = useState<ServiceMode | null>(null);
  const [reference, setReference] = useState('');
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(total);
  const today = new Date().toISOString().slice(0, 10);
  const fieldClass = 'mt-2 h-12 w-full rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-colors focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35';

  const chooseService = (mode: ServiceMode) => {
    setService(mode);
    setStep('details');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`SV-${Date.now().toString().slice(-5)}`);
    setStep('done');
  };

  const closeCompleted = () => {
    setOpen(false);
    window.setTimeout(() => {
      setStep('service');
      setService(null);
      setReference('');
    }, 250);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 font-bold text-[#FAF6EC] outline-none transition-colors hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Continuer la commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#071C33]/82 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content dir={locale === 'ar' ? 'rtl' : 'ltr'} className="fixed inset-x-0 bottom-0 z-[110] max-h-[94svh] overflow-y-auto rounded-t-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] text-[#241F19] shadow-[0_-20px_70px_rgba(3,16,31,0.35)] outline-none sm:inset-x-6 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(920px,calc(100vw-48px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl rtl:sm:left-auto rtl:sm:right-1/2 rtl:sm:translate-x-1/2">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#1E3A5F]/10 bg-[#FAF6EC]/95 px-5 py-4 backdrop-blur-lg sm:px-7">
            <div className="flex items-center gap-3">
              {step === 'details' ? <button type="button" onClick={() => setStep('service')} aria-label={tr('Retour au choix du service')} className="grid size-10 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" /></button> : null}
              <div><p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#C4703F] uppercase">{step === 'done' ? tr('Commande préparée') : `${tr('Étape')} ${step === 'service' ? '1' : '2'} / 2`}</p><Dialog.Title className="font-display text-2xl leading-none font-semibold text-[#1E3A5F] sm:text-3xl">{tr(step === 'service' ? 'Comment souhaitez-vous savourer votre commande ?' : step === 'details' ? 'Finalisez votre commande.' : 'Votre commande est prête à être confirmée.')}</Dialog.Title></div>
            </div>
            <Dialog.Close asChild><button type="button" aria-label={tr('Fermer')} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#1E3A5F]/12 text-[#1E3A5F] outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><X className="size-4" /></button></Dialog.Close>
          </div>

          {step === 'service' ? (
            <div className="p-5 sm:p-8">
              <Dialog.Description className="max-w-2xl text-sm leading-6 text-[#241F19]/62">{tr('Choisissez votre expérience. Nous afficherons ensuite uniquement les informations nécessaires.')}</Dialog.Description>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button type="button" onClick={() => chooseService('dine-in')} className="group rounded-2xl border border-[#1E3A5F]/12 bg-white p-5 text-start shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-all hover:-translate-y-1 hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:p-6">
                  <span className="grid size-14 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><UtensilsCrossed className="size-6" /></span><span className="font-display mt-5 block text-3xl font-semibold text-[#1E3A5F]">{tr('Sur place')}</span><span className="mt-2 block text-sm leading-6 text-[#241F19]/58">{tr('Choisissez votre heure et le nombre de convives. Votre table vous attendra.')}</span><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438]">{tr('Choisir sur place')}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" /></span>
                </button>
                <button type="button" onClick={() => chooseService('takeaway')} className="group rounded-2xl border border-[#1E3A5F]/12 bg-white p-5 text-start shadow-[0_8px_24px_rgba(30,58,95,0.08)] outline-none transition-all hover:-translate-y-1 hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:p-6">
                  <span className="grid size-14 place-items-center rounded-full bg-[#7C2438] text-[#FAF6EC]"><ShoppingBag className="size-6" /></span><span className="font-display mt-5 block text-3xl font-semibold text-[#1E3A5F]">{tr('À emporter')}</span><span className="mt-2 block text-sm leading-6 text-[#241F19]/58">{tr('Choisissez votre heure de retrait. Nous préparons tout juste avant votre arrivée.')}</span><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438]">{tr('Choisir à emporter')}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" /></span>
                </button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C6A15B]/25 bg-[#FFFDF7] p-4"><p className="text-sm text-[#241F19]/58"><strong className="text-[#1E3A5F]">{itemCount}</strong> {tr('articles sélectionnés')}</p><p className="font-display text-2xl font-bold text-[#7C2438]">{money}</p></div>
            </div>
          ) : step === 'details' && service ? (
            <form onSubmit={submit} className="grid lg:grid-cols-[1fr_300px]">
              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3 rounded-xl border border-[#1E3A5F]/12 bg-white p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><MapPin className="size-5" /></span>
                  <div className="min-w-0 flex-1"><p className="text-xs font-bold text-[#C4703F] uppercase">{tr('Restaurant sélectionné')}</p><p className="truncate font-bold text-[#1E3A5F]">{selectedRestaurant?.name ?? tr('Aucun restaurant sélectionné')}</p><p className="mt-0.5 truncate text-xs text-[#241F19]/50">{selectedRestaurant ? tr(selectedRestaurant.address) : tr('Choisissez un restaurant avant de continuer.')}</p></div>
                  <button type="button" onClick={() => { setOpen(false); openPicker(); }} className="shrink-0 text-xs font-bold text-[#7C2438] underline decoration-[#C6A15B] underline-offset-4">{tr('Modifier')}</button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {service === 'dine-in' ? <>
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-[#C6A15B]" />{tr('Date')}</span><input required type="date" min={today} className={fieldClass} /></label>
                    <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Heure')}</span><select required defaultValue="20:00" className={fieldClass}><option>12:00</option><option>12:30</option><option>13:00</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option></select></label>
                    <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2"><span className="flex items-center gap-2"><UsersRound className="size-4 text-[#C6A15B]" />{tr('Nombre de personnes')}</span><select required defaultValue="2" className={fieldClass}>{Array.from({ length: 8 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label>
                  </> : <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Heure de retrait')}</span><select required defaultValue="asap" className={fieldClass}><option value="asap">{tr('Dès que possible · 25–35 min')}</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option></select></label>}
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><UserRound className="size-4 text-[#C6A15B]" />{tr('Votre nom')}</span><input required autoComplete="name" placeholder={tr('Nom et prénom')} className={fieldClass} /></label>
                  <label className="text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Phone className="size-4 text-[#C6A15B]" />{tr('Téléphone')}</span><input required type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00" className={fieldClass} /></label>
                  <label className="text-sm font-bold text-[#1E3A5F] sm:col-span-2">{tr('Allergies ou demande particulière')}<textarea rows={3} placeholder={tr('Facultatif')} className="mt-2 w-full resize-none rounded-lg border border-[#1E3A5F]/14 bg-white px-4 py-3 text-sm outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35" /></label>
                </div>
              </div>

              <aside className="border-t border-[#1E3A5F]/10 bg-[#102B4D] p-5 text-[#FAF6EC] lg:border-s lg:border-t-0 lg:p-7">
                <span className="grid size-12 place-items-center rounded-full bg-[#C6A15B] text-[#241F19]">{service === 'dine-in' ? <UtensilsCrossed className="size-5" /> : <Store className="size-5" />}</span><p className="font-display mt-4 text-2xl font-semibold">{tr(service === 'dine-in' ? 'Sur place' : 'À emporter')}</p><p className="mt-1 text-xs text-[#FAF6EC]/48">{selectedRestaurant?.name ?? tr('Restaurant à choisir')}</p>
                <dl className="mt-6 grid gap-3 text-sm"><div className="flex justify-between gap-3 text-[#FAF6EC]/58"><dt>{tr('Articles')}</dt><dd>{itemCount}</dd></div><div className="gold-divider gold-divider-dark" /><div className="flex items-end justify-between gap-3"><dt className="font-bold">{tr('Total')}</dt><dd className="font-display text-3xl font-bold text-[#C6A15B]">{money}</dd></div></dl>
                <button type="submit" disabled={!selectedRestaurant} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 text-sm font-bold text-white outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:cursor-not-allowed disabled:opacity-45">{tr('Vérifier ma commande')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
                <p className="mt-3 text-center text-[0.68rem] leading-5 text-[#FAF6EC]/42">{tr('Prototype local · aucune commande ne sera transmise.')}</p>
              </aside>
            </form>
          ) : (
            <div className="grid place-items-center p-8 text-center sm:p-12">
              <span className="grid size-20 place-items-center rounded-full bg-[#C4703F] text-white shadow-[0_12px_32px_rgba(196,112,63,0.3)]"><Check className="size-9" /></span><Dialog.Description className="font-display mt-6 text-4xl font-semibold text-[#1E3A5F]">{tr('Tout est prêt.')}</Dialog.Description><p className="mt-3 max-w-md text-sm leading-6 text-[#241F19]/60">{tr(service === 'dine-in' ? 'Nous gardons votre table et préparons votre commande.' : 'Nous préparerons votre commande pour l’heure de retrait choisie.')}</p><p className="mt-5 rounded-full bg-[#1E3A5F]/7 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#1E3A5F]">{tr('Référence')} · {reference}</p><button type="button" onClick={closeCompleted} className="mt-7 rounded-lg bg-[#1E3A5F] px-7 py-4 font-bold text-[#FAF6EC] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Fermer')}</button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
