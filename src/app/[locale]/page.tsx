"use client";

import { motion } from "framer-motion";
import FluidCursor from "@/components/FluidCursor";
import HeroSection from "@/components/homepage/HeroSection";
import WhatWeDo from "@/components/homepage/WhatWeDo";
import WhatWeServe from "@/components/homepage/WhatWeServe";
import FeaturedInnovations from "@/components/homepage/FeaturedInnovations";
import NewsEvents from "@/components/homepage/NewsEvents";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import InfiniteUpdateBar from "@/components/InfiniteUpdateBar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
  const t = useTranslations("home");
  const updates = [
    {
      title: "Advisory Board Announcements — Stay Tuned",
      route: "https://www.linkedin.com/feed/update/urn:li:activity:7462725911419883521",
    },
    {
      title: "BanavatNest Pvt. Ltd. welcomes participants to the 5-day Research Methodology Workshop",
      route: "https://www.linkedin.com/feed/update/urn:li:activity:7464158390064267264",
    },
    {
      title: "Deployment site finalized for the fisheries project.",
      route: "https://www.linkedin.com/feed/update/urn:li:activity:7454019410836754432",
    },
  ];

  return (
    <>
      <FadeInSection>
        <div className="relative pt-20">
          <FluidCursor />
          <div className="w-full relative z-30 ">
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

      <FadeInSection>
        <FeaturedInnovations />
      </FadeInSection>

      <FadeInSection>
        <NewsEvents />
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
            {t('readyToStart')}
          </p>
          <Link
            href="/contact"
            className="text-sm font-black text-[#3A9B9B] hover:underline underline-offset-4 transition-all"
          >
            {t('contactUs')}
          </Link>
        </motion.div>
      </FadeInSection>
    </>
  );
};

export default Home;
