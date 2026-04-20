'use client';

import { motion } from 'framer-motion';
import FluidCursor from '@/components/FluidCursor';
import HeroSection from '@/components/homepage/HeroSection';
import WhatWeDo from '@/components/homepage/WhatWeDo';
import WhatWeServe from '@/components/homepage/WhatWeServe';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import InfiniteUpdateBar from '@/components/InfiniteUpdateBar';
import { useTranslations } from 'next-intl';

const FadeInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const t = useTranslations('home');
  const updates = [
    {
      title: t('updateTitle'),
      route: "/",
    },
    {
      title: t('updateTitle2'),
      route: "https://sites.google.com/thapar.edu/roft2026",
    }
  ];

  return (
    <>
      <FadeInSection>
        <div className="relative pt-20">
          <FluidCursor />

          <div className="w-full relative z-30 mb-2">
            <InfiniteUpdateBar updates={updates} />
          </div>

          {/* 1. Hero — Nurturing. Building. Impact. */}
          <HeroSection />
        </div>
      </FadeInSection>

      <FadeInSection>
        <WhatWeDo />
      </FadeInSection>

      <FadeInSection>
        <WhatWeServe />
      </FadeInSection>

      {/* <FadeInSection>
        <TestimonialsSection />
      </FadeInSection> */}

      <FadeInSection>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className=" flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Ready to start your collaboration journey?
          </p>
          <a
            href="/contact"
            className="text-sm font-black text-[#84CC16] hover:underline underline-offset-4 transition-all"
          >
            Contact us →
          </a>
        </motion.div>
      </FadeInSection>
    </>
  );
};

export default Home;
