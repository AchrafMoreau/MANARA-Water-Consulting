import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/global.css';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";
import MagicChatBubble  from "@/components/chat-bubble";
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import LenisProvider from "@/providers/leins-provider";



export const metadata: Metadata = {
  title: "Manara Water Consulting",
  description: "Manara Water Consulting Expertise & Innovation To Meet The Challenges Relate To Sustainable Development.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
      <Navbar />
      <LenisProvider />
        {children}
      <MagicChatBubble />
      <Footer />
    </>


  
  );
}
