'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import React from 'react';

// ── 3D Card Wrapper ──
const Card3D = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.14);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[3rem] overflow-hidden z-30"
        style={{
          opacity: glareOpacity,
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 65%)`,
        }}
      />
    </motion.div>
  );
};

export default function FacultyEngagementPage() {
    const t = useTranslations('facultyPage');

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl text-left">
                            <h1 className="text-6xl md:text-8xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 leading-tight tracking-tighter">
                                {t('title')} <span className="text-[#3A9B9B]">{t('titleHighlight')}</span>
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div style={{ perspective: '1200px' }}>
                    <Card3D>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

                        <div className="flex items-start gap-8 relative z-10">
                            <div className="hidden md:flex w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-3xl items-center justify-center shrink-0">
                                <Briefcase className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none font-medium text-gray-600 dark:text-zinc-300">
                                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-6">
                                    {t('heading')}
                                </p>
                                <p className="mb-6">
                                    {t('bodyP1')}
                                </p>
                                <p>
                                    {t('bodyP2')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    </Card3D>
                </div>
                </div>
            </div>
        </PageWrapper>
    );
}
