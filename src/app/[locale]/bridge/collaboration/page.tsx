'use client';

import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function CollaborationPage() {
    const t = useTranslations('collaboration');

    const listItems = [
        t('item1'),
        t('item2'),
        t('item3'),
        t('item4'),
    ];

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl text-left">
                            <h1 className="text-6xl md:text-8xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 leading-tight tracking-tighter">
                                {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#84CC16] p-10 md:p-14 rounded-[3rem] relative shadow-2xl text-left"
                        >
                            <div className="absolute top-8 right-8 text-zinc-900 opacity-5">
                                <LinkIcon size={120} />
                            </div>
                            <h2 className="text-3xl font-black text-[#5D3A1A] mb-8 uppercase">{t('frameworkTitle')}</h2>
                            <div className="space-y-4">
                                {listItems.map((item, i) => (
                                    <div key={i} className="flex items-start space-x-3 bg-white/20 p-4 rounded-xl border border-white/30 backdrop-blur-sm">
                                        <div className="w-2 h-2 rounded-full bg-[#5D3A1A] mt-2 shrink-0"></div>
                                        <span className="font-bold text-lg text-[#5D3A1A] leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="prose dark:prose-invert text-lg text-gray-600 dark:text-zinc-400 font-medium">
                            <p className="mb-6">
                                {t('bodyP1')}
                            </p>
                            <p>
                                {t('bodyP2')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
