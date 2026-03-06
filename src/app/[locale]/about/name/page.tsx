'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ImageCarousel from '@/components/ImageCarousel';

const images = [
    '/images/homepage/images/image1.jpg',
    '/images/homepage/images/image2.jpg',
    '/images/homepage/images/image3.jpg',
    '/images/homepage/images/image4.jpg',
];

const OurName = () => {
    const t = useTranslations('aboutName');

    return (
        <section className="relative min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors py-24 overflow-hidden">

            {/* Dotted Background */}
            <div className="absolute inset-0 pointer-events-none 
    bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)] 
    dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_1px,_transparent_1px)]
    [background-size:24px_24px]"
            />


            {/* Content Wrapper */}
            <div className="relative z-10">


                {/* Header */}
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight leading-tight">
                            {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left - Meaning Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-10 relative"
                        >
                            <Quote className="absolute top-6 right-6 w-20 h-20 text-zinc-200 dark:text-zinc-800" />

                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 flex items-center">
                                <span className="w-10 h-1 bg-[#84CC16] mr-4 rounded-full"></span>
                                {t('meaningTitle')}
                            </h2>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-[#84CC16] text-2xl font-bold mb-3">{t('banavatTitle')}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {t('banavatDesc')}
                                    </p>
                                </div>

                                <div className="h-px bg-zinc-200 dark:bg-zinc-800"></div>

                                <div>
                                    <h3 className="text-[#84CC16] text-2xl font-bold mb-3">{t('nestTitle')}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {t('nestDesc')}
                                    </p>
                                </div>

                                <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl mt-6">
                                    <p className="italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {t('quote')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Carousel */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:sticky lg:top-28"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                <ImageCarousel images={images} />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurName;
