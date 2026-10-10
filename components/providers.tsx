"use client";

import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
      <LanguageProvider>
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
