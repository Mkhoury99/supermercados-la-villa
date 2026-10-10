"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { money } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { loadOrder, type SavedOrder } from "@/lib/orders";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OrderView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { lang } = useLang();
  const [order, setOrder] = useState<SavedOrder | null | undefined>(undefined);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setOrder(loadOrder(id)), 0);
    return () => window.clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!order) return;
    if (step >= 3) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [order, step]);

  if (order === undefined) {
    return <p className="px-4 py-16 text-center">{lang === "es" ? "Buscando el pedido…" : "Looking up the order…"}</p>;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-4xl">{lang === "es" ? "Ese pedido no está en este navegador." : "That order isn't in this browser."}</h1>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6 h-11 rounded-full px-5")}>
          {lang === "es" ? "Armar otro" : "Start another"}
        </Link>
      </div>
    );
  }

  const delivery = order.fulfillment === "delivery";
  const stages = delivery
    ? [
        { en: "Order caught", es: "Pedido tomado" },
        { en: "Packing the counter", es: "Empacando el mostrador" },
        { en: "Cow van on the road", es: "La vaca va en camino" },
        { en: "At your door", es: "En tu puerta" },
      ]
    : [
        { en: "Order caught", es: "Pedido tomado" },
        { en: "The butcher is cutting", es: "El carnicero está cortando" },
        { en: "Boxed and named", es: "En caja, con tu nombre" },
        { en: "Ready at the counter", es: "Listo en el mostrador" },
      ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">{order.id}</p>
      <h1 className="mt-2 font-heading text-5xl">
        {lang === "es" ? `Listo, ${order.name.split(" ")[0]}.` : `You're set, ${order.name.split(" ")[0]}.`}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {lang === "es"
          ? "Esto es una animación de demo. El pedido vive solo en este navegador."
          : "This tracker is a demo animation. The order lives only in this browser."}
      </p>

      <div className="mt-8 rounded-[2rem] bg-villa-deep p-6 text-white">
        <div className="relative h-3 rounded-full bg-white/15">
          <div
            className="h-3 rounded-full bg-villa-gold transition-all duration-700"
            style={{ width: `${((step + 1) / stages.length) * 100}%` }}
          />
        </div>
        <ol className="mt-4 grid gap-2 sm:grid-cols-4">
          {stages.map((stage, index) => (
            <li key={stage.en} className={`text-sm ${index <= step ? "font-bold text-white" : "text-white/50"}`}>
              {lang === "es" ? stage.es : stage.en}
            </li>
          ))}
        </ol>
        <button type="button" className="mt-4 text-sm font-bold text-villa-gold underline" onClick={() => setStep(0)}>
          {lang === "es" ? "Volver a ver el recorrido" : "Replay the route"}
        </button>
      </div>

      <section className="mt-6 rounded-[2rem] border bg-white p-6">
        <h2 className="font-heading text-2xl">
          {delivery
            ? lang === "es"
              ? `Entrega en ${order.zoneName}`
              : `Delivery in ${order.zoneName}`
            : lang === "es"
              ? `Recoger en ${order.storeName}`
              : `Pickup at ${order.storeName}`}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {order.address}
          {order.zip ? ` · ${order.zip}` : ""} · {order.slotLabel}
        </p>
        {order.notes ? <p className="mt-3 text-sm">“{order.notes}”</p> : null}
        <ul className="mt-4 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>{item.qty} × {item.name}</span>
              <span>{money(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-3 font-heading text-3xl">
          <span>Total</span>
          <span>{money(order.total)}</span>
        </div>
      </section>
      <Link href="/shop" className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-11 rounded-full bg-white px-5")}>
        {lang === "es" ? "Seguir recorriendo" : "Keep wandering"}
      </Link>
    </div>
  );
}
