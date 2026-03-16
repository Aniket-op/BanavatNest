'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ReadMoreContent from '@/components/ReadMoreContent';

export default function AiMlDataSciencePage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/domains" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#84CC16] transition-colors mb-12 font-medium">
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
                                    <BrainCircuit className="w-10 h-10 text-[#84CC16]" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Artificial Intelligence, Machine Learning & Data Science
                                    </h1>
                                    <div className="h-1 w-20 bg-[#84CC16] rounded-full"></div>
                                </div>
                            </div>

                            <ReadMoreContent
                                summary="We develop data-driven models and intelligent algorithms for prediction, optimization, and decision support. Our work focuses on applying AI and ML techniques to solve complex problems across engineering, healthcare, and societal applications."
                                accentColor="#84CC16"
                            >
                                <p>
                                    Artificial Intelligence (AI), Machine Learning (ML), and Data Science form the technological backbone of many of the solutions developed at BanavatNest. These domains act as a common platform that supports innovation across multiple sectors including agriculture, healthcare, cybersecurity, IoT-enabled systems, and software development.
                                </p>

                                <p>
                                    Through AI and ML techniques, we analyze complex datasets, identify hidden patterns, develop predictive models, and design intelligent systems that can assist in decision-making and automation. Data science enables us to transform raw data collected from sensors, digital platforms, and operational systems into meaningful insights that can guide technological solutions.
                                </p>

                                <p>
                                    Across our projects, these technologies play a central role in enabling intelligent monitoring, anomaly detection, predictive analysis, and optimization of systems. Whether it is analyzing agricultural data, supporting healthcare monitoring systems, strengthening cybersecurity frameworks, or enabling smart IoT environments, AI and ML provide the analytical capability required to develop effective solutions.
                                </p>
                            </ReadMoreContent>
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
                                <ImageCarousel images={['/images/homepage/Ai.jpg']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
