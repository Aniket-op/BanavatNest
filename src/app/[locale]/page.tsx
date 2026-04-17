'use client';

import { motion } from 'framer-motion';
import FluidCursor from '@/components/FluidCursor';
import HeroSection from '@/components/homepage/HeroSection';
import StorySection from '@/components/homepage/StorySection';
import CoreDomainsSection from '@/components/homepage/CoreDomainsSection';
import CaseStudiesSection from '@/components/homepage/CaseStudiesSection';
import ProcessSection from '@/components/homepage/ProcessSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import FinalCTASection from '@/components/homepage/FinalCTASection';

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
  return (
    <div className="relative pt-20">
      <FluidCursor />

      {/* 1. Hero — Nurturing. Building. Impact. */}
      {/* Excluded from wrapper to allow its custom immediate load animations */}
      <HeroSection />

      <FadeInSection>
        {/* 2. Story — The Gap + Why BanavatNest (USP) */}
        <StorySection />
      </FadeInSection>

      <FadeInSection>
        {/* 3. Core Domains — What we research */}
        <CoreDomainsSection />
      </FadeInSection>

      <FadeInSection>
        {/* 4. Process — How we work */}
        <ProcessSection />
      </FadeInSection>

      {/* <FadeInSection> */}
      {/* 5. Case Studies — Proof of impact */}
      {/* <CaseStudiesSection /> */}
      {/* </FadeInSection> */}

      <FadeInSection>
        {/* 6. Testimonials — Trust signals */}
        <TestimonialsSection />
      </FadeInSection>

      <FadeInSection>
        {/* 7. Final CTA — Ready to build with Purpose?
        <FinalCTASection /> */}

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pb-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
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
    </div>
  );
};

export default Home;
