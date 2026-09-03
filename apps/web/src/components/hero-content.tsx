'use client';

import { CalendarDays, Clock3, Leaf, ShoppingBag } from 'lucide-react';
import { LocalizedLink } from './localized-link';
import { motion, useReducedMotion } from 'framer-motion';

import { useI18n } from './i18n-provider';

const MotionLink = motion.create(LocalizedLink);

export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const { tr } = useI18n();
  const firstLine = tr('Le terroir,').split(' ');
  const secondLine = tr('dans l’air du temps.').split(' ');

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="max-w-3xl">
      <motion.div {...reveal(0.05)}>
        <motion.p
          className="font-script text-3xl text-[#C6A15B] sm:text-4xl"
          animate={reduceMotion ? undefined : { opacity: [0.82, 1, 0.82], y: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {tr('La merveille des saveurs')}
        </motion.p>
      </motion.div>

      <h1 className="font-display mt-5 text-[clamp(3.6rem,7vw,6.8rem)] leading-[0.88] font-semibold tracking-[-0.045em] text-[#FAF6EC]">
        <span className="block">
          {firstLine.map((word, index) => (
            <motion.span key={word} className="mr-[0.2em] inline-block" {...reveal(0.16 + index * 0.1)}>
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block italic text-[#C6A15B]">
          {secondLine.map((word, index) => (
            <motion.span
              key={word}
              className="mr-[0.2em] inline-block"
              {...reveal(0.34 + index * 0.08)}
            >
              <motion.span
                className="inline-block drop-shadow-[0_0_18px_rgba(198,161,91,0.16)]"
                animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
                transition={reduceMotion ? undefined : { duration: 3.8, delay: index * 0.16, repeat: Infinity, ease: 'easeInOut' }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.p className="mt-7 max-w-xl text-base leading-7 text-[#FAF6EC]/82 sm:text-lg" {...reveal(0.72)}>
        {tr('Bienvenue chez Savoraille. Une cuisine française de saison, généreuse et précise, à savourer à table ou chez vous.')}
      </motion.p>

      <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...reveal(0.84)}>
        <MotionLink
          href="/reservation"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FAF6EC] px-6 py-4 font-semibold text-[#1E3A5F] shadow-[0_8px_24px_rgba(0,0,0,0.2)] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F] focus-visible:outline-none"
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.8} />{tr('Réserver une table')}
        </MotionLink>
        <MotionLink
          href="/carte"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-6 py-4 font-semibold text-[#FAF6EC] shadow-[0_8px_24px_rgba(0,0,0,0.18)] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F] focus-visible:outline-none"
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.8} />{tr('Commander')}
        </MotionLink>
      </motion.div>

      <motion.div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#FAF6EC]/78" {...reveal(0.96)}>
        <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</span>
        <span className="flex items-center gap-2"><Leaf className="size-4 text-[#C6A15B]" />{tr('Produits de saison')}</span>
      </motion.div>
    </div>
  );
}
