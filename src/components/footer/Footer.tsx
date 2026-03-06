'use client';

import { Link } from '@/i18n/navigation';
import { Mail, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from '../Logo';

const Footer = () => {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const tCommon = useTranslations('common');

    const socialLinks = [
        { Icon: Linkedin, href: "https://www.linkedin.com/company/banavatnest-pvt-ltd/", label: "LinkedIn" },
        { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587883936129", label: "Facebook" },
        { Icon: Instagram, href: "https://www.instagram.com/banavatnest/", label: "Instagram" },
    ];

    return (
        <footer className="bg-white dark:bg-[#070708] pt-24 pb-12 border-t border-gray-100 dark:border-zinc-900 relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 mb-6">
                            <Logo />
                        </Link>
                        <div className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed font-medium space-y-2">
                            <p>{t('companyName')}</p>
                            <p>{t('cin')}</p>
                        </div>
                        <div className="mt-8 flex space-x-3">
                            {socialLinks.map(({ Icon, href }, i) => (
                                <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="block p-2.5 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/10 text-gray-400 dark:text-zinc-500 hover:text-[#84CC16] transition-all">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-100 font-bold mb-8 text-lg">{t('platform')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400 font-bold">
                            <li><Link href="/what-we-do/focus" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2" />{tNav('focusAreas')}</Link></li>
                            <li><Link href="/what-we-do/domains" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2" />{t('researchDomains')}</Link></li>
                            <li><Link href="/bridge/collaboration" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2" />{tNav('collaboration')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-100 font-bold mb-8 text-lg">{t('company')}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400 font-bold">
                            <li><Link href="/about/name" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#5D3A1A] dark:bg-zinc-100 mr-2" />{t('aboutUs')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#5D3A1A] dark:bg-zinc-100 mr-2" />{t('privacyPolicy')}</Link></li>
                            <li><Link href="/terms" className="hover:text-[#84CC16] transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#5D3A1A] dark:bg-zinc-100 mr-2" />{t('termsOfUse')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-900 dark:text-zinc-100 font-bold mb-8 text-lg">{tNav('contact')} </h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400 font-bold">
                            <li className="flex items-start"><Mail className="w-5 h-5 mr-3 text-[#84CC16] shrink-0" /> <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@banavatnest.com&su=Inquiry from Website&body=Hi BanavatNest Team,"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                info@banavatnest.com
                            </a></li>
                            <li className="flex items-start"><Phone className="w-5 h-5 mr-3 text-[#84CC16] shrink-0" /> +91 99340 44777<br />+91 80023 96506</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-zinc-500 font-medium">
                    <p>{tCommon('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
