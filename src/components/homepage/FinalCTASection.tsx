'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Mail } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-28 bg-white dark:bg-[#0C0C0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Main CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-zinc-950 dark:bg-zinc-950"
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(#84CC16 1px, transparent 1px)', backgroundSize: '30px 30px' }}
          />

          {/* Green glow */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#84CC16]/20 blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 9, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-[#5D3A1A]/20 blur-[100px] pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-24 lg:py-28 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#84CC16]/15 border border-[#84CC16]/25 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                <span className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.2em]">Let&apos;s collaborate</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-50 tracking-[-0.04em] leading-[0.88] mb-6"
              >
                Ready to build<br />
                with{' '}
                <span className="text-[#84CC16]">Purpose</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-zinc-400 font-medium leading-[1.75]"
              >
                Whether you&apos;re an academic researcher or an industry leader — let&apos;s transform your challenge into measurable, real-world impact.
              </motion.p>
            </div>

            {/* Right buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0"
            >
              <Link
                href="/contact"
                id="final-cta-contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#84CC16] hover:bg-[#65A30D] text-zinc-900 font-black text-sm pl-7 pr-6 py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(132,204,22,0.3)] hover:shadow-[0_12px_40px_rgba(132,204,22,0.45)] hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                Contact Us
                <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              <Link
                href="/bridge/collaboration"
                id="final-cta-consultation"
                className="inline-flex items-center justify-center gap-2 border-2 border-zinc-700 bg-transparent text-zinc-200 font-black text-sm px-7 py-4 rounded-full hover:border-zinc-500 hover:bg-zinc-900 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Request a Consultation
              </Link>
            </motion.div>
          </div>

          {/* Decorative corner lines */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#84CC16]/30 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#84CC16]/30 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#84CC16]/30 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#84CC16]/30 rounded-br-xl pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
