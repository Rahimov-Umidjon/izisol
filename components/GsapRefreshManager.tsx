'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP'ga mobil address-bar sabab bo'ladigan resize'larni e'tiborsiz qoldirishni aytamiz.
// Bu Home section'da "qulflanib qolish" muammosining asosiy sababini oldini oladi.
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function GsapRefreshManager() {
  const pathname = usePathname();
  const lastWidth = useRef<number>(0);

  // Brauzerning o'zi eski scroll pozitsiyasini tiklashiga yo'l qo'ymaymiz
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Resize — faqat ENI (width) o'zgarganda refresh qilamiz.
  // Mobil brauzerlarda scroll paytida balandlik (height) address bar
  // sabab tez-tez o'zgaradi — bu holatda refresh qilish KERAK EMAS,
  // aks holda barcha pin animatsiyalar qayta hisoblanib, scroll "qotib qoladi".
  useEffect(() => {
    lastWidth.current = window.innerWidth;

    let frame: number;
    const refresh = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth.current) return; // faqat balandlik o'zgargan — chiqamiz
      lastWidth.current = newWidth;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener('resize', refresh);
    // Telefonni gorizontal/vertikal aylantirganda albatta refresh bo'lsin
    window.addEventListener('orientationchange', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Til/route o'zgarganda yoki ilk yuklanishda
  useEffect(() => {
    let cancelled = false;

    const doRefresh = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();

      // Hash bo'yicha joyga o'tish (agar kerak bo'lsa) yoki tepaga qaytarish
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        el?.scrollIntoView({ behavior: 'auto' });
      } else {
        window.scrollTo(0, 0);
      }
    };

    if (document.readyState === 'complete') {
      requestAnimationFrame(doRefresh);
    } else {
      window.addEventListener('load', doRefresh);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', doRefresh);
    };
  }, [pathname]);

  return null;
}