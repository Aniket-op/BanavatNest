'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Microscope, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DomainCarousel from '@/components/DomainCarousel';

const usps = [
  {
    number: '01',
    title: 'We translate research into products',
    desc: 'Not just consulting — we take academic breakthroughs from whiteboard to working prototype to real deployment.',
    color: '#84CC16',
  },
  {
    number: '02',
    title: 'Structured collaboration framework',
    desc: 'A defined 4-stage process with milestone tracking, joint supervision, and IP clarity — not ad-hoc engagements.',
    color: '#3B82F6',
  },
  {
    number: '03',
    title: 'Four high-impact domains',
    desc: 'AI/ML, Cybersecurity, Smart Systems, and Agriculture — domains chosen for scalability and industry demand.',
    color: '#8B5CF6',
  },
  {
    number: '04',
    title: 'Proven by deployment, not just papers',
    desc: 'Our success metric isn\'t citations — it\'s live systems, technology transfers, and industry adoption.',
    color: '#10B981',
  },
];

export default function WhatWeDo() {
  const t = useTranslations('home');

  const domains = [
    {
      title: t('domainAiTitle'),
      url: '/images/homepage/Ai.jpg',
      desc: t('domainAiDesc'),
      icon: <Brain className="w-7 h-7" />,
      accent: 'from-[#84CC16] to-cyan-500',
      iconGradient: 'from-blue-500 to-cyan-400',
      href: '/what-we-do/domains/ai-ml-data-science',
    },
    {
      title: t('domainCyberTitle'),
      url: '/images/homepage/cyberSecure.jpg',
      desc: t('domainCyberDesc'),
      icon: <Shield className="w-7 h-7" />,
      accent: 'from-emerald-500 to-[#84CC16]',
      iconGradient: 'from-green-500 to-emerald-400',
      href: '/what-we-do/domains/cybersecurity-iot-blockchain',
    },
    {
      title: t('domainSmartTitle'),
      url: '/images/homepage/Our-Vision.png',
      desc: t('domainSmartDesc'),
      icon: <Microscope className="w-7 h-7" />,
      accent: 'from-purple-500 to-pink-500',
      iconGradient: 'from-purple-500 to-pink-400',
      href: '/what-we-do/domains/smart-systems-healthcare-sustainability',
    },
    {
      title: t('domainAgriTitle'),
      url: '/images/homepage/Prototype-image.png',
      desc: t('domainAgriDesc'),
      icon: <Zap className="w-7 h-7" />,
      accent: 'from-amber-500 to-[#84CC16]',
      iconGradient: 'from-lime-500 to-yellow-600',
      href: '/what-we-do/domains/agriculture-smart-farming',
    },
  ];

  const [activeUspIndex, setActiveUspIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setTotalRotation((prev) => prev - 90);
      setActiveUspIndex((prev) => (prev + 1) % usps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isManual]);

  const handleNext = () => {
    setTotalRotation((prev) => prev - 90);
    setActiveUspIndex((prev) => (prev + 1) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const handlePrev = () => {
    setTotalRotation((prev) => prev + 90);
    setActiveUspIndex((prev) => (prev - 1 + usps.length) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const goToSlide = (idx: number) => {
    // Determine shortest path for rotation
    const currentCycle = Math.round(totalRotation / 360);
    const targetRotation = currentCycle * 360 - idx * 90;

    // Adjust if target is too far (ensure it doesn't spin wildly)
    let finalRotation = targetRotation;
    if (Math.abs(finalRotation - totalRotation) > 180) {
      if (finalRotation > totalRotation) finalRotation -= 360;
      else finalRotation += 360;
    }

    setTotalRotation(finalRotation);
    setActiveUspIndex(idx);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-12 items-center lg:items-start min-h-[600px]">

          {/* Glowing Division Line */}
          <div className="bg-[#84CC16] lg:block hidden absolute left-[60%] top-[20%] bottom-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#84CC16] to-transparent opacity-80 shadow-[0_0_15px_rgba(132,204,22,0.8)] z-0" />

          {/* Left Division: Our Domains */}
          <div className="flex flex-col h-full w-full relative z-10 lg:pr-12 gap-10">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-5">
              Our <span className="text-[#84CC16]">Domain</span>
            </h2>
            <div className="-mx-4 sm:mx-0 flex-1 flex items-center">
              <DomainCarousel items={domains} />
            </div>
          </div>

          {/* Right Division: What We Do (Vertical Unified Cube) */}
          <div className="flex flex-col h-full w-full relative z-10 lg:pl-12">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-5">
              What We <span className="text-[#84CC16]">Do</span>
            </h2>

            <div className="relative w-full h-[520px] flex items-center justify-center pt-8" style={{ perspective: '2000px' }}>

              <motion.div
                animate={{ rotateX: totalRotation }}
                transition={{
                  type: 'spring',
                  stiffness: 60,
                  damping: 20,
                  mass: 1.2
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {usps.map((usp, index) => (
                  <div
                    key={usp.number}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `rotateX(${index * 90}deg) translateZ(260px)`,
                      backfaceVisibility: 'hidden',
                      pointerEvents: index === activeUspIndex ? 'auto' : 'none',
                      opacity: Math.abs(((totalRotation / -90) % 4 + 4) % 4 - index) < 0.5 ? 1 : 0.4,
                      transition: 'opacity 0.5s ease'
                    }}
                  >
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900/60 p-10 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-sm">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg mb-8"
                        style={{ backgroundColor: usp.color }}
                      >
                        {usp.number}
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4 leading-tight tracking-tight">
                        {usp.title}
                      </h4>
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        {usp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Vertical Navigation Controls */}
              <div className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30 hidden sm:flex">
                <button
                  onClick={handlePrev}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white/50 hover:bg-white dark:bg-zinc-800/50 dark:hover:bg-zinc-700 shadow border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110"
                  aria-label="Previous Text"
                >
                  <ChevronUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>

                <div className="flex flex-col gap-3">
                  {usps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`w-2 rounded-full mx-auto transition-all duration-300 ${idx === activeUspIndex
                        ? 'h-8'
                        : 'h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                        }`}
                      style={{ backgroundColor: idx === activeUspIndex ? usps[idx].color : undefined }}
                      aria-label={`Go to USP ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white/50 hover:bg-white dark:bg-zinc-800/50 dark:hover:bg-zinc-700 shadow border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110"
                  aria-label="Next Text"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

