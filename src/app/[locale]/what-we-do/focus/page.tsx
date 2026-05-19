'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Code2, Users2, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import React from 'react';

// ── Domain SVG Illustrations ──

const ResearchIllustration = ({ color }: { color: string }) => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
            <linearGradient id="grad-rd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow-rd"><feGaussianBlur stdDeviation="2" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
        </defs>
        {/* Glassy backdrop */}
        <circle cx="50" cy="50" r="38" fill={`url(#grad-rd)`} />
        {/* Orbital ring */}
        <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="0.5" strokeDasharray="5 9" opacity="0.3" />
        {/* Orbiting particle */}
        <motion.circle cx="50" cy="6" r="3" fill={color} filter="url(#glow-rd)"
            animate={{ cx: [50, 94, 50, 6, 50], cy: [6, 50, 94, 50, 6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />
        {/* Microscope body */}
        <rect x="42" y="55" width="16" height="22" rx="2" fill="white" fillOpacity="0.08" stroke={color} strokeWidth="1.5" />
        <rect x="46" y="50" width="8" height="8" rx="1" fill={color} fillOpacity="0.4" />
        {/* Eyepiece */}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <circle cx="50" cy="42" r="7" fill="white" fillOpacity="0.1" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="42" r="3" fill={color} fillOpacity="0.6" />
        </motion.g>
        {/* Base */}
        <path d="M36 77H64" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <rect x="44" y="74" width="12" height="4" rx="1" fill={color} fillOpacity="0.5" />
        {/* Data dots pulsing */}
        <motion.circle cx="25" cy="35" r="2.5" fill={color} animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        <motion.circle cx="75" cy="30" r="2" fill={color} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
        <motion.circle cx="20" cy="60" r="2" fill={color} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
        <path d="M25 35L50 42M75 30L50 42" stroke={color} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
    </svg>
);

const PrototypingIllustration = ({ color }: { color: string }) => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
            <linearGradient id="grad-proto" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#grad-proto)" />
        {/* Code brackets */}
        <motion.g animate={{ x: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M28 38L18 50L28 62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g animate={{ x: [2, -2, 2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M72 38L82 50L72 62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {/* Code lines */}
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
            <rect x="35" y="42" width="20" height="2.5" rx="1.2" fill={color} fillOpacity="0.7" />
            <rect x="35" y="49" width="30" height="2.5" rx="1.2" fill={color} fillOpacity="0.5" />
            <rect x="35" y="56" width="15" height="2.5" rx="1.2" fill={color} fillOpacity="0.7" />
        </motion.g>
        {/* Rotating gear top-right */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ originX: '76px', originY: '24px' }}>
            <circle cx="76" cy="24" r="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
            <circle cx="76" cy="24" r="3" fill="white" fillOpacity="0.8" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
                <path key={a} d="M76 13.5V17" stroke={color} strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 76 24)`} />
            ))}
        </motion.g>
        {/* Flowing circuit line */}
        <path d="M20 75H45V65H55V75H80" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <motion.circle r="2.5" fill={color}
            animate={{ cx: [20, 45, 45, 55, 55, 80], cy: [75, 75, 65, 65, 75, 75] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatType: 'loop' }} />
    </svg>
);

const AcademiaIllustration = ({ color }: { color: string }) => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
            <linearGradient id="grad-acad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#grad-acad)" />
        {/* Network nodes */}
        <motion.circle cx="50" cy="28" r="5" fill={color} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="28" cy="62" r="5" fill={color} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        <motion.circle cx="72" cy="62" r="5" fill={color} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
        {/* Connecting lines with animated dashes */}
        <motion.path d="M50 33L28 57" stroke={color} strokeWidth="1.5" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
        <motion.path d="M50 33L72 57" stroke={color} strokeWidth="1.5" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }} />
        <motion.path d="M33 62L67 62" stroke={color} strokeWidth="1.5" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1 }} />
        {/* Central hub orbit ring */}
        <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="0.4" strokeDasharray="3 8" opacity="0.25" />
        <motion.circle cx="50" cy="8" r="2.5" fill={color} fillOpacity="0.6"
            animate={{ cx: [50, 92, 50, 8, 50], cy: [8, 50, 92, 50, 8] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />
        {/* People icons */}
        <circle cx="50" cy="24" r="3.5" fill="white" fillOpacity="0.9" />
        <circle cx="28" cy="58" r="3.5" fill="white" fillOpacity="0.9" />
        <circle cx="72" cy="58" r="3.5" fill="white" fillOpacity="0.9" />
    </svg>
);

const TechTransferIllustration = ({ color }: { color: string }) => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
            <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow-zap"><feGaussianBlur stdDeviation="2.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#grad-tech)" />
        {/* Zap / lightning bolt */}
        <motion.g filter="url(#glow-zap)" animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M55 22L38 52H52L45 78L62 48H48L55 22Z" fill={color} fillOpacity="0.85" />
        </motion.g>
        {/* Radiating rings */}
        {[18, 26, 34].map((r, i) => (
            <motion.circle key={r} cx="50" cy="50" r={r}
                stroke={color} strokeWidth="0.8"
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} />
        ))}
        {/* Corner sparks */}
        <motion.circle cx="22" cy="30" r="2" fill={color} animate={{ opacity: [0, 1, 0], x: [-3, 0, 3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
        <motion.circle cx="78" cy="35" r="1.5" fill={color} animate={{ opacity: [0, 1, 0], x: [3, 0, -3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }} />
        <motion.circle cx="25" cy="70" r="2" fill={color} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
        <motion.circle cx="75" cy="72" r="2" fill={color} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }} />
    </svg>
);

// ── Interfaces ──

interface FocusAreaItem {
    key: string;
    emoji: string;
    label: string;
    title: string;
    items: { heading: string; desc: string }[];
    illustration: React.FC<{ color: string }>;
    color: string;
    bg: string;
    href: string;
}

interface FocusAreaCardProps {
    area: FocusAreaItem;
    index: number;
    cardIndex: number;
}

const FocusAreaCard: React.FC<FocusAreaCardProps> = ({ area, index, cardIndex }) => {
    const Illustration = area.illustration;

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="group relative h-[560px]"
        >
            <div className="h-full">
                <Link href={area.href as any} className="block h-full">
                    <motion.div
                        whileHover={{
                            boxShadow: `0 40px 80px -16px ${area.color}50`,
                            y: -12,
                            borderColor: `${area.color}`,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{
                            borderTopColor: area.color,
                            boxShadow: `0 20px 40px -12px ${area.color}30`,
                            borderColor: `${area.color}`,
                        }}
                        className={`relative rounded-[2rem] ${area.bg} border border-t-8 p-6 lg:p-8 h-full overflow-hidden flex flex-col items-center text-center backdrop-blur-sm`}
                    >
                        {/* Dark mode glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                            style={{ background: `radial-gradient(circle at top, ${area.color}22, transparent 70%)` }}
                        />

                        {/* Header: title with Emoji */}
                        <div className="relative z-10 flex flex-col items-center mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[2.2rem]">{area.emoji}</span>
                                <span className="text-base font-black uppercase tracking-[0.3em] text-zinc-900/80 dark:text-zinc-100/60">
                                    {area.title}
                                </span>
                            </div>

                            {/* Illustration */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-24 h-24 lg:w-28 lg:h-28 mb-3 transition-transform duration-700 group-hover:scale-110"
                            >
                                <Illustration color={area.color} />
                            </motion.div>
                        </div>

                        {/* Cycling Content */}
                        <div className="relative z-10 flex-grow w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${area.key}-${cardIndex}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: 'circOut' }}
                                >
                                    <h3 className="text-lg lg:text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-3 min-h-[52px] flex items-center justify-center">
                                        {area.items[cardIndex].heading}
                                    </h3>
                                    <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-[1.6]">
                                        {area.items[cardIndex].desc}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Explore More CTA */}
                        <div className="relative z-10 mt-6 mb-4 flex items-center justify-center gap-3 group/cta">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900/80 dark:text-zinc-100/60 transition-colors group-hover/cta:text-zinc-900 dark:group-hover/cta:text-white">
                                Explore More
                            </span>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/cta:translate-x-1"
                                style={{ backgroundColor: `${area.color}20`, color: area.color }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Progress Dots */}
                        <div className="relative z-10 flex justify-center gap-2 mb-4">
                            {area.items.map((_, dot) => (
                                <motion.div
                                    key={dot}
                                    className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                                    animate={{
                                        width: dot === cardIndex ? 24 : 6,
                                        backgroundColor: dot === cardIndex ? area.color : undefined,
                                    }}
                                    transition={{ duration: 0.4 }}
                                />
                            ))}
                        </div>

                        {/* Bottom accent bar */}
                        <div
                            className="absolute bottom-0 left-8 right-8 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
                            style={{ backgroundColor: area.color }}
                        />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};

// ── Horizontal Card (for last card — left-to-right layout) ──

const FocusAreaCardHorizontal: React.FC<FocusAreaCardProps> = ({ area, index, cardIndex }) => {
    const Illustration = area.illustration;

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={area.href as any} className="block">
                <motion.div
                    whileHover={{
                        boxShadow: `0 40px 80px -16px ${area.color}50`,
                        y: -12,
                        borderColor: `${area.color}`,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        borderTopColor: area.color,
                        boxShadow: `0 20px 40px -12px ${area.color}30`,
                        borderColor: `${area.color}`,
                    }}
                    className={`relative rounded-[2rem] ${area.bg} border border-t-8 p-6 lg:p-10 overflow-hidden backdrop-blur-sm flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-12`}
                >
                    {/* Dark mode glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                        style={{ background: `radial-gradient(circle at left, ${area.color}22, transparent 70%)` }}
                    />

                    {/* Left — Illustration & Label */}
                    <div className="relative z-10 flex flex-col items-center shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[2.2rem]">{area.emoji}</span>
                            <span className="text-base font-black uppercase tracking-[0.3em] text-zinc-900/80 dark:text-zinc-100/60">
                                {area.title}
                            </span>
                        </div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-32 h-32 lg:w-40 lg:h-40 transition-transform duration-700 group-hover:scale-110"
                        >
                            <Illustration color={area.color} />
                        </motion.div>
                    </div>

                    {/* Right — Content */}
                    <div className="p-10  relative z-10 flex flex-col flex-grow text-center md:text-left min-h-[200px]">
                        {/* Cycling Content */}
                        <div className="flex-grow">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${area.key}-${cardIndex}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: 'circOut' }}
                                >
                                    <h3 className="text-xl lg:text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                                        {area.items[cardIndex].heading}
                                    </h3>
                                    <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-[1.6] max-w-xl">
                                        {area.items[cardIndex].desc}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Explore More CTA */}
                        <div className="mt-6 flex items-center justify-center md:justify-start gap-3 group/cta">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900/80 dark:text-zinc-100/60 transition-colors group-hover/cta:text-zinc-900 dark:group-hover/cta:text-white">
                                Explore More
                            </span>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/cta:translate-x-1"
                                style={{ backgroundColor: `${area.color}20`, color: area.color }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Progress Dots */}
                        <div className="flex justify-center md:justify-start gap-2 mt-4">
                            {area.items.map((_, dot) => (
                                <motion.div
                                    key={dot}
                                    className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                                    animate={{
                                        width: dot === cardIndex ? 24 : 6,
                                        backgroundColor: dot === cardIndex ? area.color : undefined,
                                    }}
                                    transition={{ duration: 0.4 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div
                        className="absolute bottom-0 left-8 right-8 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
                        style={{ backgroundColor: area.color }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default function FocusAreasPage() {
    const t = useTranslations('focusAreas');

    const FOCUS_AREAS: FocusAreaItem[] = [
        {
            key: 'rd',
            emoji: '🔬',
            label: 'Research & Dev',
            title: t('rdTitle'),
            items: [
                { heading: 'Problem-Driven Research', desc: 'Transforming real-world challenges into structured research solutions.' },
                { heading: 'Analytical Modeling', desc: 'Applying data-driven and computational analysis to complex systems. ' },
                { heading: 'Interdisciplinary Research', desc: 'Integrating expertise across multiple domains for impactful innovation.' },
                { heading: 'Research to Deployment', desc: 'Advancing ideas from validation to scalable implementation. ' },
                { heading: 'Industry Problem Solving', desc: 'Developing research-backed solutions for industry challenges.' },
            ],
            illustration: ResearchIllustration,
            color: '#1e3a6e',
            bg: 'bg-[#eef1f8] dark:bg-[#0c1a33]/30',
            href: '/what-we-do/focus/research-and-development',
        },
        {
            key: 'proto',
            emoji: '⚙️',
            label: 'Prototyping',
            title: t('protoTitle'),
            items: [
                { heading: 'Prototype Development', desc: 'Transforming concepts into functional and testable prototypes. ' },
                { heading: 'Rapid Prototyping', desc: 'Accelerating idea validation through iterative design and development. ' },
                { heading: 'Smart System Design', desc: 'Building intelligent and efficient technology-driven solutions. ' },
                { heading: 'Hardware–Software Integration', desc: 'Combining embedded systems, sensors, and software into unified prototypes.' },
                { heading: 'Innovation Engineering', desc: 'Converting research concepts into working technological models.' },
            ],
            illustration: PrototypingIllustration,
            color: '#2e8b7b',
            bg: 'bg-[#e6f5f2] dark:bg-[#0d2a25]/40',
            href: '/what-we-do/focus/product-prototyping',
        },
        {
            key: 'acad',
            emoji: '🎓',
            label: 'Academia',
            title: t('acadTitle'),
            items: [
                { heading: 'Collaborative Innovation', desc: 'Enabling joint problem-solving through shared expertise and resources.' },
                { heading: 'Research Partnerships', desc: 'Building strategic collaborations between researchers and industry partners.' },
                { heading: 'Industry-Driven Research', desc: 'Aligning academic investigations with practical industrial needs.' },
                { heading: 'Knowledge Exchange', desc: 'Promoting mutual learning between academia, researchers, and industry.' },
                { heading: 'Skill & Innovation Ecosystem', desc: 'Creating opportunities for students, faculty, and industries to innovate together.' },
            ],
            illustration: AcademiaIllustration,
            color: '#5BBD4A',
            bg: 'bg-[#ecfdf5] dark:bg-[#052e16]/30',
            href: '/what-we-do/focus/industry-academia-collaboration',
        },
        {
            key: 'tech',
            emoji: '⚡',
            label: 'Tech Transfer',
            title: t('techTitle'),
            items: [
                { heading: 'Technology Transfer', desc: 'Bridging research innovations with real-world applications.' },
                { heading: 'Industry Integration', desc: 'Aligning developed technologies with industry needs and workflows.' },
                { heading: 'Scalable Solutions', desc: 'Enabling technologies to move from labs to practical deployment. ' },
                { heading: 'Innovation Commercialization', desc: 'Supporting the transition from research outcomes to usable solutions. ' },
                { heading: 'Deployment Readiness', desc: 'Preparing technologies for adoption, implementation, and impact.' },
            ],
            illustration: TechTransferIllustration,
            color: '#d97706',
            bg: 'bg-[#fef9ee] dark:bg-[#451a03]/25',
            href: '/what-we-do/focus/innovation-technology-transfer',
        },
    ];

    // Per-card cycling indices (staggered like WhatWeServe)
    const [cardIndices, setCardIndices] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const timers = FOCUS_AREAS.map((_, cardIdx) => {
            return setTimeout(() => {
                const interval = setInterval(() => {
                    setCardIndices((prev) => {
                        const next = [...prev];
                        next[cardIdx] = (next[cardIdx] + 1) % 4;
                        return next;
                    });
                }, 3500);
                return interval;
            }, cardIdx * 1200);
        });
        return () => { timers.forEach((t) => clearTimeout(t)); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper>
            <section className="relative grid-bg bg-zinc-50 dark:bg-[#09090b] py-24 lg:py-32 overflow-hidden transition-colors duration-500">
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1] mb-5">
                            {t('title')}{' '}
                            <span className="text-[#3A9B9B]">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    {/* Cards Grid — first 3 in a row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                        {FOCUS_AREAS.slice(0, 3).map((area, idx) => (
                            <FocusAreaCard
                                key={area.key}
                                area={area}
                                index={idx}
                                cardIndex={cardIndices[idx]}
                            />
                        ))}
                    </div>

                    {/* Last card — horizontal full-width */}
                    <div className="mt-6 lg:mt-8 max-w-7xl mx-auto relative z-10">
                        <FocusAreaCardHorizontal
                            area={FOCUS_AREAS[3]}
                            index={3}
                            cardIndex={cardIndices[3]}
                        />
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
}
