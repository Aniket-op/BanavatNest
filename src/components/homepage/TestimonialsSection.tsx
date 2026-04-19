'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote, Award, Building2, User2, Laptop, FlaskConical } from 'lucide-react';
import ProjectCarousel from './ProjectCarousel';

const testimonials = [
  {
    quote: "BanavatNest gave us exactly what we couldn't find elsewhere — a structured bridge between our theoretical work and a live industrial deployment.",
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
    quote: "Working with BanavatNest brought academic depth to our robotics division. The prototype delivered exceeded our technical expectations significantly.",
    name: 'Rajiv Anand',
    role: 'Director of Innovation',
    dept: 'AutoTech Systems Pvt. Ltd.',
    initial: 'RA',
    tag: 'Industry',
    tagColor: '#3B82F6',
    accentLeft: '#3B82F6',
    stars: 5,
  },
  {
    quote: "The collaboration model is truly unique. It allowed our students to work on real-world industrial problems while maintaining academic rigor.",
    name: 'Prof. Alok Singh',
    role: 'Dean of R&D',
    dept: 'NIT Jamshedpur',
    initial: 'AS',
    tag: 'Academia',
    tagColor: '#84CC16',
    accentLeft: '#84CC16',
    stars: 5,
  },
];

const associates = [
  {
    name: 'IIT Patna',
    tag: 'Academic Partner',
    initial: 'IP',
    stars: 5,
    quote: 'Innovation hub for research excellence.',
    icon: <Building2 className="w-5 h-5" />,
    color: '#84CC16'
  },
  {
    name: 'AutoTech',
    tag: 'Industry Leader',
    initial: 'AT',
    stars: 5,
    quote: 'Superior prototype development and testing.',
    icon: <Laptop className="w-5 h-5" />,
    color: '#3B82F6'
  },
  {
    name: 'Dr. S. Sharma',
    tag: 'Research Fellow',
    initial: 'SS',
    stars: 5,
    quote: 'Rigor meets real-world application.',
    icon: <FlaskConical className="w-5 h-5" />,
    color: '#F59E0B'
  },
  {
    name: 'BuildNext',
    tag: 'Tech Partner',
    initial: 'BN',
    stars: 5,
    quote: 'Accelerating the future of building.',
    icon: <Award className="w-5 h-5" />,
    color: '#EC4899'
  },
];

const projects = [
  {
    title: "AI-Driven Prediction",
    desc: "A machine learning pipeline developed to help farmers predict harvest outcomes with 85% accuracy.",
    icon: <FlaskConical className="w-6 h-6" />,
    accent: "from-[#84CC16] to-[#4D7C0F]",
    iconGradient: "bg-gradient-to-br from-green-400 to-green-700",
    url: "/images/homepage/agriculture.jpg",
    href: "/projects/agriculture"
  },
  {
    title: "EcoSmart Grid",
    desc: "Smart energy management system using IoT to optimize power distribution in residential complexes.",
    icon: <Laptop className="w-6 h-6" />,
    accent: "from-[#3B82F6] to-[#1D4ED8]",
    iconGradient: "bg-gradient-to-br from-blue-400 to-blue-700",
    url: "/images/homepage/smart.jpg",
    href: "/projects/smart-grid"
  },
  {
    title: "MedLink Telemedicine",
    desc: "Bridging the gap between rural patients and urban specialists through a secure consultation hub.",
    icon: <Award className="w-6 h-6" />,
    accent: "from-[#EC4899] to-[#BE185D]",
    iconGradient: "bg-gradient-to-br from-pink-400 to-pink-700",
    url: "/images/homepage/smartHeath.png",
    href: "/projects/medlink"
  }
];

const StarRow = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3 h-3 text-[#84CC16] fill-[#84CC16]" />
    ))}
  </div>
);

const InfiniteVerticalCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[280px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 h-full flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-[#84CC16]/20 mb-4" />
              <p className="text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed italic">
                "{testimonials[index].quote}"
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white"
                style={{ backgroundColor: testimonials[index].tagColor }}
              >
                {testimonials[index].initial}
              </div>
              <div>
                <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">{testimonials[index].name}</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{testimonials[index].role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AssociatesMarquee = () => {
  return (
    <div className="mt-12">
      <h3 className="text-sm font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-6 pl-2">
        Associates
      </h3>
      <div className="relative overflow-hidden flex whitespace-nowrap group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 pr-4"
        >
          {[...associates, ...associates].map((a, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-32 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 p-4 flex flex-col justify-between hover:border-[#84CC16]/30 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-zinc-900 dark:text-zinc-100">{a.name}</p>
                    <p className="text-[10px] font-bold text-[#84CC16] tracking-tight">{a.tag}</p>
                  </div>
                </div>
                <StarRow count={a.stars} />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 italic line-clamp-2 leading-relaxed">
                "{a.quote}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="bg-[#FAFAF7] dark:bg-[#0C0C0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-24 min-h-[800px]">
          {/* Left Side: Testimonials & Associates */}
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-none mb-2">
                  Testimonials
                </h2>
                <div className="h-1 w-20 bg-[#84CC16] rounded-full mt-4" />
              </motion.div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#84CC16]/20 to-blue-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <InfiniteVerticalCarousel />
                </div>
              </div>
            </div>

            <AssociatesMarquee />
          </div>

          {/* Right Side: Featured Projects */}
          <div className="relative h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 lg:text-right"
            >
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-none">
                Featured <span className="text-[#84CC16]">Projects</span>
              </h2>
              <div className="h-1 w-20 bg-[#84CC16] rounded-full mt-4 ml-auto" />
            </motion.div>

            <div className="relative group flex-grow">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-[#84CC16]/10 rounded-[3.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative h-full bg-zinc-100/50 dark:bg-zinc-900/30 rounded-[3rem] p-4 lg:p-6 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm overflow-hidden">
                <ProjectCarousel items={projects} />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-[#84CC16]/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

