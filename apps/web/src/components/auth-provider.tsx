'use client';

import { useGSAP } from '@gsap/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ensureGsapPlugins, prefersReducedMotion } from '@/lib/gsap-register';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, LogOut, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import gsap from 'gsap';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useI18n } from './i18n-provider';

type AuthIntent = 'account' | 'order' | 'reservation';
type AuthMode = 'signin' | 'signup';
type AuthUser = { name: string; email: string };
type AuthFields = { name?: string; email: string; password: string; confirmPassword?: string };
type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  openAuth: (mode?: AuthMode) => void;
  requireAuth: (intent: AuthIntent, onAuthenticated: () => void) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'savoraille-auth-user';

ensureGsapPlugins();

function AuthFormMotion({ mode, locale, children }: { mode: AuthMode; locale: string; children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const seenRef = useRef(false);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const instant = prefersReducedMotion() || !seenRef.current;
    seenRef.current = true;
    const tab = root.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]');
    const pill = root.querySelector<HTMLElement>('[data-auth-pill]');
    if (tab && pill) {
      gsap.to(pill, { x: tab.offsetLeft, width: tab.offsetWidth, duration: instant ? 0 : 0.5, ease: 'power3.out', overwrite: 'auto' });
    }
    const extras = gsap.utils.toArray<HTMLElement>('[data-auth-extra]', root);
    const showSignup = mode === 'signup';
    if (instant) gsap.set(extras, { height: showSignup ? 'auto' : 0, autoAlpha: showSignup ? 1 : 0 });
    else if (showSignup) gsap.fromTo(extras, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
    else gsap.to(extras, { height: 0, autoAlpha: 0, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
    const heading = root.querySelector<HTMLElement>('[data-auth-heading]');
    if (heading && !instant) gsap.fromTo(heading, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }, { scope: rootRef, dependencies: [mode, locale] });

  return <div ref={rootRef}>{children}</div>;
}

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
  const [mode, setMode] = useState<AuthMode>('signin');
  const [intent, setIntent] = useState<AuthIntent>('order');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const signinTabRef = useRef<HTMLButtonElement>(null);
  const signupTabRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const confirmWrapRef = useRef<HTMLDivElement>(null);
  const schema = useMemo(() => mode === 'signup' ? signUpSchema : signInSchema, [mode]);
  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm<AuthFields>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

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
    if (nextMode === mode) return;
    setMode(nextMode);
    setPasswordVisible(false);
    setConfirmationVisible(false);
    clearErrors();
  };
  const openAuth = (nextMode: AuthMode = 'signin') => {
    setIntent('account');
    pendingAction.current = null;
    changeMode(nextMode);
    setOpen(true);
  };
  const requireAuth = (nextIntent: AuthIntent, onAuthenticated: () => void) => {
    if (user) { onAuthenticated(); return; }
    setIntent(nextIntent);
    pendingAction.current = onAuthenticated;
    changeMode('signin');
    setOpen(true);
  };
  const authenticate = (values: AuthFields) => {
    const emailName = values.email.split('@')[0]?.replace(/[._-]+/g, ' ').trim() || tr('Client Savoraille');
    setUser({ name: values.name?.trim() || emailName, email: values.email.trim() });
    const resume = pendingAction.current;
    pendingAction.current = null;
    setOpen(false);
    window.setTimeout(() => resume?.(), prefersReducedMotion() ? 0 : 260);
  };
  const close = () => {
    setOpen(false);
    pendingAction.current = null;
    window.setTimeout(() => {
      setMode('signin');
      setPasswordVisible(false);
      setConfirmationVisible(false);
      reset({ name: '', email: '', password: '', confirmPassword: '' });
    }, 220);
  };
  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const order: AuthMode[] = locale === 'ar' ? ['signup', 'signin'] : ['signin', 'signup'];
    const index = order.indexOf(mode);
    const nextMode = order[(index + (event.key === 'ArrowRight' ? 1 : -1) + order.length) % order.length] ?? mode;
    changeMode(nextMode);
    (nextMode === 'signin' ? signinTabRef : signupTabRef).current?.focus();
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

            <AuthFormMotion mode={mode} locale={locale}>
            <form onSubmit={handleSubmit(authenticate)} noValidate className="p-5 sm:p-7">
              <div ref={trackRef} role="tablist" aria-label={tr('Espace client')} onKeyDown={onTabKey} className="relative grid grid-cols-2 rounded-full bg-[#1E3A5F]/8 p-1">
                <span ref={pillRef} data-auth-pill aria-hidden="true" className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#1E3A5F]" />
                <button ref={signinTabRef} type="button" role="tab" id="auth-tab-signin" aria-selected={mode === 'signin'} aria-controls="auth-panel" tabIndex={mode === 'signin' ? 0 : -1} onClick={() => changeMode('signin')} className={`relative z-10 rounded-full px-3 py-2.5 text-sm font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.98] ${mode === 'signin' ? 'text-[#FAF6EC]' : 'text-[#1E3A5F]'}`}>{tr('Se connecter')}</button>
                <button ref={signupTabRef} type="button" role="tab" id="auth-tab-signup" aria-selected={mode === 'signup'} aria-controls="auth-panel" tabIndex={mode === 'signup' ? 0 : -1} onClick={() => changeMode('signup')} className={`relative z-10 rounded-full px-3 py-2.5 text-sm font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.98] ${mode === 'signup' ? 'text-[#FAF6EC]' : 'text-[#1E3A5F]'}`}>{tr('Créer un compte')}</button>
              </div>

              <div role="tabpanel" id="auth-panel" aria-labelledby={mode === 'signin' ? 'auth-tab-signin' : 'auth-tab-signup'}>
                <h2 ref={headingRef} data-auth-heading className="font-display mt-6 text-3xl font-semibold text-[#1E3A5F]">{tr(mode === 'signup' ? 'Créer votre compte' : 'Bon retour chez Savoraille.')}</h2>

                <div ref={nameWrapRef} data-auth-extra inert={mode !== 'signup'} className="overflow-hidden">
                  <label className="block pt-5 text-sm font-bold text-[#1E3A5F]">
                    <span className="flex items-center gap-2"><UserRound className="size-4 text-[#C6A15B]" />{tr('Nom et prénom')}</span>
                    <input {...register('name')} autoComplete="name" placeholder={tr('Votre nom')} className={fieldClass} />
                    {error('name')}
                  </label>
                </div>

                <label className="mt-5 block text-sm font-bold text-[#1E3A5F]">
                  <span className="flex items-center gap-2"><Mail className="size-4 text-[#C6A15B]" />{tr('Adresse e-mail')}</span>
                  <input {...register('email')} type="email" autoComplete="email" placeholder="vous@exemple.fr" className={fieldClass} />
                  {error('email')}
                </label>

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

                <div ref={confirmWrapRef} data-auth-extra inert={mode !== 'signup'} className="overflow-hidden">
                  <div className="pt-5 text-sm font-bold text-[#1E3A5F]">
                    <label htmlFor="auth-confirm-password" className="flex items-center gap-2"><Check className="size-4 text-[#C6A15B]" />{tr('Confirmer le mot de passe')}</label>
                    <div className="relative">
                      <input id="auth-confirm-password" {...register('confirmPassword')} type={confirmationVisible ? 'text' : 'password'} autoComplete="new-password" placeholder="••••••••" className={`${fieldClass} pe-12`} />
                      <button type="button" onClick={() => setConfirmationVisible((visible) => !visible)} className="absolute end-1.5 top-[calc(50%+0.25rem)] grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#1E3A5F]/55 outline-none transition-colors hover:bg-[#1E3A5F]/7 hover:text-[#1E3A5F] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label={tr(confirmationVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe')} aria-pressed={confirmationVisible}>
                        {confirmationVisible ? <EyeOff aria-hidden="true" className="size-4.5" /> : <Eye aria-hidden="true" className="size-4.5" />}
                      </button>
                    </div>
                    {error('confirmPassword')}
                  </div>
                </div>

                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7C2438] px-5 py-4 text-sm font-bold text-white outline-none transition-[background-color,transform] duration-150 hover:bg-[#681d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.97]">{tr(mode === 'signup' ? 'Créer mon compte et continuer' : 'Me connecter et continuer')}<ArrowRight className="size-4 rtl:-scale-x-100" /></button>
                <p className="mt-4 text-center text-sm text-[#241F19]/60">
                  {tr(mode === 'signin' ? 'Je découvre Savoraille pour la première fois.' : 'J’ai déjà un compte Savoraille.')}{' '}
                  <button type="button" onClick={() => changeMode(mode === 'signin' ? 'signup' : 'signin')} className="font-bold text-[#7C2438] underline decoration-[#C6A15B] decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                    {tr(mode === 'signin' ? 'Créer un compte' : 'Se connecter')}
                  </button>
                </p>
                <p className="mt-3 text-center text-[0.68rem] leading-5 text-[#241F19]/42">{tr('Le compte reste sur cet appareil.')}</p>
              </div>
            </form>
            </AuthFormMotion>
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
