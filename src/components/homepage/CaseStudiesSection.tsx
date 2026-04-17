'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Tag } from 'lucide-react';

const caseStudies = [
  {
    image: '/images/homepage/Ai.jpg',
    tag: 'AI Research',
    tagColor: '#3B82F6',
    title: 'University Lab and Research',
    desc: 'ML models for predictive analytics co-developed with IIT-affiliated researchers, deployed across 3 research institutions.',
    metric: '3 institutions',
    metricLabel: 'Deployed at',
    wide: true,
  },
  {
    image: '/images/homepage/cyberSecure.jpg',
    tag: 'Cybersecurity',
    tagColor: '#10B981',
    title: 'Factory Robotics Collaboration',
    desc: 'IoT-integrated security frameworks for smart manufacturing — reducing threat detection time by 60%.',
    metric: '60% faster',
    metricLabel: 'Threat detection',
    wide: false,
  },
  {
    image: '/images/homepage/Our-Vision.png',
    tag: 'Smart Systems',
    tagColor: '#8B5CF6',
    title: 'Smart Healthcare Monitoring',
    desc: 'Sensor-based patient monitoring system validated across pilot hospital deployments.',
    metric: '2 hospitals',
    metricLabel: 'Pilot sites',
    wide: false,
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="py-28 bg-[#FAFAF7] dark:bg-[#0C0C0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.25em] mb-4">— Impact Stories</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[0.9]">
              <span className="text-[#84CC16]">Case</span>{' '}
              <span className="text-zinc-900 dark:text-zinc-50">Studies</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs leading-relaxed">
            Selected collaborations showing real outcomes between academic research and industrial deployment.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Wide card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative rounded-[2rem] overflow-hidden bg-zinc-900 dark:bg-zinc-900 h-[340px] sm:h-[440px] cursor-pointer"
          >
            <Image
              src={caseStudies[0].image}
              alt={caseStudies[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-70"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: `${caseStudies[0].tagColor}CC` }}
                >
                  {caseStudies[0].tag}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Bottom */}
              <div>
                {/* Metric chip */}
                <div className="inline-flex items-center gap-2 bg-[#84CC16]/20 border border-[#84CC16]/30 rounded-full px-3 py-1.5 mb-4">
                  <span className="text-xs font-black text-[#84CC16]">{caseStudies[0].metric}</span>
                  <span className="text-[9px] font-bold text-[#84CC16]/70 uppercase tracking-wider">{caseStudies[0].metricLabel}</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">{caseStudies[0].title}</h3>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed max-w-sm">{caseStudies[0].desc}</p>
              </div>
            </div>
          </motion.div>

          {/* Stacked narrow cards */}
          <div className="flex flex-col gap-5">
            {caseStudies.slice(1).map((study, idx) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + idx * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden bg-zinc-900 dark:bg-zinc-900 h-[200px] sm:h-[210px] cursor-pointer flex-1"
              >
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-65 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-zinc-950/30" />

                <div className="absolute inset-0 flex items-center justify-between p-7">
                  <div className="flex-1">
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full text-white inline-block mb-3"
                      style={{ backgroundColor: `${study.tagColor}CC` }}
                    >
                      {study.tag}
                    </span>
                    <h3 className="text-lg font-black text-white tracking-tight mb-1.5">{study.title}</h3>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-[260px] line-clamp-2">{study.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[#84CC16]">
                      <span className="text-xs font-black">{study.metric}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{study.metricLabel}</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
