'use client';

import { useState } from 'react';
import { ListChecks, Check, PhoneCall, Mailbox } from 'lucide-react';
import ApplyNowButton from './ApplyNowButton';
import Image from 'next/image';
import { useTranslations } from 'next-intl';




const features = [
    { icon: PhoneCall, label: '+99894 744 14 15' , id:'phone' },
    { icon: Mailbox, label: 'info@izisol.uz', id:'email' },
    { icon: ListChecks, label: "5-qavat, E kirish, NestOne Botir Zakirov ko‘chasi 1 A/1, Toshkent" ,id:'location' },
];

export default function GrowthHeroSection() {
    const t = useTranslations("contact");
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [agree, setAgree] = useState(false);

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const services = [
        t("mobileDevelopment"),
        t("webDevelopment"),
        t("telegramBot"),
        t("seo"),
    ];

    return (
        <section id="contact" className="relative w-full  overflow-hidden bg-[#FCFCFA]">
            <div className="relative min-h-screen w-[calc(100%-16px)] sm:w-[calc(100%-40px)] mx-auto rounded-[24px] sm:rounded-4xl overflow-hidden">
                {/* Background image */}
                <img
                    src="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=2000&auto=format&fit=crop"
                    alt="Tulip macro shot"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-blue-950/40" />

                <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 py-5 sm:px-8 sm:py-6 lg:px-10">


                    {/* Hero content + form */}
                    <div className="grid flex-1 grid-cols-1 items-center gap-8 py-6 sm:gap-10 sm:py-10 lg:grid-cols-2 lg:gap-6">
                        {/* Left: headline / features / testimonial */}
                        <div className="flex flex-col justify-center gap-8 sm:gap-16">
                            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                {t('title')}
                            </h1>

                            <div className="flex flex-col gap-3 sm:gap-4">
                                {features.map((f) => {
                                    const Icon = f.icon;
                                    return (
                                        <div key={f.label} className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                                                <Icon size={15} strokeWidth={1.75} />
                                            </span>
                                            <a href={f?.id === 'phone' ?  `tel:${f.label}` : f?.id === 'email' ?  `mailto:${f.label}` : 'https://yandex.uz/maps/-/CTVTuHlx'} target='_blank' className="text-xs sm:text-sm font-medium text-white/90">
                                                {f.label}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>


                        </div>

                        {/* Right: glass form card */}
                        <div className="rounded-[22px] sm:rounded-[32px] border border-white/25 bg-white/20 p-5 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
                            <div className="mb-5 sm:mb-6 flex items-center gap-1.5 text-base font-semibold text-neutral-900">
                                <span className="flex items-center gap-1 text-lg font-semibold tracking-tight text-neutral-900 cursor-pointer">
                                    <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-emerald-500">
                                        <Image
                                            src="/logo.svg"
                                            alt="Logo"
                                            width={62}
                                            height={62}
                                        />
                                    </span>

                                    <p className="text-gray-600">
                                        <span className="text-emerald-500">IZI</span>SOL
                                    </p>
                                </span>
                            </div>

                            <p className="mb-6 sm:mb-8 text-base leading-snug text-neutral-300 sm:text-lg lg:text-xl">
                                {t('description')}
                            </p>

                            {/* Name / Email */}
                            <div className="mb-5 sm:mb-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-neutral-300">
                                        {t('name')}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={t('namePlaceholder')}
                                        className="w-full rounded-full bg-white/50 px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none focus:bg-white/70"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-neutral-300">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full rounded-full bg-white/50 px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none focus:bg-white/70"
                                    />
                                </div>
                            </div>

                            {/* Services */}
                            <div className="mb-5 sm:mb-6">
                                <label className="mb-3 block text-xs font-medium text-neutral-300">
                                    {t('services')}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((service) => {
                                        const isSelected = selectedServices.includes(service);
                                        return (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => toggleService(service)}
                                                className={`flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 ${isSelected
                                                    ? 'bg-neutral-950 text-white'
                                                    : 'bg-white/50 text-neutral-800 hover:bg-white/70'
                                                    }`}
                                            >
                                                <span
                                                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${isSelected
                                                        ? 'border-white bg-white'
                                                        : 'border-neutral-500 bg-transparent'
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <Check size={10} strokeWidth={3} className="text-neutral-950" />
                                                    )}
                                                </span>
                                                {service}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>



                            {/* Message */}
                            <div className="mb-5 sm:mb-6">
                                <label className="mb-3 block text-xs font-medium text-neutral-300">
                                   {t('message')}
                                </label>
                                <textarea
                                    placeholder={t('messagePlaceholder')}
                                    rows={4}
                                    className="w-full resize-none rounded-2xl sm:rounded-3xl bg-white/50 px-4 sm:px-5 py-3 sm:py-4 text-sm text-neutral-300 placeholder:text-neutral-500 outline-none focus:bg-white/70"
                                />
                            </div>

                            {/* Terms */}
                            <label className="mb-5 sm:mb-6 flex cursor-pointer items-start gap-3">
                                <button
                                    type="button"
                                    onClick={() => setAgree((v) => !v)}
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${agree ? 'border-neutral-950 bg-neutral-950' : 'border-neutral-500 bg-white/50'
                                        }`}
                                >
                                    {agree && <Check size={11} strokeWidth={3} className="text-white" />}
                                </button>
                                <span className="text-xs text-neutral-300">
                                    {t('agreement')}
                                </span>
                            </label>

                            <div className="flex flex-col items-start gap-4 border-t border-white/30 pt-5 sm:pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs leading-5 text-neutral-300">
                                   {t('response')}
                                </p>
                                <ApplyNowButton bg="bg-neutral-950" bgDot="bg-white" title={t('send')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}