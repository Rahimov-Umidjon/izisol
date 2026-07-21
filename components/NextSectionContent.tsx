"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function NextSectionContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const t = useTranslations("NextSection");
  const pathname = usePathname();

  const words = t("text").split(" ");

  useEffect(() => {
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!wordEls.length) return;

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { filter: "blur(8px)", opacity: 0, y: "15%" });

      gsap.to(wordEls, {
        filter: "blur(0px)",
        opacity: 1,
        y: "0%",
        ease: "none",
        stagger: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pathname, words.length]);

  return (
    <section ref={sectionRef} className="relative h-full z-10">
      <div className="mx-auto w-[90%] sm:w-3/4 h-screen flex items-center justify-center">
        <h1
          key={pathname}
          className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          {words.map((word, i) => (
            <span key={i} style={{ display: "inline-block" }}>
              <span
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                style={{ display: "inline-block" }}
              >
                {word}&nbsp;
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}