"use client";
import HeroTransition from "@/components/HeroTransition";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BotMessageSquare, Code2, Search, Smartphone, Menu, X } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from "@/components/ServiceCard";
import ProcessSection from "@/components/ProcessSection";
import PaceSection from "@/components/PaceSection";
import TeamSection from "@/components/TeamSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import LangSwitcher from "@/components/LangSwitcher";
import { usePathname } from "next/navigation"; 
import { useLenis } from "@/components/SmoothScroll";

export type ServiceItem = {
  index: string;
  badgeIcon: ReactNode;
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

export default function Home() {
  const tNav = useTranslations("Navbar");
  const tServices = useTranslations("Services");
  const [activeService, setActiveService] = useState(0);
  const thero = useTranslations('Hero')
  const [time, setTime] = useState<boolean>(false)


  const showService = (index: number) => {
    const sections = sectionsRef.current;
    sections.forEach((sec, i) => {
      gsap.set(sec, {
        display: i === index ? 'flex' : 'none',
        opacity: i === index ? 1 : 0.6,
      });
    });
    setActiveService(index);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;
    setMobileMenuOpen(false);
    setTime(true)

    console.log(el)

    if (id === 'services' || id === 'contact') {
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, immediate: true }); // Lenis orqali, animatsiyasiz
      } else {
        el.scrollIntoView({ behavior: 'auto' });
      }

      // Scroll joyiga tushgach ScrollTrigger holatini qayta hisoblatamiz
      requestAnimationFrame(() => { ScrollTrigger.refresh(); ScrollTrigger.update(); });

      setTimeout(() => {
        setTime(false)
      }, 1000)

      return;
    }

    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setTime(false)
    }, 1000)
  };

  const menu = [
    { label: tNav("home"), id: 'home' },
    { label: tNav("services"), id: 'services' },
    { label: tNav("about"), id: 'about' },
    { label: tNav("contact"), id: 'contact' },
  ];
  const services: ServiceItem[] = [
    {
      index: '01',
      badgeIcon: <Smartphone size={18} />,
      badgeLabel: tServices("items.mobile.badgeLabel"),
      title: tServices("items.mobile.title"),
      description: tServices("items.mobile.description"),
      offerLabel: tServices("offerLabel"),
      tags: tServices.raw("items.mobile.tags"),
      ctaLabel: tServices("ctaLabel"),
      image: '/mobile-dev.jpg',
      testimonial: {
        quote: tServices("items.mobile.testimonial.quote"),
        name: tServices("items.mobile.testimonial.name"),
        role: tServices("items.mobile.testimonial.role"),
        avatar: '/images/avatar-1.jpg',
      },
    },
    {
      index: '02',
      badgeIcon: <Code2 size={18} />,
      badgeLabel: tServices("items.web.badgeLabel"),
      title: tServices("items.web.title"),
      description: tServices("items.web.description"),
      offerLabel: tServices("offerLabel"),
      tags: tServices.raw("items.web.tags"),
      ctaLabel: tServices("ctaLabel"),
      image: '/web-dev.jpg',
      testimonial: {
        quote: tServices("items.web.testimonial.quote"),
        name: tServices("items.web.testimonial.name"),
        role: tServices("items.web.testimonial.role"),
        avatar: '/images/avatar-2.jpg',
      },
    },
    {
      index: '03',
      badgeIcon: <BotMessageSquare size={18} />,
      badgeLabel: tServices("items.telegram.badgeLabel"),
      title: tServices("items.telegram.title"),
      description: tServices("items.telegram.description"),
      offerLabel: tServices("offerLabel"),
      tags: tServices.raw("items.telegram.tags"),
      ctaLabel: tServices("ctaLabel"),
      image: '/telegram-dev.jpg',
      testimonial: {
        quote: tServices("items.telegram.testimonial.quote"),
        name: tServices("items.telegram.testimonial.name"),
        role: tServices("items.telegram.testimonial.role"),
        avatar: '/images/avatar-3.jpg',
      },
    },
    {
      index: '04',
      badgeIcon: <Search size={18} />,
      badgeLabel: tServices("items.seo.badgeLabel"),
      title: tServices("items.seo.title"),
      description: tServices("items.seo.description"),
      offerLabel: tServices("offerLabel"),
      tags: tServices.raw("items.seo.tags"),
      ctaLabel: tServices("ctaLabel"),
      image: '/seo-dev.jpg',
      testimonial: {
        quote: tServices("items.seo.testimonial.quote"),
        name: tServices("items.seo.testimonial.name"),
        role: tServices("items.seo.testimonial.role"),
        avatar: '/images/avatar-4.jpg',
      },
    },
  ];

  // komponent ichida
  const lenis = useLenis();


  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0); // har doim tepadan boshlanadi
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); // YANGI

  const sectionsRef = useRef<HTMLElement[]>([]);
  const pathname = usePathname();
  const servicesSectionRef = useRef<HTMLElement[]>([])
  const navRef = useRef<HTMLDivElement>(null); // YANGI - tashqi bosishni aniqlash uchun

  useEffect(() => {
    const sections = sectionsRef.current;
    const pins: ScrollTrigger[] = [];
    const fadeTriggers: ScrollTrigger[] = [];

    // Har ehtimolga qarshi — shu sahifaga tegishli eski triggerlarni tozalab tashlaymiz
    ScrollTrigger.getAll().forEach((t) => {
      if (sections.includes(t.trigger as HTMLElement)) t.kill();
    });

    sections.forEach((section, i) => {
      // Eski animatsiyadan qolgan inline stillarni tozalash
      gsap.set(section, { clearProps: "opacity,display,transform" });

      pins.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: i === sections.length - 1,
          anticipatePin: 1,
        })
      );

      ScrollTrigger.create({
        trigger: servicesSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        anticipatePin: 1,
      });

      if (i < sections.length - 1) {
        gsap.set(section, { transformOrigin: "center center" });

        const fadeAnim = gsap.to(section, {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sections[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            onLeave: () => gsap.set(section, { display: "none" }),
            onEnterBack: () => gsap.set(section, { display: "flex", opacity: 1 }),
          },
        });
        if (fadeAnim.scrollTrigger) fadeTriggers.push(fadeAnim.scrollTrigger);
      }
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(t);
      pins.forEach((p) => p.kill());
      fadeTriggers.forEach((p) => p.kill());
      sections.forEach((section) => {
        gsap.set(section, { clearProps: "opacity,display,transform" });
      });
    };
  }, [pathname]); // <-- locale o'zgarganda qayta ishga tushadi


  const addToRefs = (el: HTMLElement | null): void => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // YANGI: mobile menu ochilganda orqa fon scroll bo'lmasligi + tashqariga bosilganda yopilishi
  useEffect(() => {
    if (mobileMenuOpen) {
      // orqa fon scrollini to'xtatish
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen, lenis]);

  // Komponent unmount bo'lganda overflow qulfini albatta tozalash
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);




  return (
    <main className="bg-[#FCFCFA] ">
      <nav
        ref={navRef}
        className="fixed z-50 top-5 left-5 right-5 sm:top-10 sm:left-12 sm:right-12 lg:left-10 lg:right-10 flex items-center justify-between gap-4"
      >
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            setOpen(false);
            setActive(null);
          }}
          className="flex items-center justify-between gap-8 w-full md:w-auto rounded-full bg-white/95 px-4 sm:px-6 py-1 shadow-sm backdrop-blur"
        >
          <span className="flex items-center gap-1 text-lg font-semibold tracking-tight text-neutral-900 cursor-pointer">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500">
              <Image src="/logo.svg" alt="Logo" width={62} height={62} />
            </span>
            <p className="text-gray-600">
              <span className="text-emerald-500">IZI</span>SOL
            </p>
          </span>

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 md:flex">
            {menu.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setActive(index)}
                className="relative rounded-full px-5 py-2 cursor-pointer"
              >
                {active === index && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 rounded-full bg-emerald-500"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${active === index ? "text-white" : "text-neutral-800"
                    }`}
                >
                  {item.label}
                </span>
              </button>
            ))}

            <LangSwitcher />
          </div>

          {/* Mobile burger button */}
          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-full text-neutral-800 cursor-pointer"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev)
              // setOpen((prev) => !prev)
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 flex flex-col gap-1 rounded-3xl bg-white/95 p-4 shadow-lg backdrop-blur md:hidden"
            >
              {menu.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.id) 
                  }}
                  className="w-full rounded-full px-5 py-3 text-left text-neutral-800 hover:bg-emerald-500 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-2 px-2">
                <LangSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>

      <div
        className={`fixed inset-0   z-40 bg-black/50 transition-opacity duration-300 ${(open || time) ? "opacity-100 backdrop-blur-[6px]" : "pointer-events-none opacity-0 "
          }`}
      >


        <div className={`absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-transparent h-[4000px] w-[4000px] border-emerald-500 rounded-full duration-500  ${time ? 'border-2000 ' : 'border-0  '}`}>

        </div>
      </div>


      <HeroTransition scrollToSection={scrollToSection} />


      {/* <h1  className="text-gray-700 text-5xl mt-20">{thero('ctaServices')}</h1> */}

      <div id="services" className="mx-auto w-[100%] overflow-hidden z-50  ">

        {services.map((item, i) => (
          <div
            // id={i === 0 ? `services` : `services${i}`}
            key={item.index}
            ref={addToRefs}
            style={{ zIndex: i + 1 }}
            className="relative flex h-screen w-full items-center justify-center"
          >
            <ServiceCard scrollToSection={scrollToSection} item={item} />
          </div>
        ))}
      </div>


      <ProcessSection />

      <PaceSection />
      <TeamSection scrollToSection={scrollToSection} />


      <StatsSection />





      <Footer scrollToSection={scrollToSection} />










    </main>
  );
}