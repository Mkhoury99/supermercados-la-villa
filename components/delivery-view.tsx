"use client";

import Link from "next/link";
import { MIN_ORDER, PRIMARY, stores, zones } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ZipCheck } from "@/components/zip-check";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    en: "You fill the basket",
    es: "Llenas la canasta",
    detail: {
      en: "Groceries, pan dulce, and La Cocina can share one order.",
      es: "Abarrotes, pan dulce y La Cocina pueden ir en el mismo pedido.",
    },
  },
  {
    en: "We pack from Highway 92",
    es: "Empacamos en Highway 92",
    detail: {
      en: "The carnicería weighs your meat. The bakery boxes whatever just came out.",
      es: "La carnicería pesa la carne. La panadería empaca lo que acaba de salir.",
    },
  },
  {
    en: "The cow van leaves",
    es: "Sale la vaca",
    detail: {
      en: "Same-day windows until 8 PM, if you book before the slot closes.",
      es: "Ventanas el mismo día hasta las 8 PM, si apartas antes de que cierre.",
    },
  },
  {
    en: "You open the door",
    es: "Abres la puerta",
    detail: {
      en: "Or skip the van and pick up at any of the three stores.",
      es: "O te saltas la vaca y recoges en cualquiera de las tres tiendas.",
    },
  },
];

export function DeliveryView() {
  const { lang } = useLang();
  return (
    <div>
      <section className="overflow-hidden bg-[#12351f] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[#9be7b4] uppercase">
              {lang === "es" ? "Entrega" : "Delivery"}
            </p>
            <h1 className="mt-3 font-heading text-5xl leading-[0.95] sm:text-6xl">
              {lang === "es" ? "La vaca conoce Cobb County." : "The cow knows Cobb County."}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              {lang === "es"
                ? `Salimos de ${PRIMARY.address}. Pedido mínimo ${money(MIN_ORDER)}. Acworth viaja desde $3.99, y el mandado grande no paga envío.`
                : `We leave from ${PRIMARY.address}. Minimum order ${money(MIN_ORDER)}. Acworth starts at $3.99, and a big basket skips the fee.`}
            </p>
          </div>
          <CowRoute />
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-heading text-3xl">
            {lang === "es" ? "¿Llegamos a tu casa?" : "Do we reach your kitchen?"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {lang === "es"
              ? "Prueba 30102, 30152 o 30060. El 30303 es Atlanta centro: la vaca se da la vuelta."
              : "Try 30102, 30152, or 30060. 30303 is downtown Atlanta — the van turns around."}
          </p>
          <div className="mt-4">
            <ZipCheck />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {zones.map((zone) => (
              <article key={zone.id} className="rounded-3xl border bg-white p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-heading text-2xl">{zone.name}</h3>
                  <p className="font-bold text-villa-green">{money(zone.fee)}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {zone.zips.join(" · ")}
                </p>
                <p className="mt-2 text-sm">
                  {lang === "es"
                    ? `${zone.minutes} min · gratis desde ${money(zone.freeOver)}`
                    : `${zone.minutes} min · free from ${money(zone.freeOver)}`}
                </p>
              </article>
            ))}
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.en} className="rounded-3xl bg-white p-5">
                <p className="font-heading text-4xl text-villa-red/30">{index + 1}</p>
                <h3 className="font-heading text-2xl">{lang === "es" ? step.es : step.en}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{txSafe(lang, step.detail)}</p>
              </li>
            ))}
          </ol>

          <section className="mt-12">
            <h2 className="font-heading text-3xl">{lang === "es" ? "Preguntas de la puerta" : "Questions at the door"}</h2>
            <div className="mt-4 space-y-3">
              <Faq
                q={lang === "es" ? "¿La carne va pesada de verdad?" : "Is the meat actually weighed?"}
                a={lang === "es" ? "En este demo el precio es por libra, como en el mostrador. Un pedido real se ajustaría al peso que corte el carnicero." : "In this demo the price is per pound, the way the counter sells it. A real order would follow the weight the butcher cuts."}
              />
              <Faq
                q={lang === "es" ? "¿Puedo recoger y no esperar la vaca?" : "Can I skip the van and pick up?"}
                a={lang === "es" ? "Sí. En el checkout eliges tienda. La Grande está en 6158 Highway 92." : "Yes. Checkout lets you choose a store. La Grande is at 6158 Highway 92."}
              />
              <Faq
                q={lang === "es" ? "¿Esto cobra una tarjeta?" : "Does this charge a card?"}
                a={lang === "es" ? "No. El checkout es un recorrido. Nada sale de tu navegador ni llega a la tienda." : "No. Checkout is a walkthrough. Nothing leaves your browser, and the store never sees the order."}
              />
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-[2rem] border bg-white p-5 lg:sticky lg:top-28">
          <p className="text-xs font-bold tracking-[0.16em] text-villa-green uppercase">
            {lang === "es" ? "Recoger" : "Pickup"}
          </p>
          <ul className="mt-3 space-y-3 text-sm">
            {stores.map((store) => (
              <li key={store.id}>
                <p className="font-bold">{store.name}</p>
                <p className="text-muted-foreground">{store.address}</p>
              </li>
            ))}
          </ul>
          <Link href="/checkout" className={cn(buttonVariants(), "mt-5 h-11 w-full rounded-full")}>
            {lang === "es" ? "Ir a pedir" : "Go to checkout"}
          </Link>
        </aside>
      </div>
    </div>
  );
}

function txSafe(lang: "en" | "es", copy: { en: string; es: string }) {
  return copy[lang];
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border bg-white px-4 py-3">
      <summary className="cursor-pointer font-bold">{q}</summary>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
    </details>
  );
}

function CowRoute() {
  return (
    <div className="relative h-48 overflow-hidden rounded-[2rem] bg-[#1c5a34]">
      <div className="absolute inset-x-0 bottom-8 h-3 bg-[#0d3d22]" />
      <div className="absolute inset-x-6 bottom-10 h-1 border-t-2 border-dashed border-white/50" />
      <div className="absolute bottom-12 left-6 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-villa-deep">
        Hwy 92
      </div>
      <div className="absolute right-6 bottom-12 rounded-2xl bg-villa-gold px-3 py-2 text-xs font-bold text-villa-ink">
        Tu puerta
      </div>
      <div className="cow-van absolute bottom-11 left-0">
        <svg width="92" height="48" viewBox="0 0 92 48" aria-hidden>
          <rect x="8" y="16" width="58" height="22" rx="6" fill="#fffdf8" />
          <rect x="48" y="8" width="28" height="30" rx="6" fill="#c4162a" />
          <circle cx="24" cy="40" r="6" fill="#24160f" />
          <circle cx="64" cy="40" r="6" fill="#24160f" />
          <circle cx="22" cy="22" r="3" fill="#24160f" />
          <circle cx="32" cy="24" r="4" fill="#24160f" />
          <circle cx="40" cy="20" r="2.5" fill="#24160f" />
          <rect x="54" y="14" width="14" height="8" rx="2" fill="#fff6ec" />
        </svg>
      </div>
    </div>
  );
}
