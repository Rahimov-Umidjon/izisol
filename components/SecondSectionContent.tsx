// SecondSectionContent.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function SecondSectionContent() {
    const t = useTranslations('SecondSection');

    const beforeResults = t.raw('before.items') as string[];
    const afterResults = t.raw('after.items') as string[];

    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLHeadingElement>(null);
    const line2Ref = useRef<HTMLHeadingElement>(null);
    const cardsWrapRef = useRef<HTMLDivElement>(null);
    const beforeCardRef = useRef<HTMLDivElement>(null);
    const afterCardRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const ctx = gsap.context(() => {

            const mm = gsap.matchMedia();

            // ===== DESKTOP / TABLET (>= 768px) =====
            mm.add('(min-width: 768px)', () => {
                gsap.set([line1Ref.current, line2Ref.current], {
                    opacity: 0,
                    y: 40,
                    filter: 'blur(6px)',
                });

                gsap.set(beforeCardRef.current, { opacity: 0, scale: 0.7, xPercent: 0, rotate: 0 });
                gsap.set(afterCardRef.current, { opacity: 0, scale: 0.7, xPercent: 0, rotate: 0 });

                const pin = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    anticipatePin: 1,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 30%',
                        end: '+=100%',
                        scrub: true,
                    },
                });

                tl.to(
                    [line1Ref.current, line2Ref.current],
                    { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', stagger: 0.15 },
                    0
                )
                    .to(line1Ref.current, { xPercent: -140, opacity: 0, ease: 'power1.in' }, 0.8)
                    .to(line2Ref.current, { xPercent: 140, opacity: 0, ease: 'power1.in' }, 0.8)
                    .to(beforeCardRef.current, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.9)
                    .to(
                        beforeCardRef.current,
                        {
                            xPercent: -55,
                            rotate: -4,
                            ease: 'power3.inOut',
                            duration: 0.8,
                        },
                        1
                    )
                    .to(
                        afterCardRef.current,
                        {
                            opacity: 1,
                            scale: 1,
                            xPercent: 55,
                            rotate: 4,
                            ease: 'power3.inOut',
                            duration: 0.8,
                        },
                        2
                    )
                    .to(
                        [beforeCardRef.current, afterCardRef.current],
                        {
                            rotate: 0,
                            ease: 'power2.out',
                            duration: 0.4,
                        },
                        2.5
                    );

                return () => {
                    pin.kill();
                };
            });

            // ===== MOBILE (< 768px) =====
            mm.add('(max-width: 767px)', () => {
                gsap.set([line1Ref.current, line2Ref.current], {
                    opacity: 0,
                    y: 30,
                    filter: 'blur(4px)',
                });

                gsap.set(beforeCardRef.current, { opacity: 0, scale: 0.85, xPercent: 0, rotate: 0, zIndex: 2 });
                gsap.set(afterCardRef.current, { opacity: 0, scale: 0.85, xPercent: 0, rotate: 0, zIndex: 1 });

                const pin = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150%',
                    pin: true,
                    anticipatePin: 1,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 20%',
                        end: '+=150%',
                        scrub: true,
                    },
                });

                tl.to(
                    [line1Ref.current, line2Ref.current],
                    { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', stagger: 0.15 },
                    0
                )
                    .to(line1Ref.current, { opacity: 0, y: -30, ease: 'power1.in' }, 0.7)
                    .to(line2Ref.current, { opacity: 0, y: -30, ease: 'power1.in' }, 0.7)
                    // "before" karta markazda paydo bo'ladi
                    .to(beforeCardRef.current, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.8)
                    // keyin "after" karta uning ustiga chiqadi (crossfade)
                    .to(beforeCardRef.current, { opacity: 0, scale: 0.9, ease: 'power2.in' }, 1.8)
                    .fromTo(
                        afterCardRef.current,
                        { opacity: 0, scale: 0.85, zIndex: 3 },
                        { opacity: 1, scale: 1, ease: 'power2.out' },
                        1.9
                    );

                return () => {
                    pin.kill();
                };
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <section ref={sectionRef} className="relative z-20 pt-8 w-full h-[100vh] bg-[#FCFCFA]">
            <div className="h-screen flex items-center justify-center overflow-hidden px-4">
                <div className="absolute flex flex-col items-center text-center px-4">
                    <h2
                        ref={line1Ref}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-600 whitespace-normal sm:whitespace-nowrap"
                    >
                        {t('heading1')} <span className='text-emerald-500'>{t('headingHighlight')}</span>
                    </h2>
                    <h2
                        ref={line2Ref}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-500 whitespace-normal sm:whitespace-nowrap"
                    >
                        {t('heading2')}
                    </h2>
                </div>

                <div ref={cardsWrapRef}
                    className="absolute flex items-center justify-center w-full px-4">
                    {/* Before card */}
                    <div
                        ref={beforeCardRef}
                        className="absolute w-[88vw] max-w-[360px] sm:w-[420px] rounded-[28px] sm:rounded-[36px] bg-[#F3F3E7] p-5 sm:p-8 opacity-0 scale-90 shadow-xl">
                        <div className="mb-4 sm:mb-5">
                            <p className="mb-2 text-xs text-zinc-500">{t('before.label')}</p>

                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-base sm:text-lg font-semibold tracking-tight text-neutral-900">
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
                        </div>

                        <h1 className="mb-10 sm:mb-16 md:mb-24 lg:mb-34 text-[19px] sm:text-[22px] md:text-[24px] font-semibold leading-8 sm:leading-10 md:leading-14 tracking-tight text-zinc-900">
                            {t('before.title')}
                        </h1>

                        <div className="space-y-4 sm:space-y-6">
                            {beforeResults.map((item) => (
                                <div key={item} className="flex items-start gap-3 sm:gap-4">
                                    <div className="mt-1 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900">
                                        <X size={12} strokeWidth={3} className="text-white" />
                                    </div>

                                    <p className="text-[14px] sm:text-[17px] leading-6 text-zinc-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After card */}
                    <div
                        ref={afterCardRef}
                        className="absolute w-[88vw] max-w-[360px] sm:w-[420px] rounded-[28px] sm:rounded-[36px] bg-emerald-500 p-5 sm:p-8 opacity-0 scale-90 shadow-xl">
                        <div className="mb-4 sm:mb-5">
                            <p className="mb-2 text-xs text-white">{t('after.label')}</p>

                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-base sm:text-lg font-semibold tracking-tight text-neutral-900">
                                    <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-emerald-500">
                                        <Image
                                            src="/logo.svg"
                                            alt="Logo"
                                            width={62}
                                            height={62}
                                        />
                                    </span>

                                    <p className="text-gray-300">
                                        <span className="text-white">IZI</span>SOL
                                    </p>
                                </span>
                            </div>
                        </div>

                        <h1 className="mb-10 sm:mb-16 md:mb-24 lg:mb-34 text-[19px] sm:text-[22px] md:text-[24px] font-semibold leading-8 sm:leading-10 md:leading-14 tracking-tight text-gray-200">
                            {t('after.title')}
                        </h1>

                        <div className="space-y-4 sm:space-y-6">
                            {afterResults.map((item) => (
                                <div key={item} className="flex items-start gap-3 sm:gap-4">
                                    <div className="mt-1 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white">
                                        <Check size={12} strokeWidth={3} className="text-emerald-500" />
                                    </div>

                                    <p className="text-[14px] sm:text-[17px] leading-6 text-gray-100">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}