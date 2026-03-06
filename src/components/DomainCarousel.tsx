'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DomainItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
    accent: string;
    iconGradient: string;
    url?: string;
}

interface DomainCarouselProps {
    items: DomainItem[];
}

const DomainCard: React.FC<{ item: DomainItem }> = ({ item }) => {
    return (
        <div
            className="relative w-full max-w-[600px] h-[60vh] max-h-[650px] min-h-[480px] rounded-[2.5rem] overflow-hidden group shadow-xl mx-auto"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.url})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                <div className={`
                    absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center
                    bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6
                `}>
                    <div className="text-white scale-75">
                        {item.icon}
                    </div>
                </div>

                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-3xl font-black tracking-tight text-white mb-3">{item.title}</h3>
                    <p className="text-base font-medium leading-relaxed text-gray-300 line-clamp-3 mb-6">
                        {item.desc}
                    </p>

                    <div className="inline-flex items-center space-x-2">
                        <span className={`h-1 w-8 rounded-full bg-gradient-to-r ${item.accent}`} />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                            Explore
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DomainCarousel: React.FC<DomainCarouselProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-12 py-8">
            <div className="relative h-[520px] w-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 }
                        }}
                        className="absolute w-full flex justify-center"
                    >
                        <DomainCard item={items[activeIndex]} />
                    </motion.div>
                </AnimatePresence>

                <button
                    onClick={prevSlide}
                    className="absolute left-0 sm:-left-4 z-30 flex items-center justify-center w-12 h-12 cursor-pointer group focus:outline-none"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 group-hover:bg-white dark:group-hover:bg-zinc-700 shadow-lg backdrop-blur-sm transition-all border border-gray-100 dark:border-zinc-700 hover:scale-110">
                        <ChevronLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </span>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 sm:-right-4 z-30 flex items-center justify-center w-12 h-12 cursor-pointer group focus:outline-none"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 group-hover:bg-white dark:group-hover:bg-zinc-700 shadow-lg backdrop-blur-sm transition-all border border-gray-100 dark:border-zinc-700 hover:scale-110">
                        <ChevronRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </span>
                </button>
            </div>

            <div className="flex justify-center space-x-3 mt-6">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                            ? 'bg-[#84CC16] w-8'
                            : 'bg-gray-300 dark:bg-zinc-700 w-2 hover:bg-gray-400 dark:hover:bg-zinc-600'
                            }`}
                        aria-current={idx === activeIndex}
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => goToSlide(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DomainCarousel;
