'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ExternalLink, GraduationCap, Briefcase, Microscope, Calendar, ChevronDown, ChevronUp, BookOpen, Users, FileText, Trophy } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

/* ───────────────────── Data Model ───────────────────── */

export interface JobPosition {
    title: string;
    organization: string;
    period: string;
    description: string;
    highlights?: string[];
}

export interface Publication {
    citation: string;
}

export interface CoAuthor {
    name: string;
    count: number;
    role?: string;
    link: string | null;
}

export interface ReviewerJournal {
    name: string;
    link: string;
}

export interface Degree {
    degree: string;
    institution: string;
    year: string;
    details: string;
}

export interface AwardItem {
    title: string;
    year: string;
    description: string;
}

export interface PhdThesis {
    title: string;
    summary: string;
    publications: string[];
    committee: { name: string; role: string }[];
}

export interface AcademicProfile {
    name: string;
    link: string;
}

export interface PortfolioData {

    id: string;
    name: string;
    role: string;
    image: string;
    bio: string;

    job: {
        summary: string;
        positions: JobPosition[];
    };

    research: {
        summary: string;
        publications: Publication[];
        coAuthors: CoAuthor[];
        reviewerJournals: ReviewerJournal[];
    };

    education: {
        summary: string;
        degrees: Degree[];
        awards: AwardItem[];
        phdThesis?: PhdThesis;
    };

    contact: {
        email: string;
        phone: string[];
        profiles: AcademicProfile[];
    };
}

interface PortfolioPageProps {
    data: PortfolioData;
}

/* ───────────────────── Constants ───────────────────── */

// "overview" tab merges home + job + contact; director name is the label
const SECTION_IDS = ['overview', 'research', 'education'];

/* ───────────────────── Component ───────────────────── */

