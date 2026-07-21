'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, PenTool, Rocket, TrendingUp, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const icons: LucideIcon[] = [Users, PenTool, Rocket, TrendingUp];

export default function ProcessSection() {
    const t = useTranslations('ProcessSection');
    const [activeIndex, setActiveIndex] = useState<number>(1);

    const phases = t.raw('phases') as { label: string; title: string; description: string; images: string }[];
 
    return (
        <section className="w-full bg-[#FCFCFA]   py-16 sm:px-10 sm:py-24 lg:px-16">
            <div className="mx-auto w-[94%] sm:w-[90%] ">
                <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                    {t('headingBold')}{' '}
                    <span className="text-neutral-400">
                        {t('headingLight')}
                    </span>
                </h2>

                <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-[15px] leading-6 text-neutral-500">
                    {t('subtext')}
                </p>

                {/* Mobil: vertikal accordion (flex-col) | sm+: gorizontal kartalar (flex-row) */}
                <div className="mt-8 sm:mt-16 flex h-[520px] w-full flex-col gap-2 sm:h-[520px] sm:flex-row sm:gap-3 lg:h-[560px] rounded-[24px] sm:rounded-[32px] bg-[#F5F5E9] p-2 sm:p-3">
                    {phases.map((phase, index) => {
                        const isActive = index === activeIndex;
                        const Icon = icons[index];
                        const number = String(index + 1).padStart(2, '0');

                        return (
                            <motion.div
                                key={phase.label}
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                tabIndex={0}
                                animate={{ flexGrow: isActive ? 6 : 1 }}
                                transition={
                                    isActive
                                        ? { type: 'spring', stiffness: 260, damping: 14, mass: 0.9 }
                                        : { type: 'tween', duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                                }
                                className="relative flex min-w-0 basis-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 lg:p-8"
                            >
                                {/* Fon rasm */}

                                <div className="absolute inset-0 ">
                                    <Image
                                        src={phase.images}
                                        alt={phase.title}
                                        fill
                                        sizes="(min-width: 640px) 25vw, 100vw"
                                        className="object-cover "
                                    />
                                    {/* O'qilishi uchun overlay: faol kartada quyuqroq, nofaolda faqat pastda yengil qorayish */}
                                    <div
                                        className={`absolute inset-0 transition-colors duration-500 ${isActive
                                            ? 'bg-black/75'
                                            : 'bg-gradient-to-t from-black/65 via-black/40 to-black/40 hover:from-black/75'
                                            }`}
                                    />
                                </div>


                                <div className="flex items-start justify-between z-10">
                                    <AnimatePresence mode="wait" initial={false}>
                                        {isActive ? (
                                            <motion.div
                                                key="phase-label"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-white/60"
                                            >
                                                <span>{t('stepLabel')}</span>
                                                <span className="text-white">{number}</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="number-only"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="text-sm font-medium text-white/80"
                                            >
                                                {number}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25, delay: 0.1 }}
                                                className="flex items-center gap-1.5"
                                            >
                                                {phases.map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${i === index ? 'bg-emerald-500' : 'bg-white/30'
                                                            }`}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <AnimatePresence >
                                    {!isActive && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm font-medium text-white/90 sm:[writing-mode:vertical-lr] sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:bottom-8"
                                        >
                                            {phase.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 12 }}
                                            transition={{ duration: 0.3, delay: 0.15 }}
                                            className="pointer-events-none min-w-0 max-w-full sm:min-w-[280px] sm:max-w-md z-10"
                                        >
                                            <div className="mb-3 sm:mb-6 flex items-center gap-2 text-white">
                                                <Icon size={17} strokeWidth={2} className="shrink-0" />
                                                <span className="text-base sm:text-lg font-semibold">
                                                    {phase.title}
                                                </span>
                                            </div>

                                            <p className="text-[13px] sm:text-[15px] leading-5 sm:leading-6 text-neutral-300">
                                                {phase.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}