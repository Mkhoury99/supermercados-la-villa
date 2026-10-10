"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const rooms = [
  {
    en: "Mi Tienda",
    es: "Mi Tienda",
    detail: {
      en: "The meat counter, the produce, and the cakes. Ask for the cut. They will cut it.",
      es: "El mostrador de carne, la fruta y los pasteles. Pide el corte. Lo cortan.",
    },
  },
  {
    en: "Panadería",
    es: "Panadería",
    detail: {
      en: "Conchas, cuernos, and bolillos baked through the day, not trucked in at dawn and forgotten.",
      es: "Conchas, cuernos y bolillos horneados en el día, no traídos al amanecer y olvidados.",
    },
  },
  {
    en: "La Cocina",
    es: "La Cocina",
    detail: {
      en: "Tacos, tortas, carnitas, tamales, and chicharrón, plated in the back of the market.",
      es: "Tacos, tortas, carnitas, tamales y chicharrón, servidos al fondo del mercado.",
    },
  },
  {
    en: "Aguas frescas",
    es: "Aguas frescas",
    detail: {
      en: "Horchata, jamaica, tamarindo, and cucumber, cold, in a bottle you can actually finish.",
      es: "Horchata, jamaica, tamarindo y pepino, frías, en una botella que sí te acabas.",
    },
  },
];

export function AboutView() {
  const { lang } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-villa-red uppercase">
            {lang === "es" ? "La villa" : "The market"}
          </p>
          <h1 className="mt-2 font-heading text-5xl leading-[0.95]">
            {lang === "es"
              ? "Productos de México, en una plaza de Acworth."
              : "Mexican groceries, in an Acworth shopping center."}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {lang === "es"
              ? "La Villa trae productos típicos y marcas que normalmente se quedan del otro lado de la frontera. La panadería saca pan dulce todos los días. La Cocina sirve tacos, tortas, carnitas, tamales y chicharrón. Si tienes sed, las aguas frescas están a unos pasos. Y el lema de la tienda sigue siendo el mismo: precios bajos."
              : "La Villa stocks the everyday Mexican brands that usually stay on the other side of the border. The bakery turns out pan dulce every day. La Cocina serves tacos, tortas, carnitas, tamales, and chicharrón. The aguas frescas are a few steps away if you're thirsty. And the store still introduces itself the same way: low prices."}
          </p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <Logo className="mx-auto h-32" />
          <p className="mt-4 text-center font-heading text-2xl">
            {lang === "es" ? "Tu tienda de precios bajos" : "Your low-price market"}
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            6158 Highway 92 · Acworth, GA 30102
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {rooms.map((room) => (
          <article key={room.en} className="rounded-[2rem] border bg-white p-6">
            <h2 className="font-heading text-3xl">{lang === "es" ? room.es : room.en}</h2>
            <p className="mt-2 text-muted-foreground">{lang === "es" ? room.detail.es : room.detail.en}</p>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-[2rem] bg-[#fff1c2] p-6 sm:p-10">
        <h2 className="font-heading text-4xl">
          {lang === "es" ? "Este sitio es un demo para el cliente." : "This site is a client demo."}
        </h2>
        <p className="mt-3 max-w-2xl text-lg">
          {lang === "es"
            ? "Puedes armar una canasta, revisar el ZIP y ver cómo se vería el pedido. La tarjeta no se cobra y La Villa no recibe el pedido. Los horarios, teléfonos y la dirección salen de los listados públicos de las tiendas."
            : "You can fill a basket, check a ZIP, and watch an order take shape. The card is never charged, and La Villa never receives the order. Hours, phones, and the address come from the stores' public listings."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop" className={cn(buttonVariants(), "h-11 rounded-full px-5")}>
            {lang === "es" ? "Empezar por los pasillos" : "Start in the aisles"}
          </Link>
          <Link href="/delivery" className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full bg-white px-5")}>
            {lang === "es" ? "Probar un ZIP" : "Try a ZIP"}
          </Link>
        </div>
      </section>
    </div>
  );
}
