'use client';

import { useState } from 'react';
import { Plus, X, XIcon } from 'lucide-react';
import ApplyNowButton from './ApplyNowButton';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from './icons';
import { useTranslations } from 'next-intl';

type Member = {
    id: number;
    name: string;
    role: string;
    bio: string;
    email: string;
};

const photos = [
    './Farxod.jpg',
    './Shaxzod.jpg',
    './Sardor.jpg',
    './Umidjon.png',
    './Sanjar.jpg',
    './Abdukabir.jpg',
];

const socialIcons = [XIcon, LinkedinIcon, InstagramIcon, FacebookIcon];
interface props {
    scrollToSection: (id: string) => void
}

export default function TeamSection({ scrollToSection }: props) {
    const t = useTranslations('TeamSection');
    const rawMembers = t.raw('members') as Omit<Member, 'photo'>[];
    const members: (Member & { photo: string; number: string })[] = rawMembers.map((m, i) => ({
        ...m,
        photo: photos[i],
        number: String(i + 1).padStart(2, '0'),
    }));

    const [activeId, setActiveId] = useState<number>(1);
    const [selectedMember, setSelectedMember] = useState<(Member & { photo: string; number: string }) | null>(null);

    const leftColumn = members.filter((_, i) => i % 2 === 0);
    const rightColumn = members.filter((_, i) => i % 2 === 1);

    const Row = ({ member }: { member: Member & { photo: string; number: string } }) => {
        const isActive = member.id === activeId;
        return (
            <div
                onMouseEnter={() => setActiveId(member.id)}
                onClick={() => setSelectedMember(member)}
                tabIndex={0}
                className="group relative flex cursor-pointer items-center gap-3 sm:gap-4 overflow-hidden rounded-full px-3 py-2.5 sm:py-3 outline-none transition-colors duration-300 sm:px-4"
            >
                <div className="absolute bottom-0 left-1/2 z-10 h-0 w-0 -translate-x-1/2 translate-y-1/2 rounded-full bg-white transition-all duration-300 group-hover:h-220 group-hover:w-230" />

                <img
                    src={member.photo}
                    alt={member.name}
                    className="z-20 h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-full object-cover"
                />

                <div className="z-20 min-w-0 flex-1">
                    <p className="truncate text-sm sm:text-[15px] font-semibold text-white group-hover:text-neutral-900">
                        {member.name}
                    </p>
                    <p className="truncate text-xs sm:text-[13px] text-emerald-50/80 group-hover:text-neutral-600">
                        {member.role}
                    </p>
                </div>

                <span className="z-20 text-xs group-hover:text-neutral-500 text-emerald-50/70">
                    {member.number}
                </span>

                <motion.div
                    className="z-20 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white bg-white text-neutral-900"
                    animate={{ rotate: isActive ? 720 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Plus size={14} strokeWidth={2} className="sm:hidden" />
                    <Plus size={16} strokeWidth={2} className="hidden sm:block" />
                </motion.div>
            </div>
        );
    };

    return (
        <section className="w-full bg-[#FCFCFA] py-14 sm:py-24">
            <div className="mx-auto w-[94%] sm:w-[90%] rounded-[28px] sm:rounded-4xl bg-[#4CAE84]">
                <div className="px-4 py-8 sm:px-10 sm:py-14 lg:px-14">
                    <div className="mb-8 sm:mb-16 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-base sm:text-lg font-semibold tracking-tight text-neutral-900">
                            <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-emerald-500">
                                <Image src="/logo.svg" alt="Logo" width={62} height={62} />
                            </span>
                            <p className="text-gray-300">
                                <span className="text-white">IZI</span>SOL
                            </p>
                        </span>
                    </div>

                    <h2 className="mb-8 sm:mb-12 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:mb-16 lg:text-6xl">
                        {t('heading')}
                        <br />
                        <span className="text-emerald-100/60">{t('headingHighlight')}</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-x-10 gap-y-0.5 sm:gap-y-1 md:grid-cols-2">
                        <div className="flex flex-col divide-y divide-white/15">
                            {leftColumn.map((m) => (
                                <div key={m.id} className="py-1">
                                    <Row member={m} />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col divide-y divide-white/15">
                            {rightColumn.map((m) => (
                                <div key={m.id} className="py-1">
                                    <Row member={m} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 items-end gap-6 sm:gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                        <div className="overflow-hidden rounded-[18px] sm:rounded-[24px]">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
                                alt="Two colleagues in a meeting handing over a document"
                                className="h-[220px] w-full object-cover sm:h-[340px] lg:h-[600px]"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                                {t('aboutHeading')}
                            </h2>

                            <p className="my-4 sm:my-6 max-w-full text-sm sm:text-[15px] leading-6 text-emerald-50/85">
                                {t('aboutText')}
                            </p>
                            <ApplyNowButton onclick={() => scrollToSection('contact')} bg="bg-neutral-950" bgDot="bg-white" title={t('joinButton')} />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md"
                            onClick={() => setSelectedMember(null)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 16 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-2xl max-h-[88vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-[#F5F5E9] rounded-[22px] sm:rounded-[28px] p-2.5 sm:p-3"
                        >
                            <div className="flex flex-col overflow-hidden rounded-[22px] sm:rounded-[28px] gap-2.5 sm:gap-3 sm:flex-row">
                                <div className="h-48 sm:h-64 w-full shrink-0 sm:h-auto sm:w-[240px] rounded-[22px] sm:rounded-[28px]">
                                    <img
                                        src={selectedMember.photo}
                                        alt={selectedMember.name}
                                        className="h-full w-full object-cover rounded-[22px] sm:rounded-[28px]"
                                    />
                                </div>

                                <div className="relative flex-1 p-5 sm:p-8 rounded-[22px] sm:rounded-[28px] bg-white">
                                    <button
                                        onClick={() => setSelectedMember(null)}
                                        className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-black/5"
                                        aria-label="Close"
                                    >
                                        <X size={18} strokeWidth={2} />
                                    </button>

                                    <p className="text-xs sm:text-sm text-neutral-500">{selectedMember.role}</p>
                                    <h3 className="mt-1 text-xl font-bold text-neutral-900 sm:text-3xl">
                                        {selectedMember.name}
                                    </h3>

                                    <p className="mt-3 sm:mt-4 max-w-md text-[13px] leading-6 text-neutral-600">
                                        {selectedMember.bio}
                                    </p>

                                     
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}