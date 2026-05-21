"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "@/i18n/navigation";
import ImageCarousel from "@/components/ImageCarousel";
import { useTranslations } from "next-intl";

const ResearchIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-rd" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.35" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
      <filter id="glow-rd">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Glassy backdrop */}
    <circle cx="50" cy="50" r="38" fill={`url(#grad-rd)`} />
    {/* Orbital ring */}
    <circle
      cx="50"
      cy="50"
      r="44"
      stroke={color}
      strokeWidth="0.5"
      strokeDasharray="5 9"
      opacity="0.3"
    />
    {/* Orbiting particle */}
    <motion.circle
      cx="50"
      cy="6"
      r="3"
      fill={color}
      filter="url(#glow-rd)"
      animate={{ cx: [50, 94, 50, 6, 50], cy: [6, 50, 94, 50, 6] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
    {/* Microscope body */}
    <rect
      x="42"
      y="55"
      width="16"
      height="22"
      rx="2"
      fill="white"
      fillOpacity="0.08"
      stroke={color}
      strokeWidth="1.5"
    />
    <rect
      x="46"
      y="50"
      width="8"
      height="8"
      rx="1"
      fill={color}
      fillOpacity="0.4"
    />
    {/* Eyepiece */}
    <motion.g
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle
        cx="50"
        cy="42"
        r="7"
        fill="white"
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="50" cy="42" r="3" fill={color} fillOpacity="0.6" />
    </motion.g>
    {/* Base */}
    <path
      d="M36 77H64"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.8"
    />
    <rect
      x="44"
      y="74"
      width="12"
      height="4"
      rx="1"
      fill={color}
      fillOpacity="0.5"
    />
    {/* Data dots pulsing */}
    <motion.circle
      cx="25"
      cy="35"
      r="2.5"
      fill={color}
      animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    />
    <motion.circle
      cx="75"
      cy="30"
      r="2"
      fill={color}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    />
    <motion.circle
      cx="20"
      cy="60"
      r="2"
      fill={color}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
    />
    <path
      d="M25 35L50 42M75 30L50 42"
      stroke={color}
      strokeWidth="0.8"
      strokeDasharray="3 4"
      opacity="0.4"
    />
  </svg>
);

export default function ResearchAndDevelopmentPage() {
  const t = useTranslations("focusRdPage");
  const tNav = useTranslations("readMore");

  const POINTS = [
    { heading: t("summaryHeading"), content: t("summaryContent") },
    { heading: t("h2"), content: t("p2") },
    { heading: t("h3"), content: t("p3") },
    { heading: t("h4"), content: t("p4") },
    { heading: t("h5"), content: t("p5") },
  ];

  return (
    <PageWrapper>
      <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/what-we-do/focus"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#3A9B9B] transition-colors mb-12 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {tNav("backToFocusAreas")}
          </Link>

          {/* ═══════════════ UPPER ROW ═══════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden
                                    border-2 border-[#3A9B9B]/20
                                    bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                                    dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                                    backdrop-blur-sm shadow-lg mb-12"
          >
            {/* Decorative gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

            <div className="grid md:grid-cols-2 gap-0 items-start">
              {/* LEFT: Heading + Illustration */}
              <div className="px-6 md:px-14 py-10 md:py-20">
                {/* Illustration */}
                <div className="w-32 h-32">
                  <ResearchIllustration color="#3A9B9B" />
                </div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight
                                               bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]
                                               dark:from-white dark:via-[#3A9B9B] dark:to-white
                                               bg-clip-text text-transparent mb-4"
                >
                  {t("pageTitle")}
                </motion.h1>

                {/* Divider */}
                <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
              </div>

              {/* RIGHT: Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] p-6 md:p-8"
              >
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex items-center justify-center">
                  <ImageCarousel
                    images={["/images/homepage/Key-Domains.png"]}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══════════════ LOWER ROW — Content Cards ═══════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {POINTS.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-3xl md:rounded-[2rem] overflow-hidden
                                            border-2 border-[#3A9B9B]/15
                                            bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                                            dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                                            backdrop-blur-sm shadow-lg
                                            hover:shadow-xl hover:border-[#3A9B9B]/30
                                            transition-all duration-500"
              >
                {/* Decorative gradient line at top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

                <div className="px-6 md:px-8 py-10 md:py-12">
                  {/* Card number badge */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A9B9B]/20 to-[#2D3561]/10 flex items-center justify-center mb-5 border border-[#3A9B9B]/20">
                    <span className="text-sm font-black text-[#3A9B9B]">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Heading */}
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                    className="text-xl md:text-2xl font-black tracking-tight
                                                   bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]
                                                   dark:from-white dark:via-[#3A9B9B] dark:to-white
                                                   bg-clip-text text-transparent mb-4"
                  >
                    {point.heading}
                  </motion.h3>

                  {/* Divider */}
                  <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-5 group-hover:w-20 transition-all duration-500" />

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed"
                  >
                    {point.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
