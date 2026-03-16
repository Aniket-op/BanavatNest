'use client';

import { motion } from 'framer-motion';
import { Code2, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';

export default function ProductPrototypingPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/focus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#84CC16] transition-colors mb-12 font-medium">
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
                                    <Code2 className="w-10 h-10 text-[#84CC16]" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Product Prototyping
                                    </h1>
                                    <div className="h-1 w-20 bg-[#84CC16] rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200">
                                    We translate research ideas into functional prototypes by integrating design, engineering, and testing. Our prototyping efforts aim to validate feasibility, performance, and usability before large-scale deployment or commercialization.
                                </p>
                                
                                <p>
                                    At BanavatNest, product prototyping plays an important role in transforming research ideas into practical and usable technologies. Our prototyping activities span across the same domains in which we conduct research, including healthcare, agriculture, cybersecurity, IoT-enabled systems, software development, and AI/ML-driven analytics.
                                </p>
                                
                                <p>
                                    We develop prototypes through two primary pathways. Some prototypes are developed in response to specific requirements from industry partners, where organizations approach us with a problem or product idea that requires technical exploration or proof-of-concept development. In other cases, prototypes emerge from innovative ideas identified by students, faculty members, and researchers who are part of the BanavatNest innovation ecosystem. These ideas are evaluated for their feasibility, relevance, and potential impact before moving into the prototype development stage.
                                </p>
                                
                                <p>
                                    Our goal in prototyping is to build a functional proof-of-concept that demonstrates how a particular technology or idea can work in practice. This stage allows us to test design assumptions, evaluate performance, identify limitations, and refine the system before considering larger-scale development. Once a prototype is successfully developed, we explore possibilities for its commercialization. Depending on the nature of the technology, this may involve further product refinement, field testing, or collaboration with relevant industry partners who have the capability to scale and deploy the solution. In many cases, BanavatNest works closely with industry stakeholders to jointly explore pathways for transforming prototypes into market-ready products.
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
