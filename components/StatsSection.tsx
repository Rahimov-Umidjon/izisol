'use client';

import { HandFist, Users, FolderKanban, Building2, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons: LucideIcon[] = [Building2, FolderKanban, HandFist, Users];

export default function StatsSection() {
    const t = useTranslations('StatsSection');
    const stats = t.raw('stats') as { value: string; suffix: string; description: string }[];

    return (
        <section className="w-full bg-[#FCFCFA] pb-14 sm:pb-20">
            <div className="grid w-[94%] sm:w-[90%] mx-auto grid-cols-1 divide-y divide-neutral-200 border rounded-[24px] sm:rounded-4xl border-neutral-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = icons[index];
                    return (
                        <div
                            key={stat.description}
                            className="relative flex flex-col justify-between gap-6 sm:gap-10 px-5 py-7 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
                        >
                            <div className="flex justify-end">
                                <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-neutral-100">
                                    <Icon size={16} strokeWidth={1.75} className="text-neutral-700 sm:hidden" />
                                    <Icon size={17} strokeWidth={1.75} className="text-neutral-700 hidden sm:block" />
                                </span>
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <span className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
                                        {stat.value}
                                    </span>
                                    {stat.suffix && (
                                        <span className="mt-1.5 sm:mt-2 text-lg font-semibold text-emerald-500 sm:text-xl lg:text-2xl">
                                            {stat.suffix}
                                        </span>
                                    )}
                                </div>

                                <p className="mt-4 sm:mt-6 max-w-[200px] text-[13px] sm:text-sm leading-5 text-neutral-500">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}