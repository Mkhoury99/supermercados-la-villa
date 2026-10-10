"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { productById, specials } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { tx, useLang } from "@/lib/i18n";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddButton } from "@/components/product-card";

export function CartView() {
  const { lang } = useLang();
  const { ready, lines, subtotal, setQty, remove } = useCart();
  const ideas = specials().filter((product) => !lines.some((line) => line.id === product.id)).slice(0, 2);

  if (!ready) {
    return <p className="px-4 py-16 text-center">{lang === "es" ? "Abriendo la canasta…" : "Opening the basket…"}</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="font-heading text-6xl text-villa-red/30">0</p>
        <h1 className="font-heading text-4xl">{lang === "es" ? "La canasta está en ayunas." : "The basket hasn't eaten yet."}</h1>
        <p className="mt-3 text-muted-foreground">
          {lang === "es" ? "Empieza por una concha. Es el error más barato de la tienda." : "Start with a concha. It is the cheapest good decision in the store."}
        </p>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6 h-11 rounded-full px-5")}>
          {lang === "es" ? "Ir a los pasillos" : "Walk the aisles"}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="font-heading text-5xl">{lang === "es" ? "Tu canasta" : "Your basket"}</h1>
        <ul className="mt-6 space-y-3">
          {lines.map((line) => {
            const product = productById(line.id);
            if (!product) return null;
            return (
              <li key={line.id} className="flex flex-col gap-3 rounded-3xl border bg-white p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading text-2xl">{tx(lang, product.name)}</h2>
                  <p className="text-sm text-muted-foreground">
                    {money(product.price)} · {tx(lang, product.unit)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border">
                    <Button type="button" size="icon" variant="ghost" aria-label="Less" onClick={() => setQty(line.id, line.qty - 1)}>
                      <Minus />
                    </Button>
                    <span className="w-6 text-center font-bold">{line.qty}</span>
                    <Button type="button" size="icon" variant="ghost" aria-label="More" onClick={() => setQty(line.id, line.qty + 1)}>
                      <Plus />
                    </Button>
                  </div>
                  <p className="w-20 text-right font-heading text-xl">{money(product.price * line.qty)}</p>
                  <Button type="button" size="icon" variant="ghost" aria-label={lang === "es" ? "Quitar" : "Remove"} onClick={() => remove(line.id)}>
                    <Trash2 />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        {ideas.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-heading text-2xl">{lang === "es" ? "Se te está olvidando la oferta" : "The special you walked past"}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ideas.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 rounded-3xl bg-white p-4">
                  <div>
                    <p className="font-bold">{tx(lang, product.name)}</p>
                    <p className="text-sm text-muted-foreground">{money(product.price)}</p>
                  </div>
                  <AddButton product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <aside className="h-fit rounded-[2rem] bg-villa-ink p-6 text-white lg:sticky lg:top-28">
        <p className="text-sm text-white/70">{lang === "es" ? "Subtotal" : "Subtotal"}</p>
        <p className="font-heading text-5xl">{money(subtotal)}</p>
        <p className="mt-2 text-sm text-white/70">
          {lang === "es" ? "El envío se calcula con tu ZIP en el siguiente paso." : "Delivery is calculated from your ZIP on the next step."}
        </p>
        <Link href="/checkout" className={cn(buttonVariants(), "mt-6 h-12 w-full rounded-full bg-white text-base text-villa-ink hover:bg-white/90")}>
          {lang === "es" ? "Pedir" : "Checkout"}
        </Link>
      </aside>
    </div>
  );
}
