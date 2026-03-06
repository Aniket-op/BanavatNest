'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Brain, Shield, Zap, Microscope } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DomainCarousel from '@/components/DomainCarousel';
import InfiniteUpdateBar from '@/components/InfiniteUpdateBar';
import FluidCursor from '@/components/FluidCursor';

const Home = () => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, 30]);
  const t = useTranslations('home');

  const domains = [
    {
      title: t('domainAiTitle'),
      url: '/images/homepage/Ai.jpg',
      desc: t('domainAiDesc'),
      icon: <Brain className="w-7 h-7" />,
      accent: 'from-[#84CC16] to-cyan-500',
      iconGradient: 'from-blue-500 to-cyan-400',
    },
    {
      title: t('domainCyberTitle'),
      url: '/images/homepage/cyberSecure.jpg',
      desc: t('domainCyberDesc'),
      icon: <Shield className="w-7 h-7" />,
      accent: 'from-emerald-500 to-[#84CC16]',
      iconGradient: 'from-green-500 to-emerald-400',
    },
    {
      title: t('domainSmartTitle'),
      url: '/images/homepage/smart.jpg',
      desc: t('domainSmartDesc'),
      icon: <Microscope className="w-7 h-7" />,
      accent: 'from-purple-500 to-pink-500',
      iconGradient: 'from-purple-500 to-pink-400',
    },
    {
      title: t('domainAgriTitle'),
      url: '/images/homepage/agriculture.jpg',
      desc: t('domainAgriDesc'),
      icon: <Zap className="w-7 h-7" />,
      accent: 'from-amber-500 to-[#84CC16]',
      iconGradient: 'from-lime-500 to-yellow-600',
    },
  ];

  const updates = [
    {
      title: t('updateTitle'),
      route: "/",
    },
    {
      title: t('updateTitle2'),
      route: "/",
    },
  ];

  return (
    <div className="relative pt-20">
      <FluidCursor />

      {/* Infinite Update Bar positioned below fixed navbar */}
      <div className="relative z-30 bg-zinc-50 dark:bg-[#09090b]">
        <InfiniteUpdateBar updates={updates} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden grid-bg pt-12 pb-24 md:pt-12 md:pb-10 dark:bg-[#09090b]">
        <div className="hidden dark:block">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-[15%] right-[5%] w-[35rem] h-[35rem] bg-[#84CC16]/10 blur-[130px] rounded-full pointer-events-none"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-lime-50 dark:bg-lime-900/10 border border-lime-100/50 dark:border-lime-500/20 mb-10 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#84CC16] animate-pulse"></span>
            <span className="text-[10px] font-black text-[#65A30D] dark:text-[#84CC16] uppercase tracking-[0.2em]">
              {t('badge')}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl lg:text-[80px] font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-[0.9] mb-12"
              >
                {t('heroTitle1')} <br />
                <span className="text-zinc-500 dark:text-zinc-500">
                  {t('heroTitle2')}
                </span>{" "}
                <br />
                {t('heroTitle3')} <br />
                <span className="text-[#84CC16]">{t('heroTitle4')}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed mb-14 max-w-xl"
              >
                {t('heroDesc')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <Link
                  href="/what-we-do/focus"
                  className="bg-[#5D3A1A] text-white px-10 py-5 rounded-full font-black text-lg hover:bg-[#4B2C13] transition-all shadow-xl flex items-center justify-center hover:scale-[1.03] active:scale-95 group"
                >
                  {t('ctaWhatWeDo')}{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/bridge/collaboration"
                  className="border-2 border-zinc-900 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 px-10 py-5 rounded-full font-black text-lg hover:bg-zinc-900 dark:hover:bg-zinc-700 hover:text-white transition-all flex items-center justify-center hover:scale-[1.03] active:scale-95"
                >
                  {t('ctaBridge')}
                </Link>
              </motion.div>
            </div>
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[120%]"
            >
              <DomainCarousel items={domains} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
