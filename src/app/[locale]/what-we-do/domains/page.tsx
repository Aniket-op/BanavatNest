'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, GlobeLock, Cpu, Tractor } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ImageCarousel from '@/components/ImageCarousel';
import PageWrapper from '@/components/PageWrapper';

interface DomainItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    accent: string;
    border: string;
    images: string[];
}

interface DomainCardProps {
    domain: DomainItem;
    index: number;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
                group relative flex flex-col overflow-hidden rounded-[2.5rem]
                bg-zinc-50 dark:bg-zinc-900/50 
                border border-zinc-200 dark:border-zinc-800
                ${domain.border} transition-colors duration-300
                shadow-sm hover:shadow-2xl
            `}
        >
            {/* Content Top */}
            <div className="p-8 md:p-10 z-10">
                <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                    bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700
                    group-hover:scale-110 transition-transform duration-300 shadow-sm
                `}>
                    <div className={`${domain.accent}`}>
                        {domain.icon}
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    {domain.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {domain.desc}
                </p>
            </div>

            {/* Visual Bottom */}
            <div className="mt-auto px-6 pb-6 lg:px-8 lg:pb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-inner border border-zinc-200 dark:border-zinc-800/50 group-hover:translate-y-[-4px] transition-transform duration-500">
                    <ImageCarousel images={domain.images} />
                </div>
            </div>

            {/* Decorative Gradient Blob on Hover */}
            <div className={`
                absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 
                bg-gradient-to-br ${domain.color} to-transparent opacity-0 
                group-hover:opacity-10 blur-[80px] transition-opacity duration-500 pointer-events-none
            `} />

        </motion.div>
    );
};

export default function DomainsPage() {
    const t = useTranslations('researchDomains');

    const domains: DomainItem[] = [
        {
            title: t('aiTitle'),
            desc: t('aiDesc'),
            icon: <BrainCircuit className="w-6 h-6" />,
            color: 'bg-[#84CC16]',
            accent: 'text-[#84CC16]',
            border: 'hover:border-[#84CC16]/50',
            images: ['/images/homepage/Ai.jpg']
        },
        {
            title: t('cyberTitle'),
            desc: t('cyberDesc'),
            icon: <GlobeLock className="w-6 h-6" />,
            color: 'bg-green-500',
            accent: 'text-green-500',
            border: 'hover:border-green-500/50',
            images: ['/images/homepage/cyberSecure.jpg']
        },
        {
            title: t('smartTitle'),
            desc: t('smartDesc'),
            icon: <Cpu className="w-6 h-6" />,
            color: 'bg-teal-500',
            accent: 'text-teal-500',
            border: 'hover:border-teal-500/50',
            images: ['/images/homepage/smartHeath.png']
        },
        {
            title: t('agriTitle'),
            desc: t('agriDesc'),
            icon: <Tractor className="w-6 h-6" />,
            color: 'bg-lime-500',
            accent: 'text-lime-500',
            border: 'hover:border-lime-500/50',
            images: ['/images/homepage/Prototype-image.png']
        }
    ];

    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 overflow-hidden transition-colors duration-500">
                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-left mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                            {t('title')} <span className="text-[#84CC16]">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {domains.map((domain, idx) => (
                            <DomainCard key={idx} domain={domain} index={idx} />
                        ))}
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
