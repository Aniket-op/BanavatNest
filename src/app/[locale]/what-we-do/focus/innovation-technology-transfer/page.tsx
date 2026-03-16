'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ReadMoreContent from '@/components/ReadMoreContent';

export default function InnovationAndTechnologyTransferPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/focus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-12 font-medium">
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
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
                                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0">
                                    <Zap className="w-10 h-10 text-amber-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Innovation & Technology Transfer
                                    </h1>
                                    <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
                                </div>
                            </div>

                            <ReadMoreContent
                                summary="We support the transformation of research outputs into deployable technologies through structured innovation processes. Our focus includes intellectual property development, proof-of-concept validation, and facilitating technology transfer to industry partners."
                                accentColor="#f59e0b"
                            >
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Enabling Research-Based Innovation</h3>
                                        <p>BanavatNest supports the transformation of research ideas into deployable technologies through structured innovation processes. Our approach focuses on proof-of-concept development and practical validation of emerging technologies.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Open Innovation Ecosystem</h3>
                                        <p>Students, faculty members, and researchers are encouraged to bring forward ideas and identified challenges. BanavatNest provides a collaborative platform where these ideas can be explored through research and technological development.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Intellectual Property Development</h3>
                                        <p>Promising innovations are supported through intellectual property development, including patent documentation and protection where appropriate. BanavatNest acts as a facilitating platform and stakeholder in the resulting technology.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">• Technology Transfer & Commercialization</h3>
                                        <p>Once technologies reach sufficient maturity, we explore commercialization and industry collaboration. This includes prototype refinement, testing, and transferring technologies to partners capable of scaling and deployment.</p>
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
                                <ImageCarousel images={['/images/homepage/Our-Vision.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
