'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Large Card SVG Icons ---

const CardGridBg = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04] group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500 text-zinc-900 dark:text-white"
        style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
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
        <circle cx="60" cy="40" r="3" fill="#06b6d4" />
        <circle cx="90" cy="40" r="4" fill="#06b6d4" />
        <circle cx="60" cy="80" r="4" fill="#06b6d4" />
        <circle cx="80" cy="80" r="3" fill="#06b6d4" />

        <g transform="translate(115, 45)">
            <circle cx="15" cy="15" r="20" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 4" />
            <path d="M 10 24 Q 15 32 20 24" stroke="#06b6d4" strokeWidth="2" fill="none" />
            <line x1="15" y1="32" x2="15" y2="38" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="15" cy="15" r="5" fill="#06b6d4" />
            <line x1="15" y1="-5" x2="15" y2="-12" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
            <line x1="-2" y1="3" x2="-8" y2="-2" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
            <line x1="32" y1="3" x2="38" y2="-2" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
        </g>
    </svg>
);

const DesignCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <rect x="25" y="25" width="55" height="70" rx="4" stroke="#a855f7" strokeWidth="1.5" fill="#a855f7" fillOpacity="0.05" />
        <rect x="32" y="32" width="41" height="15" rx="2" fill="#a855f7" fillOpacity="0.2" />
        <rect x="32" y="52" width="18" height="36" rx="2" fill="#a855f7" fillOpacity="0.1" />
        <rect x="54" y="52" width="19" height="16" rx="2" fill="#a855f7" fillOpacity="0.1" />
        <rect x="54" y="72" width="19" height="16" rx="2" fill="#a855f7" fillOpacity="0.1" />

        <rect x="120" y="35" width="60" height="50" rx="4" stroke="#ec4899" strokeWidth="1.5" fill="#ec4899" fillOpacity="0.05" />
        <rect x="126" y="41" width="48" height="12" rx="2" fill="#ec4899" fillOpacity="0.2" />
        <rect x="126" y="56" width="22" height="23" rx="2" fill="#ec4899" fillOpacity="0.1" />
        <rect x="152" y="56" width="22" height="23" rx="2" fill="#ec4899" fillOpacity="0.1" />

        <path d="M 85 45 Q 100 35 115 45" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <polygon points="115,45 110,41 108,48" fill="#a855f7" />
        <path d="M 115 75 Q 100 85 85 75" stroke="#ec4899" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <polygon points="85,75 90,79 92,72" fill="#ec4899" />
    </svg>
);

const BuildCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <rect x="83" y="43" width="34" height="34" rx="4" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.05" />
        <path d="M 90 53 L 97 60 L 90 67" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="102" y1="67" x2="110" y2="67" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

        <rect x="25" y="48" width="30" height="4" rx="2" fill="#f59e0b" opacity="0.6" />
        <rect x="25" y="58" width="20" height="4" rx="2" fill="#f59e0b" opacity="0.3" />
        <rect x="25" y="68" width="35" height="4" rx="2" fill="#f59e0b" opacity="0.6" />

        <rect x="145" y="48" width="25" height="4" rx="2" fill="#84CC16" opacity="0.6" />
        <rect x="145" y="58" width="35" height="4" rx="2" fill="#84CC16" opacity="0.3" />
        <rect x="145" y="68" width="15" height="4" rx="2" fill="#84CC16" opacity="0.6" />
    </svg>
);

const LaunchCardIcon = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl" fill="none">
        <rect x="40" y="30" width="36" height="60" rx="4" stroke="#10b981" strokeWidth="1.5" fill="#10b981" fillOpacity="0.1" />
        <line x1="46" y1="45" x2="70" y2="45" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <line x1="46" y1="60" x2="70" y2="60" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <line x1="46" y1="75" x2="70" y2="75" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <circle cx="50" cy="45" r="2" fill="#10b981" />
        <circle cx="50" cy="60" r="2" fill="#10b981" />
        <circle cx="50" cy="75" r="2" fill="#10b981" />

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

        <circle cx="180" cy="35" r="15" fill="#34d399" fillOpacity="0.08" />
        <circle cx="180" cy="60" r="22" fill="#34d399" fillOpacity="0.08" />
        <circle cx="180" cy="85" r="15" fill="#34d399" fillOpacity="0.08" />
    </svg>
);

// --- Data ---

const stepsData = [
    {
        id: '01',
        label: 'Research',
        desc: 'Deep exploration of ideas, problem discovery, and validation.',
        glow: '#84CC16',
        CardIcon: DiscoverCardIcon
    },
    {
        id: '02',
        label: 'Build Prototype',
        desc: 'Rapid prototyping to test concepts and refine solutions.',
        glow: '#a855f7', // Purple logic
        CardIcon: DesignCardIcon
    },
    {
        id: '03',
        label: 'Deploy',
        desc: 'Scaling solutions into real-world, production-ready systems.',
        glow: '#10b981', // Emerald
        CardIcon: LaunchCardIcon
    }
];

// --- Main Component ---

export default function HowItWorks() {
    return (
        <section className="relative w-full pt-16 pb-32 grid-bg bg-zinc-50 dark:bg-[#09090b] overflow-hidden" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Section Headings --- */}
                <div className="text-center mb-20 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6"
                    >
                        What We <span className="bg-clip-text text-transparent bg-[#65A30D] "> Do?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        A streamlined, proven workflow designed to transform concepts into scalable products.
                    </motion.p>
                </div>


                {/* --- Cards Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {stepsData.map((step, idx) => (
                        <motion.div
                            key={`card-${step.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="group relative flex flex-col bg-white dark:bg-[#121214] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 overflow-hidden hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-500 h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
                            style={{
                                // Adds a very faint glow matching the step's theme color on hover
                                boxShadow: `0 10px 40px -10px ${step.glow}15`
                            }}
                        >
                            <CardGridBg />

                            <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest mb-6 relative z-10 transition-colors" style={{ color: step.glow }}>
                                {step.label}
                            </h3>

                            <div className="flex-1 flex items-center justify-center min-h-[160px] py-4 relative z-10 w-full opacity-90 transition-transform duration-500 group-hover:scale-[1.03] transform">
                                <step.CardIcon />
                            </div>

                            <p className="text-gray-500 dark:text-zinc-400 text-base mt-6 relative z-10 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
