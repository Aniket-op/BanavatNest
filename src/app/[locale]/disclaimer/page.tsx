'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DisclaimerPage() {
    const t = useTranslations('disclaimer');
    const tc = useTranslations('common');

    return (
        <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-4xl font-extrabold text-[#5D3A1A] dark:text-zinc-100 mb-6">{t('title')}</h1>
                <p className="text-gray-500 dark:text-zinc-400 mb-8">{tc('lastUpdated', { date: '2025-03-01' })}</p>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300">
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                </div>
            </motion.div>
        </div>
    );
}
