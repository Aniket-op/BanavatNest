'use client';

import { motion } from 'framer-motion';
import { CircleDot, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageWrapper from '@/components/PageWrapper';

export default function BoardPage() {
    const t = useTranslations('aboutBoard');

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/50 pt-24 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tighter leading-tight">
                                {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Dr. Sukhdev Singh Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(132,204,22,0.15)] dark:hover:border-lime-500/30"
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                    <img src="/images/Director/Sukhdev.jpeg" alt={t('sukhdevName')} className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">{t('sukhdevName')}</h3>
                                    <p className="text-[#84CC16] font-bold text-lg md:text-xl uppercase tracking-widest leading-tight">{t('sukhdevRole')}</p>
                                </div>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6 font-medium">
                                {t('sukhdevBio')}
                            </p>
                            <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sukhdevAch1')}</li>
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sukhdevAch2')}</li>
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sukhdevAch3')}</li>
                            </ul>
                            
                            <Link 
                                href="/about/board/dr-sukhdev-singh"
                                className="inline-flex items-center gap-2 text-[#84CC16] font-bold text-lg hover:text-[#65A30D] transition-colors group"
                            >
                                View Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Dr. Sangita Roy Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(132,204,22,0.15)] dark:hover:border-lime-500/30 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                    <img src="/images/Director/Sangita.jpeg" alt={t('sangitaName')} className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">{t('sangitaName')}</h3>
                                    <p className="text-[#84CC16] font-bold text-lg md:text-xl uppercase tracking-widest leading-tight">{t('sangitaRole')}</p>
                                </div>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6 font-medium">
                                {t('sangitaBio')}
                            </p>
                            <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sangitaAch1')}</li>
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sangitaAch2')}</li>
                                <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#84CC16]" /> {t('sangitaAch3')}</li>
                            </ul>
                            
                            <Link 
                                href="/about/board/dr-sangita-roy"
                                className="inline-flex items-center gap-2 text-[#84CC16] font-bold text-lg hover:text-[#65A30D] transition-colors group"
                            >
                                View Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
