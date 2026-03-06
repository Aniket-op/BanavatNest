'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
    const t = useTranslations('privacy');

    return (
        <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-4xl font-extrabold text-[#5D3A1A] dark:text-zinc-100 mb-6">{t('title')}</h1>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300">
                    <p>{t('intro')}</p>

                    <h3>{t('s1Title')}</h3>
                    <p>{t('s1Text')}</p>

                    <h3>{t('s2Title')}</h3>
                    <p>{t('s2Text')}</p>

                    <h3>{t('s3Title')}</h3>
                    <ul>
                        <li>{t('s3Item1')}</li>
                        <li>{t('s3Item2')}</li>
                        <li>{t('s3Item3')}</li>
                    </ul>

                    <h3>{t('s4Title')}</h3>
                    <p>{t('s4Text')}</p>

                    <h3>{t('s5Title')}</h3>
                    <p>{t('s5Text')}</p>

                    <h3>{t('s6Title')}</h3>
                    <p>{t('s6Text')}</p>

                    <h3>{t('s7Title')}</h3>
                    <p>
                        {t('s7Text')}<br />
                        Email: <a href="mailto:info@banavatnest.com" className="text-[#84CC16]">info@banavatnest.com</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
