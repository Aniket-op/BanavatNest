'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "BanavatNest gave us exactly what we couldn't find elsewhere — a structured bridge between our theoretical work and a live industrial deployment. The collaborative process was transparent, rigorous, and genuinely impactful.",
    name: 'Dr. Priya Mehta',
    role: 'Academic Researcher',
    dept: 'Dept. of Computer Science, IIT Patna',
    initial: 'PM',
    tag: 'Academia',
    tagColor: '#84CC16',
    accentLeft: '#84CC16',
    stars: 5,
  },
  {
    quote: "Working with BanavatNest brought academic depth to our robotics division. Their research team identified blind spots we'd overlooked for years. The prototype delivered exceeded our technical expectations significantly.",
    name: 'Rajiv Anand',
    role: 'Director of Innovation',
    dept: 'AutoTech Systems Pvt. Ltd.',
    initial: 'RA',
    tag: 'Industry',
    tagColor: '#3B82F6',
    accentLeft: '#3B82F6',
    stars: 5,
  },
];

const StarRow = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 text-[#84CC16]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-[#FAFAF7] dark:bg-[#0C0C0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[10px] font-black text-[#84CC16] uppercase tracking-[0.25em] mb-4">— From Our Network</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[0.9]">
            Voices of <span className="text-[#84CC16]">Trust</span>
          </h2>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="relative bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-8 md:p-10 overflow-hidden hover:shadow-2xl transition-all duration-400 hover:-translate-y-1 group"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full transition-all duration-300 group-hover:top-4 group-hover:bottom-4"
                style={{ backgroundColor: t.accentLeft }}
              />

              {/* Tag + stars */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: t.tagColor }}
                >
                  {t.tag}
                </span>
                <StarRow count={t.stars} />
              </div>

              {/* Quote */}
              <p className="text-base text-zinc-600 dark:text-zinc-300 font-medium leading-[1.8] mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ backgroundColor: t.tagColor }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{t.name}</p>
                  <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mt-0.5">{t.role}</p>
                  <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-600 mt-0.5">{t.dept}</p>
                </div>
              </div>

              {/* Decorative quote mark */}
              <div className="absolute bottom-5 right-7 text-[6rem] font-black text-zinc-100 dark:text-zinc-800 leading-none select-none pointer-events-none">
                &rdquo;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
