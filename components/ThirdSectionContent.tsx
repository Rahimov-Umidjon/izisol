// ThirdSectionContent.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Chart konfiguratsiyasi
const MAX_VALUE = 14; // 14M — o'q oxiri
const WITH_KORA_VALUE = 14.2;
const WITHOUT_VALUE = 9.6;
const axisTicks = [0, 2, 4, 6, 8, 10, 12, 14];

export default function ThirdSectionContent() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const footnoteRef = useRef<HTMLParagraphElement>(null);
    const withBarRef = useRef<HTMLDivElement>(null);
    const withoutBarRef = useRef<HTMLDivElement>(null);
    const withLabelRef = useRef<HTMLSpanElement>(null);
    const withoutLabelRef = useRef<HTMLSpanElement>(null);
    const chartWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(headingRef.current, { opacity: 0, y: 30 });
            gsap.set(paraRef.current, { opacity: 0, y: 20 });
            gsap.set(footnoteRef.current, { opacity: 0 });
            gsap.set(chartWrapRef.current, { opacity: 0, y: 20 });

            // Barlar boshida 0% kenglikda
            gsap.set(withBarRef.current, { width: '0%' });
            gsap.set(withoutBarRef.current, { width: '0%' });
            gsap.set([withLabelRef.current, withoutLabelRef.current], { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'top 20%',
                    scrub: true,
                },
            });

            tl.to(headingRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0)
                .to(paraRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
                .to(footnoteRef.current, { opacity: 1, ease: 'power2.out' }, 0.2)
                .to(chartWrapRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.25)
                .to(
                    withBarRef.current,
                    {
                        width: `${(WITH_KORA_VALUE / MAX_VALUE) * 100}%`,
                        ease: 'power2.out',
                    },
                    0.35
                )
                .to(
                    withoutBarRef.current,
                    {
                        width: `${(WITHOUT_VALUE / MAX_VALUE) * 100}%`,
                        ease: 'power2.out',
                    },
                    0.35
                )
                .to(
                    [withLabelRef.current, withoutLabelRef.current],
                    { opacity: 1, ease: 'power1.out' },
                    0.7
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative z-40 h-screen bg-[#F5F4EF] px-6 py-24 md:px-16 lg:px-24"
        >
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <h2
                    ref={headingRef}
                    className="text-7xl md:text-8xl font-bold tracking-tight text-zinc-900"
                >
                    Services.
                </h2>

                {/* Paragraph */}
                <p
                    ref={paraRef}
                    className="mt-10 max-w-2xl text-2xl md:text-3xl leading-snug text-zinc-600"
                >
                    Within six months of working with Kora, clients experienced an{' '}
                    <span className="text-emerald-500">
                        average 47% increase in annual revenue
                    </span>{' '}
                    based on pre and post-engagement performance.
                </p>

                {/* Footnote */}
                <p ref={footnoteRef} className="mt-4 text-sm text-zinc-500">
                    *Across B2B clients with $5M to $50M in annual revenue over a standard
                    6-month engagement.
                </p>

                {/* Chart */}
                <div ref={chartWrapRef} className="mt-16">
                    <div className="relative">
                        {/* Vertikal grid chiziqlari */}
                        <div className="pointer-events-none absolute inset-0 flex justify-between">
                            {axisTicks.map((tick) => (
                                <div
                                    key={tick}
                                    className="h-full w-px border-l border-dashed border-zinc-300"
                                />
                            ))}
                        </div>

                        {/* With Kora bar */}
                        <div className="relative mb-4 h-16 w-full">
                            <div
                                ref={withBarRef}
                                className="relative flex h-full items-center justify-between rounded-full bg-emerald-500 px-6"
                                style={{ minWidth: '3.5rem' }}
                            >
                                <span className="text-sm font-medium text-white whitespace-nowrap">
                                    With Kora
                                </span>
                                <span
                                    ref={withLabelRef}
                                    className="absolute right-6 text-sm font-semibold text-white whitespace-nowrap"
                                >
                                    ${WITH_KORA_VALUE}M avg ARR
                                </span>
                            </div>
                        </div>

                        {/* Without bar */}
                        <div className="relative h-16 w-full">
                            <div
                                ref={withoutBarRef}
                                className="relative flex h-full items-center justify-between rounded-full bg-zinc-200 px-6"
                                style={{ minWidth: '3.5rem' }}
                            >
                                <span className="text-sm font-medium text-zinc-700 whitespace-nowrap">
                                    Without
                                </span>
                                <span
                                    ref={withoutLabelRef}
                                    className="absolute right-6 text-sm font-semibold text-zinc-700 whitespace-nowrap"
                                >
                                    ${WITHOUT_VALUE}M avg ARR
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* X o'qi */}
                    <div className="mt-4 flex justify-between text-xs text-zinc-500">
                        {axisTicks.map((tick) => (
                            <span key={tick}>{tick}M</span>
                        ))}
                    </div>

                    {/* Caption */}
                    <p className="mt-6 text-center text-sm text-zinc-500">
                        Annual Recurring Revenue ($M)
                    </p>
                </div>
            </div>
        </section>
    );
}