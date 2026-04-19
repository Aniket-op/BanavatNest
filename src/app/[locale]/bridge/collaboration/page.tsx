'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, ArrowRight, GraduationCap, Factory, Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';
import collaboration_logo from "@/../public/images/collabaration_logo.png";

export default function CollaborationPage() {
    const t = useTranslations('collaboration');
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 4);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const collaborationTracks = [
        {
            key: 'academic',
            emoji: '🎓',
            icon: GraduationCap,
            color: '#84CC16',
            bg: 'bg-[#F7FEE7] dark:bg-[#1a2a06]',
        },
        {
            key: 'industry',
            emoji: '🏭',
            icon: Factory,
            color: '#8B5CF6',
            bg: 'bg-[#F5F3FF] dark:bg-[#1e1040]',
        },
        {
            key: 'startup',
            emoji: '🚀',
            icon: Rocket,
            color: '#3B82F6',
            bg: 'bg-[#EFF6FF] dark:bg-[#0f1e3d]',
        }
    ];

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col text-left"
                            >
                                <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-zinc-100 mb-8 leading-tight tracking-tighter">
                                    {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                                </h1>
                                <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                                    {t('subtitle')}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative flex justify-center lg:justify-end"
                            >
                                {/* Glow backdrop */}
                                <div className="absolute inset-0 bg-[#84CC16]/10 blur-[100px] rounded-full" />
                                <Image
                                    src={collaboration_logo}
                                    alt="Collaboration"
                                    width={550}
                                    height={550}
                                    className="relative z-10 transition-all duration-700 drop-shadow-2xl"
                                />
                            </motion.div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {collaborationTracks.map((track, idx) => {
                            // Extract items from translations
                            // Note: next-intl lists might be tricky if not defined as an array in json
                            // But I defined them as objects in an array in en.json
                            const items = t.raw(`${track.key}.items`) as { heading: string, desc: string }[];
                            const currentItem = items[activeIndex];
                            const Icon = track.icon;

                            return (
                                <motion.div
                                    key={track.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group relative h-[500px]"
                                >
                                    <motion.div
                                        whileHover={{
                                            boxShadow: `0 40px 80px -16px ${track.color}40`,
                                            y: -8,
                                            borderColor: `${track.color}80`
                                        }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        style={{
                                            borderTopColor: track.color,
                                            boxShadow: `0 20px 40px -12px ${track.color}20`,
                                            borderColor: `${track.color}40`
                                        }}
                                        className={`relative rounded-[2.5rem] ${track.bg} border border-t-8 p-10 h-full overflow-hidden flex flex-col items-center text-center backdrop-blur-sm shadow-xl`}
                                    >
                                        {/* Background Glow */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                                            style={{
                                                background: `radial-gradient(circle at top, ${track.color}15, transparent 70%)`
                                            }}
                                        />

                                        {/* Header */}
                                        <div className="relative z-10 flex flex-col items-center mb-8">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-4xl">{track.emoji}</span>
                                                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900/60 dark:text-zinc-100/40">
                                                    {t(`${track.key}.title`)}
                                                </span>
                                            </div>

                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                                                style={{ backgroundColor: `${track.color}20`, color: track.color }}>
                                                <Icon size={32} />
                                            </div>
                                        </div>

                                        {/* Rotating Content */}
                                        <div className="relative z-10 flex-grow w-full flex flex-col justify-center">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`${track.key}-${activeIndex}`}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                                >
                                                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 min-h-[60px] flex items-center justify-center">
                                                        {currentItem.heading}
                                                    </h3>
                                                    <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                        {currentItem.desc}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {/* Progress Dots */}
                                        <div className="relative z-10 flex justify-center gap-2 mt-8">
                                            {[0, 1, 2, 3].map((dot) => (
                                                <motion.div
                                                    key={dot}
                                                    className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                                                    animate={{
                                                        width: dot === activeIndex ? 24 : 6,
                                                        backgroundColor: dot === activeIndex ? track.color : undefined
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 backdrop-blur-md max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#84CC16]/10 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#84CC16]/5 blur-[60px] rounded-full" />

                        <div className="relative z-10 space-y-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                            <p className="border-l-4 border-[#84CC16] pl-6 py-2 italic text-zinc-900 dark:text-zinc-100">
                                {t('bodyP1')}
                            </p>
                            <p className="border-l-4 border-zinc-200 dark:border-zinc-700 pl-6 py-2">
                                {t('bodyP2')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    );
}