export default function PortfolioPage({ data }: PortfolioPageProps) {
    const [activeSection, setActiveSection] = useState('overview');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAllPubs, setShowAllPubs] = useState(false);
    const [expandedPosition, setExpandedPosition] = useState<number | null>(0);
    const [showThesis, setShowThesis] = useState(false);
    const [bioExpanded, setBioExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const SECTION_LABELS = [data.name, 'Research', 'Education'];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTabClick = (id: string) => {
        setActiveSection(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    const visiblePubs = showAllPubs ? data.research.publications : data.research.publications.slice(0, 5);

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24 relative flex flex-col">

                {/* ─── Sticky Tab Nav ─── */}
                <div className={`sticky top-20 left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border-gray-200 dark:border-zinc-800 shadow-sm' : 'bg-zinc-50/90 dark:bg-[#09090b]/90 backdrop-blur-md border-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div ref={navRef} className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {SECTION_IDS.map((id, idx) => (
                                <button key={id} onClick={() => handleTabClick(id)} className={`relative whitespace-nowrap text-sm font-bold transition-colors py-1 ${activeSection === id ? 'text-[#84CC16]' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'}`}>
                                    {SECTION_LABELS[idx]}
                                    {activeSection === id && (
                                        <motion.div layoutId="activeSection" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#84CC16] rounded-t-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12">
                    <AnimatePresence mode="wait">

                        {/* ════════════════ OVERVIEW (Home + My Job + Contact) ════════════════ */}
                        {activeSection === 'overview' && (
                            <motion.section key="overview" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16 pb-16">

                                {/* ── Hero / Intro ── */}
                                <div className="relative grid-bg pt-12">
                                    <div className="hidden dark:block">
                                        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[15%] right-[5%] w-[35rem] h-[35rem] bg-[#84CC16]/10 blur-[130px] rounded-full pointer-events-none z-0" />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                                        {/* Photo + name */}
                                        <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
                                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                                                <img src={data.image} alt={data.name} className="w-full h-full object-cover object-top" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            </div>
                                            <div className="text-center lg:text-left">
                                                <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-lime-50 dark:bg-lime-900/10 border border-lime-100/50 dark:border-lime-500/20 shadow-sm mb-4">
                                                    <span className="flex h-2 w-2 rounded-full bg-[#84CC16] animate-pulse"></span>
                                                    <span className="text-[10px] font-black text-[#65A30D] dark:text-[#84CC16] uppercase tracking-[0.2em]">Board of Directors</span>
                                                </div>
                                                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">{data.name}</h1>
                                                <p className="text-xl font-bold text-[#84CC16] uppercase tracking-widest mt-2">{data.role}</p>
                                            </div>
                                        </div>

                                        {/* Biography */}
                                        <div className="lg:col-span-8 space-y-6">
                                            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Biography</h2>

                                            {/* Clamp to ~1 screen when collapsed */}
                                            <div className="relative">
                                                <div
                                                    className={`text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium space-y-5 whitespace-pre-line overflow-hidden transition-all duration-500`}
                                                    style={{ maxHeight: bioExpanded ? '9999px' : '65vh' }}
                                                >
                                                    {data.bio.split('\n\n').map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                                </div>

                                                {/* Fade gradient at bottom when collapsed */}
                                                {!bioExpanded && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50 dark:from-[#09090b] to-transparent pointer-events-none" />
                                                )}
                                            </div>

                                            {/* See More / Show Less */}
                                            <button
                                                onClick={() => setBioExpanded(!bioExpanded)}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-[#84CC16] hover:text-[#65A30D] transition-colors"
                                            >
                                                {bioExpanded ? (
                                                    <><ChevronUp className="w-4 h-4" /> Show Less</>
                                                ) : (
                                                    <><ChevronDown className="w-4 h-4" /> See More</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Divider ── */}
                                <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                {/* ── My Job ── */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/10 flex items-center justify-center"><Briefcase className="w-6 h-6 text-[#84CC16]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">My Job</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-10 text-justify">{data.job.summary}</p>

                                    <div className="space-y-4">
                                        {data.job.positions.map((pos, idx) => (
                                            <div key={idx} className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-lime-500/30 transition-all duration-300 overflow-hidden">
                                                <button onClick={() => setExpandedPosition(expandedPosition === idx ? null : idx)} className="w-full flex items-center justify-between p-6 md:p-8 text-left">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{pos.title}</h3>
                                                        <p className="text-[#84CC16] font-bold text-sm uppercase tracking-wider">{pos.organization}</p>
                                                        {pos.period && <p className="text-zinc-500 text-sm font-medium mt-1">{pos.period}</p>}
                                                    </div>
                                                    {expandedPosition === idx ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                                </button>
                                                <AnimatePresence>
                                                    {expandedPosition === idx && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                            <div className="px-6 md:px-8 pb-8 space-y-4">
                                                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{pos.description}</p>
                                                                {pos.highlights && pos.highlights.length > 0 && (
                                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                                        {pos.highlights.map((h, hi) => (
                                                                            <div key={hi} className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0" />
                                                                                <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">{h}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Divider ── */}
                                <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                {/* ── Contact ── */}
                                <div>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/10 flex items-center justify-center"><Mail className="w-6 h-6 text-[#84CC16]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Contact</h2>
                                    </div>

                                    <div className="bg-[#84CC16] rounded-[2.5rem] p-1 border border-[#65A30D]/20 shadow-xl relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                        <div className="bg-white dark:bg-zinc-900 rounded-[2.3rem] p-8 md:p-12 h-full relative z-10 grid md:grid-cols-2 gap-12 items-start">
                                            <div>
                                                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4">Let&apos;s Connect</h3>
                                                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">For research collaborations, project discussions, or academic inquiries, feel free to reach out.</p>
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-1 bg-lime-50 dark:bg-zinc-800 p-2.5 rounded-xl text-[#84CC16]"><Mail className="w-5 h-5" /></div>
                                                        <div>
                                                            <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Email</p>
                                                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact.email}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#84CC16] transition-colors">{data.contact.email}</a>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-1 bg-lime-50 dark:bg-zinc-800 p-2.5 rounded-xl text-[#84CC16]"><Phone className="w-5 h-5" /></div>
                                                        <div>
                                                            <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Phone</p>
                                                            <div className="space-y-1">{data.contact.phone.map((num, i) => <p key={i} className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{num}</p>)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {data.contact.profiles.length > 0 && (
                                                <div className="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Academic Profiles</h4>
                                                    <ul className="space-y-3">
                                                        {data.contact.profiles.map((p, i) => (
                                                            <li key={i}>
                                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#84CC16] font-medium transition-colors">
                                                                    <ExternalLink className="w-4 h-4" /> {p.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </motion.section>
                        )}

                        {/* ════════════════ RESEARCH ════════════════ */}
                        {activeSection === 'research' && (
                            <motion.section key="research" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="py-8 space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/10 flex items-center justify-center"><Microscope className="w-6 h-6 text-[#84CC16]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Research</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-justify">{data.research.summary}</p>
                                </div>

                                {/* Publications */}
                                {data.research.publications.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <FileText className="w-5 h-5 text-[#84CC16]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Publications ({data.research.publications.length})</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {visiblePubs.map((pub, idx) => (
                                                <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                                    <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">{pub.citation}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {data.research.publications.length > 5 && (
                                            <button onClick={() => setShowAllPubs(!showAllPubs)} className="mt-4 text-[#84CC16] font-bold text-sm hover:text-[#65A30D] transition-colors flex items-center gap-1">
                                                {showAllPubs ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Show All {data.research.publications.length} Publications <ChevronDown className="w-4 h-4" /></>}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Co-Authors */}
                                {data.research.coAuthors.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Users className="w-5 h-5 text-[#84CC16]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Co-Authors</h3>
                                        </div>
                                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {data.research.coAuthors.map((ca, idx) => (
                                                <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm group hover:shadow-xl dark:hover:border-lime-500/30 transition-all duration-300">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{ca.name}</h4>
                                                        <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2.5 py-1 rounded-full">{ca.count}</span>
                                                    </div>
                                                    {ca.role && <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mb-2">{ca.role}</p>}
                                                    {ca.link && (
                                                        <a href={ca.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#84CC16] hover:text-[#65A30D] font-bold flex items-center gap-1 transition-colors">
                                                            Profile <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reviewer */}
                                {data.research.reviewerJournals.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <BookOpen className="w-5 h-5 text-[#84CC16]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Reviewer of Journals</h3>
                                        </div>
                                        <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {data.research.reviewerJournals.map((j, idx) => (
                                                    <a key={idx} href={j.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-[#84CC16] font-medium text-sm transition-colors p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                                                        <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-400" /> {j.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.section>
                        )}

                        {/* ════════════════ EDUCATION ════════════════ */}
                        {activeSection === 'education' && (
                            <motion.section key="education" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="py-8 space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/10 flex items-center justify-center"><GraduationCap className="w-6 h-6 text-[#84CC16]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Education</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-justify">{data.education.summary}</p>
                                </div>

                                {/* Timeline */}
                                <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 left-[39px] md:left-[59px] w-0.5 bg-zinc-100 dark:bg-zinc-800" />
                                    <div className="space-y-12">
                                        {data.education.degrees.map((edu, idx) => (
                                            <div key={idx} className="relative flex gap-6 md:gap-8 group">
                                                <div className="relative mt-2">
                                                    <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-700 z-10 relative group-hover:border-[#84CC16] transition-colors" />
                                                </div>
                                                <div className="flex-1">
                                                    {edu.year && (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-3">
                                                            <Calendar className="w-3.5 h-3.5" />{edu.year}
                                                        </div>
                                                    )}
                                                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{edu.degree}</h3>
                                                    <p className="text-[#84CC16] font-bold text-sm md:text-base uppercase tracking-wider mb-4">{edu.institution}</p>
                                                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed bg-zinc-50/50 dark:bg-zinc-800/30 p-4 rounded-2xl">{edu.details}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Awards */}
                                {data.education.awards.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Trophy className="w-5 h-5 text-[#84CC16]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Awards &amp; Fellowships</h3>
                                        </div>
                                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {data.education.awards.map((aw, idx) => (
                                                <div key={idx} className="bg-white dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-lime-500/30 transition-all duration-300">
                                                    <span className="text-xs font-bold bg-lime-50 dark:bg-lime-900/20 text-[#65A30D] dark:text-[#84CC16] px-3 py-1 rounded-full">{aw.year}</span>
                                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-2">{aw.title}</h4>
                                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">{aw.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PhD Thesis Details (collapsible) */}
                                {data.education.phdThesis && (
                                    <div>
                                        <button onClick={() => setShowThesis(!showThesis)} className="flex items-center gap-3 mb-6 group">
                                            <BookOpen className="w-5 h-5 text-[#84CC16]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-[#84CC16] transition-colors">PhD Thesis Details</h3>
                                            {showThesis ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {showThesis && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                    <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
                                                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 italic">&ldquo;{data.education.phdThesis.title}&rdquo;</h4>
                                                        <div className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-sm space-y-4 whitespace-pre-line">
                                                            {data.education.phdThesis.summary.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                                                        </div>

                                                        {data.education.phdThesis.publications.length > 0 && (
                                                            <div>
                                                                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3">Publications from Thesis</h5>
                                                                <div className="space-y-2">
                                                                    {data.education.phdThesis.publications.map((p, i) => (
                                                                        <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400 font-medium bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-xl">{p}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {data.education.phdThesis.committee.length > 0 && (
                                                            <div>
                                                                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3">Doctoral Committee</h5>
                                                                <div className="grid sm:grid-cols-2 gap-2">
                                                                    {data.education.phdThesis.committee.map((c, i) => (
                                                                        <div key={i} className="flex items-center gap-2 text-sm">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0" />
                                                                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{c.name}</span>
                                                                            <span className="text-zinc-400 text-xs">({c.role})</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageWrapper>
    );
}
