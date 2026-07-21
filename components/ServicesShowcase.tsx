// ServicesShowcase.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = {
    index: string; // "01", "02"...
    badgeIcon: string; // icon src
    badgeLabel: string;
    title: string;
    description: string;
    offerLabel: string;
    tags: string[];
    ctaLabel: string;
    image: string;
    testimonial: {
        quote: string;
        name: string;
        role: string;
        avatar: string;
    };
};

const services: ServiceItem[] = [
    {
        index: '01',
        badgeIcon: '/icons/gtm.svg',
        badgeLabel: 'Go-to-Market',
        title: 'Launches that land and scale.',
        description:
            "Whether you're launching a new product or entering a new segment, we design the GTM motion that lands and scales.",
        offerLabel: 'What we offer',
        tags: [
            'Launch Strategy & Execution',
            'ICP & Persona Development',
            'Messaging & Value Proposition',
            'Channel Selection & Activation',
            'Partner & Alliance Programs',
            'Market Entry Playbooks',
        ],
        ctaLabel: 'Get Started',
        image: '/images/service-gtm.jpg',
        testimonial: {
            quote: 'Kora designed something that actually made our brand stronger.',
            name: 'James Martin',
            role: 'CEO, Hamilton',
            avatar: '/images/avatar-james.jpg',
        },
    },
    {
        index: '02',
        badgeIcon: '/icons/brand.svg',
        badgeLabel: 'Brand & Positioning',
        title: 'A brand that earns trust fast.',
        description:
            'We sharpen your story, visual identity, and positioning so buyers know exactly why you win.',
        offerLabel: 'What we offer',
        tags: [
            'Brand Strategy',
            'Visual Identity',
            'Competitive Positioning',
            'Website & Content',
            'Sales Collateral',
            'Voice & Tone Guidelines',
        ],
        ctaLabel: 'Get Started',
        image: '/images/service-brand.jpg',
        testimonial: {
            quote: 'Our pipeline quality changed within the first quarter.',
            name: 'Sarah Chen',
            role: 'VP Marketing, Fenwick',
            avatar: '/images/avatar-sarah.jpg',
        },
    },
    {
        index: '03',
        badgeIcon: '/icons/revops.svg',
        badgeLabel: 'Revenue Operations',
        title: 'Pipeline you can actually trust.',
        description:
            'We build the systems and reporting that turn guesswork into a predictable revenue engine.',
        offerLabel: 'What we offer',
        tags: [
            'CRM & Data Hygiene',
            'Forecasting Models',
            'Lifecycle Automation',
            'Attribution & Reporting',
            'Comp Plan Design',
            'Tooling & Stack Audit',
        ],
        ctaLabel: 'Get Started',
        image: '/images/service-revops.jpg',
        testimonial: {
            quote: 'Every quarter now builds on the last, finally.',
            name: 'Daniel Ortiz',
            role: 'COO, Ledger',
            avatar: '/images/avatar-daniel.jpg',
        },
    },
];

function ServiceCard({ item }: { item: ServiceItem }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const testimonialRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(leftRef.current, { opacity: 0, x: -30 });
            gsap.set(rightRef.current, { opacity: 0, x: 30, scale: 0.97 });
            gsap.set(testimonialRef.current, { opacity: 0, y: 15 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: true,
                },
            })
                .to(leftRef.current, { opacity: 1, x: 0, ease: 'power2.out' }, 0)
                .to(rightRef.current, { opacity: 1, x: 0, scale: 1, ease: 'power2.out' }, 0.05)
                .to(testimonialRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.3);
        }, cardRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <div
            ref={cardRef}
            className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-4 overflow-hidden rounded-[32px] bg-[#F5F4EF] p-4 md:grid-cols-2"
        >
            {/* Left — content */}
            <div
                ref={leftRef}
                className="flex flex-col rounded-[24px] bg-[#F9F8F3] p-10 md:p-12"
            >
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
                        <Image src={item.badgeIcon} alt="" width={16} height={16} />
                        {item.badgeLabel}
                    </span>
                    <span className="text-lg text-zinc-500">{item.index}</span>
                </div>

                <h3 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
                    {item.title}
                </h3>

                <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500">
                    {item.description}
                </p>

                <div className="mt-auto pt-16">
                    <p className="mb-3 text-sm font-medium text-zinc-900">
                        {item.offerLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-zinc-200/70 px-4 py-2 text-sm text-zinc-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <button className="mt-8 w-full rounded-full bg-emerald-500 py-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
                    {item.ctaLabel}
                </button>
            </div>

            {/* Right — image */}
            <div
                ref={rightRef}
                className="relative min-h-[420px] overflow-hidden rounded-[24px] md:min-h-full"
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                />

                {/* Testimonial overlay */}
                <div
                    ref={testimonialRef}
                    className="absolute bottom-5 right-5 max-w-[280px] rounded-2xl bg-black/40 p-5 backdrop-blur-md"
                >
                    <div className="mb-2 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                fill="currentColor"
                                className="text-emerald-400"
                            />
                        ))}
                    </div>
                    <p className="text-sm leading-snug text-white">
                        &ldquo;{item.testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                            <Image
                                src={item.testimonial.avatar}
                                alt={item.testimonial.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">
                                {item.testimonial.name}
                            </p>
                            <p className="text-xs text-white/70">
                                {item.testimonial.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ServicesShowcase() {
    return (
        <section className="relative z-20 flex flex-col gap-8 bg-[#EFEEE6] px-4 py-24 md:px-8">
            {services.map((item) => (
                <ServiceCard key={item.index} item={item} />
            ))}
        </section>
    );
}