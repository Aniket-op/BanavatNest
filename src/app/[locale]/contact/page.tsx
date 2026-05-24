'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';

export default function ContactPage() {
    const t = useTranslations('contact');
    const tc = useTranslations('common');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'loading') return;
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24">
                <header className="bg-white dark:bg-zinc-900/50 pt-24 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tighter leading-tight">
                                {t('title')} <span className="text-[#3A9B9B]">{t('titleHighlight')}</span>
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
                                        <Mail className="w-6 h-6 mr-4 text-[#3A9B9B] mt-1" />
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{tc('email')}</p>
                                            <a
                                                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@banavatnest.com&su=Inquiry from Website&body=Hi BanavatNest Team,"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 dark:text-zinc-400 hover:text-[#3A9B9B] transition-colors"
                                            >
                                                info@banavatnest.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="w-6 h-6 mr-4 text-[#3A9B9B] mt-1" />
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
                            
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center py-10 space-y-6"
                                    >
                                        <div className="flex justify-center">
                                            <div className="bg-[#3A9B9B]/10 p-5 rounded-full text-[#3A9B9B]">
                                                <CheckCircle2 className="w-16 h-16 animate-bounce" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t('successTitle')}</h3>
                                            <p className="text-gray-500 dark:text-zinc-400 max-w-md mx-auto">{t('successMessage')}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStatus('idle')}
                                            className="px-6 py-3 bg-[#3A9B9B] hover:bg-[#2a7676] text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 rounded-xl flex items-start gap-3"
                                            >
                                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-red-800 dark:text-red-200 text-sm">{t('errorTitle')}</p>
                                                    <p className="text-red-700 dark:text-red-300 text-xs mt-1">{t('errorMessage')}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('nameLabel')}</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#3A9B9B] dark:text-white transition-colors"
                                                placeholder={t('namePlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('emailLabel')}</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#3A9B9B] dark:text-white transition-colors"
                                                placeholder={t('emailPlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('messageLabel')}</label>
                                            <textarea
                                                rows={5}
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-[#3A9B9B] dark:text-white transition-colors resize-none"
                                                placeholder={t('messagePlaceholder')}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-[#3A9B9B] hover:bg-[#2a7676] disabled:bg-[#3A9B9B]/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    {t('sending')}
                                                </>
                                            ) : (
                                                <>
                                                    {tc('submit')} <ArrowUpRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

