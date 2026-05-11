'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const locales = [
    { code: 'en' as const, label: 'English', nativeLabel: 'English' },
    { code: 'hi' as const, label: 'Hindi', nativeLabel: 'हिन्दी' },
    { code: 'pa' as const, label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
    { code: 'bn' as const, label: 'Bengali', nativeLabel: 'বাংলা' },
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('languageSwitcher');

    const currentLang = locales.find(l => l.code === currentLocale) || locales[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLocale = (newLocale: 'en' | 'hi' | 'pa' | 'bn') => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-50 transition-all"
                aria-label={t('label')}
            >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLang.nativeLabel}</span>
                <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        {locales.map((locale) => (
                            <button
                                key={locale.code}
                                onClick={() => switchLocale(locale.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors
                  ${currentLocale === locale.code
                                        ? 'bg-teal-50 text-[#3A9B9B] dark:bg-teal-50 dark:text-[#3A9B9B]'
                                        : 'text-gray-600 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-50 hover:text-[#3A9B9B] dark:hover:text-[#3A9B9B]'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-base">{locale.nativeLabel}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-400">{locale.label}</span>
                                </span>
                                {currentLocale === locale.code && (
                                    <Check className="w-4 h-4 text-[#3A9B9B] dark:text-[#3A9B9B]" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
