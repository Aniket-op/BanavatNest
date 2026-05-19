'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import { useTranslations } from 'next-intl';

const PrototypingIllustration = ({ color }: { color: string }) => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
            <linearGradient id="grad-proto" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#grad-proto)" />
        <motion.g animate={{ x: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M28 38L18 50L28 62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g animate={{ x: [2, -2, 2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M72 38L82 50L72 62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
            <rect x="35" y="42" width="20" height="2.5" rx="1.2" fill={color} fillOpacity="0.7" />
            <rect x="35" y="49" width="30" height="2.5" rx="1.2" fill={color} fillOpacity="0.5" />
            <rect x="35" y="56" width="15" height="2.5" rx="1.2" fill={color} fillOpacity="0.7" />
        </motion.g>
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ originX: '76px', originY: '24px' }}>
            <circle cx="76" cy="24" r="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
            <circle cx="76" cy="24" r="3" fill="white" fillOpacity="0.8" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
                <path key={a} d="M76 13.5V17" stroke={color} strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 76 24)`} />
            ))}
        </motion.g>
        <path d="M20 75H45V65H55V75H80" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <motion.circle r="2.5" fill={color}
            animate={{ cx: [20, 45, 45, 55, 55, 80], cy: [75, 75, 65, 65, 75, 75] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatType: 'loop' }} />
    </svg>
);

export default function ProductPrototypingPage() {
    const t = useTranslations('focusProtoPage');
    const tNav = useTranslations('readMore');

    const POINTS = [
        { heading: t('summaryHeading'), content: t('summaryContent') },
        { heading: t('h2'), content: t('p2') },
        { heading: t('h3'), content: t('p3') },
        { heading: t('h4'), content: t('p4') },
    ];

    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/focus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#3A9B9B] transition-colors mb-12 font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        {tNav('backToFocusAreas')}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg mb-12"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
                        <div className="grid md:grid-cols-2 gap-0 items-start">
                            <div className="px-6 md:px-14 py-10 md:py-20">
                                <div className="w-32 h-32">
                                    <PrototypingIllustration color='#3A9B9B' />
                                </div>
                                <motion.h1 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] dark:from-white dark:via-[#3A9B9B] dark:to-white bg-clip-text text-transparent mb-4">
                                    {t('pageTitle')}
                                </motion.h1>
                                <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                            </div>
                            <motion.div initial={{ opacity: 0, scale: 0.95, x: 20 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
                                className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] p-6 md:p-8">
                                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex items-center justify-center">
                                    <ImageCarousel images={['/images/homepage/Prototype-image.png']} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {POINTS.map((point, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className="group relative rounded-3xl md:rounded-[2rem] overflow-hidden border-2 border-[#3A9B9B]/15 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-[#3A9B9B]/30 transition-all duration-500">
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
                                <div className="px-6 md:px-8 py-10 md:py-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A9B9B]/20 to-[#2D3561]/10 flex items-center justify-center mb-5 border border-[#3A9B9B]/20">
                                        <span className="text-sm font-black text-[#3A9B9B]">0{idx + 1}</span>
                                    </div>
                                    <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                                        className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] dark:from-white dark:via-[#3A9B9B] dark:to-white bg-clip-text text-transparent mb-4">
                                        {point.heading}
                                    </motion.h3>
                                    <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-5 group-hover:w-20 transition-all duration-500" />
                                    <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                                        className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                                        {point.content}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
