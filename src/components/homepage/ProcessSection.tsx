'use client';

import { motion } from 'framer-motion';
import { Search, Users, Cpu, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We map industry problems to academic research opportunities through structured problem definition workshops.',
    color: '#84CC16',
    bg: 'bg-[#F7FEE7] dark:bg-[#1a2a06]',
  },
  {
    number: '02',
    icon: Users,
    title: 'Collaborative Research',
    desc: 'Students, faculty, and industry partners co-investigate problems under joint supervision and milestone-based planning.',
    color: '#3B82F6',
    bg: 'bg-[#EFF6FF] dark:bg-[#0f1e3d]',
  },
  {
    number: '03',
    icon: Cpu,
    title: 'Pilot Implementation',
    desc: 'Validated prototypes are deployed in real controlled environments — gathering evidence and refining systems.',
    color: '#8B5CF6',
    bg: 'bg-[#F5F3FF] dark:bg-[#1e1040]',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Scale & Impact',
    desc: 'Successful pilots are scaled, technology-transferred, or commercialized with long-term industry adoption.',
    color: '#10B981',
    bg: 'bg-[#ECFDF5] dark:bg-[#042f20]',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0C0C0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.25em] mb-4">— How It Works</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[0.9] mb-5">
            The <span className="text-[#84CC16]">banavatNest</span> Process
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-md mx-auto leading-relaxed">
            From problem discovery to real-world deployment — a proven four-stage framework.
          </p>
        </motion.div>

        {/* ── Step cards w/ connector line ── */}
        <div className="relative">
          {/* Horizontal line desktop */}
          <div className="lg:block absolute top-[4.5rem] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent pointer-events-none z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="group relative"
                >
                  {/* Arrow connector (desktop) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-[3.6rem] -right-3 z-20">
                      <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                        <path d="M0 5 H20 M14 1 L20 5 L14 9" stroke="#84CC16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  <div className={`relative rounded-[1.75rem] ${step.bg} border border-transparent hover:border-[#84CC16]/30 p-7 h-full transition-all duration-400 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden`}>
                    {/* Dark mode glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                      style={{
                        background: `radial-gradient(circle at top right, ${step.color}55, transparent 70%)`
                      }}
                    />

                    {/* Step number (top) */}
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      {/* Icon */}
                      <div
                        className="w-[3.25rem] h-[3.25rem] rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-900 shadow-sm transition-transform duration-300 group-hover:scale-110"
                      >
                        <Icon className="w-[1.1rem] h-[1.1rem]" style={{ color: step.color }} />
                      </div>
                      {/* Number badge */}
                      <span className="text-[2.5rem] font-black leading-none tracking-tighter text-zinc-900/10 dark:text-zinc-100/10 select-none">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="relative z-10 text-base font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="relative z-10 text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-[1.7]">
                      {step.desc}
                    </p>

                    {/* Bottom accent bar animate on hover */}
                    <div
                      className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Ready to start your collaboration journey?
          </p>
          <a
            href="/contact"
            className="text-sm font-black text-[#84CC16] hover:underline underline-offset-4 transition-all"
          >
            Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
