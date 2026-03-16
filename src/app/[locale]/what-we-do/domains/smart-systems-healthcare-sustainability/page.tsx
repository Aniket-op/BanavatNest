'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ReadMoreContent from '@/components/ReadMoreContent';

export default function SmartSystemsHealthcareSustainabilityPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/domains" className="inline-flex items-center gap-2 text-zinc-500 hover:text-teal-500 transition-colors mb-12 font-medium">
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
                                    <Cpu className="w-10 h-10 text-teal-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Smart Systems, Healthcare & Sustainability
                                    </h1>
                                    <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
                                </div>
                            </div>

                            <ReadMoreContent
                                summary="We work on intelligent and sustainable systems that integrate sensing, analytics, and automation. Our focus includes smart healthcare solutions, resource-efficient technologies, and sustainability-driven innovations for improved quality of life."
                                accentColor="#14b8a6"
                            >
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Intelligent Sensor-Based Systems</h3>
                                        <p>BanavatNest develops smart systems that integrate sensors, analytics, and automation. These systems collect real-world data and transform it into actionable insights for intelligent monitoring and decision support.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Data-Driven Healthcare Solutions</h3>
                                        <p>In healthcare, we explore sensor-enabled monitoring and AI/ML-based analytics to support diagnosis and health assessment. These technologies assist in early detection, continuous monitoring, and improved healthcare decision-making.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Sustainable Technology Development</h3>
                                        <p>Our work focuses on designing technologies that optimize resource usage and improve operational efficiency. Smart sensing and analytics help create solutions that support sustainability and responsible system management.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Data, Analytics & Predictive Intelligence</h3>
                                        <p>By combining sensor technologies with data-driven analytics, we develop systems capable of detecting patterns and generating predictive insights. These intelligent systems contribute to safer, healthier, and more sustainable environments.</p>
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
                                <ImageCarousel images={['/images/homepage/smartHeath.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
