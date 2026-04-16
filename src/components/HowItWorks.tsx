'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Small Timeline Window SVG Icons ---

const DiscoverTimelineVisual = () => (
    <svg viewBox="0 0 100 50" className="w-full h-full relative z-10" fill="none">
        <circle cx="50" cy="25" r="8" stroke="#84CC16" strokeWidth="1.5" />
        <circle cx="50" cy="25" r="3" fill="#84CC16" />
        <line x1="50" y1="25" x2="25" y2="15" stroke="#84CC16" strokeWidth="1" opacity="0.6" className="animate-pulse" />
        <circle cx="25" cy="15" r="4" fill="#22d3ee" />
        <line x1="50" y1="25" x2="75" y2="15" stroke="#84CC16" strokeWidth="1" opacity="0.6" className="animate-pulse" />
        <circle cx="75" cy="15" r="4" fill="#22d3ee" />
        <line x1="50" y1="25" x2="50" y2="42" stroke="#84CC16" strokeWidth="1" opacity="0.6" className="animate-pulse" />
        <circle cx="50" cy="42" r="4" fill="#22d3ee" />
    </svg>
);

const DesignTimelineVisual = () => (
    <svg viewBox="0 0 100 50" className="w-full h-full relative z-10" fill="none">
        <rect x="20" y="10" width="60" height="30" rx="3" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
        <rect x="25" y="15" width="50" height="8" rx="2" fill="#22d3ee" opacity="0.3" />
        <rect x="25" y="26" width="15" height="10" rx="2" fill="#22d3ee" opacity="0.3" />
        <rect x="43" y="26" width="32" height="10" rx="2" fill="#84CC16" opacity="0.6" />
    </svg>
);

const BuildTimelineVisual = () => (
    <svg viewBox="0 0 100 50" className="w-full h-full relative z-10" fill="none">
        <path d="M 30 25 L 45 15 L 70 15" stroke="#84CC16" strokeWidth="1.5" opacity="0.7" />
        <path d="M 30 25 L 45 35 L 70 35" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
        <circle cx="30" cy="25" r="4" fill="#eab308" />
        <rect x="70" y="10" width="10" height="10" rx="2" fill="#84CC16" opacity="0.8" />
        <rect x="70" y="30" width="10" height="10" rx="2" fill="#22d3ee" opacity="0.8" />
    </svg>
);

const LaunchTimelineVisual = () => (
    <svg viewBox="0 0 100 50" className="w-full h-full relative z-10" fill="none">
        <polygon points="35,15 45,15 50,25 45,35 35,35 30,25" stroke="#3b82f6" strokeWidth="1.5" fill="#3b82f6" fillOpacity="0.2" />
        <line x1="50" y1="25" x2="65" y2="15" stroke="#84CC16" strokeWidth="1.5" opacity="0.8" />
        <line x1="50" y1="25" x2="70" y2="25" stroke="#84CC16" strokeWidth="1.5" opacity="0.8" />
        <line x1="50" y1="25" x2="65" y2="35" stroke="#84CC16" strokeWidth="1.5" opacity="0.8" />
        <circle cx="65" cy="15" r="3" fill="#22d3ee" />
        <circle cx="70" cy="25" r="3" fill="#22d3ee" />
        <circle cx="65" cy="35" r="3" fill="#22d3ee" />
    </svg>
);

const TimelineWindow = ({ children, glowColor }: { children: React.ReactNode, glowColor: string }) => (
    <div
        className="relative w-20 h-14 md:w-32 md:h-20 lg:w-36 lg:h-24 rounded border border-white/10 bg-[#121214] shadow-xl flex flex-col overflow-hidden shrink-0 group transition-all duration-300 hover:scale-105"
        style={{ boxShadow: `0 0 30px -5px ${glowColor}50` }}
    >
        <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-2 border-b border-white/5 bg-[#18181b]/80">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/80" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/80" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 flex items-center justify-center p-1 md:p-2 relative bg-[#09090b]">
            <div className="absolute inset-0 opacity-[0.15]" style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }} />
            {children}
        </div>
    </div>
);


// --- Large Card SVG Icons ---

const CardGridBg = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500"
        style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
        }}
    />
);

const DiscoverCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <path d="M 40 60 L 60 40 L 90 40 L 110 50" stroke="#84CC16" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 40 60 L 60 80 L 80 80 L 100 65" stroke="#84CC16" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="30" cy="60" r="12" fill="#84CC16" fillOpacity="0.1" stroke="#84CC16" strokeWidth="1" />
        <circle cx="30" cy="60" r="4" fill="#84CC16" />
        <circle cx="60" cy="40" r="3" fill="#22d3ee" />
        <circle cx="90" cy="40" r="4" fill="#eab308" />
        <circle cx="60" cy="80" r="4" fill="#22d3ee" />
        <circle cx="80" cy="80" r="3" fill="#eab308" />

        <g transform="translate(115, 45)">
            <circle cx="15" cy="15" r="20" fill="#eab308" fillOpacity="0.08" stroke="#eab308" strokeWidth="1" strokeDasharray="2 4" />
            <path d="M 10 24 Q 15 32 20 24" stroke="#eab308" strokeWidth="2" fill="none" />
            <line x1="15" y1="32" x2="15" y2="38" stroke="#eab308" strokeWidth="2" />
            <circle cx="15" cy="15" r="5" fill="#eab308" />
            <line x1="15" y1="-5" x2="15" y2="-12" stroke="#eab308" strokeWidth="2" opacity="0.6" />
            <line x1="-2" y1="3" x2="-8" y2="-2" stroke="#eab308" strokeWidth="2" opacity="0.6" />
            <line x1="32" y1="3" x2="38" y2="-2" stroke="#eab308" strokeWidth="2" opacity="0.6" />
        </g>
    </svg>
);

const DesignCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <rect x="25" y="25" width="55" height="70" rx="4" stroke="#22d3ee" strokeWidth="1.5" fill="#22d3ee" fillOpacity="0.05" />
        <rect x="32" y="32" width="41" height="15" rx="2" fill="#22d3ee" fillOpacity="0.2" />
        <rect x="32" y="52" width="18" height="36" rx="2" fill="#22d3ee" fillOpacity="0.1" />
        <rect x="54" y="52" width="19" height="16" rx="2" fill="#22d3ee" fillOpacity="0.1" />
        <rect x="54" y="72" width="19" height="16" rx="2" fill="#22d3ee" fillOpacity="0.1" />

        <rect x="120" y="35" width="60" height="50" rx="4" stroke="#84CC16" strokeWidth="1.5" fill="#84CC16" fillOpacity="0.05" />
        <rect x="126" y="41" width="48" height="12" rx="2" fill="#84CC16" fillOpacity="0.2" />
        <rect x="126" y="56" width="22" height="23" rx="2" fill="#84CC16" fillOpacity="0.1" />
        <rect x="152" y="56" width="22" height="23" rx="2" fill="#84CC16" fillOpacity="0.1" />

        <path d="M 85 45 Q 100 35 115 45" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <polygon points="115,45 110,41 108,48" fill="#3b82f6" />
        <path d="M 115 75 Q 100 85 85 75" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <polygon points="85,75 90,79 92,72" fill="#3b82f6" />
    </svg>
);

const BuildCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <path d="M 100 35 A 25 25 0 1 1 75 60" stroke="#84CC16" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        <polygon points="75,60 70,53 80,53" fill="#84CC16" transform="rotate(-30 75 60)" />
        <path d="M 100 85 A 25 25 0 0 1 125 60" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        <polygon points="125,60 120,67 130,67" fill="#22d3ee" transform="rotate(-30 125 60)" />

        <rect x="83" y="43" width="34" height="34" rx="4" stroke="#eab308" strokeWidth="1.5" fill="#eab308" fillOpacity="0.05" />
        <path d="M 90 53 L 97 60 L 90 67" stroke="#eab308" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="102" y1="67" x2="110" y2="67" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />

        <rect x="25" y="48" width="30" height="4" rx="2" fill="#84CC16" opacity="0.6" />
        <rect x="25" y="58" width="20" height="4" rx="2" fill="#84CC16" opacity="0.3" />
        <rect x="25" y="68" width="35" height="4" rx="2" fill="#84CC16" opacity="0.6" />

        <rect x="145" y="48" width="25" height="4" rx="2" fill="#22d3ee" opacity="0.6" />
        <rect x="145" y="58" width="35" height="4" rx="2" fill="#22d3ee" opacity="0.3" />
        <rect x="145" y="68" width="15" height="4" rx="2" fill="#22d3ee" opacity="0.6" />
    </svg>
);

const LaunchCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <rect x="40" y="30" width="36" height="60" rx="4" stroke="#3b82f6" strokeWidth="1.5" fill="#3b82f6" fillOpacity="0.1" />
        <line x1="46" y1="45" x2="70" y2="45" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <line x1="46" y1="60" x2="70" y2="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <line x1="46" y1="75" x2="70" y2="75" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <circle cx="50" cy="45" r="2" fill="#3b82f6" />
        <circle cx="50" cy="60" r="2" fill="#3b82f6" />
        <circle cx="50" cy="75" r="2" fill="#3b82f6" />

        <path d="M 76 60 L 96 60 L 96 35 L 115 35" stroke="#84CC16" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
        <path d="M 76 60 L 115 60" stroke="#84CC16" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
        <path d="M 76 60 L 96 60 L 96 85 L 115 85" stroke="#84CC16" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />

        <rect x="115" y="25" width="45" height="20" rx="4" stroke="#84CC16" strokeWidth="1.5" fill="#84CC16" fillOpacity="0.1" />
        <circle cx="125" cy="35" r="3" fill="#84CC16" />
        <rect x="135" y="32" width="18" height="6" rx="2" fill="#84CC16" fillOpacity="0.3" />

        <rect x="115" y="50" width="45" height="20" rx="4" stroke="#84CC16" strokeWidth="1.5" fill="#84CC16" fillOpacity="0.1" />
        <circle cx="125" cy="60" r="3" fill="#84CC16" />
        <rect x="135" y="57" width="18" height="6" rx="2" fill="#84CC16" fillOpacity="0.3" />

        <rect x="115" y="75" width="45" height="20" rx="4" stroke="#84CC16" strokeWidth="1.5" fill="#84CC16" fillOpacity="0.1" />
        <circle cx="125" cy="85" r="3" fill="#84CC16" />
        <rect x="135" y="82" width="18" height="6" rx="2" fill="#84CC16" fillOpacity="0.3" />

        <circle cx="180" cy="35" r="15" fill="#22d3ee" fillOpacity="0.08" />
        <circle cx="180" cy="60" r="22" fill="#22d3ee" fillOpacity="0.08" />
        <circle cx="180" cy="85" r="15" fill="#22d3ee" fillOpacity="0.08" />
    </svg>
);

