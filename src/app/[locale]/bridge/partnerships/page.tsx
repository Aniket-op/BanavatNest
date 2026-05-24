'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Cpu,
    FlaskConical,
    Rocket,
    MessageSquare,
    Users,
    Network,
    Building2,
    Brain,
    Shield,
    Wifi,
    BarChart3,
    Link2,
    HeartPulse,
    Settings,
    CheckCircle2,
    FileText,
    Lightbulb,
    Microscope,
    TrendingUp,
    Target,
    Layers,
    Zap,
    ExternalLink,
    BookOpen,
    Atom,
    GraduationCap,
    RotateCw,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageWrapper from '@/components/PageWrapper';
import React from 'react';

// ── Brand tokens ─────────────────────────────────────────────────────────────
const NAVY = '#2D3561';
const TEAL = '#3A9B9B';
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

// ── Data ──────────────────────────────────────────────────────────────────────

const capabilities = [
    {
        icon: Target,
        title: 'Industry Problem Solving',
        desc: 'Collaborate on practical industrial challenges through research-driven and technology-oriented solution development.',
        color: NAVY,
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: Atom,
        title: 'Research & Innovation Collaboration',
        desc: 'Work with faculty members, researchers, and interdisciplinary teams on innovation-focused projects and emerging technologies.',
        color: TEAL,
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        icon: Cpu,
        title: 'Prototype Development Support',
        desc: 'Collaborate in developing, testing, and refining functional prototypes aligned with industry and market requirements.',
        color: GREEN,
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        icon: Rocket,
        title: 'Startup & Product Innovation',
        desc: 'Engage in product development, innovation strategy, startup incubation activities, and technology commercialization pathways.',
        color: NAVY,
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: MessageSquare,
        title: 'Technical Consultation',
        desc: 'Access academic expertise, analytical guidance, and technical consultation across emerging domains and industrial applications.',
        color: TEAL,
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        icon: FlaskConical,
        title: 'Industry-Sponsored Research',
        desc: 'Support and participate in collaborative research initiatives, sponsored projects, and application-oriented technology development.',
        color: GREEN,
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        icon: GraduationCap,
        title: 'Talent & Student Engagement',
        desc: 'Connect with students, interns, and innovation teams through mentorship, project collaboration, internships, and technical activities.',
        color: NAVY,
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: Network,
        title: 'Academia–Industry Networking',
        desc: 'Build meaningful collaborations with faculty members, researchers, startups, and innovation ecosystems for long-term technological growth.',
        color: TEAL,
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
];

const collaborationAreas = [
    { label: 'Artificial Intelligence & Machine Learning', icon: Brain, color: NAVY },
    { label: 'Cybersecurity', icon: Shield, color: TEAL },
    { label: 'IoT & Smart Systems', icon: Wifi, color: GREEN },
    { label: 'Data Science', icon: BarChart3, color: NAVY },
    { label: 'Blockchain', icon: Link2, color: TEAL },
    { label: 'Healthcare Technologies', icon: HeartPulse, color: GREEN },
    { label: 'Automation & Embedded Systems', icon: Settings, color: NAVY },
];

const whyReasons = [
    'Industry-oriented prototype development',
    'Academia–industry collaboration opportunities',
    'Startup and innovation support',
    'Student engagement and talent collaboration',
    'Flexible project collaboration models',
    'Grant and funded research collaboration',
    'Technology-focused problem solving',
];

const whoCanApply = [
    'Industries and corporate organizations',
    'Startups and innovation-driven ventures',
    'MSMEs and technology companies',
    'R&D teams and innovation departments',
    'Incubators and innovation centers',
];

const howToCollaborate = [
    {
        step: '01',
        title: 'Connect with Us',
        desc: 'Share your industry challenge, innovation requirement, startup idea, or collaboration interest.',
        icon: FileText,
        color: NAVY,
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        step: '02',
        title: 'Requirement & Idea Discussion',
        desc: 'We discuss objectives, technical requirements, challenges, and collaboration possibilities.',
        icon: MessageSquare,
        color: TEAL,
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        step: '03',
        title: 'Research & Solution Planning',
        desc: 'Relevant researchers, faculty members, students, and technical teams are aligned for solution development.',
        icon: Microscope,
        color: GREEN,
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        step: '04',
        title: 'Collaboration & Execution',
        desc: 'Projects, research activities, prototype development, mentoring, or innovation initiatives are jointly executed.',
        icon: CheckCircle2,
        color: NAVY,
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
];

const industryProcess = [
    {
        step: '01',
        title: 'Identify Industry Challenge',
        desc: 'Industry partners or startups identify a practical challenge, research opportunity, or technology requirement.',
        color: NAVY,
    },
    {
        step: '02',
        title: 'Collaborative Discussion',
        desc: 'BanavatNest collaborates with industry experts, researchers, and technical teams to define objectives, scope, and expected outcomes.',
        color: TEAL,
    },
    {
        step: '03',
        title: 'Research & Development Planning',
        desc: 'A structured plan is developed covering technical strategy, prototype scope, implementation roadmap, timelines, and deliverables.',
        color: GREEN,
    },
    {
        step: '04',
        title: 'Prototype & Solution Development',
        desc: 'Research, experimentation, prototyping, testing, and technology development activities are carried out collaboratively.',
        color: NAVY,
    },
    {
        step: '05',
        title: 'Validation & Deployment Support',
        desc: 'Solutions are refined, validated, and prepared for practical implementation, scalability, and deployment readiness.',
        color: TEAL,
    },
    {
        step: '06',
        title: 'Innovation & Technology Advancement',
        desc: 'The outcomes may lead to product innovation, technology transfer, startup growth, publications, patents, or industry adoption.',
        color: GREEN,
    },
];

const potentialOutcomes = [
    { label: 'Prototype Systems', icon: Cpu, color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { label: 'Industry Solutions', icon: Building2, color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { label: 'Research Publications', icon: BookOpen, color: GREEN, bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { label: 'Product Innovation', icon: Rocket, color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { label: 'Technology Transfer', icon: TrendingUp, color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { label: 'Startup Growth Opportunities', icon: Zap, color: GREEN, bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { label: 'Grant & Funded Projects', icon: Layers, color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { label: 'Student Innovation Projects', icon: Lightbulb, color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
];

const openOpportunities = [
    { title: 'Industry collaborations in AI & Healthcare', color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { title: 'Startup partnerships in Smart Systems & IoT', color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { title: 'Joint grant proposal opportunities', color: GREEN, bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
];

// ── Vertical Carousel (reused from faculty pattern) ───────────────────────────
function VerticalCarousel({ items }: { items: typeof collaborationAreas }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="relative h-full flex flex-col gap-2">
            {items.map((area, i) => {
                const Icon = area.icon;
                const isActive = i === activeIndex;
                const distance = Math.min(
                    Math.abs(i - activeIndex),
                    Math.abs(i - activeIndex + items.length),
                    Math.abs(i - activeIndex - items.length)
                );
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3;
                const scale = distance === 0 ? 1 : distance === 1 ? 0.97 : 0.94;

                return (
                    <motion.div
                        key={area.label}
                        animate={{ opacity, scale }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onClick={() => setActiveIndex(i)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300"
                        style={{
                            background: isActive ? `${area.color}12` : `${area.color}06`,
                            border: isActive ? `1.5px solid ${area.color}40` : `1.5px solid ${area.color}15`,
                        }}
                    >
                        <motion.div
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${area.color}20`, color: area.color }}
                        >
                            <Icon className="w-4 h-4" />
                        </motion.div>
                        <span
                            className="text-sm font-bold leading-tight"
                            style={{ color: isActive ? area.color : undefined }}
                        >
                            <span className={isActive ? '' : 'text-zinc-700 dark:text-zinc-300'}>
                                {area.label}
                            </span>
                        </span>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="ml-auto"
                            >
                                <ExternalLink className="w-3.5 h-3.5" style={{ color: area.color }} />
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function IndustryPartnershipsPage() {
    const [_activeStep, setActiveStep] = useState<number | null>(null);

    // ── 3D Dice roller for Areas of Collaboration ────────────────────────────
    const diceCount = collaborationAreas.length;
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

                {/* ── HERO ──────────────────────────────────────────────────── */}
                <header className="relative bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3A9B9B]/8 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D3561]/6 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                            {/* Left — Text */}
                            <div className="flex flex-col justify-between py-4">
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-6 leading-tight tracking-tighter"
                                    >
                                        Industry &{' '}
                                        <span className="text-[#3A9B9B]">Startups</span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.15 }}
                                        className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed mb-8 max-w-lg"
                                    >
                                        Collaborating Innovation with Real-World Impact
                                    </motion.p>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black text-white bg-[#3A9B9B] dark:bg-[#0d2a2a] dark:hover:bg-[#2a7676] shadow-xl transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        Connect With Us <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black border-2 border-[#2D3561] dark:border-zinc-600 text-[#2D3561] dark:text-zinc-100 hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        Submit Collaboration Interest
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right — Highlight grid with larger icons */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex"
                            >
                                <GlassCard className="p-6 md:p-8 flex-1">
                                    <div className="pt-2 grid grid-cols-2 gap-4 h-full content-center">
                                        {[
                                            { icon: Target, label: 'Problem-Driven', color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
                                            { icon: Cpu, label: 'Prototype Dev', color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
                                            { icon: Rocket, label: 'Startup Support', color: GREEN, bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
                                            { icon: FlaskConical, label: 'Sponsored Research', color: NAVY, bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
                                            { icon: Users, label: 'Student Talent', color: TEAL, bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
                                            { icon: TrendingUp, label: 'Tech Transfer', color: GREEN, bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
                                        ].map((item, i) => {
                                            const Icon = item.icon;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                                                    whileHover={{ y: -3, scale: 1.02 }}
                                                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl ${item.bg} border border-white/30 dark:border-zinc-700/40 text-center transition-all duration-300`}
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                                    >
                                                        <Icon className="w-7 h-7" />
                                                    </div>
                                                    <span className="text-sm font-black text-zinc-700 dark:text-zinc-200 leading-tight">
                                                        {item.label}
                                                    </span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* ── WHAT INDUSTRY & STARTUPS CAN DO ──────────────────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="What Industry &"
                            highlight="Startups Can Do"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {capabilities.map((cap, i) => {
                                const Icon = cap.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.07 }}
                                        whileHover={{ y: -6 }}
                                        className={`group relative rounded-[2rem] overflow-hidden ${cap.bg} border border-white/30 dark:border-zinc-700/40 p-6 flex flex-col gap-4 transition-all duration-300 cursor-default`}
                                    >
                                        {/* Top row: icon + number */}
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
                                                {cap.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {cap.desc}
                                            </p>
                                        </div>
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

                {/* ── HOW TO COLLABORATE + AREAS OF COLLABORATION (Combined) ── */}
                <section className="grid-bg bg-white dark:bg-[#09090b] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="How to Collaborate &"
                            highlight="Areas of Collaboration"
                        />
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                            {/* LEFT — How to Collaborate: 2×2 clockwise grid */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <GlassCard className="p-6 md:p-8 h-full">
                                    <div className="pt-2 h-full flex flex-col">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-5">
                                            How to Collaborate
                                        </p>
                                        {/* 2×2 clockwise grid */}
                                        <div className="relative flex-1">
                                            <div className="grid grid-cols-2 gap-4 h-full">
                                                {howToCollaborate.map((step, i) => {
                                                    const Icon = step.icon;
                                                    const orderMap = [0, 1, 3, 2];
                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                                            style={{ order: orderMap[i] }}
                                                            className={`relative rounded-[1.5rem] p-5 flex flex-col gap-3
                                                                ${step.bg} border border-white/30 dark:border-zinc-700/40
                                                                hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
                                                        >
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
                                                                    {step.title}
                                                                </h3>
                                                                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                                    {step.desc}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                                style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                                                            />
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                            {/* Clockwise rotating arrow */}
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

                            {/* RIGHT — Areas of Collaboration: 3D dice roller */}
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
                                                Areas of Collaboration
                                            </p>
                                            <Link
                                                href="/what-we-do"
                                                className="inline-flex items-center gap-1 text-xs font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                            >
                                                View All <ArrowRight className="w-3 h-3" />
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
                                                    {collaborationAreas.map((area, index) => {
                                                        const Icon = area.icon;

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
                                                                        style={{ backgroundColor: `${area.color}18`, color: area.color }}
                                                                    >
                                                                        <Icon className="w-8 h-8" />
                                                                    </div>
                                                                    <h3
                                                                        className="text-lg font-black tracking-tight leading-snug"
                                                                        style={{ color: isActive ? area.color : '#18181b' }}
                                                                    >
                                                                        {area.label}
                                                                    </h3>
                                                                    <div
                                                                        className="mt-4 h-[2px] w-16 rounded-full"
                                                                        style={{ background: `linear-gradient(to right, transparent, ${area.color}, transparent)` }}
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
                                                    {collaborationAreas.map((_, idx) => (
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

                {/* ── WHY COLLABORATE + WHO CAN APPLY ──────────────────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 py-16">
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
                                    Why Collaborate with{' '}
                                    <span className="text-[#3A9B9B]">BanavatNest</span>
                                </h2>
                                <GlassCard className="p-6 md:p-10 flex-1 mt-2">
                                    <div className="pt-2">
                                        <ul className="space-y-3">
                                            {whyReasons.map((reason, i) => (
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
                                                        {reason}
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
                                    Who Can{' '}
                                    <span className="text-[#3A9B9B]">Apply</span>
                                </h2>
                                <GlassCard className="p-6 md:p-10 flex-1 mt-2">
                                    <div className="pt-2">
                                        <ul className="space-y-4">
                                            {whoCanApply.map((who, i) => (
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
                                                        {who}
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

                {/* ── INDUSTRY COLLABORATION PROCESS ───────────────────────── */}
                <section className="grid-bg bg-white dark:bg-[#09090b] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="Industry"
                            highlight="Collaboration Process"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <GlassCard className="p-6 md:p-10">
                                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {industryProcess.map((step, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            onClick={() => setActiveStep(prev => prev === i ? null : i)}
                                            className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-300
                      bg-white/60 dark:bg-zinc-800/40
                      border border-zinc-100 dark:border-zinc-700/50
                      hover:shadow-lg hover:-translate-y-1"
                                            style={{ borderLeft: `3px solid ${step.color}` }}
                                        >
                                            <div className="mb-3">
                                                <span
                                                    className="text-xs font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                                                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                                                >
                                                    Step {step.step}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </section>

                {/* ── POTENTIAL OUTCOMES + OPEN OPPORTUNITIES (Combined) ────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 py-16 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                            {/* LEFT — Potential Outcomes */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                    Potential{' '}
                                    <span className="text-[#3A9B9B]">Outcomes</span>
                                </h2>
                                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                <div className="grid grid-cols-2 gap-4">
                                    {potentialOutcomes.map((outcome, i) => {
                                        const Icon = outcome.icon;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className={`group relative rounded-[1.75rem] overflow-hidden ${outcome.bg}
                            border border-white/30 dark:border-zinc-700/40
                            p-5 text-center transition-all duration-300 cursor-default`}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-1"
                                                    style={{ background: `linear-gradient(to right, transparent, ${outcome.color}, transparent)` }}
                                                />
                                                <div
                                                    className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                                                    style={{ backgroundColor: `${outcome.color}20`, color: outcome.color }}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <p className="text-sm font-black text-zinc-800 dark:text-zinc-200 leading-tight">
                                                    {outcome.label}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* RIGHT — Current / Open Opportunities */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-col h-full"
                            >
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                    Current / Open{' '}
                                    <span className="text-[#3A9B9B]">Opportunities</span>
                                </h2>
                                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                <div className="flex flex-col gap-4 flex-1 justify-between">
                                    {openOpportunities.map((opp, i) => {
                                        const oppColors = [NAVY, TEAL, GREEN];
                                        const color = opp.color;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                                whileHover={{ y: -4, boxShadow: `0 20px 40px -10px ${color}25` }}
                                                className={`group relative rounded-[1.75rem] overflow-hidden ${opp.bg}
                            border border-white/30 dark:border-zinc-700/40
                            p-6 flex items-center gap-5 transition-all duration-300`}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-1.5"
                                                    style={{ background: `linear-gradient(to right, ${NAVY}, ${color})` }}
                                                />
                                                <div
                                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                                    style={{ backgroundColor: `${color}20`, color }}
                                                >
                                                    <Zap className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100">
                                                        {opp.title}
                                                    </h3>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                                                        Open for collaboration
                                                    </p>
                                                </div>
                                                <ArrowRight
                                                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                                                    style={{ color }}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex flex-col sm:flex-row gap-4 mt-8"
                                >
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-white text-sm bg-[#3A9B9B] dark:bg-[#0d2a2a] dark:hover:bg-[#2a7676] shadow-xl transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        Connect With Us <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm border-2 border-[#2D3561] dark:border-zinc-600 text-[#2D3561] dark:text-zinc-100 hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        Submit Collaboration Interest
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
