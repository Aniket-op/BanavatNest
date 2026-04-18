'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <section ref={ref} className="mt-10 relative shadow-2xl dark:shadow-white/20 mx-auto rounded-4xl max-w-7xl h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-full">
        {/* BACKGROUND IMAGE */}
        <Image
          src="/images/HomePageImage.png"
          alt="Academia to Industry bridge — BanavatNest collaborative ecosystem"
          fill
          className="object-cover object-top z-0"
          priority
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[560px] h-[560px] rounded-full bg-[#84CC16]/10 blur-[160px] pointer-events-none"
        />

        {/* PILL - positioned inside bounds so it isn't cut off by overflow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="absolute top-8 lg:top-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-[#84CC16] hover:bg-[#95E01A] transition-colors text-zinc-900 px-6 py-2.5 rounded-full shadow-2xl shadow-[#84CC16]/20 z-20 whitespace-nowrap cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900/50 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Build with Purpose Nurture to Impact</span>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 max-w-4xl mx-auto px-4 text-sm md:text-base lg:text-lg font-medium tracking-wide"
      >
        BanavatNest Pvt. Ltd. — where research meets prototypes and prototypes move toward real-world impact
      </motion.div>
    </>
  );
}
