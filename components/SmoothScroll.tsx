'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      // Mobil touch scroll'ni Lenis o'zi to'g'ri boshqarishi uchun aniq belgilaymiz
      touchMultiplier: 2,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });
    setLenis(instance);

    // Lenis scroll bilan ScrollTrigger'ni sinxronlash — bu asosiy yetishmayotgan qism edi
    instance.on('scroll', ScrollTrigger.update);

    // GSAP ticker orqali Lenis'ni yangilash (requestAnimationFrame o'rniga)
    // bu ikkala tizimni bir xil "frame"ga bog'laydi
    const update = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}