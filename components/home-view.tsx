"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, Truck } from "lucide-react";
import { aisles, PRIMARY, specials } from "@/lib/catalog";
import { money } from "@/lib/format";
import { tx, useLang } from "@/lib/i18n";
import { Bunting } from "@/components/bunting";
import { DinnerWheel } from "@/components/dinner-wheel";
import { MarketIcon } from "@/components/market-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { ZipCheck } from "@/components/zip-check";

export function HomeView() {
  const { lang } = useLang();
  const board = specials().slice(0, 4);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-villa-deep shadow-sm">
            <MapPin className="size-4" />
            Acworth · Highway 92
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.95] text-villa-ink sm:text-6xl">
            {lang === "es"
              ? "El mercado que todavía huele a pan dulce."
              : "The market that still smells like pan dulce."}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {lang === "es"
              ? "Supermercados La Villa en Acworth: carnicería, panadería, La Cocina y productos que en otra tienda hay que pedir. Precios de la villa, y la vaca reparte el mismo día por Cobb."
              : "Supermercados La Villa in Acworth — a carnicería, a bakery, La Cocina, and the Mexican brands you usually have to special-order. Low prices, and the cow van delivers the same day across Cobb."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants(), "h-12 rounded-full px-6 text-base")}>
              {lang === "es" ? "Entrar a los pasillos" : "Walk the aisles"}
              <ArrowRight />
            </Link>
            <Link href="/delivery" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full bg-white px-6 text-base")}>
              <Truck />
              {lang === "es" ? "Pedir entrega" : "Plan a delivery"}
            </Link>
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Clock, en: "Open late, until 9", es: "Abierto hasta las 9" },
              { icon: Truck, en: "Same-day in Cobb", es: "Mismo día en Cobb" },
              { icon: MapPin, en: "3 stores, one logo", es: "3 tiendas, un logo" },
            ].map((item) => {
              const Icon = item.icon;
              return (
              <div key={item.en} className="rounded-2xl border bg-white/80 px-4 py-3">
                <Icon className="size-4 text-villa-green" />
                <dt className="mt-2 text-sm font-bold">{lang === "es" ? item.es : item.en}</dt>
              </div>
              );
            })}
          </dl>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] border bg-white p-6 shadow-lg">
            <Logo priority className="mx-auto h-28 sm:h-36" />
            <div className="mt-4 rounded-2xl bg-villa-ink px-4 py-4 text-white">
              <p className="text-xs font-bold tracking-[0.16em] text-villa-gold uppercase">
                {lang === "es" ? "Pizarrón de hoy" : "Today's board"}
              </p>
              <ul className="mt-3 space-y-2">
                {board.map((product) => (
                  <li key={product.id} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{tx(lang, product.name)}</span>
                    <span className="font-heading text-lg text-villa-gold">{money(product.price)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ofertas" className="mt-4 inline-flex text-sm font-bold text-white underline">
                {lang === "es" ? "Ver la circular" : "Read the circular"}
              </Link>
            </div>
          </div>
          <p className="absolute -bottom-3 left-6 rounded-full bg-villa-red px-4 py-2 text-sm font-bold text-white shadow">
            {lang === "es" ? "Tu tienda de precios bajos" : "Your low-price market"}
          </p>
        </div>
      </section>

      <Bunting />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">
              {lang === "es" ? "Ocho puertas" : "Eight doors"}
            </p>
            <h2 className="mt-2 font-heading text-4xl">
              {lang === "es" ? "Entra por donde se te antoje." : "Come in through whatever you're craving."}
            </h2>
          </div>
          <Link href="/shop" className="hidden font-bold text-villa-red underline sm:inline">
            {lang === "es" ? "Mapa de la tienda" : "Store map"}
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {aisles.map((aisle) => (
            <Link
              key={aisle.slug}
              href={`/shop/${aisle.slug}`}
              className="group rounded-3xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: aisle.tint }}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/80" style={{ color: aisle.ink }}>
                <MarketIcon name={aisle.icon} className="size-6" />
              </span>
              <h3 className="mt-4 font-heading text-2xl" style={{ color: aisle.ink }}>
                {tx(lang, aisle.name)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-villa-ink/80">{tx(lang, aisle.blurb)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-villa-red uppercase">La Cocina</p>
            <h2 className="mt-2 font-heading text-4xl">
              {lang === "es" ? "La taquería está al fondo, junto a las aguas." : "The taquería is in the back, next to the aguas."}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {lang === "es"
                ? "Tacos de asada, pastor y tripa, torta de milanesa, carnitas, tamales y un flan que tiembla. Pídelos para llevar o mételos en la misma entrega que el mandado."
                : "Asada, pastor, and tripa tacos, a milanesa torta, carnitas, tamales, and a flan that wobbles. Take them to the car, or drop them in the same delivery as the groceries."}
            </p>
            <Link href="/cocina" className={cn(buttonVariants(), "mt-6 h-12 rounded-full px-6 text-base")}>
              {lang === "es" ? "Ver el menú" : "Open the menu"}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { en: "Taco de asada", es: "Taco de asada", price: "$3.25" },
              { en: "Torta milanesa", es: "Torta milanesa", price: "$9.50" },
              { en: "Carnitas plate", es: "Plato de carnitas", price: "$12.99" },
              { en: "Horchata, cold", es: "Horchata fría", price: "$4.50" },
            ].map((item) => (
              <div key={item.en} className="rounded-3xl bg-[#fff1e4] p-4">
                <p className="font-heading text-3xl text-villa-red">{item.price}</p>
                <p className="mt-2 font-bold">{lang === "es" ? item.es : item.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <DinnerWheel />
      </section>

      <section className="bg-villa-green text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[#b7f0c8] uppercase">
              {lang === "es" ? "La vaca reparte" : "The cow delivers"}
            </p>
            <h2 className="mt-2 font-heading text-4xl">
              {lang === "es" ? "Del mostrador a tu puerta, el mismo día." : "From the counter to your door, the same day."}
            </h2>
            <p className="mt-3 text-lg text-white/85">
              {lang === "es"
                ? `Salimos de ${PRIMARY.address}. Acworth sale desde $3.99, y el mandado grande viaja gratis. Prueba un ZIP — 30303 se queda fuera a propósito.`
                : `We leave from ${PRIMARY.address}. Acworth starts at $3.99, and a big basket rides free. Try a ZIP — 30303 is supposed to miss.`}
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-2 text-villa-ink">
            <ZipCheck />
          </div>
        </div>
      </section>
    </div>
  );
}
