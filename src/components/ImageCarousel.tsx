'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
    aspectRatio?: string;
    rounded?: string;
    objectFit?: 'cover' | 'contain';
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
    images, 
    aspectRatio = "aspect-square md:aspect-[4/3]", 
    rounded = "rounded-[2.5rem]",
    objectFit = "cover"
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, images.length]);

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        })
    };

    return (
        <div className="relative w-full">
            <div className={`relative w-full ${aspectRatio} ${rounded} overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-800/50`}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div
                            className={`w-full h-full ${objectFit === 'contain' ? 'bg-contain' : 'bg-cover'} bg-center bg-no-repeat`}
                            style={{ backgroundImage: `url(${images[activeIndex]})` }}
                        />
                        <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-all text-white border border-white/10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-all text-white border border-white/10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Dot indicators — inside the image box, overlaid at the bottom */}
                        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                                        ? 'bg-[#3A9B9B] w-8'
                                        : 'bg-white/60 w-1.5 hover:bg-white/90'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
