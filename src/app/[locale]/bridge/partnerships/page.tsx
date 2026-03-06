'use client';

import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function IndustryPartnershipsPage() {
    const t = useTranslations('industryPartnerships');

    const pocSteps = [
        t('step1'),
        t('step2'),
        t('step3'),
        t('step4'),
        t('step5'),
    ];

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl text-left">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 leading-tight tracking-tighter">
                                {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-xl"
                        >
                            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-8">
                                <Building className="w-10 h-10 text-[#5D3A1A] dark:text-[#84CC16]" />
                            </div>
                            <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-6 uppercase tracking-tight">{t('frameworkTitle')}</h3>
                            <ul className="space-y-4">
                                {pocSteps.map((step, i) => (
                                    <li key={i} className="flex items-center text-lg font-bold text-gray-600 dark:text-zinc-400">
                                        <span className="w-8 h-8 rounded-full bg-[#84CC16]/20 text-[#84CC16] flex items-center justify-center mr-4 text-sm font-black">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="flex flex-col justify-center">
                            <p className="text-2xl text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed mb-8">
                                {t('heading')}
                            </p>
                            <div className="prose prose-lg dark:prose-invert text-gray-500 dark:text-zinc-400">
                                <p>
                                    {t('bodyP1')}
                                </p>
                                <p className="text-[#84CC16] font-bold">
                                    {t('successNote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
