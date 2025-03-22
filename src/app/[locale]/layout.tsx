import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/styles/global.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Manara Water Consulting",
  description: "Manara Water Consulting Expertise & Innovation To Meet The Challenges Relate To Sustainable Development.",
};


export default async function RootLayout({
    children,
    params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {


  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <body>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}