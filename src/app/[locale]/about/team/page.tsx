'use client';

import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function TeamPage() {
    const t = useTranslations('aboutTeam');

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
                    <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-zinc-800">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8 leading-relaxed">
                                {t('intro')}
                            </p>
                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                                    <strong className="block text-[#84CC16] mb-2 text-xl font-black uppercase">{t('studentsTitle')}</strong>
                                    <p className="text-gray-600 dark:text-zinc-400 text-sm">{t('studentsDesc')}</p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                                    <strong className="block text-[#84CC16] mb-2 text-xl font-black uppercase">{t('facultyTitle')}</strong>
                                    <p className="text-gray-600 dark:text-zinc-400 text-sm">{t('facultyDesc')}</p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                                    <strong className="block text-[#84CC16] mb-2 text-xl font-black uppercase">{t('partnersTitle')}</strong>
                                    <p className="text-gray-600 dark:text-zinc-400 text-sm">{t('partnersDesc')}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-lime-50/50 dark:bg-zinc-800/20 border border-lime-100 dark:border-zinc-700 rounded-3xl text-center">
                                <p className="text-[#5D3A1A] dark:text-zinc-200 font-bold text-lg m-0">
                                    {t('quote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
