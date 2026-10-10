"use client";

import { PRIMARY, SHARE_URL, stores } from "@/lib/catalog";
import { tx, useLang } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StoresView() {
  const { lang } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">
        {lang === "es" ? "Tres techos" : "Three roofs"}
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-5xl leading-[0.95]">
        {lang === "es" ? "El pin cae en La Villa Grande." : "The pin lands on La Villa Grande."}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {lang === "es"
          ? "La marca dice supermercados, en plural. Grande está en 6158 Highway 92, Acworth. Hay otra sobre la misma carretera y una tercera en Kennesaw."
          : "The logo says supermercados, plural. Grande is at 6158 Highway 92 in Acworth. A second store sits up the same road, and a third is in Kennesaw."}
      </p>

      <div className="mt-8 overflow-hidden rounded-[2rem] border bg-white">
        <iframe
          title="Map of Supermercado La Villa at 6158 Highway 92, Acworth"
          src="https://maps.google.com/maps?q=6158%20Highway%2092%2C%20Acworth%2C%20GA%2030102&z=15&output=embed"
          className="h-72 w-full border-0"
          loading="lazy"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-sm">
            <span className="font-bold">{PRIMARY.name}</span> · {PRIMARY.address}, {PRIMARY.city}
          </p>
          <a href={SHARE_URL} target="_blank" rel="noreferrer" className="text-sm font-bold text-villa-red underline">
            {lang === "es" ? "Abrir el pin compartido" : "Open the shared pin"}
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {stores.map((store) => (
          <article key={store.id} className={`rounded-[2rem] border p-5 ${store.primary ? "bg-villa-ink text-white" : "bg-white"}`}>
            {store.primary ? (
              <p className="text-xs font-bold tracking-[0.16em] text-villa-gold uppercase">
                {lang === "es" ? "Tu pin" : "Your pin"}
              </p>
            ) : null}
            <h2 className="mt-2 font-heading text-3xl">{store.name}</h2>
            <p className={`mt-2 text-sm ${store.primary ? "text-white/80" : "text-muted-foreground"}`}>
              {store.address}
              <br />
              {store.city}
            </p>
            <p className="mt-3 text-sm font-semibold">{tx(lang, store.hours)}</p>
            <p className={`mt-3 text-sm leading-relaxed ${store.primary ? "text-white/80" : "text-muted-foreground"}`}>
              {tx(lang, store.note)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`tel:${store.tel}`} className={cn(buttonVariants(), "h-10 rounded-full px-4", store.primary && "bg-white text-villa-ink hover:bg-white/90")}>
                {store.phone}
              </a>
              <a
                href={store.maps}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4", store.primary && "border-white/30 bg-transparent text-white hover:bg-white/10")}
              >
                {lang === "es" ? "Cómo llegar" : "Directions"}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
