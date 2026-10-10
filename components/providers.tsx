"use client";

import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
        <Toaster position="top-center" />
      </CartProvider>
    </LanguageProvider>
  );
}
