'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, BookOpen, Rocket, ArrowRight, FileText, Share2,
    Lightbulb, Settings, Brain, HandshakeIcon, Award,
    Clock, Globe, Sparkles, Users, CheckCircle, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';

// ── Custom SVG Illustrations ──

const TechnicalBadge = ({ text, color, delay }: { text: string, color: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
        }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 5,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className="absolute z-0"
        style={{
            left: `${Math.random() * 60 + 20}%`,
            top: `${Math.random() * 60 + 20}%`
        }}
    >
        <motion.div
            whileHover={{ scale: 1.15, boxShadow: `0 15px 30px -5px ${color}80` }}
            transition={{ duration: 0.2 }}
            className="px-3 py-1 rounded-xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-100/20 shadow-lg flex items-center gap-2 transition-colors cursor-pointer"
        >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-100/80 transition-colors">
                {text}
            </span>
        </motion.div>
    </motion.div>
);

const UGIllustration = () => (
    <div className="relative w-full h-48 flex items-center justify-center mb-6 overflow-visible">
        {/* Orbital Ring */}
        <svg className="absolute w-48 h-48 opacity-20" viewBox="0 0 200 200">
            <motion.circle
                cx="100" cy="100" r="80"
                fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
                cx="100" cy="20" r="4" fill="#3B82F6"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ originX: "100px", originY: "100px" }}
            />
        </svg>

        <motion.div
            animate={{
                y: [0, -10, 0],
                rotateY: [0, 10, 0]
            }}
            whileHover={{ scale: 1.1, rotateY: 180, boxShadow: "0 0 60px rgba(59,130,246,0.4)" }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] cursor-pointer"
        >
            <GraduationCap className="w-12 h-12 text-blue-400" />
        </motion.div>

        {/* Strategic floating tech icons */}
        <TechnicalBadge text="Python" color="#3B82F6" delay={0} />
        <TechnicalBadge text="UX" color="#3B82F6" delay={1.2} />
        <TechnicalBadge text="CAD" color="#3B82F6" delay={2.4} />
        <TechnicalBadge text="React" color="#3B82F6" delay={3.6} />
    </div>
);

