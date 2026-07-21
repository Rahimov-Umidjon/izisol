import { Link, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceItem } from "@/app/[locale]/page";
import { motion } from 'framer-motion'
gsap.registerPlugin(ScrollTrigger);


function ServiceCard({ item, scrollToSection }: { item: ServiceItem, scrollToSection: (id: string) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const testimonialRef = useRef<HTMLDivElement>(null);


    const animedItem = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        show: {
            opacity: 1,
            y: 0,
        },
    };


    return (
        <div
            ref={cardRef}
            className="relative mx-auto mt-6 sm:mt-12 md:mt-20 grid w-[94%] sm:w-[90%] grid-cols-1 gap-3 sm:gap-4 h-auto max-h-[92vh] md:h-[80vh] md:max-h-[80vh] overflow-y-auto md:overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[32px] bg-[#F5F5E9] p-2.5 sm:p-3 md:p-4 md:grid-cols-2"
        >
            {/* Right — image (mobile'da tepada) */}
            <div
                ref={rightRef}
                className="relative order-1   min-h-[100px] xs:min-h-[240px] sm:min-h-[320px] md:min-h-full h-[18vh] sm:h-[38vh] md:h-full overflow-hidden rounded-[16px] sm:rounded-[20px] md:rounded-[24px]"
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
                    className="absolute bottom-3 right-3 left-3 sm:left-auto sm:bottom-5 sm:right-5 max-w-full sm:max-w-[280px] rounded-xl sm:rounded-2xl bg-black/40 p-3 sm:p-5 backdrop-blur-md"
                >
                    <div className="mb-1.5 sm:mb-2 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={11}
                                fill="currentColor"
                                className="text-emerald-400"
                            />
                        ))}
                    </div>
                    <p className="text-xs sm:text-sm leading-snug text-white line-clamp-2 sm:line-clamp-none">
                        &ldquo;{item.testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-2">
                        <div>
                            <p className="text-xs font-semibold text-white">
                                {item.testimonial.name}
                            </p>
                            <p className="text-[11px] sm:text-xs text-white/70">
                                {item.testimonial.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left — content (mobile'da pastda) */}
            <div
                ref={leftRef}
                className="flex flex-col   rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-[#FFFFFA] p-5 sm:p-8 md:p-12"
            >
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F2F2E6] px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-zinc-700">
                        <div className="bg-[#FFFFFA] p-1 rounded-2xl">
                            {item.badgeIcon}
                        </div>
                        {item.badgeLabel}
                    </span>
                    <span className="text-sm sm:text-lg text-zinc-500">{item.index}</span>
                </div>

                <h3 className="mt-4 sm:mt-6 md:mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900">
                    {item.title}
                </h3>

                <p className="mt-3 sm:mt-4 max-w-md text-sm sm:text-base leading-relaxed text-zinc-500">
                    {item.description}
                </p>

                <div className="mt-5 sm:mt-6 md:mt-auto">
                    <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-zinc-900">
                        {item.offerLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-zinc-200/70 px-3 sm:px-4 py-1 text-xs sm:text-sm text-zinc-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <button onClick={() => scrollToSection('contact')} className="mt-6 sm:mt-8 relative cursor-pointer group overflow-hidden flex items-center gap-3 rounded-full bg-emerald-500 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-[15px] font-medium text-white shadow-sm w-full">
                    {/* Hover bg */}
                    <div className="absolute left-1/2 bottom-0 h-0 w-0 -translate-x-1/2 translate-y-1/2 rounded-full bg-black transition-all duration-300 group-hover:h-196 group-hover:w-196" />
                    <motion.span variants={animedItem} className="mx-auto relative z-10 h-5 overflow-hidden group">
                        <span className="flex flex-col transition-transform duration-200 ease-out group-hover:-translate-y-5">
                            <span className="block h-5 text-sm font-medium leading-5 text-white">
                                {item.ctaLabel}
                            </span>
                            <span className="block h-5 text-sm font-medium leading-5 text-white">
                                {item.ctaLabel}
                            </span>
                        </span>
                    </motion.span>
                </button>
            </div>
        </div>
    );
}


export default ServiceCard;