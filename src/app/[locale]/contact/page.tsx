'use client';

import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function ContactPage() {
    const t = useTranslations('contact');
    const tc = useTranslations('common');

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
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-zinc-800">
                                <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-8">{t('directContact')}</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 mr-4 text-[#84CC16] mt-1" />
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{tc('email')}</p>
                                            <a
                                                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@banavatnest.com&su=Inquiry from Website&body=Hi BanavatNest Team,"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 dark:text-zinc-400 hover:text-[#84CC16] transition-colors"
                                            >
                                                info@banavatnest.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="w-6 h-6 mr-4 text-[#84CC16] mt-1" />
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{tc('phone')}</p>
                                            <p className="text-zinc-500 dark:text-zinc-400">+91 99340 44777</p>
                                            <p className="text-zinc-500 dark:text-zinc-400">+91 80023 96506</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feedback Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-zinc-800"
                        >
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-8">{t('sendMessage')}</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('nameLabel')}</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#84CC16] dark:text-white transition-colors" placeholder={t('namePlaceholder')} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('emailLabel')}</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#84CC16] dark:text-white transition-colors" placeholder={t('emailPlaceholder')} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('messageLabel')}</label>
                                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#84CC16] dark:text-white transition-colors resize-none" placeholder={t('messagePlaceholder')} />
                                </div>
                                <button type="button" className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    {tc('submit')} <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
