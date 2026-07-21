import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import SmoothScroll from '@/components/SmoothScroll';
import { locales } from '@/i18n';
import '../globals.css'
import GsapRefreshManager from '@/components/GsapRefreshManager';


export const metadata: Metadata = {
  title: 'Mening Saytim',
  description: 'Scroll animatsiyali sayt',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  // console.log(messages)

  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body className="font-sans antialiased overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <GsapRefreshManager />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}