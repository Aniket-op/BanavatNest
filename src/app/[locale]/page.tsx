'use client';

import FluidCursor from '@/components/FluidCursor';
import HeroSection from '@/components/homepage/HeroSection';
import StorySection from '@/components/homepage/StorySection';
import CoreDomainsSection from '@/components/homepage/CoreDomainsSection';
import CaseStudiesSection from '@/components/homepage/CaseStudiesSection';
import ProcessSection from '@/components/homepage/ProcessSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import FinalCTASection from '@/components/homepage/FinalCTASection';

const Home = () => {
  return (
    <div className="relative pt-20">
      <FluidCursor />

      {/* 1. Hero — Nurturing. Building. Impact. */}
      <HeroSection />

      {/* 2. Story — The Gap + Why BanavatNest (USP) */}
      <StorySection />

      {/* 3. Core Domains — What we research */}
      <CoreDomainsSection />

      {/* 4. Process — How we work */}
      <ProcessSection />

      {/* 5. Case Studies — Proof of impact */}
      <CaseStudiesSection />

      {/* 6. Testimonials — Trust signals */}
      <TestimonialsSection />

      {/* 7. Final CTA — Ready to build with Purpose? */}
      <FinalCTASection />
    </div>
  );
};

export default Home;
