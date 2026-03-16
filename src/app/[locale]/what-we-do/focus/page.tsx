'use client';

import { motion } from 'framer-motion';
import { Microscope, Code2, Users2, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ImageCarousel from '@/components/ImageCarousel';
import PageWrapper from '@/components/PageWrapper';

interface FocusAreaItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    accent: string;
    border: string;
    images: string[];
}

interface FocusAreaCardProps {
    area: FocusAreaItem;
    index: number;
}

const FocusAreaCard: React.FC<FocusAreaCardProps> = ({ area, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
                group relative flex flex-col overflow-hidden rounded-[2.5rem]
                bg-white dark:bg-zinc-900 
                border border-zinc-200 dark:border-zinc-800
                ${area.border} transition-colors duration-300
                shadow-sm hover:shadow-2xl
            `}
        >
            {/* Content Top */}
            <div className="p-8 md:p-10 z-10">
                <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                    bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700
                    group-hover:scale-110 transition-transform duration-300
                `}>
                    <div className={`${area.accent}`}>
                        {area.icon}
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    {area.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {area.desc}
                </p>
            </div>

            {/* Visual Bottom */}
            <div className="mt-auto px-6 pb-6 lg:px-8 lg:pb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-inner border border-zinc-100 dark:border-zinc-800/50 group-hover:translate-y-[-4px] transition-transform duration-500">
                    <ImageCarousel images={area.images} />
                </div>
            </div>

            {/* Decorative Gradient Blob on Hover */}
            <div className={`
                absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 
                bg-gradient-to-br ${area.color} to-transparent opacity-0 
                group-hover:opacity-10 blur-[80px] transition-opacity duration-500 pointer-events-none
            `} />

        </motion.div>
    );
};

export default function FocusAreasPage() {
    const t = useTranslations('focusAreas');

    const FOCUS_AREAS: FocusAreaItem[] = [
        {
            title: t('rdTitle'),
            desc: t('rdDesc'),
            icon: <Microscope className="w-6 h-6" />,
            color: 'bg-blue-500',
            accent: 'text-blue-500',
            border: 'hover:border-blue-500/50',
            images: ['/images/homepage/Key-Domains.png']
        },
        {
            title: t('protoTitle'),
            desc: t('protoDesc'),
            icon: <Code2 className="w-6 h-6" />,
            color: 'bg-[#84CC16]',
            accent: 'text-[#84CC16]',
            border: 'hover:border-[#84CC16]/50',
            images: ['/images/homepage/Prototype-image.png']
        },
        {
            title: t('acadTitle'),
            desc: t('acadDesc'),
            icon: <Users2 className="w-6 h-6" />,
            color: 'bg-purple-500',
            accent: 'text-purple-500',
            border: 'hover:border-purple-500/50',
            images: ['/images/homepage/Problem-Decomposition.png']
        },
        {
            title: t('techTitle'),
            desc: t('techDesc'),
            icon: <Zap className="w-6 h-6" />,
            color: 'bg-amber-500',
            accent: 'text-amber-500',
            border: 'hover:border-amber-500/50',
            images: ['/images/homepage/Our-Vision.png']
        }
    ];

    return (
        <PageWrapper>
            <section className="relative bg-zinc-50 dark:bg-[#09090b] py-24 lg:py-32 overflow-hidden transition-colors duration-500">

                {/* Subtle Grid Background */}
                <div className="absolute inset-0 pointer-events-none 
                    bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
                    bg-[size:24px_24px]
                    [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-left mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                            {t('title')}  <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                            {t('subtitle')}</p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {FOCUS_AREAS.map((area, idx) => (
                            <FocusAreaCard key={idx} area={area} index={idx} />
                        ))}
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
}
