'use client';

import { motion } from 'framer-motion';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const locales = ['uz', 'ru', 'en'];

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale: currentLocale } = useParams<{ locale: string }>();
  const [active, setActive] = useState<string>(currentLocale)

  const [hovered, setHovered] = useState<string | null>(null);

  const activeLocale = hovered ?? currentLocale;


  // console.log(active)

  const switchLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;

    const segments = pathname.split('/');
    segments[1] = locale;

    router.push(segments.join('/'));
    router.refresh(); // Next.js server komponentlarni qayta fetch qiladi, lekin client state saqlanib qolishi mumkin

  };

  return (
    <div className="flex items-center rounded-full bg-zinc-100 p-1">
      {locales.map((locale) => {
        // const active = locale === currentLocale;

        return (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            onMouseEnter={() => setHovered(locale)}
            onMouseLeave={() => setHovered(null)}
            className="relative rounded-full px-5 py-2 text-sm font-medium uppercase cursor-pointer"
          >
            {activeLocale === locale && (
              <motion.div
                layoutId="lang-switcher"
                className="absolute inset-0 rounded-full bg-emerald-500"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}

            <span
              className={`relative z-10 transition-colors duration-200 ${activeLocale === locale ? 'text-white' : 'text-zinc-600'
                }`}
            >
              {locale}
            </span>
          </button>
        );
      })}
    </div>
  );
}