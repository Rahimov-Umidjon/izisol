"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { motion } from 'framer-motion'
import { ArrowRight } from "lucide-react";
import StackSections from "./StackSections";
import ApplyNowButton from "./ApplyNowButton";
import { useTranslations } from "next-intl";

const avatars = [
    "https://i.pravatar.cc/64?img=12",
    "https://i.pravatar.cc/64?img=32",
    "https://i.pravatar.cc/64?img=45",
    "https://i.pravatar.cc/64?img=5",
];

const logos = ["Incotruck", "EGS", "Transceka", "Easline express", "KGS"];

interface props {
    scrollToSection: (id: string) => void
}

export default function HeroTransition({ scrollToSection }: props) {
    const t = useTranslations("Hero");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const fullImageRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const nextTextRef = useRef<HTMLDivElement>(null);
    const innerRoundedRef = useRef<HTMLDivElement>(null);

    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Ekran o'lchamiga qarab mobil/desktop holatini aniqlaymiz.
    // 767px va undan kichik ekranlarda bg-image to'liq (100%) chiqadi,
    // kattaroq ekranlarda eski "-40px" atrofida joy qoldiruvchi effekt qoladi.
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");

        const update = () => setIsMobile(mql.matches);
        update();

        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const container = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 1.1,
                staggerChildren: 0.15,
            },
        },
    };

    const item = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        show: {
            opacity: 1,
            y: 0,
        },
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: imageRef.current,
                },
            });

            tl.to(imageRef.current, {
                borderRadius: 0,
                margin: 0,
                scale: 1.1,
                filter: "blur(4px)",
                ease: "none",
            }, 0)
                .to(innerRoundedRef.current, {
                    borderRadius: 0,
                    ease: "none",
                }, 0)
                .to(heroContentRef.current, { opacity: 0, y: 0, ease: "none" }, 0)
                .to(nextTextRef.current, { opacity: 1, y: -80, ease: "none" }, 0.4)

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="relative " >

            <section id="home" className="relative h-screen w-full px-2 py-2 sm:px-4 sm:py-4 z-10">

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col justify-between px-4 py-4 h-full sm:px-8 sm:py-6 lg:px-6 lg:py-6"
                >

                    <div className=""></div>

                    {/* Hero copy */}
                    <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[60%] relative">
                        <motion.h1 variants={item} className="text-[32px] font-semibold leading-[1.1] tracking-tight text-white xs:text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] 3xl:text-[84px]">
                            {t("title")}
                        </motion.h1>

                        <motion.p variants={item} className="mt-4 sm:mt-5 max-w-full sm:max-w-[80%] md:max-w-[65%] lg:max-w-[60%] text-[15px] leading-relaxed text-white/85 sm:text-[16px] lg:text-[17px]">
                            {t("description")}
                        </motion.p>

                        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
                            <motion.div variants={item}>
                                <ApplyNowButton onclick={() => scrollToSection('services')} title={t("ctaServices")} bg='bg-emerald-400' bgDot="bg-white" />
                            </motion.div>

                            <motion.button
                                variants={item}
                                onClick={() => scrollToSection('contact')}
                                className="cursor-pointer flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-white/90 hover:text-white group"
                            >
                                <span className="relative z-10 h-5 overflow-hidden">
                                    <span className="flex flex-col transition-transform duration-200 ease-out group-hover:-translate-y-5">
                                        <span className="block h-5 text-sm font-medium leading-5 text-white">
                                            {t("pricing")}
                                        </span>
                                        <span className="block h-5 text-sm font-medium leading-5 text-white">
                                            {t("pricing")}
                                        </span>
                                    </span>
                                </span>

                                <div className="group-hover:bg-emerald-400 group-hover:translate-x-1 rounded-2xl duration-200 p-1">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Bottom row: social proof + case study card */}
                    <div className="flex flex-col items-start justify-between gap-6 sm:gap-8 lg:flex-row lg:items-end">
                        {/* Social proof */}
                        <div className="h-full flex flex-col justify-center">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">

                                    {avatars.map((src, i) => (
                                        <motion.span
                                            key={i}
                                            className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full ring-2 ring-white/80"
                                            variants={item}
                                        >
                                            <Image src={src} alt="" fill className="object-cover" />
                                        </motion.span>

                                    ))}
                                </div>

                                <motion.p variants={item} className="text-xs sm:text-sm text-white/85">
                                    {t("socialProof")}
                                </motion.p>
                            </div>

                            <div
                                className="relative mt-4 overflow-hidden max-w-[260px] sm:max-w-80"
                                style={{
                                    WebkitMaskImage:
                                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                                    maskImage:
                                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                                }}
                            >
                                <motion.div
                                    className="flex w-max gap-8 sm:gap-10"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        duration: 20,
                                        ease: "linear",
                                        repeat: Infinity,
                                    }}
                                >
                                    {[...logos, ...logos].map((logo, index) => (
                                        <span
                                            key={index}
                                            className="whitespace-nowrap text-base sm:text-lg font-semibold tracking-wide text-white/80"
                                        >
                                            {logo}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </section>

            <div
                ref={imageRef}
                className="absolute top-0 left-0 h-screen w-full"
                style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }}
            >

                <div ref={innerRoundedRef} className="relative isolate overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[36px] h-full ">
                    {/* Background image */}

                    <motion.div

                        ref={fullImageRef}

                        initial={{
                            width: 200,
                            height: 200,
                            borderRadius: 40,
                        }}
                        animate={{
                            width: isMobile ? "100%" : "calc(100% - 40px)",
                            height: isMobile ? "100%" : "calc(100% - 40px)",
                            borderRadius: isMobile ? 0 : 36,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        className="fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2"
                    >
                        <Image
                            src="/hero-flower.jpg"
                            alt="hero"
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-[#274a52]/70 via-[#3c6672]/40 to-[#274a52]/70" />
                    </motion.div>

                </div>

            </div>

            <StackSections />

        </div>
    );
}