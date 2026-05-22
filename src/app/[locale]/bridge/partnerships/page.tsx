'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    },
    {
        step: '02',
        title: 'Requirement & Idea Discussion',
        desc: 'We discuss objectives, technical requirements, challenges, and collaboration possibilities.',
        icon: MessageSquare,
        color: TEAL,
    },
    {
        step: '03',
        title: 'Research & Solution Planning',
        desc: 'Relevant researchers, faculty members, students, and technical teams are aligned for solution development.',
        icon: Microscope,
        color: GREEN,
    },
    {
        step: '04',
        title: 'Collaboration & Execution',
        desc: 'Projects, research activities, prototype development, mentoring, or innovation initiatives are jointly executed.',
        icon: CheckCircle2,
        color: NAVY,
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function IndustryPartnershipsPage() {
    const [_activeStep, setActiveStep] = useState<number | null>(null);

    // ── Rolling Dice for Open Opportunities ──────────────────────────────────
    const oppCount = openOpportunities.length;
    const oppRotationStep = 360 / oppCount;
    const [oppTotalRotation, setOppTotalRotation] = useState(0);
    const [activeOppIndex, setActiveOppIndex] = useState(0);
    const [isOppManual, setIsOppManual] = useState(false);

    useEffect(() => {
        if (isOppManual) return;
        const interval = setInterval(() => {
            setOppTotalRotation((prev) => prev - oppRotationStep);
            setActiveOppIndex((prev) => (prev + 1) % oppCount);
        }, 3500);
        return () => clearInterval(interval);
    }, [isOppManual, oppRotationStep, oppCount]);

    const oppNext = () => {
        setOppTotalRotation((prev) => prev - oppRotationStep);
        setActiveOppIndex((prev) => (prev + 1) % oppCount);
        setIsOppManual(true);
        setTimeout(() => setIsOppManual(false), 8000);
    };
    const oppPrev = () => {
        setOppTotalRotation((prev) => prev + oppRotationStep);
        setActiveOppIndex((prev) => (prev - 1 + oppCount) % oppCount);
        setIsOppManual(true);
        setTimeout(() => setIsOppManual(false), 8000);
    };
    const oppGoTo = (idx: number) => {
        const currentCycle = Math.round(oppTotalRotation / 360);
        let target = currentCycle * 360 - idx * oppRotationStep;
        if (Math.abs(target - oppTotalRotation) > 180) {
            target += target > oppTotalRotation ? -360 : 360;
        }
        setOppTotalRotation(target);
        setActiveOppIndex(idx);
        setIsOppManual(true);
        setTimeout(() => setIsOppManual(false), 8000);
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors">

                {/* ── HERO ──────────────────────────────────────────────────── */}
                <header className="relative bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3A9B9B]/8 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D3561]/6 blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left — Text */}
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
                                        href="/"
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black border-2 border-[#2D3561] dark:border-zinc-600 text-[#2D3561] dark:text-zinc-100 hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                    >
                                        Submit Collaboration Interest
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right — Quick highlights */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <GlassCard className="p-6 md:p-8">
                                    <div className="pt-2 grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Target, label: 'Problem-Driven', color: NAVY },
                                            { icon: Cpu, label: 'Prototype Dev', color: TEAL },
                                            { icon: Rocket, label: 'Startup Support', color: GREEN },
                                            { icon: FlaskConical, label: 'Sponsored Research', color: NAVY },
                                            { icon: Users, label: 'Student Talent', color: TEAL },
                                            { icon: TrendingUp, label: 'Tech Transfer', color: GREEN },
                                        ].map((item, i) => {
                                            const Icon = item.icon;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                                                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/40"
                                                >
                                                    <div
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-black text-zinc-700 dark:text-zinc-300 leading-tight">
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
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div
                                            className="text-xs font-black uppercase tracking-[0.15em] mb-2"
                                            style={{ color: cap.color }}
                                        >
                                            0{i + 1}
                                        </div>
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
                </section>

                {/* ── AREAS OF COLLABORATION ────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <SectionHeading
                        title="Areas of"
                        highlight="Collaboration"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <GlassCard className="p-6 md:p-10">
                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {collaborationAreas.map((area, i) => {
                                    const Icon = area.icon;
                                    return (
                                        <Link
                                            key={i}
                                            href="/what-we-do"
                                            className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                            style={{
                                                background: `${area.color}10`,
                                                border: `1.5px solid ${area.color}20`,
                                            }}
                                        >
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${area.color}20`, color: area.color }}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                                                {area.label}
                                            </span>
                                            <ExternalLink
                                                className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-60 transition-opacity"
                                                style={{ color: area.color }}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="mt-6 flex justify-center">
                                <Link
                                    href="/what-we-do"
                                    className="inline-flex items-center gap-2 text-sm font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                >
                                    Explore All Core Domains <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>
                </section>

                {/* ── WHY COLLABORATE + WHO CAN APPLY ──────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Why Collaborate */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <GlassCard className="p-6 md:p-10 h-full">
                                <div className="pt-2">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6">
                                        Why Collaborate with{' '}
                                        <span className="text-[#3A9B9B]">BanavatNest</span>
                                    </h2>
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
                        >
                            <GlassCard className="p-6 md:p-10 h-full">
                                <div className="pt-2">
                                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6">
                                        Who Can{' '}
                                        <span className="text-[#3A9B9B]">Apply</span>
                                    </h2>
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
                </section>

                {/* ── HOW TO COLLABORATE ────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <SectionHeading
                        title="How to"
                        highlight="Collaborate"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {howToCollaborate.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div
                                        className="relative rounded-[2rem] p-6 h-full flex flex-col gap-4
                      bg-white dark:bg-zinc-900/50
                      border border-zinc-100 dark:border-zinc-800
                      shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                    >
                                        <div
                                            className="text-4xl font-black tracking-tighter opacity-10 absolute top-4 right-5"
                                            style={{ color: step.color }}
                                        >
                                            {step.step}
                                        </div>
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: `${step.color}15`, color: step.color }}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                                        />
                                    </div>
                                    {i < howToCollaborate.length - 1 && (
                                        <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                                            <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── INDUSTRY COLLABORATION PROCESS ───────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <SectionHeading
                        title="Industry Collaboration Process —"
                        highlight="From Problem to Solution"
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
                </section>

                {/* ── POTENTIAL OUTCOMES ────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                    <SectionHeading
                        title="Potential"
                        highlight="Outcomes"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                                    className={`group relative rounded-[2rem] overflow-hidden ${outcome.bg}
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
                </section>

                {/* ── OPEN OPPORTUNITIES ────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 overflow-hidden">
                    <SectionHeading
                        title="Current / Open"
                        highlight="Opportunities"
                    />

                    <div className="flex flex-col items-center gap-8">

                        {/* MAIN 3D CONTAINER */}
                        <div
                            className="relative w-full max-w-2xl h-[360px] flex items-center justify-center"
                            style={{
                                perspective: '2400px',
                            }}
                        >

                            {/* ROLLING DICE */}
                            <motion.div
                                animate={{
                                    rotateX: oppTotalRotation,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 42,
                                    damping: 18,
                                    mass: 1.4,
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    willChange: 'transform',
                                }}
                            >

                                {openOpportunities.map((opp, index) => {

                                    const pos =
                                        (((oppTotalRotation / -oppRotationStep) % oppCount) +
                                            oppCount) %
                                        oppCount;

                                    const raw = Math.abs(pos - index);
                                    const dist = Math.min(raw, oppCount - raw);

                                    const isActive = dist < 0.45;
                                    const isNear = dist >= 0.45 && dist < 1.2;

                                    const opacity = isActive ? 1 : isNear ? 0.32 : 0.04;
                                    const scale = isActive ? 1 : isNear ? 0.88 : 0.72;

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                transform: `
                                    rotateX(${index * oppRotationStep}deg)
                                    translateZ(170px)
                                `,

                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',

                                                opacity,

                                                transition:
                                                    'opacity 0.45s ease, transform 0.45s ease',
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    scale: isActive ? 1.03 : scale,
                                                }}
                                                className="
                                    relative
                                    w-full
                                    max-w-[520px]
                                    rounded-[2.2rem]
                                    overflow-hidden
                                    border
                                    border-white/10
                                    dark:border-white/5
                                    bg-white
                                    dark:bg-zinc-900
                                    shadow-[0_20px_80px_rgba(0,0,0,0.18)]
                                    px-10
                                    py-12
                                "
                                                style={{
                                                    transform: `scale(${scale})`,
                                                    transition:
                                                        'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                                                }}
                                            >

                                                {/* Decorative Accent Line */}
                                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] z-20" />

                                                {/* ICON */}
                                                <div
                                                    className="mx-auto mb-6 w-16 h-16 rounded-[1.4rem] flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${opp.color}12`,
                                                        color: opp.color,
                                                    }}
                                                >
                                                    <Zap className="w-8 h-8" />
                                                </div>

                                                {/* TITLE */}
                                                <h3 className="
                                    text-2xl
                                    md:text-3xl
                                    font-black
                                    tracking-tight
                                    text-zinc-900
                                    dark:text-zinc-100
                                    text-center
                                    leading-snug
                                ">
                                                    {opp.title}
                                                </h3>

                                                {/* SUB LINE */}
                                                <div
                                                    className="mt-6 h-[2px] w-24 rounded-full mx-auto"
                                                    style={{
                                                        background: `linear-gradient(to right, transparent, ${opp.color}, transparent)`,
                                                    }}
                                                />

                                                {/* FLOATING LIGHT */}
                                                <div
                                                    className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[220px] h-[120px] blur-3xl opacity-10"
                                                    style={{
                                                        background: opp.color,
                                                    }}
                                                />
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            <div
                                className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
                                style={{ background: 'linear-gradient(to bottom, var(--bg-page, #fafafa), transparent)' }}
                            />

                            <div
                                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
                                style={{ background: 'linear-gradient(to top, var(--bg-page, #fafafa), transparent)' }}
                            />
                            <style>{`:root{--bg-page:#fafafa}.dark{--bg-page:#09090b}`}</style>
                        </div>

                        {/* CONTROLS */}
                        <div className="flex items-center gap-5">

                            {/* PREV */}
                            <button
                                onClick={oppPrev}
                                className="
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    dark:bg-zinc-900
                    border
                    border-zinc-200
                    dark:border-zinc-800
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:border-[#3A9B9B]
                "
                            >
                                <ChevronUp className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            </button>

                            {/* DOTS */}
                            <div className="flex items-center gap-3">
                                {openOpportunities.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => oppGoTo(idx)}
                                        className={`
                            rounded-full
                            transition-all
                            duration-500
                            ${idx === activeOppIndex
                                                ? 'w-8 h-2 bg-[#3A9B9B]'
                                                : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'}
                        `}
                                    />
                                ))}
                            </div>

                            {/* NEXT */}
                            <button
                                onClick={oppNext}
                                className="
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    dark:bg-zinc-900
                    border
                    border-zinc-200
                    dark:border-zinc-800
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:border-[#3A9B9B]
                "
                            >
                                <ChevronDown className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── OUR APPROACH ──────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <GlassCard className="p-6 md:p-12">
                            <div className="pt-2 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#3A9B9B] mb-4 px-3 py-1 rounded-full bg-[#3A9B9B]/10 border border-[#3A9B9B]/20">
                                        Our Philosophy
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4">
                                        Our{' '}
                                        <span className="text-[#3A9B9B]">Approach</span>
                                    </h2>
                                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                                        We adopt a problem-driven approach where industrial challenges and startup ideas are mapped into structured research, innovation, and prototype development activities. Through collaborative execution, technical mentoring, and interdisciplinary expertise, we aim to build scalable and impactful solutions.
                                    </p>
                                    <Link
                                        href="/bridge/collaboration"
                                        className="inline-flex items-center gap-2 font-black text-[#3A9B9B] hover:text-[#2a7676] transition-colors text-sm"
                                    >
                                        Explore our ecosystem <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Problem-Driven', icon: Target, color: NAVY },
                                        { label: 'Collaborative Execution', icon: Users, color: TEAL },
                                        { label: 'Technical Mentoring', icon: GraduationCap, color: GREEN },
                                        { label: 'Scalable Solutions', icon: TrendingUp, color: NAVY },
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
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* ── Final CTA ─────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                    >

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black text-white bg-[#3A9B9B] dark:bg-[#0d2a2a] dark:hover:bg-[#2a7676] shadow-xl transition-all duration-300 hover:scale-[1.04] active:scale-95"
                        >
                            Connect With Us <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-black text-base
                border-2 border-[#2D3561] dark:border-zinc-600
                text-[#2D3561] dark:text-zinc-100
                hover:bg-[#2D3561] hover:text-white dark:hover:bg-zinc-700
                transition-all duration-300 hover:scale-[1.04] active:scale-95"
                        >
                            Submit Collaboration Interest
                        </Link>
                    </motion.div>
                </section>
            </div>
        </PageWrapper>
    );
}
