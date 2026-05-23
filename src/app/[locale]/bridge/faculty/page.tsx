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
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageWrapper from '@/components/PageWrapper';
import React from 'react';

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



// ── Workflow Step ─────────────────────────────────────────────────────────────
const workflowSteps = [
    { label: 'Industry Problem', icon: Target, color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
    { label: 'Research Mapping', icon: Microscope, color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { label: 'Faculty & Researchers Collaboration', icon: GraduationCap, color: '#5BBD4A', bg: 'bg-[#EAF8EA] dark:bg-[#142614]' },
    { label: 'Student Innovation', icon: Lightbulb, color: '#3A9B9B', bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]' },
    { label: 'Prototype / Publication / Grant / Deployment', icon: TrendingUp, color: '#2D3561', bg: 'bg-[#EAECF5] dark:bg-[#111936]' },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
    { value: '20+', label: 'Collaborators', icon: Users },
    { value: '5', label: 'Domains', icon: Globe },
    { value: '12', label: 'Research Initiatives', icon: Layers },
    { value: '8', label: 'Prototype Concepts', icon: Zap },
];

// ── What Faculty Can Do ───────────────────────────────────────────────────────
const capabilities = [
    {
        icon: Network,
        title: 'Research Collaboration',
        desc: 'Work on interdisciplinary and application-oriented research projects with academic and industry relevance.',
        color: '#2D3561',
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: BookOpen,
        title: 'Publications & Knowledge Creation',
        desc: 'Contribute to research publications, technical documentation, analytical studies, patents, and innovation-driven knowledge development.',
        color: '#3A9B9B',
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        icon: Handshake,
        title: 'Industry-Linked Research',
        desc: 'Collaborate on practical problem statements aligned with real-world industrial and societal needs.',
        color: '#5BBD4A',
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        icon: FlaskConical,
        title: 'Startup & Research Grant Collaboration',
        desc: 'Collaborate on startup initiatives, funded research proposals, startup incubation activities, and interdisciplinary project development.',
        color: '#2D3561',
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: GraduationCap,
        title: 'Project Mentorship',
        desc: 'Guide students, interns, and innovation teams through research, experimentation, and development activities.',
        color: '#3A9B9B',
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        icon: Cpu,
        title: 'Prototype & Innovation Support',
        desc: 'Contribute toward transforming research ideas into functional systems and technological solutions.',
        color: '#5BBD4A',
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        icon: MessageSquare,
        title: 'Technical Consultation',
        desc: 'Provide domain expertise, analytical guidance, and technical direction across emerging technologies and research domains.',
        color: '#2D3561',
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        icon: Network,
        title: 'Academic–Industry Networking',
        desc: 'Engage with faculty members, researchers, startups, and industry professionals to build meaningful research and innovation partnerships.',
        color: '#3A9B9B',
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
];

// ── Core Domains ──────────────────────────────────────────────────────────────
const coreDomains = [
    { label: 'Artificial Intelligence & Machine Learning', icon: Brain, color: '#2D3561' },
    { label: 'Cybersecurity', icon: Shield, color: '#3A9B9B' },
    { label: 'IoT & Smart Systems', icon: Wifi, color: '#5BBD4A' },
    { label: 'Data Science', icon: BarChart3, color: '#2D3561' },
    { label: 'Blockchain', icon: Link2, color: '#3A9B9B' },
    { label: 'Healthcare Technologies', icon: HeartPulse, color: '#5BBD4A' },
    { label: 'Automation & Embedded Systems', icon: Settings, color: '#2D3561' },
];

// ── Why Collaborate ───────────────────────────────────────────────────────────
const whyReasons = [
    'Interdisciplinary research opportunities',
    'Industry-linked projects and problem statements',
    'Startup and research grant collaboration',
    'Student mentorship and project guidance',
    'Networking with researchers, startups, and industry experts',
    'Flexible Collaboration Modes',
];

// ── Who Can Apply ─────────────────────────────────────────────────────────────
const whoCanApply = [
    'Faculty members from academic institutions',
    'Research scholars and postdoctoral researchers',
    'Industry experts and technical professionals',
    'Startup founders and innovators',
    'Domain specialists from interdisciplinary fields',
];

// ── Collaboration Process ─────────────────────────────────────────────────────
const collabProcess = [
    {
        step: '01',
        title: 'Apply or Connect',
        desc: 'Share your research interests, expertise, or collaboration ideas.',
        icon: FileText,
        color: '#2D3561',
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
    {
        step: '02',
        title: 'Research & Idea Evaluation',
        desc: 'We review the proposed ideas, domains, and collaboration objectives.',
        icon: Microscope,
        color: '#3A9B9B',
        bg: 'bg-[#E8F7F7] dark:bg-[#0d2a2a]',
    },
    {
        step: '03',
        title: 'Interaction & Discussion',
        desc: 'A collaborative discussion to explore goals, opportunities, and possible research directions.',
        icon: MessageSquare,
        color: '#5BBD4A',
        bg: 'bg-[#EAF8EA] dark:bg-[#142614]',
    },
    {
        step: '04',
        title: 'Collaboration Onboarding',
        desc: 'Selected collaborators are connected with relevant projects, research activities, or innovation initiatives.',
        icon: CheckCircle2,
        color: '#2D3561',
        bg: 'bg-[#EAECF5] dark:bg-[#111936]',
    },
];

// ── Grant Process ─────────────────────────────────────────────────────────────
const grantProcess = [
    {
        step: '01',
        title: 'Identify Research Problem',
        desc: 'Faculty members, researchers, or industry partners identify a real-world challenge, innovation idea, or research opportunity.',
        color: '#2D3561',
    },
    {
        step: '02',
        title: 'Collaborative Discussion',
        desc: 'BanavatNest collaborates with academic and industry experts to refine objectives, scope, methodology, and expected outcomes.',
        color: '#3A9B9B',
    },
    {
        step: '03',
        title: 'Proposal Development',
        desc: 'A structured grant proposal is prepared, including technical objectives, implementation strategy, budget planning, milestones, and impact analysis.',
        color: '#5BBD4A',
    },
    {
        step: '04',
        title: 'Submission to Funding Agencies',
        desc: 'The proposal is submitted to suitable government funding agencies, innovation missions, incubation programs, CSR initiatives, or industry-sponsored research opportunities.',
        color: '#2D3561',
    },
    {
        step: '05',
        title: 'Research, Development & Execution',
        desc: 'Upon approval, collaborative research, prototype development, testing, deployment activities, and project execution are carried out jointly.',
        color: '#3A9B9B',
    },
    {
        step: '06',
        title: 'Innovation, Impact & Technology Translation',
        desc: 'The project outcomes are directed toward publications, prototypes, technology transfer, startup opportunities, and real-world impact generation.',
        color: '#5BBD4A',
    },
];

// ── Open Opportunities ────────────────────────────────────────────────────────
const opportunities = [
    { title: 'AI/ML Research Mentors', color: '#3A9B9B', bg: ' bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg' },
    { title: 'Blockchain & Cybersecurity', color: '#3A9B9B', bg: ' bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg' },
    { title: 'Joint Grant Proposal Opportunities', color: '#3A9B9B', bg: ' bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg' },
];

// ── Section Heading ───────────────────────────────────────────────────────────
const SectionHeading = ({
    title,
    highlight,
    subtitle,
}: {
    title: string;
    highlight?: string;
    subtitle?: string;
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
        {/* {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed"
            >
                {subtitle}
            </motion.p>
        )} */}
    </div>
);

// ── Vertical Auto-Scroll Carousel ─────────────────────────────────────────────
function VerticalCarousel({ items }: { items: typeof coreDomains }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const doubled = [...items, ...items]; // duplicate for seamless loop feel

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="relative h-full flex flex-col gap-2 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
                {items.map((domain, i) => {
                    const Icon = domain.icon;
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
                            key={domain.label}
                            animate={{
                                opacity,
                                scale,
                                y: (i - activeIndex) * 0,
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            onClick={() => setActiveIndex(i)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 ${isActive
                                    ? 'shadow-md'
                                    : 'hover:opacity-80'
                                }`}
                            style={{
                                background: isActive ? `${domain.color}12` : `${domain.color}06`,
                                border: isActive ? `1.5px solid ${domain.color}40` : `1.5px solid ${domain.color}15`,
                            }}
                        >
                            <motion.div
                                animate={{ scale: isActive ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                            >
                                <Icon className="w-4 h-4" />
                            </motion.div>
                            <span
                                className="text-sm font-bold leading-tight"
                                style={{ color: isActive ? domain.color : undefined }}
                            >
                                <span className={isActive ? '' : 'text-zinc-700 dark:text-zinc-300'}>
                                    {domain.label}
                                </span>
                            </span>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="ml-auto"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" style={{ color: domain.color }} />
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FacultyEngagementPage() {
    const [activeGrantStep, setActiveGrantStep] = useState<number | null>(null);

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
                            {/* <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#3A9B9B] px-4 py-1.5 rounded-full bg-[#3A9B9B]/10 border border-[#3A9B9B]/20">
                                <GraduationCap className="w-3.5 h-3.5" />
                                BanavatNest Bridge
                            </span> */}
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
                                        Faculty &{' '}
                                        <span className="text-[#3A9B9B]">Researchers</span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.15 }}
                                        className="text-base md:text-lg text-gray-500 dark:text-zinc-400 font-medium leading-relaxed mb-6 max-w-lg"
                                    >
                                        Where academic expertise meets real-world innovation. Collaborate, research, mentor, and transform ideas into impact.
                                    </motion.p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {stats.map((stat, i) => {
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
                                                            {stat.label}
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
                                        Submit Collaboration Interest
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
                                            How it works
                                        </p>
                                        <div className="flex flex-col gap-0 flex-1 justify-between">
                                            {workflowSteps.map((step, i) => {
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
                                                                {step.label}
                                                            </span>
                                                        </motion.div>
                                                        {i < workflowSteps.length - 1 && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                                                                className="flex flex-col items-center py-1 gap-0.5"
                                                            >
                                                                {/* <div className="w-px h-2 bg-gradient-to-b from-[#3A9B9B]/70 to-[#3A9B9B]/20" /> */}
                                                                <div className="w-5 h-5 rounded-full border border-[#3A9B9B]/30 bg-white/60 dark:bg-zinc-800/60 flex items-center justify-center">
                                                                    <ArrowDown className="w-15 h-15 text-[#3A9B9B]" />
                                                                </div>
                                                                {/* <div className="w-px h-2 bg-gradient-to-b from-[#3A9B9B]/20 to-[#2D3561]/40" /> */}
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
                <section className="grid-bg bg-white dark:bg-zinc-900/20 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="What Faculty &"
                            highlight="Researchers Can Do"
                            subtitle="A wide spectrum of impactful collaboration modes designed for academic and research professionals."
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
                                                {cap.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {cap.desc}
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
                <section className="grid-bg bg-white dark:bg-[#09090b] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="Collaboration Process &"
                            highlight="Core Domains"
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
                                            Collaboration Process
                                        </p>
                                        {/* 2×2 Grid with clockwise arrow overlay */}
                                        <div className="relative flex-1">
                                            <div className="grid grid-cols-2 gap-4 h-full">
                                                {collabProcess.map((step, i) => {
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
                                                                    {step.title}
                                                                </h3>
                                                                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                                    {step.desc}
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
                                                Core Domains & Research Areas
                                            </p>
                                            <Link
                                                href="/what-we-do"
                                                className="inline-flex items-center gap-1 text-xs font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                            >
                                                View All <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                        <div className="flex-1">
                                            <VerticalCarousel items={coreDomains} />
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-[#3A9B9B]/10">
                                            <Link
                                                href="/what-we-do"
                                                className="inline-flex items-center gap-2 text-sm font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                            >
                                                Explore All Core Domains <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── WHY COLLABORATE + WHO CAN APPLY ─────────────────────────────── */}
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

                {/* ── GRANT COLLABORATION PROCESS ───────────────────────────────────── */}
                <section className="grid-bg bg-white dark:bg-[#09090b] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            title="Grant Collaboration Process —"
                            highlight="From Idea to Funding"
                            subtitle="A structured pathway that transforms research ideas into funded, impactful projects."
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <GlassCard className="p-6 md:p-10">
                                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {grantProcess.map((step, i) => (
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
                                                borderLeft: `3px solid ${step.color}`,
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-3">
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

                {/* ── OUR APPROACH + CURRENT/OPEN OPPORTUNITIES (Combined) ─────────── */}
                <section className="grid-bg bg-white dark:bg-zinc-900/20 py-16 pb-20">
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
                                        Our{' '}
                                        <span className="text-[#3A9B9B]">Approach</span>
                                    </h2>
                                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                                        We adopt a problem-driven approach where real-world industry challenges are mapped into academic research opportunities and student-led innovation projects. Collaboration is enabled through joint supervision, milestone-based execution, continuous mentoring, and prototype-driven development.
                                    </p>
                                    <Link
                                        href="/bridge/collaboration"
                                        className="inline-flex items-center gap-2 font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors text-sm"
                                    >
                                        Explore our ecosystem <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Approach pillars grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Problem-Driven', icon: Target, color: '#2D3561' },
                                        { label: 'Joint Supervision', icon: Users, color: '#3A9B9B' },
                                        { label: 'Milestone Execution', icon: CheckCircle2, color: '#5BBD4A' },
                                        { label: 'Prototype-Driven', icon: Cpu, color: '#2D3561' },
                                    ].map((item, i) => {
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
                                                    {item.label}
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
                                    Current / Open{' '}
                                    <span className="text-[#3A9B9B]">Opportunities</span>
                                </h2>
                                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                <div className="flex flex-col gap-4 flex-1">
                                    {opportunities.map((opp, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            whileHover={{ y: -4, boxShadow: `0 20px 40px -10px ${opp.color}25` }}
                                            className={`group relative rounded-[1.75rem] overflow-hidden ${opp.bg}
                        border border-white/30 dark:border-zinc-700/40
                        p-6 flex items-center gap-5 transition-all duration-300 flex-1`}
                                        >
                                            <div
                                                className="absolute top-0 left-0 right-0 h-1.5"
                                                style={{ background: `linear-gradient(to right, ${NAVY}, ${opp.color})` }}
                                            />
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: `${opp.color}20`, color: opp.color }}
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
                                                style={{ color: opp.color }}
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
                                        Connect With Us <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm
                        border-2 border-[#2D3561] dark:border-zinc-600
                        text-[#2D3561] dark:text-zinc-100
                        hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700
                        transition-all duration-300 hover:scale-[1.04] active:scale-95"
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