// --- Data ---

const stepsData = [
    {
        id: '01',
        label: 'Discover',
        desc: 'Deep exploration of ideas, problem discovery, and validation.',
        glow: '#84CC16',
        WindowIcon: DiscoverTimelineVisual,
        CardIcon: DiscoverCardIcon
    },
    {
        id: '02',
        label: 'Design',
        desc: 'Rapid prototyping to test concepts and refine solutions.',
        glow: '#22d3ee',
        WindowIcon: DesignTimelineVisual,
        CardIcon: DesignCardIcon
    },
    {
        id: '03',
        label: 'Build',
        desc: 'Development, testing, and continuous system iteration cycles.',
        glow: '#eab308',
        WindowIcon: BuildTimelineVisual,
        CardIcon: BuildCardIcon
    },
    {
        id: '04',
        label: 'Launch & Scale',
        desc: 'Scaling solutions into real-world, production-ready systems.',
        glow: '#3b82f6',
        WindowIcon: LaunchTimelineVisual,
        CardIcon: LaunchCardIcon
    }
];

// --- Main Component ---

export default function HowItWorks() {
    return (
        <section className="relative w-full pt-16 pb-32 grid-bg bg-zinc-50 dark:bg-[#09090b] overflow-hidden" id="how-it-works">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Section Headings --- */}
                <div className="text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#84CC16]">02</span>
                        <span className="w-6 h-[1px] bg-[#84CC16]/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">How It Works</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-5"
                    >
                        Our Process: <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#84CC16] to-[#22d3ee]">From Idea to Impact</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 max-w-2xl mx-auto md:text-lg font-medium"
                    >
                        A streamlined, proven workflow designed to transform concepts into scalable products.
                    </motion.p>
                </div>


                {/* --- Timeline Graphic --- */}
                <div className="relative mb-24 hidden md:block">
                    {/* Top Labels */}
                    <div className="flex justify-between items-center text-[11px] font-bold text-zinc-500 dark:text-zinc-600 tracking-[0.2em] uppercase mb-8 w-full px-4 lg:px-12">
                        {stepsData.map((step, idx) => (
                            <React.Fragment key={`label-${step.id}`}>
                                <span className="flex-1 text-center truncate px-2">{step.label}</span>
                                {idx < stepsData.length - 1 && (
                                    <span className="text-zinc-300 dark:text-zinc-800 shrink-0">→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Timeline Nodes & Lines */}
                    <div className="relative flex items-center justify-between w-full z-10 lg:px-6">
                        {stepsData.map((step, idx) => (
                            <React.Fragment key={`node-${step.id}`}>
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative z-20 shrink-0"
                                >
                                    <TimelineWindow glowColor={step.glow}>
                                        <step.WindowIcon />
                                    </TimelineWindow>
                                </motion.div>

                                {idx < stepsData.length - 1 && (
                                    <div className="flex-1 flex items-center relative z-0 mx-2 md:mx-4">
                                        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-full" />
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (idx * 0.1) }}
                                            className="mx-auto w-2.5 h-2.5 rounded-full z-10 bg-zinc-400 dark:bg-zinc-600 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* --- Cards Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stepsData.map((step, idx) => (
                        <motion.div
                            key={`card-${step.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="group relative flex flex-col bg-zinc-100 dark:bg-[#121214] border border-zinc-200 dark:border-white/5 rounded-2xl p-6 overflow-hidden hover:border-[#84CC16]/30 dark:hover:border-[#84CC16]/30 transition-all duration-500 h-full shadow-lg dark:shadow-none"
                        >
                            <CardGridBg />
                            
                            <h3 className="text-[13px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest mb-6 relative z-10 transition-colors group-hover:text-[#84CC16]">
                                {step.label}
                            </h3>
                            
                            <div className="flex-1 flex items-center justify-center min-h-[160px] py-4 relative z-10 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transform">
                                <step.CardIcon />
                            </div>
                            
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-6 relative z-10 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
