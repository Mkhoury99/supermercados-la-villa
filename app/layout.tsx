import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Nunito } from "next/font/google";
import { BasketBar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Supermercados La Villa",
    template: "%s · La Villa",
  },
  description:
    "Demo grocery site for Supermercados La Villa in Acworth, Georgia — aisles, La Cocina, and same-day delivery across Cobb County.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-villa-cream text-villa-ink">
        <Providers>
          <Suspense fallback={<div className="h-[92px] border-b bg-[#fffdf8]" />}>
            <SiteHeader />
          </Suspense>
          <main className="flex-1 pb-20 md:pb-0">
            <Suspense fallback={<p className="px-4 py-16 text-center font-heading text-2xl">Opening the market…</p>}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <BasketBar />
          </Suspense>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
