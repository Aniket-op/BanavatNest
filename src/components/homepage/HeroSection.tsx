'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <section ref={ref} className="mt-10 relative shadow-2xl dark:shadow-white/60 mx-auto rounded-4xl max-w-7xl aspect-video min-h-[300px] sm:min-h-[400px] overflow-hidden w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-full bg-zinc-50 dark:bg-zinc-900/50">
        <div className="absolute inset-0">
          <div className="relative w-full h-full rounded-2xl sm:rounded-none shadow-xl sm:shadow-none overflow-hidden">
            <Image
              src="/images/HomePageImage.png"
              alt="Academia to Industry bridge — BanavatNest collaborative ecosystem"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[560px] h-[560px] rounded-full bg-[#84CC16]/10 blur-[160px] pointer-events-none"
        />

        {/* PILL - positioned inside bounds so it isn't cut off by overflow */}
        {/* <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="absolute top-6 sm:top-1/2 lg:top-2/3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 sm:gap-2 bg-[#84CC16] hover:bg-[#95E01A] transition-colors text-zinc-900 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full shadow-lg sm:shadow-2xl shadow-[#84CC16]/20 z-20 whitespace-nowrap cursor-default"
        >
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-900/50 animate-pulse" />
          <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">Build with Purpose Nurture to Impact</span>
        </motion.div> */}
      </section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 max-w-5xl mx-auto px-4 text-sm md:text-base lg:text-lg font-medium tracking-wide"
      >
        BanavatNest Pvt. Ltd. — where research meets prototypes and prototypes move toward real-world impact
      </motion.div>
    </>
  );
}
