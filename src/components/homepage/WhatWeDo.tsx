'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Microscope, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DomainCarousel from '@/components/DomainCarousel';

const usps = [
  {
    emoji: '🚀',
    title: 'Prototype Development',
    color: '#F59E0B',
  },
  {
    emoji: '🔗',
    title: 'Academia ↔ Industry Bridge',
    color: '#3B82F6',
  },
  {
    emoji: '🧠',
    title: 'AI & Intelligent Systems',
    color: '#8B5CF6',
  },
  {
    emoji: '⚙️',
    title: 'Scalable Solutions',
    color: '#10B981',
  },
  {
    emoji: '🎯',
    title: 'Customized Problem Solving',
    color: '#EF4444',
  },
  {
    emoji: '🏥',
    title: 'Smart Healthcare Systems',
    color: '#EC4899',
  },
  {
    emoji: '🌾',
    title: 'Precision Agriculture',
    color: '#84CC16',
  },
];

const workSteps = [
  { title: 'Idea', emoji: '💡', color: '#84CC16' },
  { title: 'Design', emoji: '🎨', color: '#3B82F6' },
  { title: 'Prototype', emoji: '🛠️', color: '#F59E0B' },
  { title: 'Deployment', emoji: '🚀', color: '#10B981' },
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

  const rotationStep = 360 / usps.length;

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setTotalRotation((prev) => prev - rotationStep);
      setActiveUspIndex((prev) => (prev + 1) % usps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isManual, rotationStep]);

  const handleNext = () => {
    setTotalRotation((prev) => prev - rotationStep);
    setActiveUspIndex((prev) => (prev + 1) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const handlePrev = () => {
    setTotalRotation((prev) => prev + rotationStep);
    setActiveUspIndex((prev) => (prev - 1 + usps.length) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const goToSlide = (idx: number) => {
    const currentCycle = Math.round(totalRotation / 360);
    const targetRotation = currentCycle * 360 - idx * rotationStep;

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
    <section className="py-12 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
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

        <div className="relative grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-12 items-stretch">

          {/* Left Division: Our Domains */}
          <div className="flex flex-col h-full w-full relative z-10 lg:pr-8">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-10 text-center lg:text-left">
              Our Core <span className="text-[#84CC16]">Domains</span>
            </h2>
            <div className="-mx-4 sm:mx-0">
              <DomainCarousel items={domains} />
            </div>
          </div>

          {/* Right Division: What We Do & How We Work */}
          <div className="flex flex-col w-full relative z-10 lg:pl-10 border-l border-zinc-200 dark:border-zinc-800/50">
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4 text-center lg:text-left">
              What We <span className="text-[#84CC16]">Do</span>
            </h2>

            <div className="relative w-full h-[650px] flex items-center justify-center mb-6" style={{ perspective: '2000px' }}>
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
                  position: 'relative',
                  willChange: 'transform'
                }}
              >
                {usps.map((usp, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `rotateX(${index * rotationStep}deg) translateZ(260px)`,
                      backfaceVisibility: 'hidden',
                      pointerEvents: index === activeUspIndex ? 'auto' : 'none',
                      opacity: Math.abs(((totalRotation / -rotationStep) % usps.length + usps.length) % usps.length - index) < 0.5 ? 1 : 0.2,
                      transition: 'opacity 0.4s ease, transform 0.4s ease'
                    }}
                  >
                    <div className="w-full max-w-[220px] bg-white dark:bg-zinc-950 p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col items-center text-center group antialiased">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md mb-3 transform transition-transform group-hover:scale-110"
                        style={{ backgroundColor: usp.color }}
                      >
                        {usp.emoji}
                      </div>
                      <h4 className="text-sm md:text-base font-black text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight">
                        {usp.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Vertical Navigation Controls */}
              <div className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 hidden xl:flex">
                <button
                  onClick={handlePrev}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110 hover:border-[#84CC16]"
                  aria-label="Previous Text"
                >
                  <ChevronUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>

                <div className="flex flex-col gap-2">
                  {usps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`w-1.5 rounded-full mx-auto transition-all duration-300 ${idx === activeUspIndex
                        ? 'h-6 bg-[#84CC16]'
                        : 'h-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                        }`}
                      aria-label={`Go to USP ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110 hover:border-[#84CC16]"
                  aria-label="Next Text"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>
            </div>

            {/* How We Work Section */}
            {/* 
            <div className="mt-12 relative w-full flex flex-col items-center lg:items-start">
              <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-8 text-center lg:text-left">
                How We <span className="text-[#84CC16]">Work</span>
              </h3>
              <div className="pl-20 grid grid-cols-2 gap-x-2 gap-y-6 relative w-full max-w-[290px] mx-auto lg:mx-0">
                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#84CC16]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[0].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[0].title}</div>
                  </div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#84CC16]/60 text-base hidden sm:block">→</div>
                </div>

                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#84CC16]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[1].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[1].title}</div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 text-[#84CC16]/60 text-base hidden sm:block">↓</div>
                </div>

                <div className="relative group flex flex-col order-last sm:order-none">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#84CC16]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[3].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[3].title}</div>
                  </div>
                </div>

                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#84CC16]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[2].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[2].title}</div>
                  </div>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[#84CC16]/60 text-base hidden sm:block">←</div>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}

