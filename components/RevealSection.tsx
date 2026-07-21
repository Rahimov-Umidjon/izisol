"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type RevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;         // boshlang'ich siljish
  delay?: number;
  stagger?: boolean;  // ichidagi bolalarni ketma-ket chiqarish
};

export default function RevealSection({
  children,
  className = "",
  y = 60,
  delay = 0,
  stagger = false,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = stagger ? gsap.utils.toArray(".reveal-item", ref.current) : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",   // section ekranning 80% balandligiga yetganda boshlanadi
            toggleActions: "play none none reverse", // tepaga qaytsa yashiradi
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}