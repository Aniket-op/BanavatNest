'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, Fragment } from 'react';
import { Lightbulb, Building2, ArrowRight, GraduationCap, Factory, Shuffle } from 'lucide-react';

const problems = [
  {
    icon: GraduationCap,
    side: 'Academia',
    color: '#3B82F6',
    borderHover: 'hover:border-blue-500/30 dark:hover:border-blue-500/30',
    problem: 'Research without real-world application',
    bullets: [
      'Papers get published, innovations don\'t get deployed',
      'Students graduate without industry exposure',
      'Labs under-utilized, funding limited',
    ],
  },
  {
    icon: Factory,
    side: 'Industry',
    color: '#F59E0B',
    borderHover: 'hover:border-amber-500/30 dark:hover:border-amber-500/30',
    problem: 'Problems without cutting-edge solutions',
    bullets: [
      'Innovation slows without access to deep research',
      'High R&D costs, limited academic partnerships',
      'Talent pipelines disconnected from real needs',
    ],
  },
];

const usps = [
  {
    number: '01',
    title: 'We translate research into products',
    desc: 'Not just consulting — we take academic breakthroughs from whiteboard to working prototype to real deployment.',
    color: '#84CC16',
  },
  {
    number: '02',
    title: 'Structured collaboration framework',
    desc: 'A defined 4-stage process with milestone tracking, joint supervision, and IP clarity — not ad-hoc engagements.',
    color: '#3B82F6',
  },
  {
    number: '03',
    title: 'Four high-impact domains',
    desc: 'AI/ML, Cybersecurity, Smart Systems, and Agriculture — domains chosen for scalability and industry demand.',
    color: '#8B5CF6',
  },
  {
    number: '04',
    title: 'Proven by deployment, not just papers',
    desc: 'Our success metric isn\'t citations — it\'s live systems, technology transfers, and industry adoption.',
    color: '#10B981',
  },
];

function BridgeIcon({ inView }: { inView: boolean }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
      <div className="relative flex flex-col items-center gap-2">
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
          className="w-11 h-11 rounded-full bg-[#84CC16] flex items-center justify-center shadow-lg shadow-[#84CC16]/30 shrink-0 z-10"
        >
          <Shuffle className="w-4 h-4 text-zinc-900" />
        </motion.div>
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
      </div>
    </div>
  );
}

export default function StorySection() {
  const gapRef = useRef<HTMLDivElement>(null);
  const gapInView = useInView(gapRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* ══════════════════════════════════════════
          SECTION 1 — THE GAP (The Problem)
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-zinc-50 dark:bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-[#84CC16] uppercase tracking-widest mb-4">— The Problem We Solve</p>
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-5">
              There is a <span className="relative inline-block">
                <span className="text-zinc-600 dark:text-zinc-500">gap</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-red-400/60 dark:bg-red-500/50 rounded-full origin-left"
                />
              </span>{' '}
              between<br className="hidden sm:block" /> Academia and Industry.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
              Research stays in labs. Problems stay unsolved. <strong className="text-zinc-900 dark:text-zinc-100">BanavatNest is the bridge.</strong>
            </p>
          </motion.div>

          {/* Two columns + bridge icon */}
          <div ref={gapRef} className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 lg:p-4">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <Fragment key={p.side}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.3 }}
                    className={`flex-1 w-full rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 ${p.borderHover} p-8 md:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col`}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                        style={{ backgroundColor: `${p.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: p.color }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: p.color }}>The side of</p>
                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{p.side}</p>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 mt-auto">
                      {p.problem}
                    </h3>
                    <ul className="space-y-4">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-4 text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                          <span
                            className="mt-2 w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  {i % 2 === 0 && <BridgeIcon inView={gapInView} />}
                </Fragment>
              );
            })}

          </div>

          {/* Gap → Solution arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center mt-16 gap-4"
          >
            <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="inline-flex items-center gap-2 bg-[#84CC16] text-zinc-900 px-5 py-2.5 rounded-full font-black text-sm shadow-lg shadow-[#84CC16]/20">
              <Lightbulb className="w-4 h-4" />
              BanavatNest bridges this gap
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — OUR USP (Why Us)
      ══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0C0C0A] overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-xs font-bold text-[#84CC16] uppercase tracking-widest mb-5">— Why BanavatNest</p>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6">
                It's not consulting<br />
                It's not outsourcing<br />
                <span className="text-[#84CC16]">It's co-creation</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-center">
                BanavatNest is a <strong className="text-zinc-900 dark:text-zinc-100">research-led innovation ecosystem</strong> — not an agency, not a lab, not a vendor. We co-invest in solving problems alongside academia and industry using a structured, milestone-based framework.
              </p>
            </motion.div>

            {/* Right: USP list */}
            <div className="flex flex-col gap-4">
              {usps.map((u, idx) => (
                <motion.div
                  key={u.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                      {u.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-[1.7]">
                      {u.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
