'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowDown,
    BookOpen,
    Lightbulb,
    FlaskConical,
    Handshake,
    GraduationCap,
    Cpu,
    MessageSquare,
    Network,
    Users,
    Globe,
    Layers,
    Zap,
    ExternalLink,
    FileText,
    CheckCircle2,
    Target,
    Microscope,
    TrendingUp,
    Brain,
    Shield,
    Wifi,
    BarChart3,
    Link2,
    HeartPulse,
    Settings,
    RotateCw,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageWrapper from '@/components/PageWrapper';
import React from 'react';
import { useTranslations } from 'next-intl';

// ── Helpers ──────────────────────────────────────────────────────────────────

const TEAL = '#3A9B9B';
const NAVY = '#2D3561';
const GREEN = '#5BBD4A';

// ── Glassmorphism Card ────────────────────────────────────────────────────────
const GlassCard = ({
    children,
    className = '',
    style = {},
    accentLine = true,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    accentLine?: boolean;
}) => (
    <div
        className={`relative rounded-[2.5rem] overflow-hidden
      border-2 border-[#3A9B9B]/20
      bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
      dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
      backdrop-blur-sm shadow-lg ${className}`}
        style={style}
    >
        {accentLine && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] z-20" />
        )}
        {children}
    </div>
);

// ── Non-translatable visual metadata ─────────────────────────────────────────

