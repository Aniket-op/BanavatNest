'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TermsOfUsePage() {
    const t = useTranslations('terms');

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
                    <p>{t('s3Text')}</p>

                    <h3>{t('s4Title')}</h3>
                    <p>{t('s4Text')}</p>

                    <h3>{t('s5Title')}</h3>
                    <ul>
                        <li>{t('s5Item1')}</li>
                        <li>{t('s5Item2')}</li>
                    </ul>

                    <h3>{t('s6Title')}</h3>
                    <p>{t('s6Text')}</p>

                    <h3>{t('s7Title')}</h3>
                    <p>{t('s7Text')}</p>

                    <h3>{t('s8Title')}</h3>
                    <p>{t('s8Text')}</p>

                    <h3>{t('s9Title')}</h3>
                    <p>{t('s9Text')}</p>

                    <h3>{t('s10Title')}</h3>
                    <p>{t('s10Text')}</p>

                    <h3>{t('s11Title')}</h3>
                    <p>{t('s11Text')}</p>

                    <h3>{t('s12Title')}</h3>
                    <p>{t('s12Text')}</p>

                    <h3>{t('s13Title')}</h3>
                    <p>{t('s13Text')}</p>

                    <h3>{t('s14Title')}</h3>
                    <p>{t('s14Text')}</p>
                </div>
            </motion.div>
        </div>
    );
}
