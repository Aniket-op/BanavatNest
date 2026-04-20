'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Rocket, ArrowRight, FileText, Share2 } from 'lucide-react';
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
        <div className="px-3 py-1 rounded-xl bg-zinc-900/40 backdrop-blur-md border border-zinc-100/10 shadow-xl flex items-center gap-2 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-100/60 transition-colors">
                {text}
            </span>
        </div>
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
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)]"
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
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-24 h-24 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20"
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
            className="relative z-10 w-24 h-24 rounded-3xl bg-[#84CC16]/10 flex items-center justify-center border border-[#84CC16]/20 shadow-[0_0_50px_rgba(132,204,22,0.2)]"
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
        className="group relative h-full"
    >
        <div className={`
            relative h-full p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 
            border-2 border-zinc-100 dark:border-zinc-800/80
            hover:shadow-2xl transition-all duration-500 overflow-hidden
            flex flex-col items-center text-center
            group-hover:translate-y-[-8px]
        `}
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
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight leading-tight">
                    {title}
                </h3>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-10">
                    {desc}
                </p>
            </div>

            <Link href={href} className="relative z-10 w-full">
                <motion.div
                    whileHover={{ scale: 1.02 }}
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
        </div>
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

export default function OpportunitiesPage() {
    const t = useTranslations('opportunities');

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-32">

                {/* ── Header ── */}
                <header className="relative pt-32 pb-24 border-b border-zinc-100 dark:border-zinc-800/50 bg-white/50 dark:bg-transparent overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84CC16]/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-zinc-100 mb-10 tracking-tighter leading-[0.9]">
                                {t('title')} <br />
                                <span className="relative inline-block mt-2">
                                    <span className="relative z-10 text-[#84CC16] mix-blend-plus-lighter">{t('titleHighlight')}</span>
                                    {/* Text Glow */}
                                    <span className="absolute inset-0 blur-2xl opacity-40 text-[#84CC16] select-none" aria-hidden="true">
                                        {t('titleHighlight')}
                                    </span>
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                                {t('subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </header>

                {/* ── Content Grid ── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
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
                </section>

                {/* ── Footer Stats / Growth Bar ── */}
                {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                    <div className="flex flex-col items-center gap-12">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-12 h-1 bg-[#84CC16]" />
                            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-900/40 dark:text-zinc-100/30">
                                Student Growth Pathway
                            </h4>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <GrowthPathProfile name="Sarah D. (Postgrad)" role="Lead at [Company Name]" delay={0.4} />
                            <GrowthPathProfile name="Aniket M. (UG)" role="Software Engineer at [Tech Corp]" delay={0.5} />
                            <GrowthPathProfile name="Priya S. (PhD)" role="Research Lead at [R&D Lab]" delay={0.6} />
                            <GrowthPathProfile name="John L. (PG)" role="Founder of [Innovation Startup]" delay={0.7} />
                        </div>

                        <div className="relative flex items-center justify-center mt-8">
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 border border-zinc-200 dark:border-zinc-800 rounded-full opacity-50"
                             />
                             <div className="absolute w-20 h-20 bg-[#84CC16]/10 blur-xl rounded-full" />
                             <Share2 className="absolute w-8 h-8 text-[#84CC16] opacity-60" />
                        </div>
                    </div>
                </div> */}
            </div>
        </PageWrapper>
    );
}
