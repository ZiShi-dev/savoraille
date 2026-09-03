'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, LogOut, Mail, ShieldCheck, Sparkles, UserPlus, UserRound, X } from 'lucide-react';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useI18n } from './i18n-provider';

type AuthIntent = 'account' | 'order' | 'reservation';
type AuthMode = 'choice' | 'signin' | 'signup';
type AuthUser = { name: string; email: string };
type AuthFields = { name?: string; email: string; password: string; confirmPassword?: string };
type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  openAuth: (mode?: Exclude<AuthMode, 'choice'>) => void;
  requireAuth: (intent: AuthIntent, onAuthenticated: () => void) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'savoraille-auth-user';

const signInSchema = z.object({
  email: z.string().trim().email('Indiquez une adresse e-mail valide.'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
});

const signUpSchema = signInSchema.superRefine((values, context) => {
  if (!values.name || values.name.trim().length < 2) context.addIssue({ code: 'custom', path: ['name'], message: 'Indiquez votre nom.' });
  if (values.password !== values.confirmPassword) context.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'Les mots de passe ne correspondent pas.' });
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { locale, tr } = useI18n();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('choice');
  const [intent, setIntent] = useState<AuthIntent>('order');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);
  const reduceMotion = useReducedMotion();
  const schema = useMemo(() => mode === 'signup' ? signUpSchema : signInSchema, [mode]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuthFields>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved) as AuthUser);
    } catch { /* Ignore invalid local prototype state. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [ready, user]);

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setPasswordVisible(false);
    setConfirmationVisible(false);
    reset({ name: '', email: '', password: '', confirmPassword: '' });
  };
  const openAuth = (nextMode: Exclude<AuthMode, 'choice'> = 'signin') => {
    setIntent('account');
    pendingAction.current = null;
    changeMode(nextMode);
    setOpen(true);
  };
  const requireAuth = (nextIntent: AuthIntent, onAuthenticated: () => void) => {
    if (user) { onAuthenticated(); return; }
    setIntent(nextIntent);
    pendingAction.current = onAuthenticated;
    changeMode('choice');
    setOpen(true);
  };
  const authenticate = (values: AuthFields) => {
    const emailName = values.email.split('@')[0]?.replace(/[._-]+/g, ' ').trim() || tr('Client Savoraille');
    setUser({ name: values.name?.trim() || emailName, email: values.email.trim() });
    const resume = pendingAction.current;
    pendingAction.current = null;
    setOpen(false);
    window.setTimeout(() => resume?.(), reduceMotion ? 0 : 260);
  };
  const close = () => {
    setOpen(false);
    pendingAction.current = null;
    window.setTimeout(() => changeMode('choice'), 220);
  };
  const confirmSignOut = () => {
    setUser(null);
    setSignOutOpen(false);
  };
  const error = (name: keyof AuthFields) => errors[name]?.message ? <span role="alert" className="mt-1.5 block text-xs font-semibold text-[#7C2438]">{tr(errors[name]?.message ?? '')}</span> : null;
  const fieldClass = 'mt-2 h-12 w-full min-w-0 max-w-full rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-all placeholder:text-[#241F19]/35 hover:border-[#C6A15B]/65 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30';
  const title = intent === 'account' ? 'Bienvenue dans votre espace Savoraille.' : intent === 'reservation' ? 'Connectez-vous pour réserver votre table.' : 'Connectez-vous pour finaliser votre commande.';
  const description = intent === 'account' ? 'Retrouvez vos commandes et réservez plus rapidement depuis un seul espace.' : intent === 'reservation' ? 'Votre réservation est prête. Identifiez-vous pour la confirmer sans perdre les informations saisies.' : 'Votre commande est prête. Identifiez-vous pour la confirmer sans perdre votre panier.';

  const value = useMemo<AuthContextValue>(() => ({ user, isAuthenticated: !!user, openAuth, requireAuth, signOut: () => setSignOutOpen(true) }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Dialog.Root open={open} onOpenChange={(nextOpen) => { if (!nextOpen) close(); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="savoraille-dialog-overlay fixed inset-0 z-[210] bg-[#071C33]/86 backdrop-blur-md" />
          <Dialog.Content dir={locale === 'ar' ? 'rtl' : 'ltr'} className="savoraille-dialog-surface fixed inset-x-4 top-1/2 z-[220] mx-auto max-h-[92svh] w-auto max-w-lg -translate-y-1/2 overflow-y-auto rounded-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] text-[#241F19] shadow-[0_30px_90px_rgba(3,16,31,0.45)] outline-none">
            <div className="relative overflow-hidden bg-[#102B4D] px-6 pb-7 pt-6 text-[#FAF6EC] sm:px-8">
              <div className="pointer-events-none absolute -end-14 -top-20 size-52 rounded-full border border-[#C6A15B]/20" />
              <div className="relative flex items-start justify-between gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#C6A15B] text-[#241F19]"><ShieldCheck className="size-5" /></span>
                <button type="button" onClick={close} aria-label={tr('Fermer')} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#FAF6EC]/20 text-[#FAF6EC] outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><X className="size-4" /></button>
              </div>
              <Dialog.Title className="font-display relative mt-6 text-3xl leading-none font-semibold sm:text-4xl">{tr(title)}</Dialog.Title>
              <Dialog.Description className="relative mt-3 text-sm leading-6 text-[#FAF6EC]/65">{tr(description)}</Dialog.Description>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {mode === 'choice' ? (
                <motion.div key="choice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="p-5 sm:p-7">
                  <p className="text-xs font-bold tracking-[0.14em] text-[#C4703F] uppercase">{tr('Choisissez comment continuer')}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => changeMode('signin')} className="group rounded-2xl border border-[#1E3A5F]/12 bg-white p-5 text-start outline-none transition-all hover:-translate-y-0.5 hover:border-[#C6A15B] hover:shadow-[0_12px_30px_rgba(30,58,95,0.1)] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><span className="grid size-11 place-items-center rounded-full bg-[#1E3A5F] text-[#C6A15B]"><UserRound className="size-5" /></span><span className="font-display mt-5 block text-2xl font-semibold text-[#1E3A5F]">{tr('Se connecter')}</span><span className="mt-2 block text-xs leading-5 text-[#241F19]/52">{tr('J’ai déjà un compte Savoraille.')}</span><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C2438]">{tr('Continuer')}<ArrowRight className="size-3.5 rtl:-scale-x-100" /></span></button>
                    <button type="button" onClick={() => changeMode('signup')} className="group rounded-2xl border border-[#C6A15B]/45 bg-[#FFFDF7] p-5 text-start outline-none transition-all hover:-translate-y-0.5 hover:border-[#C6A15B] hover:shadow-[0_12px_30px_rgba(30,58,95,0.1)] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><span className="grid size-11 place-items-center rounded-full bg-[#7C2438] text-white"><UserPlus className="size-5" /></span><span className="font-display mt-5 block text-2xl font-semibold text-[#1E3A5F]">{tr('Créer un compte')}</span><span className="mt-2 block text-xs leading-5 text-[#241F19]/52">{tr('Je découvre Savoraille pour la première fois.')}</span><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C2438]">{tr('S’inscrire')}<ArrowRight className="size-3.5 rtl:-scale-x-100" /></span></button>
                  </div>
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#C6A15B]/25 bg-[#C6A15B]/8 p-4"><Sparkles className="mt-0.5 size-4 shrink-0 text-[#7C2438]" /><p className="text-xs leading-5 text-[#241F19]/58">{tr('Après cette étape, vous reprendrez automatiquement votre confirmation.')}</p></div>
                </motion.div>
              ) : (
                <motion.form key={mode} initial={{ opacity: 0, x: locale === 'ar' ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: locale === 'ar' ? 12 : -12 }} onSubmit={handleSubmit(authenticate)} noValidate className="p-5 sm:p-7">
                  <button type="button" onClick={() => changeMode('choice')} className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" />{tr('Retour')}</button>
                  <h2 className="font-display mt-5 text-3xl font-semibold text-[#1E3A5F]">{tr(mode === 'signup' ? 'Créer votre compte' : 'Bon retour chez Savoraille.')}</h2>
                  {mode === 'signup' ? <label className="mt-5 block text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><UserRound className="size-4 text-[#C6A15B]" />{tr('Nom et prénom')}</span><input {...register('name')} autoComplete="name" placeholder={tr('Votre nom')} className={fieldClass} />{error('name')}</label> : null}
                  <label className="mt-5 block text-sm font-bold text-[#1E3A5F]"><span className="flex items-center gap-2"><Mail className="size-4 text-[#C6A15B]" />{tr('Adresse e-mail')}</span><input {...register('email')} type="email" autoComplete="email" placeholder="vous@exemple.fr" className={fieldClass} />{error('email')}</label>
                  <div className="mt-5 text-sm font-bold text-[#1E3A5F]">
                    <label htmlFor="auth-password" className="flex items-center gap-2"><LockKeyhole className="size-4 text-[#C6A15B]" />{tr('Mot de passe')}</label>
                    <div className="relative">
                      <input id="auth-password" {...register('password')} type={passwordVisible ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder="••••••••" className={`${fieldClass} pe-12`} />
                      <button type="button" onClick={() => setPasswordVisible((visible) => !visible)} className="absolute end-1.5 top-[calc(50%+0.25rem)] grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#1E3A5F]/55 outline-none transition-colors hover:bg-[#1E3A5F]/7 hover:text-[#1E3A5F] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={tr(passwordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe')} aria-pressed={passwordVisible}>
                        {passwordVisible ? <EyeOff aria-hidden="true" className="size-4.5" /> : <Eye aria-hidden="true" className="size-4.5" />}
                      </button>
                    </div>
                    {error('password')}
                  </div>
                  {mode === 'signup' ? <div className="mt-5 text-sm font-bold text-[#1E3A5F]">
                    <label htmlFor="auth-confirm-password" className="flex items-center gap-2"><Check className="size-4 text-[#C6A15B]" />{tr('Confirmer le mot de passe')}</label>
                    <div className="relative">
                      <input id="auth-confirm-password" {...register('confirmPassword')} type={confirmationVisible ? 'text' : 'password'} autoComplete="new-password" placeholder="••••••••" className={`${fieldClass} pe-12`} />
                      <button type="button" onClick={() => setConfirmationVisible((visible) => !visible)} className="absolute end-1.5 top-[calc(50%+0.25rem)] grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#1E3A5F]/55 outline-none transition-colors hover:bg-[#1E3A5F]/7 hover:text-[#1E3A5F] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={tr(confirmationVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe')} aria-pressed={confirmationVisible}>
                        {confirmationVisible ? <EyeOff aria-hidden="true" className="size-4.5" /> : <Eye aria-hidden="true" className="size-4.5" />}
                      </button>
                    </div>
                    {error('confirmPassword')}
                  </div> : null}
                  <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-4 text-sm font-bold text-white outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr(mode === 'signup' ? 'Créer mon compte et continuer' : 'Me connecter et continuer')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
                  <p className="mt-3 text-center text-[0.68rem] leading-5 text-[#241F19]/42">{tr('Prototype local : aucune donnée d’authentification n’est transmise.')}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={signOutOpen} onOpenChange={setSignOutOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="savoraille-dialog-overlay fixed inset-0 z-[230] bg-[#071C33]/72 backdrop-blur-sm" />
          <Dialog.Content dir={locale === 'ar' ? 'rtl' : 'ltr'} className="savoraille-dialog-surface fixed inset-x-4 top-1/2 z-[240] mx-auto w-auto max-w-md -translate-y-1/2 rounded-3xl border border-[#C6A15B]/35 bg-[#FAF6EC] p-6 text-[#241F19] shadow-[0_30px_90px_rgba(3,16,31,0.42)] outline-none sm:p-8">
            <span className="grid size-14 place-items-center rounded-full bg-[#7C2438]/10 text-[#7C2438]"><LogOut aria-hidden="true" className="size-6" /></span>
            <Dialog.Title className="font-display mt-5 text-3xl font-semibold leading-none text-[#1E3A5F]">{tr('Confirmer la déconnexion ?')}</Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-6 text-[#241F19]/60">{tr('Vous devrez vous reconnecter pour retrouver votre espace client.')}</Dialog.Description>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Dialog.Close asChild><button type="button" className="rounded-lg border border-[#1E3A5F]/14 bg-white px-5 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none hover:border-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Annuler')}</button></Dialog.Close>
              <button type="button" onClick={confirmSignOut} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-5 py-3.5 text-sm font-bold text-white outline-none hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><LogOut aria-hidden="true" className="size-4" />{tr('Se déconnecter')}</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
