'use client';

import { motion } from 'framer-motion';
import { Tractor, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';

export default function AgricultureSmartFarmingPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/domains" className="inline-flex items-center gap-2 text-zinc-500 hover:text-lime-500 transition-colors mb-12 font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Domains
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative h-full"
                    >
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0">
                                    <Tractor className="w-10 h-10 text-lime-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Agriculture & Smart Farming
                                    </h1>
                                    <div className="h-1 w-20 bg-lime-500 rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200">
                                    We apply advanced technologies to agriculture through data analytics, IoT-based monitoring, and AI-driven decision support systems. Our work aims to enhance productivity, optimize resource usage, and promote sustainable and precision farming practices.
                                </p>

                                <p>
                                    Agriculture remains one of the most important sectors for economic stability and food security. At BanavatNest, we focus on developing technology-driven solutions that address challenges at the root level of agricultural practices. Our goal is to identify real problems faced by farmers, agricultural enterprises, and related industries, and explore practical ways to solve them through research, engineering, and technological innovation.
                                </p>

                                <p>
                                    A major focus of our work is to develop cost-effective and practical solutions that can improve productivity, efficiency, and safety in agricultural operations. In many agricultural environments, certain tasks require continuous human involvement in conditions that may be physically demanding, risky, or inefficient. Through our research and prototyping efforts, we aim to design systems and devices that can reduce unnecessary human intervention, especially in situations where direct human involvement may expose individuals to hazards or operational difficulties.
                                </p>

                                <p>
                                    Our work in this domain often integrates smart technologies, including sensor-based monitoring, automation, Internet of Things (IoT) systems, and data-driven decision support tools. These technologies help in improving operational efficiency, enabling remote monitoring, and supporting more informed decision-making in farming activities. By combining technological innovation with practical agricultural needs, BanavatNest aims to contribute toward the development of smart farming practices that are accessible, efficient, and scalable. Our objective is not only to enhance productivity but also to support sustainable agricultural practices through intelligent and affordable technological solutions.
                                </p>
                            </div>
                        </div>

                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2 lg:sticky lg:top-28"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                <ImageCarousel images={['/images/homepage/Prototype-image.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
