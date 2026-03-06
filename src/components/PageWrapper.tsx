'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export default PageWrapper;
