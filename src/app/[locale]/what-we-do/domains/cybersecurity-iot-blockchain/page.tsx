'use client';

import { motion } from 'framer-motion';
import { GlobeLock, ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from '@/i18n/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ReadMoreContent from '@/components/ReadMoreContent';

export default function CybersecurityIotBlockchainPage() {
    return (
        <PageWrapper>
            <section className="relative grid-bg bg-white dark:bg-[#09090b] py-24 lg:py-32 transition-colors duration-500 min-h-screen">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <Link href="/what-we-do/domains" className="inline-flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors mb-12 font-medium">
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
                                    <GlobeLock className="w-10 h-10 text-green-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                                        Cybersecurity, Internet of Things & Blockchain
                                    </h1>
                                    <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                                </div>
                            </div>

                            <ReadMoreContent
                                summary="We design secure, scalable, and trustworthy systems for connected environments. Our research addresses network security, secure IoT architectures, data privacy, and blockchain-based solutions for transparency, authentication, and decentralized applications."
                                accentColor="#22c55e"
                            >
                                <p>
                                    Modern digital infrastructure increasingly depends on interconnected devices, data exchange, and intelligent systems. At BanavatNest, we explore technological solutions in the areas of Cybersecurity, Internet of Things (IoT), and Blockchain to support secure, reliable, and efficient digital ecosystems. The rapid growth of IoT systems has enabled smart environments where devices, sensors, and platforms continuously collect and exchange information. While these connected systems offer significant advantages in automation and monitoring, they also introduce challenges related to data security, system integrity, and privacy. Our research focuses on developing secure IoT frameworks, intelligent monitoring mechanisms, and reliable communication architectures that can support large-scale connected systems.
                                </p>

                                <p>
                                    Cybersecurity is a critical component of these digital infrastructures. We investigate methods for detecting vulnerabilities, identifying anomalies, and protecting networks and digital platforms from potential threats. Using analytical techniques and AI/ML-based approaches, we explore ways to strengthen security mechanisms and improve the resilience of digital systems.
                                </p>

                                <p>
                                    In addition, we study the use of blockchain technologies for building transparent, decentralized, and tamper-resistant systems. Blockchain-based architectures can provide secure data sharing, trusted digital records, and improved system accountability across various applications.
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
                                <ImageCarousel images={['/images/homepage/cyberSecure.jpg']} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
}
