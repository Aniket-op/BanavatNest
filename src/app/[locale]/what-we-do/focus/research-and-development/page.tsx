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
                                <p>
                                    At BanavatNest, research is not limited to theory. It is centered on solving real problems faced by industries, businesses, and society. Our Research & Development activities focus on identifying practical challenges from industry and product-specific needs, and then exploring how those challenges can be addressed through systematic investigation, design, experimentation, and innovation.
                                </p>

                                <p>
                                    We follow a problem-driven approach. Rather than developing technology first and then searching for an application, we begin with the actual problem. We study the need carefully, examine the limitations in the present system, and identify where improvement is required. In many situations, the challenge may not lie in the entire product but in a specific part, process, or component. Therefore, our research often focuses on improving or redesigning a single component that can make the complete system more effective, efficient, reliable, or intelligent.
                                </p>

                                <p>
                                    Our work spans multiple domains where practical innovation can create meaningful impact. These include healthcare, agriculture, cybersecurity, IoT-enabled systems, and AI/ML-driven analytics. In healthcare, we explore solutions that can support improved monitoring, diagnosis, analysis, and intelligent assistance. In agriculture, we work on smart and application-oriented technologies that can improve productivity, automation, and sustainability. In cybersecurity and IoT, we investigate secure, connected, and intelligent systems that can address present-day digital and industrial challenges. Alongside these areas, we use Artificial Intelligence (AI) and Machine Learning (ML) tools and techniques to study data, detect patterns, support decision-making, and build practical analytical solutions.
                                </p>

                                <p>
                                    At present, we are actively working on eight problem statements, distributed equally across four broad areas: software development, healthcare, agriculture, and IoT. This includes two ongoing problems in each of these domains. Each problem is being explored with the aim of developing practical outcomes that can eventually be translated into scalable products, processes, or services.
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
                                <ImageCarousel images={['/images/homepage/Key-Domains.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
