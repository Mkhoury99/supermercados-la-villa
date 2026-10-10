"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { aisles, products } from "@/lib/catalog";
import { tx, useLang } from "@/lib/i18n";
import { MarketIcon } from "@/components/market-icon";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ShopView() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [aisle, setAisle] = useState<string>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (aisle !== "all" && product.aisle !== aisle) return false;
      if (!needle) return true;
      const blob = `${product.name.en} ${product.name.es} ${product.detail.en} ${product.detail.es}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [query, aisle]);

  function surprise() {
    const pool = aisle === "all" ? products : products.filter((product) => product.aisle === aisle);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    setQuery(pick.name.en.split(" ")[0]);
    const node = document.getElementById(`product-${pick.id}`);
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">
        {lang === "es" ? "Mapa de la tienda" : "Store map"}
      </p>
      <h1 className="mt-2 font-heading text-5xl">
        {lang === "es" ? "Ocho pasillos, cero prisa." : "Eight aisles, no rush."}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {lang === "es"
          ? "Toca un departamento como si empujaras el carrito. O busca cilantro y deja que la tienda se encoja."
          : "Tap a department the way you'd turn a cart. Or search cilantro and let the store shrink around it."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {aisles.map((item, index) => (
          <Link
            key={item.slug}
            href={`/shop/${item.slug}`}
            className="relative overflow-hidden rounded-3xl border p-4"
            style={{ background: item.tint, minHeight: index % 3 === 0 ? 150 : 128 }}
          >
            <span className="absolute top-3 right-3 text-xs font-bold" style={{ color: item.ink }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <MarketIcon name={item.icon} className="size-7" />
            <h2 className="mt-6 font-heading text-2xl" style={{ color: item.ink }}>
              {tx(lang, item.name)}
            </h2>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lang === "es" ? "Busca nopales, flan, Zote…" : "Search nopales, flan, Zote…"}
            className="h-12 rounded-full bg-white pl-10 text-base"
          />
        </div>
        <Button type="button" variant="outline" className="h-12 rounded-full bg-white px-5" onClick={surprise}>
          {lang === "es" ? "Sorpréndeme" : "Surprise me"}
        </Button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <FilterChip active={aisle === "all"} onClick={() => setAisle("all")}>
          {lang === "es" ? "Todo" : "Everything"}
        </FilterChip>
        {aisles.map((item) => (
          <FilterChip key={item.slug} active={aisle === item.slug} onClick={() => setAisle(item.slug)}>
            {tx(lang, item.name)}
          </FilterChip>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold text-muted-foreground">
        {visible.length} {lang === "es" ? "productos en el pasillo" : "things on the shelf"}
      </p>
      {visible.length === 0 ? (
        <div className="mt-6 rounded-3xl border bg-white p-8">
          <h2 className="font-heading text-3xl">
            {lang === "es" ? "Ese anaquel está vacío." : "That shelf is empty."}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {lang === "es" ? "Prueba “concha”, “asada” o “horchata”." : "Try “concha”, “asada”, or “horchata”."}
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <div key={product.id} id={`product-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${active ? "bg-villa-ink text-white" : "bg-white text-villa-ink"}`}
    >
      {children}
    </button>
  );
}
