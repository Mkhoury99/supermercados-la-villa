"use client";

import Link from "next/link";
import { PRIMARY, SHARE_URL } from "@/lib/catalog";
import { tx, useLang } from "@/lib/i18n";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="mt-auto border-t bg-villa-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-16 rounded-xl bg-white px-3 py-2" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
            {lang === "es"
              ? "Productos de México, pan dulce del día y la carnicería de Acworth. Esta página es un demo: los pedidos no se envían a la tienda."
              : "Mexican groceries, same-day pan dulce, and the Acworth carnicería. This is a demo — orders stay in your browser and are not sent to the store."}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-villa-gold uppercase">
            {lang === "es" ? "La Grande" : "La Grande"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            {PRIMARY.address}
            <br />
            {PRIMARY.city}
            <br />
            <a className="underline" href={`tel:${PRIMARY.tel}`}>{PRIMARY.phone}</a>
          </p>
          <p className="mt-3 text-sm text-white/75">{tx(lang, PRIMARY.hours)}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/delivery" className="hover:underline">{lang === "es" ? "Entrega" : "Delivery"}</Link>
          <Link href="/stores" className="hover:underline">{lang === "es" ? "Las tres tiendas" : "All three stores"}</Link>
          <Link href="/ofertas" className="hover:underline">{lang === "es" ? "Circular de la semana" : "This week's circular"}</Link>
          <a href={SHARE_URL} className="hover:underline" target="_blank" rel="noreferrer">
            {lang === "es" ? "Abrir el pin" : "Open the shared pin"}
          </a>
          <a href={PRIMARY.maps} className="hover:underline" target="_blank" rel="noreferrer">
            {lang === "es" ? "Cómo llegar" : "Directions"}
          </a>
        </div>
      </div>
    </footer>
  );
}
