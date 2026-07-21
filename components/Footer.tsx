'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ListChecks, Mailbox, PhoneCall, Send } from 'lucide-react';
import ApplyNowButton from './ApplyNowButton';
import GrowthHeroSection from './GrowthHeroSection';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const XIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
);

const FacebookIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
);

const socialIcons = [
    {
        icon: Send,
        label: "Telegram",
        href: "https://t.me/ShaxzodMirzoyev",
    },
    {
        icon: InstagramIcon,
        label: "Instagram",
        href: "https://www.instagram.com/izisol.uz/",
    },
    {
        icon: LinkedinIcon,
        label: "LinkedIn",
        href: "#", // keyin qo'yasiz
    },
    {
        icon: FacebookIcon,
        label: "Facebook",
        href: "#", // keyin qo'yasiz
    },
];
interface props {
    scrollToSection: (id: string) => void
}

export default function Footer({ scrollToSection }: props) {
    const t = useTranslations('Footer');
    const navLinks = t.raw('navLinks') as string[];
    const arry = [
        'home',
        'services',
        'about',
    ]

    const [email, setEmail] = useState('');
    const bigTextRef = useRef<HTMLHeadingElement>(null);
    const heroWrapperRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const animedItem = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(circleRef.current, { scale: 0, transformOrigin: '50% 100%' });
            gsap.set(bigTextRef.current, { scale: 0 });
            gsap.set(footerRef.current, { scale: 0.7 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top top',
                    end: 'bottom 50%',
                    scrub: 1,
                },
            });

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'bottom 30%',
                    end: 'bottom bottom',
                    scrub: 1,
                },
            });

            tl.to(heroWrapperRef.current, { scale: 0.94, transformOrigin: '50% 0%', ease: 'none', duration: 1 }, 0);
            tl.to(footerRef.current, { scale: 1, transformOrigin: '50% 20%', ease: 'none', duration: 1 }, 0);
            tl.to(circleRef.current, { scale: 1, ease: 'none', duration: 1 }, 0);
            tl2.to(bigTextRef.current, { scale: 1, ease: 'none', duration: 1 }, 1);
        });

        return () => ctx.revert();
    }, [pathname]);

    const features = [
        { icon: PhoneCall, label: t('phone'), id: 'phone' },
        { icon: Mailbox, label: t('email'), id: 'email' },
        { icon: ListChecks, label: t('address'), id: 'location' },
    ];




    return (
        <div className='overflow-hidden '>
            <div ref={heroWrapperRef} className="relative will-change-transform ">
                <GrowthHeroSection />
            </div>

            <footer ref={footerRef} className="relative w-full  sm:px-3 sm:py-3 md:px-4 md:py-4">
                <div
                    ref={circleRef}
                    className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 rounded-full bg-[#4CAE84] -z-10"
                    style={{ width: '250vmax', height: '250vmax' }}
                />

                <div className="relative z-10 rounded-[22px] sm:rounded-[32px] bg-[#EFEFE0] px-5 py-10 sm:px-10 sm:py-16 lg:px-14">
                    <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-10">
                        <div>
                            <div className="mb-5 sm:mb-6 flex items-center gap-1.5 text-lg font-semibold text-neutral-900">
                                <span className="flex items-center gap-1 text-lg font-semibold tracking-tight text-neutral-900 cursor-pointer">
                                    <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-emerald-500">
                                        <Image src="/logo.svg" alt="Logo" width={62} height={62} />
                                    </span>
                                    <p className="text-gray-600">
                                        <span className="text-emerald-500">IZI</span>SOL
                                    </p>
                                </span>
                            </div>

                            <h3 className="mb-5 sm:mb-6 text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                                {t('newsletterHeading')}
                                <br />
                                {t('newsletterHeadingLine2')}
                            </h3>

                            <div className="mb-3 flex max-w-xl flex-wrap items-center gap-2 rounded-full bg-white pl-4 sm:pl-5 py-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('emailPlaceholder')}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
                                />
                                <ApplyNowButton bg="bg-emerald-500" bgDot="bg-white" title={t('subscribeButton')} />
                            </div>

                            <div className="mt-10 sm:mt-16">
                                <p className="mb-3 sm:mb-4 font-medium text-neutral-500 text-sm sm:text-base">
                                    {t("followUs")}
                                </p>

                                <div className="flex items-center gap-2">
                                    {socialIcons.map(({ icon: Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target={href !== "#" ? "_blank" : undefined}
                                            rel={href !== "#" ? "noopener noreferrer" : undefined}
                                            aria-label={label}
                                            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                                        >
                                            <Icon size={14} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:pl-10">
                            <div className="mt-2 sm:mt-8 flex flex-col gap-3 sm:gap-4">
                                {features.map((f) => {
                                    const Icon = f.icon;
                                    return (
                                        <div key={f.label} className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-neutral-800 backdrop-blur-sm">
                                                <Icon size={15} strokeWidth={1.75} />
                                            </span>
                                            <a href={f?.id === 'phone' ? `tel:${f.label}` : f?.id === 'email' ? `mailto:${f.label}` : 'https://yandex.uz/maps/-/CTVTuHlx'} target='_blank' className="text-sm sm:text-base md:text-lg font-medium text-neutral-500">
                                                {f.label}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-10 sm:mt-16">
                                <p className="mb-3 sm:mb-5 font-medium text-neutral-500 text-sm sm:text-base">{t('navigation')}</p>
                                <ul className="flex flex-col gap-2 sm:gap-4">
                                    {navLinks.map((link, index) => (
                                        <li key={link}>
                                            <button
                                                onClick={() => scrollToSection(arry[index])}
                                                className="relative cursor-pointer group overflow-hidden flex items-center max-w-max gap-2 sm:gap-3 rounded-full px-3 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl md:text-2xl font-medium text-white"
                                            >
                                                <span className="mr-1 sm:mr-2 text-neutral-400">•</span>
                                                <div className="absolute left-1/2 bottom-0 h-0 w-0 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-600 transition-all duration-300 group-hover:h-196 group-hover:w-196" />
                                                <motion.span variants={animedItem} className="mx-auto relative z-10 h-5 overflow-hidden group ">
                                                    <span className="flex flex-col transition-transform duration-200 ease-out group-hover:-translate-y-5 group-hover:-translate-x-0.5 mr-0.5">
                                                        <span className="block h-5 font-bold leading-5 text-emerald-600">
                                                            {link}
                                                        </span>
                                                        <span className="block h-5 font-bold leading-5 text-white">
                                                            {link}
                                                        </span>
                                                    </span>
                                                </motion.span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-3 z-10 overflow-hidden">
                        <h2
                            ref={bigTextRef}
                            className="select-none whitespace-nowrap font-bold leading-none tracking-tight text-[#4CAE84] will-change-transform"
                            style={{ fontSize: 'clamp(3.5rem, 22vw, 22rem)' }}
                        >
                            IZISOL
                        </h2>
                    </div>
                </div>
            </footer>
        </div>
    );
}