'use client';

import { motion } from 'framer-motion';
import { Microscope, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ReadMoreContent from '@/components/ReadMoreContent';

export default function ResearchAndDevelopmentPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/focus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors mb-12 font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Focus Areas
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
                                    <Microscope className="w-10 h-10 text-blue-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Research & Development
                                    </h1>
                                    <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>

                            <ReadMoreContent
                                summary="BanavatNest emphasizes research-driven innovation by addressing real-world problems through systematic investigation, analytical modeling, and experimental validation. Our R&D activities focus on developing scalable, reliable, and application-oriented solutions."
                                accentColor="#3b82f6"
                            >
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Research-Driven Innovation</h3>
                                        <p>BanavatNest focuses on research-driven innovation by addressing real-world challenges through systematic investigation, analytical modeling, and experimental validation. Our goal is to develop scalable, reliable, and application-oriented solutions.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Problem-First Approach</h3>
                                        <p>Our R&D begins with identifying real problems faced by industry and society. Instead of building technology first, we carefully study existing limitations and redesign components, processes, or systems to create practical improvements.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Multidisciplinary Technology Development</h3>
                                        <p>Our work spans domains such as healthcare, agriculture, cybersecurity, IoT, and AI/ML-driven analytics. We develop intelligent solutions that enable data-driven insights, automation, secure systems, and technology-enabled decision support.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Ongoing Research Programs</h3>
                                        <p>Currently, BanavatNest is working on eight active problem statements across software development, healthcare, agriculture, and IoT. Each project aims to translate research outcomes into scalable products, services, or deployable technologies.</p>
                                    </div>
                                </div>
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
                                <ImageCarousel images={['/images/homepage/Key-Domains.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
