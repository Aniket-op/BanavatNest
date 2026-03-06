'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ImageCarousel from '@/components/ImageCarousel';
import PageWrapper from '@/components/PageWrapper';

const images = [
    '/images/ournames/1.png',
    '/images/ournames/2.png',
    '/images/ournames/3.png',
    '/images/ournames/4.png',
];

export default function PhilosophyPage() {
    const t = useTranslations('aboutPhilosophy');

    const banavatValues = [
        { letter: 'B', title: t('b_title'), desc: t('b_desc') },
        { letter: 'A', title: t('a1_title'), desc: t('a1_desc') },
        { letter: 'N', title: t('n1_title'), desc: t('n1_desc') },
        { letter: 'A', title: t('a2_title'), desc: t('a2_desc') },
        { letter: 'V', title: t('v_title'), desc: t('v_desc') },
        { letter: 'A', title: t('a3_title'), desc: t('a3_desc') },
        { letter: 'T', title: t('t_title'), desc: t('t_desc') },
    ];

    const nestValues = [
        { letter: 'N', title: t('nest_n_title'), desc: t('nest_n_desc') },
        { letter: 'E', title: t('nest_e_title'), desc: t('nest_e_desc') },
        { letter: 'S', title: t('nest_s_title'), desc: t('nest_s_desc') },
        { letter: 'T', title: t('nest_t_title'), desc: t('nest_t_desc') },
    ];

    return (
        <PageWrapper>
            <section className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors py-24">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                            {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* left — Philosophy Content */}
                        <div className="space-y-16">

                            {/* BANAVAT */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                            >
                                <div className="p-8 border-b border-zinc-200 dark:border-zinc-800">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#84CC16]">
                                        {t('banavatHeader')}
                                    </h3>
                                </div>

                                {banavatValues.map((v, i) => (
                                    <div
                                        key={i}
                                        className="group flex items-start p-6 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#84CC16]/10 flex items-center justify-center mr-6">
                                            <span className="text-xl font-black text-[#84CC16]">{v.letter}</span>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">
                                                {v.title}
                                            </h4>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                                {v.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* NEST */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                            >
                                <div className="p-8 border-b border-zinc-200 dark:border-zinc-800">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#84CC16]">
                                        {t('nestHeader')}
                                    </h3>
                                </div>

                                {nestValues.map((v, i) => (
                                    <div
                                        key={i}
                                        className="group flex items-start p-6 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#84CC16]/10 flex items-center justify-center mr-6">
                                            <span className="text-xl font-black text-[#84CC16]">{v.letter}</span>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">
                                                {v.title}
                                            </h4>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                                {v.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                        </div>
                        {/* right — Carousel */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:sticky lg:top-28"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                <ImageCarousel images={images} />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