const workflowMeta = [
    { icon: Target,       color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { icon: Microscope,   color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { icon: GraduationCap,color: '#5BBD4A', bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { icon: Lightbulb,    color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { icon: TrendingUp,   color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
];

const statsMeta = [
    { value: '20+', icon: Users },
    { value: '5',   icon: Globe },
    { value: '12',  icon: Layers },
    { value: '8',   icon: Zap },
];
const statsKeys = ['collaborators', 'domains', 'researchInitiatives', 'prototypeConcepts'] as const;

const capabilitiesMeta = [
    { icon: Network,       color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { icon: BookOpen,      color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { icon: Handshake,     color: '#5BBD4A', bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { icon: FlaskConical,  color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { icon: GraduationCap, color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { icon: Cpu,           color: '#5BBD4A', bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { icon: MessageSquare, color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { icon: Network,       color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
];

const coreDomainsIcons = [Brain, Shield, Wifi, BarChart3, Link2, HeartPulse, Settings];
const coreDomainsColors = ['#2D3561', '#3A9B9B', '#5BBD4A', '#2D3561', '#3A9B9B', '#5BBD4A', '#2D3561'];

const collabProcessMeta = [
    { step: '01', icon: FileText,    color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { step: '02', icon: Microscope,  color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { step: '03', icon: MessageSquare, color: '#5BBD4A', bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { step: '04', icon: CheckCircle2, color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
];

const grantProcessColors = ['#2D3561', '#3A9B9B', '#5BBD4A', '#2D3561', '#3A9B9B', '#5BBD4A'];

const opportunityColor = '#3A9B9B';
const opportunityBg = ' bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg';

const approachPillarsMeta = [
    { icon: Target,      color: '#2D3561' },
    { icon: Users,       color: '#3A9B9B' },
    { icon: CheckCircle2,color: '#5BBD4A' },
    { icon: Cpu,         color: '#2D3561' },
];

// ── Section Heading ───────────────────────────────────────────────────────────
const SectionHeading = ({
    title,
    highlight,
}: {
    title: string;
    highlight?: string;
}) => (
    <div className="text-center mb-10 md:mb-16">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight mb-4"
        >
            {title}{' '}
            {highlight && <span className="text-[#3A9B9B]">{highlight}</span>}
        </motion.h2>
    </div>
);


// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FacultyEngagementPage() {
    const t = useTranslations('facultyPage');
    const [activeGrantStep, setActiveGrantStep] = useState<number | null>(null);

    // ── 3D Dice roller for Core Domains ───────────────────────────────────────
    const diceCount = coreDomainsIcons.length;
    const diceRotationStep = 360 / diceCount;
    const [diceTotalRotation, setDiceTotalRotation] = useState(0);
    const [activeDiceIndex, setActiveDiceIndex] = useState(0);
    const [isDiceManual, setIsDiceManual] = useState(false);

    useEffect(() => {
        if (isDiceManual) return;
        const interval = setInterval(() => {
            setDiceTotalRotation((prev) => prev - diceRotationStep);
            setActiveDiceIndex((prev) => (prev + 1) % diceCount);
        }, 3500);
        return () => clearInterval(interval);
    }, [isDiceManual, diceRotationStep, diceCount]);

    const diceNext = () => {
        setDiceTotalRotation((prev) => prev - diceRotationStep);
        setActiveDiceIndex((prev) => (prev + 1) % diceCount);
        setIsDiceManual(true);
        setTimeout(() => setIsDiceManual(false), 8000);
    };
    const dicePrev = () => {
        setDiceTotalRotation((prev) => prev + diceRotationStep);
        setActiveDiceIndex((prev) => (prev - 1 + diceCount) % diceCount);
        setIsDiceManual(true);
        setTimeout(() => setIsDiceManual(false), 8000);
    };
    const diceGoTo = (idx: number) => {
        const currentCycle = Math.round(diceTotalRotation / 360);
        let target = currentCycle * 360 - idx * diceRotationStep;
        if (Math.abs(target - diceTotalRotation) > 180) {
            target += target > diceTotalRotation ? -360 : 360;
        }
        setDiceTotalRotation(target);
        setActiveDiceIndex(idx);
        setIsDiceManual(true);
        setTimeout(() => setIsDiceManual(false), 8000);
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-white dark:bg-[#09090b] transition-colors">

                {/* ── HERO ──────────────────────────────────────────────────────────── */}
                <header className="relative bg-white dark:bg-zinc-900/40 pt-32 pb-12 border-b border-gray-100 dark:border-zinc-800 grid-bg overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3A9B9B]/8 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D3561]/6 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                            {/* Left — Text */}
                            <div className="flex flex-col justify-between py-4">
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-4 leading-tight tracking-tighter"
                                    >
                                        {t('heroTitle')}{' '}
                                        <span className="text-[#3A9B9B]">{t('heroTitleHighlight')}</span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.15 }}
                                        className="text-base md:text-lg text-gray-500 dark:text-zinc-400 font-medium leading-relaxed mb-6 max-w-lg"
                                    >
                                        {t('heroSubtitle')}
                                    </motion.p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {statsMeta.map((stat, i) => {
                                            const Icon = stat.icon;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                                                    whileHover={{ y: -3, scale: 1.02 }}
                                                    className="relative rounded-2xl overflow-hidden flex items-center gap-3
                                                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                                                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                                                        backdrop-blur-sm border border-[#3A9B9B]/20 shadow-sm
                                                        p-3 cursor-default transition-all duration-300"
                                                >
                                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                                                    <div className="w-9 h-9 rounded-xl bg-[#3A9B9B]/10 flex items-center justify-center shrink-0">
                                                        <Icon className="w-4 h-4 text-[#3A9B9B]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-none">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                                            {t(`stats.${statsKeys[i]}`)}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.55 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black border-2 border-[#2D3561] dark:border-zinc-600 text-[#2D3561] dark:text-zinc-100 hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        {t('heroCta')}
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right — Visual Collaboration Workflow */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex"
                            >
                                <GlassCard className="p-6 md:p-8 flex-1">
                                    <div className="pt-2 h-full flex flex-col">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-5">
                                            {t('howItWorks')}
                                        </p>
                                        <div className="flex flex-col gap-0 flex-1 justify-between">
                                            {workflowMeta.map((step, i) => {
                                                const Icon = step.icon;
                                                return (
                                                    <div key={i} className="flex flex-col items-center">
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                                            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 ${step.bg} border border-white/30 dark:border-zinc-700/40`}
                                                            style={{ boxShadow: `0 2px 12px ${step.color}14` }}
                                                        >
                                                            <div
                                                                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                                                style={{ backgroundColor: `${step.color}15`, color: step.color }}
                                                            >
                                                                <Icon className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                                                                {t(`workflowSteps.${i}`)}
                                                            </span>
                                                        </motion.div>
                                                        {i < workflowMeta.length - 1 && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                                                                className="flex flex-col items-center py-1 gap-0.5"
                                                            >
                                                                <div className="w-5 h-5 rounded-full border border-[#3A9B9B]/30 bg-white/60 dark:bg-zinc-800/60 flex items-center justify-center">
                                                                    <ArrowDown className="w-15 h-15 text-[#3A9B9B]" />
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* ── WHAT FACULTY CAN DO ────────────────────────────────────────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title={t('sectionWhatTitle')}
                            highlight={t('sectionWhatHighlight')}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {capabilitiesMeta.map((cap, i) => {
                                const Icon = cap.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.07 }}
                                        whileHover={{ y: -6, boxShadow: `0 20px 50px -10px ${cap.color}25` }}
                                        className={`group relative rounded-[2rem] overflow-hidden ${cap.bg} border border-white/30 dark:border-zinc-700/40 p-6 flex flex-col gap-4 transition-all duration-300 cursor-default`}
                                    >
                                        {/* Top row: icon + number on the right */}
                                        <div className="flex items-start justify-between">
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div
                                                className="text-4xl font-black tracking-tighter opacity-15 leading-none"
                                                style={{ color: cap.color }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 leading-snug mb-2">
                                                {t(`capabilities.${i}.title`)}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {t(`capabilities.${i}.desc`)}
                                            </p>
                                        </div>
                                        {/* Bottom accent line */}
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ background: `linear-gradient(to right, transparent, ${cap.color}, transparent)` }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── COLLABORATION PROCESS + CORE DOMAINS (Combined) ──────────────── */}
                <section className="grid-bg bg-white dark:bg-[#09090b] pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title={t('sectionProcessTitle')}
                            highlight={t('sectionProcessHighlight')}
                        />
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                            {/* LEFT — Collaboration Process: 2×2 clockwise grid */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <GlassCard className="p-6 md:p-8 h-full">
                                    <div className="pt-2 h-full flex flex-col">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-5">
                                            {t('collaborationProcessLabel')}
                                        </p>
                                        {/* 2×2 Grid with clockwise arrow overlay */}
                                        <div className="relative flex-1">
                                            <div className="grid grid-cols-2 gap-4 h-full">
                                                {collabProcessMeta.map((step, i) => {
                                                    const Icon = step.icon;
                                                    // clockwise order: 0(TL) → 1(TR) → 3(BR) → 2(BL)
                                                    const orderMap = [0, 1, 3, 2];
                                                    const displayOrder = orderMap[i];
                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                                            style={{ order: displayOrder }}
                                                            className={`relative rounded-[1.5rem] p-5 flex flex-col gap-3
                                                                ${step.bg} border border-white/30 dark:border-zinc-700/40
                                                                hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
                                                        >
                                                            {/* Number top-right */}
                                                            <div
                                                                className="absolute top-3 right-4 text-3xl font-black tracking-tighter opacity-10"
                                                                style={{ color: step.color }}
                                                            >
                                                                {step.step}
                                                            </div>
                                                            <div
                                                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                                style={{ backgroundColor: `${step.color}15`, color: step.color }}
                                                            >
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">
                                                                    {t(`collabProcess.${i}.title`)}
                                                                </h3>
                                                                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                                    {t(`collabProcess.${i}.desc`)}
                                                                </p>
                                                            </div>
                                                            {/* Bottom accent */}
                                                            <div
                                                                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                                style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                                                            />
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            {/* Clockwise Arrow in Centre */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                            >
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                                    className="w-14 h-14 rounded-full bg-white/80 dark:bg-zinc-900/80 border-2 border-[#3A9B9B]/30 flex items-center justify-center shadow-lg backdrop-blur-sm"
                                                >
                                                    <RotateCw className="w-6 h-6 text-[#3A9B9B]" />
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>

                            {/* RIGHT — Core Domains vertical carousel */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <GlassCard className="p-6 md:p-8 h-full">
                                    <div className="pt-2 h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-5">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                                                {t('coreDomainsLabel')}
                                            </p>
                                            <Link
                                                href="/what-we-do"
                                                className="inline-flex items-center gap-1 text-xs font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                            >
                                                {t('viewAll')} <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                        {/* 2D Vertical Carousel */}
                                        <div className="flex-1 flex flex-col items-center justify-center gap-5 overflow-hidden">
                                            <div
                                                className="relative w-full h-[320px] flex items-center justify-center"
                                            >
                                                <motion.div
                                                    style={{
                                                        width: '90%',
                                                        height: '90%',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    {coreDomainsIcons.map((IconComp, index) => {
                                                        const areaColor = coreDomainsColors[index];

                                                        // Calculate continuous float position based on the rotation state
                                                        const currentFloatPos = diceTotalRotation / -diceRotationStep;

                                                        // Find shortest signed distance for infinite looping
                                                        let signedDist = index - currentFloatPos;
                                                        while (signedDist > diceCount / 2) signedDist -= diceCount;
                                                        while (signedDist < -diceCount / 2) signedDist += diceCount;

                                                        const dist = Math.abs(signedDist);
                                                        const isActive = dist < 0.45;
                                                        const isNear = dist >= 0.45 && dist < 1.5;

                                                        const opacity = isActive ? 1 : isNear ? 0.45 : 0;
                                                        const scale = isActive ? 1 : isNear ? 0.9 : 0.78;
                                                        const yOffset = signedDist * 140; // 140px vertical spacing

                                                        return (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    position: 'absolute',
                                                                    inset: 0,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transform: `translateY(${yOffset}px) scale(${scale})`,
                                                                    opacity,
                                                                    zIndex: isActive ? 30 : isNear ? 20 : 10,
                                                                    transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                                                                    pointerEvents: isActive ? 'auto' : 'none',
                                                                }}
                                                            >
                                                                <div
                                                                    className="relative w-full max-w-[340px] rounded-[2rem] overflow-hidden border border-white/10 dark:border-white/5 bg-white dark:bg-zinc-900 shadow-[0_16px_60px_rgba(0,0,0,0.15)] px-8 py-10 flex flex-col items-center text-center"
                                                                >
                                                                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] z-20" />
                                                                    <div
                                                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                                                                        style={{ backgroundColor: `${areaColor}18`, color: areaColor }}
                                                                    >
                                                                        <IconComp className="w-8 h-8" />
                                                                    </div>
                                                                    <h3
                                                                        className="text-lg font-black tracking-tight leading-snug"
                                                                        style={{ color: isActive ? areaColor : '#18181b' }}
                                                                    >
                                                                        {t(`coreDomains.${index}`)}
                                                                    </h3>
                                                                    <div
                                                                        className="mt-4 h-[2px] w-16 rounded-full"
                                                                        style={{ background: `linear-gradient(to right, transparent, ${areaColor}, transparent)` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </motion.div>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center gap-4 pt-6">
                                                <button
                                                    onClick={dicePrev}
                                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md transition-all hover:scale-110 hover:border-[#3A9B9B]"
                                                >
                                                    <ChevronUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                                                </button>
                                                <div className="flex items-center gap-2">
                                                    {coreDomainsIcons.map((_, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => diceGoTo(idx)}
                                                            className={`rounded-full transition-all duration-500 ${idx === activeDiceIndex ? 'w-6 h-2 bg-[#3A9B9B]' : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={diceNext}
                                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md transition-all hover:scale-110 hover:border-[#3A9B9B]"
                                                >
                                                    <ChevronDown className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── WHY COLLABORATE + WHO CAN APPLY ─────────────────────────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-6 items-stretch">
                            {/* Why Collaborate */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col"
                            >
                                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                    {t('sectionWhyTitle')}{' '}
                                    <span className="text-[#3A9B9B]">{t('sectionWhyHighlight')}</span>
                                </h2>
                                <GlassCard className="p-6 md:p-10 flex-1 mt-2">
                                    <div className="pt-2">
                                        <ul className="space-y-3">
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#3A9B9B] mt-2 shrink-0" />
                                                    <span className="text-base font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                        {t(`whyReasons.${i}`)}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </GlassCard>
                            </motion.div>

                            {/* Who Can Apply */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-col"
                            >
                                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                    {t('sectionWhoTitle')}{' '}
                                    <span className="text-[#3A9B9B]">{t('sectionWhoHighlight')}</span>
                                </h2>
                                <GlassCard className="p-6 md:p-10 flex-1 mt-2">
                                    <div className="pt-2">
                                        <ul className="space-y-4">
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: 15 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.09, duration: 0.4 }}
                                                    className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/40"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-[#5BBD4A] dark:text-[#3A9B9B] mt-0.5 shrink-0" />
                                                    <span className="text-base font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                        {t(`whoCanApply.${i}`)}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── GRANT COLLABORATION PROCESS ───────────────────────────────────── */}
                <section className="grid-bg bg-white dark:bg-[#09090b] pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title={t('sectionGrantTitle')}
                            highlight={t('sectionGrantHighlight')}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <GlassCard className="p-6 md:p-10">
                                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {grantProcessColors.map((color, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            onClick={() => setActiveGrantStep(activeGrantStep === i ? null : i)}
                                            className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-300
                      bg-white/60 dark:bg-zinc-800/40
                      border border-zinc-100 dark:border-zinc-700/50
                      hover:shadow-lg hover:-translate-y-1"
                                            style={{
                                                borderLeft: `3px solid ${color}`,
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <span
                                                    className="text-xs font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                                                    style={{ backgroundColor: `${color}15`, color }}
                                                >
                                                    {t('stepLabel')} {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                                                {t(`grantProcess.${i}.title`)}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {t(`grantProcess.${i}.desc`)}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </section>

                {/* ── OUR APPROACH + CURRENT/OPEN OPPORTUNITIES (Combined) ─────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 pt-16 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                            {/* LEFT — Our Approach (heading + subtext + link) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col justify-center"
                            >
                                <div className="mb-6">
                                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                        {t('sectionApproachTitle')}{' '}
                                        <span className="text-[#3A9B9B]">{t('sectionApproachHighlight')}</span>
                                    </h2>
                                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                                        {t('approachDesc')}
                                    </p>
                                    <Link
                                        href="/bridge/collaboration"
                                        className="inline-flex items-center gap-2 font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors text-sm"
                                    >
                                        {t('exploreEcosystem')} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Approach pillars grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {approachPillarsMeta.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                                className="rounded-2xl p-4 text-center
                          bg-white/60 dark:bg-zinc-800/40
                          border border-zinc-100 dark:border-zinc-700/40
                          hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                                                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-xs font-black text-zinc-700 dark:text-zinc-300 leading-tight">
                                                    {t(`approachPillars.${i}`)}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* RIGHT — Current / Open Opportunities (3 vertical cards) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-col"
                            >
                                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                    {t('sectionOpportunitiesTitle')}{' '}
                                    <span className="text-[#3A9B9B]">{t('sectionOpportunitiesHighlight')}</span>
                                </h2>
                                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                <div className="flex flex-col gap-4 flex-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            whileHover={{ y: -4, boxShadow: `0 20px 40px -10px ${opportunityColor}25` }}
                                            className={`group relative rounded-[1.75rem] overflow-hidden ${opportunityBg}
                        border border-white/30 dark:border-zinc-700/40
                        p-6 flex items-center gap-5 transition-all duration-300 flex-1`}
                                        >
                                            <div
                                                className="absolute top-0 left-0 right-0 h-1.5"
                                                style={{ background: `linear-gradient(to right, ${NAVY}, ${opportunityColor})` }}
                                            />
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: `${opportunityColor}20`, color: opportunityColor }}
                                            >
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100">
                                                    {t(`opportunities.${i}`)}
                                                </h3>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                                                    {t('openForCollaboration')}
                                                </p>
                                            </div>
                                            <ArrowRight
                                                className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                                                style={{ color: opportunityColor }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex flex-col sm:flex-row gap-4 mt-6"
                                >
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-white text-sm
                        bg-[#3A9B9B] dark:bg-[#0d2a2a]
                        shadow-xl transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        {t('connectWithUs')} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm
                        border-2 border-[#2D3561] dark:border-zinc-600
                        text-[#2D3561] dark:text-zinc-100
                        hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700
                        transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        {t('submitCollabInterest')}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageWrapper>
    );
}
