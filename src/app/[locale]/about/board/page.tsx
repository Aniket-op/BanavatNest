'use client';

import { motion } from 'framer-motion';
import { CircleDot, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageWrapper from '@/components/PageWrapper';

function SparklesIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        </svg>
    );
}

function ArrowUpRightIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
        </svg>
    );
}

export default function BoardPage() {
    const t = useTranslations('aboutBoard');
    const tBoard = useTranslations('boardPage');

    const featurePoints = [
        { title: tBoard('feat1'), color: 'bg-[#3A9B9B]' },
        { title: tBoard('feat2'), color: 'bg-[#2D3561]' },
        { title: tBoard('feat3'), color: 'bg-[#3A9B9B]' },
    ];

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors">

                {/* ── Section 1: STEP-TIET Incubation Mentor ── */}
                <section className="relative overflow-hidden bg-zinc-50 dark:bg-[#09090b] py-16 pt-32 transition-colors duration-300 flex items-center">
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-40" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(58,155,155,0.12) 1.5px, transparent 1.5px)',
                        backgroundSize: '40px 40px',
                    }} />
                    {/* Background blobs */}
                    <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[#3A9B9B]/15 blur-[130px]" />
                    <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[#2D3561]/15 blur-[130px]" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Left: Content */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#3A9B9B]/20 bg-[#E8F7F7] dark:bg-zinc-900/70 dark:border-[#3A9B9B]/30 px-5 py-2.5 mb-8"
                                >
                                    <SparklesIcon className="w-4 h-4 text-[#3A9B9B]" />
                                    <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2D3561] dark:text-[#3A9B9B] uppercase">
                                        {tBoard('badge')}
                                    </span>
                                </motion.div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-zinc-900 dark:text-zinc-100 mb-8">
                                    {tBoard('heroTitle')} <span className="text-[#3A9B9B]">{tBoard('heroHighlight')}</span>
                                </h1>

                                <div className="w-16 h-1 bg-[#3A9B9B] rounded-full mb-8" />

                                <p className="text-lg md:text-xl font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                                    <a href="https://www.thapar.edu/academics/centers/science-technology-entrepreneurs-park-step"
                                        target="_blank" rel="noopener noreferrer"
                                        className="font-bold text-[#2D3561] dark:text-zinc-100 hover:text-[#3A9B9B] transition-colors"
                                    >Science &amp; Technology Entrepreneurs Park (STEP)</a>{' '}
                                    {tBoard('heroDesc')}{' '}
                                    <a href="https://thapar.edu/" target="_blank" rel="noopener noreferrer"
                                        className="font-bold text-[#3A9B9B] hover:underline transition-colors"
                                    >Thapar Institute of Engineering and Technology (TIET)</a>
                                </p>
                            </div>

                            {/* Right: Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.7 }}
                                whileHover={{ y: -8 }}
                                className="group relative"
                            >
                                <div className="rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 dark:hover:border-[#3A9B9B]/30 dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)]">
                                    {/* Top row */}
                                    <div className="flex items-center justify-between mb-10 gap-4">
                                        <div className="flex items-center gap-5 min-w-0">
                                            <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#E8F7F7] dark:bg-zinc-800/70 flex items-center justify-center border border-[#3A9B9B]/20">
                                                <span className="text-3xl font-black text-[#3A9B9B]">S</span>
                                            </div>
                                            <div>
                                                <a href="https://www.thapar.edu/academics/centers/science-technology-entrepreneurs-park-step"
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight hover:text-[#3A9B9B] transition-colors"
                                                >STEP-TIET</a>
                                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{tBoard('cardSubtitle')}</p>
                                            </div>
                                        </div>
                                        <a href="https://www.thapar.edu/academics/centers/science-technology-entrepreneurs-park-step"
                                            target="_blank" rel="noopener noreferrer"
                                            className="h-12 w-12 shrink-0 rounded-full bg-[#3A9B9B]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        >
                                            <ArrowUpRightIcon className="w-5 h-5 text-[#3A9B9B]" />
                                        </a>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-6">
                                        <p className="text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                                            {tBoard('cardSupportText')}{' '}
                                            <span className="font-bold text-zinc-900 dark:text-zinc-100">BanavatNest</span>{' '}
                                            {tBoard('cardSupportSuffix')}
                                        </p>
                                        <ul className="space-y-5">
                                            {featurePoints.map((point) => (
                                                <li key={point.title} className="flex items-start gap-4">
                                                    <span className={`mt-2 h-2.5 w-2.5 rounded-full ${point.color} shrink-0`} />
                                                    <span className="text-base md:text-lg font-bold text-zinc-800 dark:text-zinc-200">{point.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* VentureLab link */}
                                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                                <a href="https://venturelab.org.in/" target="_blank" rel="noopener noreferrer"
                                                    className="font-bold text-[#3A9B9B] hover:underline transition-colors"
                                                >VentureLab | </a>
                                                <a href="https://www.thapar.edu/academics/centers/science-technology-entrepreneurs-park-step" target="_blank" rel="noopener noreferrer"
                                                    className="font-bold text-[#3A9B9B] hover:underline transition-colors"
                                                >STEP TIET | </a>
                                                <a href="https://thapar.edu/" target="_blank" rel="noopener noreferrer"
                                                    className="font-bold text-[#3A9B9B] hover:underline transition-colors"
                                                >TIET</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Section 2: Board of Directors ── */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Section heading */}
                        <div className="text-center mb-14">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
                            >
                                {tBoard('boardTitle')} <span className="text-[#3A9B9B]">{tBoard('boardHighlight')}</span>
                            </motion.h2>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mx-auto w-20 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B]"
                            />
                        </div>

                        {/* Director cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Dr. Sukhdev Singh */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30"
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                        <img src="/images/Director/Sukhdev.jpeg" alt={t('sukhdevName')} className="w-full h-full object-cover object-top" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1 whitespace-nowrap">{t('sukhdevName')}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm mb-1 uppercase tracking-wide">{t('sukhdevEdu')}</p>
                                        <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-widest leading-tight">{t('sukhdevRole')}</p>
                                    </div>
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6 font-medium">{t('sukhdevBio')}</p>
                                <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sukhdevAch1')}</li>
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sukhdevAch2')}</li>
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sukhdevAch3')}</li>
                                </ul>
                                <Link href="/about/board/dr-sukhdev-singh"
                                    className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-lg hover:text-[#2a7676] transition-colors group">
                                    {tBoard('viewPortfolio')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            {/* Dr. Sangita Roy */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                        <img src="/images/Director/Sangita.jpeg" alt={t('sangitaName')} className="w-full h-full object-cover object-top" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1 whitespace-nowrap">{t('sangitaName')}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm mb-1 uppercase tracking-wide">{t('sangitaEdu')}</p>
                                        <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-widest leading-tight">{t('sangitaRole')}</p>
                                    </div>
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6 font-medium">{t('sangitaBio')}</p>
                                <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sangitaAch1')}</li>
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sangitaAch2')}</li>
                                    <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {t('sangitaAch3')}</li>
                                </ul>
                                <Link href="/about/board/dr-sangita-roy"
                                    className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-lg hover:text-[#2a7676] transition-colors group">
                                    {tBoard('viewPortfolio')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </section>

            </div>
        </PageWrapper>
    );
}
