'use client';

import { LayoutDashboard, Repeat, Headset, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons: LucideIcon[] = [LayoutDashboard, Repeat, Headset];

export default function PaceSection() {
    const t = useTranslations('PaceSection');
    const features = t.raw('features') as { label: string; description: string }[];

    return (
        <section id="about" className="w-full bg-[#FCFCFA]   py-16 sm:px-10 sm:py-24 lg:px-16">
            <div className="mx-auto w-[94%] sm:w-[90%]">
                <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                    {t('headingBold')}{' '}
                    <span className="text-neutral-400">
                        {t('headingLight')}
                    </span>
                </h2>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 rounded-[24px] sm:rounded-[32px] bg-neutral-950 p-6 sm:gap-8 sm:p-10 md:grid-cols-3 md:gap-10 lg:p-12">
                    {features.map((feature, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={feature.label} className="flex flex-col gap-3 sm:gap-4">
                                <Icon size={19} strokeWidth={1.75} className="text-neutral-300" />
                                <p className="text-[13px] leading-5 text-neutral-300 sm:text-sm sm:leading-6">
                                    <span className="font-semibold text-white">
                                        {feature.label}
                                    </span>{' '}
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}