"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { aisleBySlug, aisles, productsIn } from "@/lib/catalog";
import { tx, useLang } from "@/lib/i18n";
import { MarketIcon } from "@/components/market-icon";
import { ProductCard } from "@/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AisleView() {
  const params = useParams<{ aisle: string }>();
  const { lang } = useLang();
  const aisle = aisleBySlug(params.aisle);
  if (!aisle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-heading text-4xl">
          {lang === "es" ? "Ese pasillo no existe." : "That aisle isn't on the map."}
        </h1>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6 h-11 rounded-full px-5")}>
          {lang === "es" ? "Volver al mapa" : "Back to the map"}
        </Link>
      </div>
    );
  }
  const items = productsIn(aisle.slug);
  const index = aisles.findIndex((item) => item.slug === aisle.slug);
  const next = aisles[(index + 1) % aisles.length];

  return (
    <div>
      <section className="border-b" style={{ background: aisle.tint }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link href="/shop" className="text-sm font-bold underline" style={{ color: aisle.ink }}>
            {lang === "es" ? "← Mapa de la tienda" : "← Store map"}
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-3xl bg-white/80" style={{ color: aisle.ink }}>
              <MarketIcon name={aisle.icon} className="size-8" />
            </span>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase" style={{ color: aisle.ink }}>
                {lang === "es" ? "Pasillo" : "Aisle"} {String(index + 1).padStart(2, "0")}
              </p>
              <h1 className="font-heading text-5xl" style={{ color: aisle.ink }}>
                {tx(lang, aisle.name)}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-villa-ink/80">{tx(lang, aisle.blurb)}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          href={`/shop/${next.slug}`}
          className="mt-10 flex items-center justify-between rounded-[2rem] border bg-white p-6"
        >
          <div>
            <p className="text-sm font-bold text-muted-foreground">
              {lang === "es" ? "Siguiente pasillo" : "Next aisle"}
            </p>
            <p className="font-heading text-3xl">{tx(lang, next.name)}</p>
          </div>
          <MarketIcon name={next.icon} className="size-8" />
        </Link>
      </div>
    </div>
  );
}
