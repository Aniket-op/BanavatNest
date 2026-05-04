'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <section
        ref={ref}
        className="relative w-full bg-zinc-50 dark:bg-zinc-900/50"
      >
        <Image
          src="/images/HomePageImage.png"
          alt="Academia to Industry bridge — BanavatNest collaborative ecosystem"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
        />

        {/* Glow Effect */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[560px] h-[560px] rounded-full bg-[#84CC16]/10 blur-[160px] pointer-events-none"
        />
      </section>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 max-w-5xl mx-auto px-4 text-sm md:text-base lg:text-lg font-medium tracking-wide"
      >
        {t('heroTagline')}
      </motion.div>
    </>
  );
}