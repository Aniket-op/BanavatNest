'use client';

import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-transparent">
            <motion.div
                className="w-[50px] h-[50px] rounded-full border-4 border-zinc-200 border-t-[#3A9B9B]"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default LoadingSpinner;
