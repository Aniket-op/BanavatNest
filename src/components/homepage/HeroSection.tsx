'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative w-full max-w-7xl mx-auto overflow-hidden bg-[#FAFAF7] dark:bg-[#0C0C0A] flex flex-col" style={{ minHeight: '30vh' }}
    >
      {/* ────────────────────────────────────────────
          BACKGROUND — dot grid overlay
      ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4c9b0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.18,
        }}
      />
      {/* dark mode glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="hidden dark:block absolute top-[15%] right-[22%] w-[560px] h-[560px] rounded-full bg-[#84CC16]/10 blur-[160px] pointer-events-none"
      />
      {/* ────────────────────────────────────────────
          MAIN CONTENT GRID
      ──────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-none py-25">

        {/* ── LEFT: TEXT ── */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-12 pb-16 lg:py-0">

          {/* Tagline chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="inline-flex self-start items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-10 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.22em]">
              Academia–Industry Ecosystem
            </span>
          </motion.div>

          {/* Headline — revealed line by line */}
          {['Build with', 'Purpose', 'Nurture to', 'Impact'].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.28 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`font-black tracking-[-0.045em] leading-[0.86] mb-1 text-[clamp(2rem,5vw,5rem)] ${i === 1 ? 'text-zinc-500' : i === 2 ? 'text-[#84CC16]' : 'text-zinc-900 dark:text-zinc-50'
                  }`}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          {/* Divider + subtext */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 mb-10"
          >
            <div className="w-12 h-0.5 bg-zinc-300 dark:bg-zinc-700 mb-7" />
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-[1.75] max-w-[420px]">
              We connect <span className="text-zinc-800 dark:text-zinc-200 font-semibold">university researchers</span> with{' '}
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">industry challenges</span> — turning ideas into
              scalable, real-world solutions.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <Link
              href="/bridge/collaboration"
              id="hero-cta-primary"
              className="group inline-flex items-center gap-2.5 bg-[#5D3A1A] dark:bg-zinc-100 text-white dark:text-zinc-900 pl-6 pr-2 py-2 rounded-full font-black text-sm hover:bg-[#4B2C13] dark:hover:bg-zinc-200 transition-all duration-300 shadow-[0_6px_24px_rgba(93,58,26,0.32)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(93,58,26,0.42)]"
            >
              Explore our Partnerships
              <span className="w-8 h-8 rounded-full bg-white/15 dark:bg-black/10 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
            <Link
              href="/what-we-do/domains"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-1.5 text-sm font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
            >
              See our Domain Impact
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center divide-x divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden w-fit bg-white dark:bg-zinc-900/50 shadow-sm"
          >
            {[
              { v: '20+', l: 'Research Papers' },
              { v: '4', l: 'Core Domains' },
              { v: '8+', l: 'Live Projects' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col items-center px-6 py-3.5">
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{s.v}</span>
                <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.14em] mt-0.5 whitespace-nowrap">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: ILLUSTRATION ── */}
        <div className="absolute lg:relative right-0 sm:right-4 top-[15%] sm:top-[20%] lg:top-auto w-[55%] sm:w-[45%] lg:w-full flex items-start lg:items-center justify-center overflow-visible pb-16 lg:pb-0 z-0 lg:z-10">
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[640px] xl:max-w-[700px] mx-auto px-2 lg:px-8 mt-4 lg:mt-0"
          >
            {/* Floating pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="hidden lg:block absolute -top-4 left-4 sm:left-12 z-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-4 py-2.5 shadow-lg"
            >
              <p className="text-[8px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-0.5">Side A</p>
              <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 leading-none">Academia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="hidden lg:block absolute -top-4 right-4 sm:right-12 z-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-4 py-2.5 shadow-lg"
            >
              <p className="text-[8px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-0.5">Side B</p>
              <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 leading-none">Industry</p>
            </motion.div>

            {/* Illustration with edge fades */}
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none" />
              <Image
                src="/images/HomePageImage.png"
                alt="Academia to Industry bridge — BanavatNest collaborative ecosystem"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* "Bridge" pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="hidden lg:inline-flex absolute -bottom-3 left-1/2 -translate-x-1/2 items-center gap-2 bg-[#84CC16] text-zinc-900 px-5 py-2 rounded-full shadow-lg z-20 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900/30" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">The BanavatNest Bridge</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SCROLL INDICATOR
      ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="relative z-20 flex flex-col items-center gap-2 pb-8 self-center"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-zinc-300 dark:from-zinc-700 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
