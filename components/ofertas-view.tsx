"use client";

import { specials } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ProductCard } from "@/components/product-card";

export function OfertasView() {
  const { lang } = useLang();
  const deals = specials();
  const saved = deals.reduce((sum, product) => sum + ((product.compareAt ?? product.price) - product.price), 0);

  return (
    <div>
      <section className="bg-villa-red text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-bold tracking-[0.18em] text-[#ffd0d6] uppercase">
            {lang === "es" ? "Circular · 5–11 de octubre" : "Circular · October 5–11"}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-[0.95] sm:text-6xl">
            {lang === "es"
              ? "La hoja roja de la semana, sin letra microscópica."
              : "This week's red sheet, with the fine print left off."}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            {lang === "es"
              ? `Seis precios tachados. Si te llevas uno de cada uno, ahorras ${money(saved)} contra el precio de anaquel.`
              : `Six crossed-out prices. Take one of each and you keep ${money(saved)} compared with the regular shelf.`}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[2rem] bg-villa-ink p-6 text-white lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-[0.16em] text-villa-gold uppercase">
              {lang === "es" ? "Cómo leerla" : "How to read it"}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/85">
              <li>{lang === "es" ? "Los precios son de demostración, armados para el recorrido." : "Prices are a demo, written for the walkthrough."}</li>
              <li>{lang === "es" ? "La carne asada ya viene sazonada. No le eches más sal por costumbre." : "The carne asada is already seasoned. Don't salt it out of habit."}</li>
              <li>{lang === "es" ? "La docena de pan dulce se arma con lo que salió del horno esa mañana." : "The pan dulce dozen is packed from whatever left the oven that morning."}</li>
            </ul>
          </aside>
          <div className="grid gap-4 sm:grid-cols-2">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
