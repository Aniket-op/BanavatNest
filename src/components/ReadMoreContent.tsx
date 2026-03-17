'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreContentProps {
    summaryHeading: React.ReactNode;
    summaryContent: React.ReactNode;
    children: React.ReactNode;
    accentColor?: string;
}

const ReadMoreContent: React.FC<ReadMoreContentProps> = ({ summaryHeading, summaryContent, children, accentColor = '#84CC16' }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">

            <div>
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">{summaryHeading}</h2>
                <p>{summaryContent}</p>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="space-y-6 overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group cursor-pointer"
                style={{ color: accentColor }}
            >
                {expanded ? 'Read Less' : 'Read More'}
                {expanded ? (
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
            </button>
        </div>
    );
};

export default ReadMoreContent;
