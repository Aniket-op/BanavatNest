'use client';

import { motion } from 'framer-motion';
import { Send, Building2, Globe, Cpu, Users } from 'lucide-react';

const PartnersFeedback = () => {
    const partners = [
        { name: "TechGiant Corp", icon: <Building2 className="w-8 h-8" /> },
        { name: "Global Innovations", icon: <Globe className="w-8 h-8" /> },
        { name: "Future Systems", icon: <Cpu className="w-8 h-8" /> },
        { name: "Community Alliance", icon: <Users className="w-8 h-8" /> },
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Our Clients */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4">
                                Our Clients
                            </h2>
                            <div className="w-16 h-1 bg-[#84CC16] mb-6" />
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                We work with organizations that share our passion for innovation and impact.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {partners.map((partner, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center justify-center p-8 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-[#84CC16] transition-colors duration-300 group"
                                >
                                    <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-[#84CC16] transition-colors mb-3">
                                        {partner.icon}
                                    </div>
                                    <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm text-center">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Simple Feedback Form */}
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Feedback</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">We&apos;d love to hear from you.</p>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none dark:text-white focus:border-[#84CC16] transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none dark:text-white focus:border-[#84CC16] transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none dark:text-white focus:border-[#84CC16] transition-colors"
                                    placeholder="your subject"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none dark:text-white focus:border-[#84CC16] transition-colors resize-none"
                                    placeholder="Your thoughts..."
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                Submit
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PartnersFeedback;
