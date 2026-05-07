'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';

const AboutUs = () => {
    const t = useTranslations('aboutUsPage');
    const tName = useTranslations('aboutName');

    const heroImages = [
        '/images/BANAVAT.png',
        '/images/NEST.png'
    ];

    return (
        <main className="min-h-screen pt-20 relative overflow-hidden">
            {/* Dotted Background (Consistent with other premium pages) */}
            <div className="absolute inset-0 pointer-events-none 
                bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)] 
                dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_1px,_transparent_1px)]
                [background-size:24px_24px] -z-10"
            />

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <div className="w-full relative">
                    <ImageCarousel
                        images={heroImages}
                        aspectRatio="aspect-[1500/800] md:aspect-[1500/625]"
                        rounded="rounded-none"
                        objectFit="contain"
                    />
                </div>

                {/* Glow Effect similar to homepage */}
                <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[300px] h-[300px] md:w-[560px] md:h-[560px] rounded-full bg-[#3A9B9B]/10 blur-[80px] md:blur-[160px] pointer-events-none"
                />
            </section>

            {/* Hero Content Overlay (Text below or on top depending on design preference, but here we add a tagline like homepage) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 w-full mx-auto px-4 text-sm md:text-base lg:text-xl font-medium tracking-wide"
            >
                {t('subtitle')}
            </motion.div>

            {/* Our Name Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                    >
                        {tName('title')} <span className="text-[#3A9B9B]">{tName('titleHighlight')}</span>
                    </motion.h2>
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-bold mb-12 text-center text-[#3A9B9B] uppercase tracking-[0.2em]">
                        {t('meaningHeading')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: '0 30px 60px -12px rgba(0, 180, 180, 0.25)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-zinc-900/40 p-10 rounded-3xl shadow-md backdrop-blur-sm border border-t-[6px] border-zinc-200 dark:border-zinc-700"
                            style={{ borderTopColor: '#3A9B9B' }}
                        >
                            <h4 className="text-3xl font-bold mb-6 text-[#2D3561] dark:text-[#3A9B9B]">
                                {tName('banavatTitle')}
                            </h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {tName('banavatDesc')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: '0 30px 60px -12px rgba(45,53,97,0.2)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-zinc-900/40 p-10 rounded-3xl shadow-md backdrop-blur-sm border border-t-[6px] border-zinc-200 dark:border-zinc-700"
                            style={{ borderTopColor: '#2D3561' }}
                        >
                            <h4 className="text-3xl font-bold mb-6 text-[#2D3561] dark:text-[#3A9B9B]">
                                {tName('nestTitle')}
                            </h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {tName('nestDesc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
                        >
                            {t('coreValuesTitle')} <span className="text-[#3A9B9B]">{t('coreValuesHighlight')}</span>
                        </motion.h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                            {t('coreValuesSubheading')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* LEFT: Simple headings */}
                        <div className="flex flex-col gap-4 items-center md:items-start">
                            {['PURPOSE', 'PROCESS', 'PROTO-TYPE', 'PROGRESS'].map((word, index) => (
                                <motion.h3
                                    key={word}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none
                                        bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] bg-clip-text text-transparent
                                        dark:from-white dark:to-[#3A9B9B]
                                        pl-4 border-l-4 border-[#3A9B9B]/40 hover:border-[#3A9B9B] transition-colors duration-300"
                                >
                                    {word}
                                </motion.h3>
                            ))}
                        </div>

                        {/* RIGHT: Image (frameless) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square"
                        >
                            <Image
                                src="/images/Idea-Deploy.png"
                                alt="Idea to Deployment - Core Values"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
