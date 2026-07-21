// StackSections.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NextSectionContent from './NextSectionContent';
import SecondSectionContent from './SecondSectionContent';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function StackSections() {
    const firstSectionRef = useRef<HTMLElement>(null);
    const secondWrapRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!firstSectionRef.current) return;

            // Faqat birinchi (NextSectionContent) pin qilinadi
            ScrollTrigger.create({
                trigger: firstSectionRef.current,
                start: 'top top',
                end: () => {
                    if (!firstSectionRef.current) return '+=0';
                    return `+=${firstSectionRef.current.offsetHeight}`;
                },
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,

            });

            // Ikkinchi bo'lim yaqinlashganda birinchisi xiralashadi/kichrayadi
            // if (secondWrapRef.current) {
            //     gsap.to(firstSectionRef.current, {
            //         filter: 'blur(2px)',
            //         scale: 0.96,
            //         ease: 'none',
            //         scrollTrigger: {
            //             trigger: secondWrapRef.current,
            //             start: 'top bottom',
            //             end: 'bottom bottom',
            //             scrub: true,
            //         },
            //     });
            // }
        });


        return () => {
            ctx.revert();
        };
    }, [pathname]);

    return (
        <div  >
            <section
                ref={firstSectionRef}
                className="relative z-10 flex h-[200vh] w-full items-center justify-center"
            >
                <NextSectionContent />
            </section>

            {/* SecondSectionContent o'zini o'zi pin qiladi — tashqi h-[300vh] wrapper KERAK EMAS */}
            <SecondSectionContent />
        </div>
    );
}