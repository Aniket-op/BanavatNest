'use client';

import { motion } from 'framer-motion';
import { Users2, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';

export default function IndustryAcademiaCollaborationPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/focus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-purple-500 transition-colors mb-12 font-medium">
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
                            {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
                            <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0">
                                <Users2 className="w-10 h-10 text-purple-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                    Industry–Academia Collaboration
                                </h1>
                                <div className="h-1 w-20 bg-purple-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-8">
                                BanavatNest actively bridges the gap between academia and industry by enabling collaborative research, student-driven projects, and faculty-led innovation. This collaboration ensures knowledge transfer, skill development, and industry-relevant outcomes.
                            </p>
                            
                            <p>
                                At BanavatNest, we actively work to bridge the gap between academia and industry. We believe that meaningful innovation often emerges when practical experience from industry is combined with strong scientific and technical foundations from academia. Industry professionals deal with real-world operational challenges, while academic researchers bring analytical thinking, fundamental knowledge, and systematic problem-solving approaches. Bringing these two perspectives together creates a powerful environment for innovation.
                            </p>
                            
                            <p>
                                Industry partners are encouraged to share the challenges, ideas, and technical problems they encounter in their day-to-day operations. Once a problem is identified, our team follows a divide-and-module approach, where complex challenges are carefully analyzed and broken down into smaller, manageable components. In this process, we often reshape or abstract the original problem so that it can be studied scientifically while still respecting the confidentiality, operational constraints, and domain sensitivities of our industry partners.
                            </p>
                            
                            <p>
                                Each sub-component of the problem is then explored through research, experimentation, and technological development. Our researchers investigate possible solutions, test concepts, and develop models or prototype components that address the individual parts of the larger challenge. Once promising solutions are identified, the findings and developed modules are shared back with the industry partner for further discussion, validation, and potential implementation.
                            </p>

                            <p>
                                This collaborative framework creates a mutually beneficial ecosystem. Students, faculty members, and researchers associated with BanavatNest gain the opportunity to work on real-world industrial problems, allowing them to complement their theoretical understanding with hands-on experience. At the same time, industry partners benefit from fresh perspectives, analytical insights, and innovative technological solutions developed through academic research.
                            </p>

                            <p>
                                Through such collaborations, BanavatNest aims to create a dynamic platform where knowledge, practical experience, and innovation intersect, enabling both academia and industry to jointly explore new possibilities and develop solutions that address real challenges.
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
                            <ImageCarousel images={['/images/homepage/Problem-Decomposition.png']} />
                        </div>
                    </motion.div>
                </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