const PGIllustration = () => (
    <div className="relative w-full h-48 flex items-center justify-center mb-6 overflow-visible">
        {/* Animated Grid Dots */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-10">
            {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                    className="w-1 h-1 bg-purple-500 rounded-full"
                />
            ))}
        </div>

        <motion.div
            animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                    "0 0 20px rgba(168,85,247,0.1)",
                    "0 0 40px rgba(168,85,247,0.3)",
                    "0 0 20px rgba(168,85,247,0.1)"
                ]
            }}
            whileHover={{ scale: 1.15, rotateZ: 10, boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-24 h-24 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 cursor-pointer"
        >
            <BookOpen className="w-12 h-12 text-purple-400" />
        </motion.div>

        {/* Flowchart elements with drawing animation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            <motion.path
                d="M100,40 V160 M40,100 H160"
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="opacity-30"
            />
            {[
                { x: 100, y: 40 }, { x: 100, y: 160 },
                { x: 40, y: 100 }, { x: 160, y: 100 }
            ].map((node, i) => (
                <motion.circle
                    key={i}
                    cx={node.x} cy={node.y} r="4"
                    fill="#A855F7"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                />
            ))}
        </svg>
    </div>
);

const PhDIllustration = () => (
    <div className="relative w-full h-48 flex items-center justify-center mb-6 overflow-visible">
        {/* Scanning Effect */}
        <motion.div
            animate={{ top: ['20%', '80%', '20%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#84CC16] to-transparent opacity-20 z-0"
        />

        <motion.div
            animate={{
                y: [0, -15, 0],
                rotateZ: [-2, 2, -2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-24 h-24 rounded-3xl bg-[#84CC16]/10 flex items-center justify-center border border-[#84CC16]/20 shadow-[0_0_50px_rgba(132,204,22,0.2)] cursor-pointer"
        >
            <Rocket className="w-12 h-12 text-[#84CC16]" />

            {/* Engine Glow */}
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -bottom-2 w-8 h-8 bg-[#84CC16] blur-xl rounded-full"
            />
        </motion.div>

        {/* Dynamic Data Points */}
        <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-3 bg-[#84CC16] rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.3, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    </div>
);

// ── Components ──

const GrowthCard = ({
    title,
    desc,
    Illustration,
    color,
    cta,
    href,
    delay
}: {
    title: string,
    desc: string,
    Illustration: React.FC,
    color: string,
    cta: string,
    href: string,
    delay: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="h-full"
    >
        <motion.div
            whileHover={{
                y: -12,
                scale: 1.01,
                boxShadow: `0 35px 70px -15px ${color}40, 0 20px 40px -10px rgba(0,0,0,0.1)`
            }}
            className={`
                group relative h-full p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 
                border-2 border-zinc-100 dark:border-zinc-800/80
                transition-all duration-500 overflow-hidden
                flex flex-col items-center text-center cursor-pointer
            `}
            style={{
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)"
            }}
        >
            {/* Hover Gradient Backdrop */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top, ${color}15, transparent 70%)`
                }}
            />

            {/* Bottom Glow */}
            <div
                className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: color }}
            />

            <Illustration />

            <div className="relative z-10 flex-grow">
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight leading-tight transition-colors group-hover:text-zinc-800 dark:group-hover:text-white">
                    {title}
                </h3>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-10 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                    {desc}
                </p>
            </div>

            <Link href={href} className="relative z-10 w-full">
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-5 w-full rounded-full bg-[#5D3A1A] hover:bg-[#4B2C13] dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-black shadow-xl overflow-hidden transition-all duration-300"
                    style={{
                        boxShadow: `0 10px 30px -10px ${color}80`
                    }}
                >
                    <span className="relative z-10">{cta}</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />

                    {/* Button internal glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity"
                        style={{ backgroundColor: color }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    </motion.div>
);

const GrowthPathProfile = ({ name, role, delay }: { name: string, role: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
    >
        <div className="w-8 h-8 rounded-full bg-[#84CC16] flex items-center justify-center text-[10px] font-black text-white uppercase ring-4 ring-zinc-50 dark:ring-zinc-950">
            {name.charAt(0)}
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
            <span className="text-zinc-400 dark:text-zinc-500">→</span>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 tracking-tight">{role}</span>
        </div>
    </motion.div>
);

// ─────────────────────────────────────────────────────────────
// ── Section 1: What Students Get ──
// ─────────────────────────────────────────────────────────────

const studentBenefits = [
    {
        icon: Lightbulb,
        emoji: '💡',
        title: 'Hands-on Project Experience',
        desc: 'Work on real industry and research problems that create measurable impact.',
        color: '#F59E0B',
        glow: 'rgba(245,158,11,0.25)',
    },
    {
        icon: Settings,
        emoji: '⚙️',
        title: 'Prototype Development Exposure',
        desc: 'Take your idea from concept → design → fully working model.',
        color: '#3B82F6',
        glow: 'rgba(59,130,246,0.25)',
    },
    {
        icon: Brain,
        emoji: '🧠',
        title: 'Multidomain Learning',
        desc: 'Explore AI, Cybersecurity, IoT, Blockchain, and Smart Systems.',
        color: '#A855F7',
        glow: 'rgba(168,85,247,0.25)',
    },
    {
        icon: Users,
        emoji: '🤝',
        title: 'Mentorship from Experts',
        desc: 'Guidance from leading figures across academia and industry.',
        color: '#84CC16',
        glow: 'rgba(132,204,22,0.25)',
    },
    {
        icon: Award,
        emoji: '📜',
        title: 'Certification & Recognition',
        desc: 'Earn certificates, showcase projects, and receive recommendation letters.',
        color: '#EC4899',
        glow: 'rgba(236,72,153,0.25)',
    },
];

const WhatStudentsGetSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            // "move left to right automatic" implies moving backwards through the array 
            // so it enters from left (-x) and exits to right (+x)
            setDirection(-1);
            setActiveIndex((prev) => (prev - 1 + studentBenefits.length) % studentBenefits.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % studentBenefits.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + studentBenefits.length) % studentBenefits.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 60 : -60,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 60 : -60,
            opacity: 0,
            scale: 0.95
        })
    };

    const benefit = studentBenefits[activeIndex];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative py-12 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-white dark:bg-[#09090b]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#84CC16]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Heading */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-left"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 leading-tight">
                                What Students <span className="text-[#84CC16] whitespace-nowrap">Get</span>
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-lg">
                                More than an internship — a launchpad for your future career and research journey.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Carousel */}
                    <div className="relative w-full">
                        <div className="relative w-full h-[320px] max-w-xl mx-auto">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 }
                                    }}
                                    className="absolute inset-0 w-full"
                                >
                                    <div
                                        className="group relative h-full flex flex-col justify-center p-8 md:p-12 rounded-[2rem] bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80 cursor-pointer transition-all duration-500"
                                        style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}
                                    >
                                        {/* Hover gradient */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                                            style={{ background: `radial-gradient(circle at top left, ${benefit.glow}, transparent 70%)` }}
                                        />

                                        {/* Content Wrapper */}
                                        <div className="relative z-10 flex flex-col items-start">
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl"
                                                style={{
                                                    backgroundColor: `${benefit.color}15`,
                                                    border: `1.5px solid ${benefit.color}30`,
                                                    boxShadow: `0 8px 20px -5px ${benefit.glow}`
                                                }}
                                            >
                                                <span>{benefit.emoji}</span>
                                            </motion.div>

                                            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                                                {benefit.desc}
                                            </p>
                                        </div>

                                        {/* Bottom accent line */}
                                        <div
                                            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
                                            style={{ backgroundColor: benefit.color }}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center justify-center gap-6 mt-10">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-105 hover:shadow-md transition-all text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-3">
                                {studentBenefits.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (i === activeIndex) return;
                                            setDirection(i > activeIndex ? 1 : -1);
                                            setActiveIndex(i);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#84CC16] scale-125' : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                                            }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-105 hover:shadow-md transition-all text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

// ─────────────────────────────────────────────────────────────
// ── Section 2: Types of Opportunities ──
// ─────────────────────────────────────────────────────────────

const opportunityTypes = [
    {
        icon: '🎓',
        title: 'Internships',
        color: '#3B82F6',
        glow: 'rgba(59,130,246,0.2)',
        borderColor: 'rgba(59,130,246,0.3)',
        items: [
            { icon: Clock, text: 'Short-term & Long-term durations' },
            { icon: BookOpen, text: 'Research + Industry-based tracks' },
            { icon: Globe, text: 'Hybrid / Remote options available' },
        ],
    },
    {
        icon: '🚀',
        title: 'Innovation & Startup Support',
        color: '#84CC16',
        glow: 'rgba(132,204,22,0.2)',
        borderColor: 'rgba(132,204,22,0.3)',
        items: [
            { icon: Sparkles, text: 'Work on ongoing BanavatNest projects' },
            { icon: Settings, text: 'Convert your idea into a prototype' },
            { icon: ChevronRight, text: 'Guidance for funding & incubation' },
        ],
    },
];

const TypesOfOpportunitiesSection = () => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative py-12 overflow-hidden"
    >
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[#84CC16]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-20"
            >

                <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 leading-tight">
                    Types of <span className="text-blue-400">Opportunities</span>
                </h2>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Choose the path that matches your goals and ambitions.
                </p>
            </motion.div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {opportunityTypes.map((type, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        whileHover={{
                            y: -8,
                            boxShadow: `0 40px 80px -20px ${type.glow}`
                        }}
                        className="group relative p-10 rounded-[2rem] bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer transition-all duration-500"
                        style={{ boxShadow: '0 8px 30px -10px rgba(0,0,0,0.07)' }}
                    >
                        {/* Glow bg */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: `radial-gradient(ellipse at top left, ${type.glow}, transparent 65%)` }}
                        />

                        {/* Header */}
                        <div className="relative z-10 flex items-center gap-4 mb-10">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                transition={{ duration: 0.3 }}
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                                style={{
                                    backgroundColor: `${type.color}15`,
                                    border: `2px solid ${type.borderColor}`,
                                    boxShadow: `0 10px 30px -10px ${type.glow}`
                                }}
                            >
                                {type.icon}
                            </motion.div>
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{type.title}</h3>
                        </div>

                        {/* Items */}
                        <div className="relative z-10 flex flex-col gap-5">
                            {type.items.map((item, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + j * 0.08 }}
                                    className="flex items-center gap-4"
                                >
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            backgroundColor: `${type.color}15`,
                                            border: `1px solid ${type.borderColor}`,
                                        }}
                                    >
                                        <item.icon className="w-4 h-4" style={{ color: type.color }} />
                                    </div>
                                    <span className="text-zinc-600 dark:text-zinc-300 font-medium leading-snug group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom accent */}
                        <div
                            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
                            style={{ backgroundColor: type.color }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.section>
);

// ─────────────────────────────────────────────────────────────
// ── Section 3: Who Can Apply + Selection Process ──
// ─────────────────────────────────────────────────────────────

const eligibilityCriteria = [
    { icon: GraduationCap, text: 'Undergraduate & Postgraduate Students', color: '#3B82F6' },
    { icon: BookOpen, text: 'Engineering / Science / Mathematics backgrounds', color: '#A855F7' },
    { icon: Sparkles, text: 'Passionate learners — skills matter more than marks', color: '#84CC16' },
];

const selectionSteps = [
    { step: '01', label: 'Apply Online', desc: 'Fill out the application form with your interests.' },
    { step: '02', label: 'Idea & Interest Evaluation', desc: 'We review your ideas and areas of interest.' },
    { step: '03', label: 'Interaction & Discussion', desc: 'A friendly conversation about your goals.' },
    { step: '04', label: 'Selection', desc: 'Selected candidates are notified and onboarded.' },
];

const WhoCanApplySection = () => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative py-12 overflow-hidden"
    >
        <div className="absolute inset-0 bg-white dark:bg-[#09090b]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#84CC16]/4 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-20"
            >

                <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 leading-tight">
                    Who Can <span className="text-[#84CC16]">Apply?</span>
                </h2>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Our process is simple, transparent, and designed to find passionate learners — not just high scorers.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Eligibility */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">Eligibility Criteria</h3>
                    <div className="flex flex-col gap-5">
                        {eligibilityCriteria.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ x: 6, boxShadow: `0 10px 30px -10px ${item.color}40` }}
                                className="flex items-center gap-5 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 cursor-default transition-all duration-300"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${item.color}15`, border: `1.5px solid ${item.color}30` }}
                                >
                                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                </div>
                                <span className="text-zinc-700 dark:text-zinc-200 font-semibold leading-snug">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Selection Process */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
                        Selection Process — <span className="text-[#84CC16]">Simple & Transparent</span>
                    </h3>
                    <div className="relative flex flex-col gap-0">
                        {/* Connecting line */}
                        <div className="absolute left-6 top-12 bottom-12 w-[2px] bg-gradient-to-b from-[#84CC16]/40 via-blue-500/20 to-transparent" />

                        {selectionSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.12 }}
                                whileHover={{ x: 6 }}
                                className="relative flex items-start gap-6 pb-8 last:pb-0 cursor-default transition-transform duration-300"
                            >
                                {/* Step badge */}
                                <motion.div
                                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(132,204,22,0.4)' }}
                                    transition={{ duration: 0.2 }}
                                    className="relative z-10 w-12 h-12 rounded-full bg-[#84CC16] flex items-center justify-center text-xs font-black text-white flex-shrink-0 shadow-[0_0_20px_rgba(132,204,22,0.25)]"
                                >
                                    {step.step}
                                </motion.div>
                                <div className="pt-1">
                                    <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1 tracking-tight">{step.label}</div>
                                    <div className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{step.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
);



export default function OpportunitiesPage() {
    const t = useTranslations('opportunities');

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors">

                {/* ── Header Image ── */}
                <header className="relative pt-24 pb-12 border-b border-zinc-100 dark:border-zinc-800/50 bg-white/50 dark:bg-transparent overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#84CC16]/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={{
                                y: -8, scale: 1.02,
                                boxShadow: '0 40px 80px -15px rgba(0,0,0,0.2)'
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full max-w-5xl aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-10px_rgba(132,204,22,0.15)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_40px_80px_-15px_rgba(132,204,22,0.3)] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 transition-shadow duration-500 cursor-pointer"
                        >
                            <img
                                src="/images/banavatNestTimes.jpeg"
                                alt="Banavat Nest Times Opportunities"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </header>

                {/* ── Section 1: What Students Get ── */}
                <WhatStudentsGetSection />

                {/* ── Section 2: Types of Opportunities ── */}
                <TypesOfOpportunitiesSection />

                {/* ── Section 3: Who Can Apply ── */}
                <WhoCanApplySection />

                {/* ── Section 4: Opportunities by Level (Card Grid) ── */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 leading-tight">
                            Opportunities by <span className="text-purple-400">Level</span>
                        </h2>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            Tailored pathways for every stage of your academic journey.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        <GrowthCard
                            title={t('ugTitle')}
                            desc={t('ugDesc')}
                            Illustration={UGIllustration}
                            color="#3B82F6"
                            cta="Explore Projects"
                            href="/bridge/opportunities#ug"
                            delay={0.1}
                        />
                        <GrowthCard
                            title={t('pgTitle')}
                            desc={t('pgDesc')}
                            Illustration={PGIllustration}
                            color="#8B5CF6"
                            cta="View Lab Openings"
                            href="/bridge/opportunities#pg"
                            delay={0.2}
                        />
                        <GrowthCard
                            title={t('phdTitle')}
                            desc={t('phdDesc')}
                            Illustration={PhDIllustration}
                            color="#84CC16"
                            cta="Apply for Funding"
                            href="/bridge/opportunities#phd"
                            delay={0.3}
                        />
                    </div>
                </motion.section>

            </div>
        </PageWrapper>
    );
}

