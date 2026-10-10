"use client";

import { products } from "@/lib/catalog";
import { money } from "@/lib/format";
import { tx, useLang } from "@/lib/i18n";
import { AddButton } from "@/components/product-card";
import { MarketIcon } from "@/components/market-icon";

const groups = [
  { id: "taco", en: "Tacos", es: "Tacos", note: { en: "Corn tortilla, onion, cilantro.", es: "Tortilla de maíz, cebolla y cilantro." } },
  { id: "plato", en: "Plates", es: "Platos", note: { en: "Enough to skip cooking.", es: "Suficiente para no cocinar." } },
  { id: "dulce", en: "After", es: "Después", note: { en: "The wobbly one.", es: "El que tiembla." } },
] as const;

export function CocinaView() {
  const { lang } = useLang();
  const menu = products.filter((product) => product.aisle === "cocina");
  const drinks = products.filter((product) => product.aisle === "aguas");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold tracking-[0.16em] text-villa-red uppercase">La Cocina</p>
      <h1 className="mt-2 max-w-3xl font-heading text-5xl leading-[0.95]">
        {lang === "es" ? "Come primero. El mandado puede esperar." : "Eat first. The groceries can wait."}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {lang === "es"
          ? "El restaurante está dentro del súper de Highway 92. Tacos, tortas, carnitas, tamales, chicharrón y flan. Se pueden ir en la misma bolsa que los nopales."
          : "The kitchen sits inside the Highway 92 market. Tacos, tortas, carnitas, tamales, chicharrón, and flan — they ride in the same bag as the nopales."}
      </p>

      <div className="mt-10 space-y-10">
        {groups.map((group) => {
          const items = menu.filter((product) => product.course === group.id);
          if (!items.length) return null;
          return (
            <section key={group.id}>
              <div className="flex items-end justify-between gap-4 border-b pb-3">
                <h2 className="font-heading text-4xl">{lang === "es" ? group.es : group.en}</h2>
                <p className="text-sm text-muted-foreground">{tx(lang, group.note)}</p>
              </div>
              <ul className="divide-y">
                {items.map((product) => (
                  <li key={product.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffe3cc] text-[#b34810]">
                      <MarketIcon name={product.icon} className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-2xl">{tx(lang, product.name)}</h3>
                      <p className="text-sm text-muted-foreground">{tx(lang, product.detail)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-heading text-2xl">{money(product.price)}</p>
                      <AddButton product={product} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-12 rounded-[2rem] bg-[#d7f3ff] p-6">
        <h2 className="font-heading text-3xl text-[#0c6e96]">
          {lang === "es" ? "Si tienes sed, cruza al departamento de aguas." : "If you're thirsty, the aguas are one step over."}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((product) => (
            <div key={product.id} className="rounded-3xl bg-white p-4">
              <p className="font-heading text-2xl">{tx(lang, product.name)}</p>
              <p className="text-sm text-muted-foreground">{money(product.price)}</p>
              <div className="mt-3">
                <AddButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
