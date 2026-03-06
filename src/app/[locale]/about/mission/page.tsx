'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function MissionPage() {
    const t = useTranslations('aboutMission');

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
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-sm border-t-8 border-[#84CC16] hover:shadow-xl transition-all"
                        >
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">{t('missionTitle')}</h2>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium">
                                {t('missionText')}
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-sm border-t-8 border-[#84CC16] hover:shadow-xl transition-all"
                        >
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">{t('visionTitle')}</h2>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium">
                                {t('visionText')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
