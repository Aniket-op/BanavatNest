'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';

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
                            {/* Header */}
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

                            {/* Content */}
                            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <p className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-8">
                                    We support the transformation of research outputs into deployable technologies through structured innovation processes. Our focus includes intellectual property development, proof-of-concept validation, and facilitating technology transfer to industry partners.
                                </p>

                                <p>
                                    At BanavatNest, innovation is encouraged not only within the organization but also across the broader academic ecosystem. We welcome students, faculty members, and researchers from academic institutions who identify meaningful problems and wish to explore solutions through research and technological development.
                                </p>

                                <p>
                                    Researchers and innovators are encouraged to bring forward their ideas or identified challenges and work toward developing solutions through systematic investigation and experimentation. When such efforts lead to promising innovations, BanavatNest provides a supportive platform for prototype development, allowing these ideas to evolve into functional proof-of-concept systems.
                                </p>

                                <p>
                                    Beyond prototype development, BanavatNest also supports innovators in pursuing intellectual property protection, including patent filing and documentation where appropriate. In this process, BanavatNest acts as a facilitating platform and a stakeholder in the resulting technology, helping guide the innovation through the stages of development, validation, and protection.
                                </p>

                                <p>
                                    Once a technology reaches a suitable level of maturity, we further explore possibilities for commercialization or technology transfer. This may involve refining the prototype, conducting additional testing, or collaborating with relevant industry partners who have the capability to manufacture, deploy, or scale the technology in real-world environments.
                                </p>

                                <p>
                                    Through this framework, BanavatNest aims to create a pathway where academic ideas can evolve into practical technologies. By supporting innovation, protecting intellectual property, and connecting innovators with industry, we seek to ensure that promising research outcomes move beyond laboratories and contribute to real-world applications and societal impact.
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
                                <ImageCarousel images={['/images/homepage/Our-Vision.png']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
