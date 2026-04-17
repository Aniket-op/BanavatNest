'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Brain, Shield, Cpu, Leaf, ArrowUpRight } from 'lucide-react';

const domains = [
  {
    icon: Brain,
    title: 'AI / ML',
    desc: 'Intelligent algorithms for prediction, optimization, and data-driven discovery.',
    tag: 'Artificial Intelligence',
    accent: '#3B82F6',
    accentLight: '#EFF6FF',
    accentDark: '#1E3A5F',
    href: '/what-we-do/domains/ai-ml-data-science',
    number: '01',
  },
  {
    icon: Shield,
    title: 'Cyber',
    desc: 'Secure IoT, networks, and blockchain-enabled digital infrastructure.',
    tag: 'Cybersecurity',
    accent: '#10B981',
    accentLight: '#ECFDF5',
    accentDark: '#064E3B',
    href: '/what-we-do/domains/cybersecurity-iot-blockchain',
    number: '02',
  },
  {
    icon: Cpu,
    title: 'Smart Systems',
    desc: 'Sensor-integrated automation for healthcare and sustainable environments.',
    tag: 'IoT & Automation',
    accent: '#8B5CF6',
    accentLight: '#F5F3FF',
    accentDark: '#3B1E6D',
    href: '/what-we-do/domains/smart-systems-healthcare-sustainability',
    number: '03',
  },
  {
    icon: Leaf,
    title: 'Agriculture',
    desc: 'Precision farming with real-time IoT monitoring and AI analytics.',
    tag: 'Smart Farming',
    accent: '#84CC16',
    accentLight: '#F7FEE7',
    accentDark: '#1a3302',
    href: '/what-we-do/domains/agriculture-smart-farming',
    number: '04',
  },
];

export default function CoreDomainsSection() {
  return (
    <section className="bg-white dark:bg-[#0C0C0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.25em] mb-4">— Research Domains</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[0.9]">
              Our Core<br />
              <span className="text-[#84CC16]">Domains</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base text-zinc-500 dark:text-zinc-400 font-medium leading-[1.75] max-w-sm lg:text-right"
          >
            Four high-impact technology areas where academia meets industry challenges.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative"
              >
                <Link href={domain.href} className="block h-full">
                  <div
                    className="relative h-full rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    {/* Number watermark */}
                    <span className="absolute top-5 right-6 text-[4rem] font-black leading-none text-zinc-100 dark:text-zinc-800 select-none transition-opacity duration-500 group-hover:opacity-0">
                      {domain.number}
                    </span>

                    {/* Hover subtle glow */}
                    <div
                      className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none dark:hidden"
                      style={{
                        background: `radial-gradient(circle at top right, ${domain.accent}1A, transparent 70%)`
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                      style={{
                        background: `radial-gradient(circle at top right, ${domain.accent}26, transparent 70%)`
                      }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5" style={{ color: domain.accent }} />
                    </div>

                    {/* Tag */}
                    <p className="relative z-10 text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: domain.accent }}>
                      {domain.tag}
                    </p>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                      {domain.title}
                    </h3>

                    {/* Desc */}
                    <p className="relative z-10 text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-[1.7]">
                      {domain.desc}
                    </p>

                    {/* Explore arrow */}
                    <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-black opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: domain.accent }}>
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
