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
            {/* <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <div className="w-full relative">
                    <ImageCarousel
                        images={heroImages}
                        aspectRatio="aspect-[1500/800] md:aspect-[1500/625]"
                        rounded="rounded-none"
                        objectFit="contain"
                    />
                </div>
                <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="hidden dark:block absolute z-10 top-[15%] right-[22%] w-[300px] h-[300px] md:w-[560px] md:h-[560px] rounded-full bg-[#3A9B9B]/10 blur-[80px] md:blur-[160px] pointer-events-none"
                />
            </section> 
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 md:mt-8 pb-4 text-center text-zinc-600 dark:text-zinc-400 w-full mx-auto px-4 text-sm md:text-base lg:text-xl font-medium tracking-wide"
            >
                {t('subtitle')}
            </motion.div>*/}


            {/* Our Name Section */}
            <section className="p-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                    >
                        Why the Name<span className="text-[#3A9B9B]"> BanavatNest ?</span>
                    </motion.h2>
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-bold mb-12 text-center text-[#3A9B9B] uppercase tracking-[0.2em]">
                        {/* {t('meaningHeading')} */}

                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: '0 30px 60px -12px rgba(0, 180, 180, 0.25)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-zinc-900/40 p-10 rounded-3xl shadow-md backdrop-blur-sm border border-t-[6px] border-zinc-200 dark:border-zinc-700"
                            style={{ borderTopColor: '#2D3561' }}
                        >
                            <h4 className="text-3xl font-bold mb-6 text-[#2D3561] dark:text-[#3A9B9B]">
                                {tName('banavatTitle')}
                            </h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg text-justify">
                                Drawn from Hindi and widely used in Punjabi, Banavat signifies creating, building, and shaping ideas with purpose and intent.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, boxShadow: '0 30px 60px -12px rgba(45,53,97,0.2)' }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-zinc-900/40 p-10 rounded-3xl shadow-md backdrop-blur-sm border border-t-[6px] border-zinc-200 dark:border-zinc-700"
                            style={{ borderTopColor: '#3A9B9B' }}
                        >
                            <h4 className="text-3xl font-bold mb-6 text-[#2D3561] dark:text-[#3A9B9B]">
                                {tName('nestTitle')}
                            </h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg text-justify">
                                {/* {tName('nestDesc')} */}
                                A Nest symbolizes a nurturing space where ideas are developed, refined, and prepared to
                                grow into meaningful impact.
                            </p>
                        </motion.div>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 w-full max-w-7xl mx-auto text-lg pt-10">
                        Together, BanavatNest represents a research-driven ecosystem connecting academia, industry,
                        and innovation to transform ideas into real-world solutions.
                    </p>
                </div>
            </section>

            {/* Symbolism of BanavatNest Section */}
            <section className="p-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden
                        border border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
                >
                    {/* Decorative accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

                    {/* Two-column layout */}
                    <div className="grid md:grid-cols-2 gap-0 items-center">

                        {/* LEFT: Heading + Content */}
                        <div className="px-8 md:px-14 py-20 md:py-28">
                            {/* Label */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="text-lg font-bold uppercase tracking-[0.28em] text-[#2D3561] dark:text-[#3A9B9B] mb-4"
                            >
                                The Symbolism of BanavatNest
                            </motion.p>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight
                                    bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]
                                    dark:from-white dark:via-[#3A9B9B] dark:to-white
                                    bg-clip-text text-transparent mb-4"
                            >
                                Build with Purpose. Nurture to Impact.
                            </motion.h2>

                            {/* Divider */}
                            <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />

                            {/* Philosophy text */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35, duration: 0.6 }}
                                className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed"
                            >
                                The philosophy behind BanavatNest reflects our belief that meaningful innovation begins with
                                purposeful ideas and grows through continuous nurturing, collaboration, and practical execution
                                toward real-world impact.
                            </motion.p>
                        </div>

                        {/* RIGHT: Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="relative w-full h-full min-h-[380px] md:min-h-[500px]"
                        >
                            <Image
                                src="/images/Idea-Deploy.png"
                                alt="Idea to Deployment"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
                            />
                        </motion.div>
                    </div>

                    {/* Decorative bottom glow */}
                    <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-48 h-24 bg-[#3A9B9B]/15 blur-3xl rounded-full pointer-events-none" />
                </motion.div>
            </section>


            <section className="p-12 bg-zinc-50 dark:bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">
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
                        {/* LEFT: Image (frameless) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square"
                        >
                            <Image
                                src="/images/Core Values.png"
                                alt="Idea to Deployment - Core Values"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>

                        {/* RIGHT: Values — 2×2 card grid */}
                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { num: '01', title: 'PURPOSE', desc: 'Why we do it' },
                                { num: '02', title: 'PROCESS', desc: 'How we approach it' },
                                { num: '03', title: 'PROTOTYPE', desc: 'What we create' },
                                { num: '04', title: 'PROGRESS', desc: 'What impact it drives' }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.12, duration: 0.5 }}
                                    whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(58,155,155,0.2)' }}
                                    className="flex flex-col justify-between p-6 rounded-2xl
                                        bg-white dark:bg-zinc-900/50
                                        border border-zinc-200 dark:border-zinc-700
                                        border-t-[3px] shadow-sm
                                        transition-all duration-300 cursor-default"
                                    style={{ borderTopColor: index % 2 === 0 ? '#3A9B9B' : '#2D3561' }}
                                >
                                    {/* Number badge */}
                                    <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                        {item.num}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2
                                        bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] bg-clip-text text-transparent
                                        dark:from-white dark:to-[#3A9B9B]"
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Divider */}
                                    <div className="w-8 h-[2px] rounded-full mb-3"
                                        style={{ background: index % 2 === 0 ? '#3A9B9B' : '#2D3561' }}
                                    />

                                    {/* Description */}
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Mission & Our Vision Section */}
            <section className="p-12">
                <div className="max-w-7xl mx-auto">
                    {/* Section heading */}
                    <div className="text-center mb-14">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                        >
                            Our <span className="text-[#2D3561] dark:text-white">Mission</span> &amp; Our{' '}
                            <span className="text-[#3A9B9B]">Vision</span>
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mx-auto w-20 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B]"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-sm border-t-8 border-[#2D3561] hover:shadow-xl transition-all"
                        >
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">Our Mission</h2>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                                To transform purposeful ideas into practical and scalable solutions through research,
                                design, and prototyping.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-sm border-t-8 border-[#3A9B9B] hover:shadow-xl transition-all"
                        >
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">Our Vision</h2>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                                To build a research-driven innovation ecosystem where ideas evolve from curiosity to
                                meaningful real-world impact.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
