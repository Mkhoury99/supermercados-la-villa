"use client";

import { mealTotal, meals, productById } from "@/lib/catalog";
import { money } from "@/lib/format";
import { tx, useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MesaView() {
  const { lang } = useLang();
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">
        {lang === "es" ? "La mesa" : "The table"}
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-5xl leading-[0.95]">
        {lang === "es" ? "Cenas ya pensadas, con lo que hay en el anaquel." : "Dinners already thought through, from the actual shelves."}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {lang === "es"
          ? "Cada kit mete las piezas en la canasta. Nada de “compra el resto”. Si quieres decidir a ciegas, el comal de la portada gira."
          : "Each kit drops the pieces into the basket. Nothing is left as “you’ll figure out the rest.” If you want to choose blind, the comal on the home page still spins."}
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {meals.map((meal, index) => (
          <article key={meal.id} className="flex flex-col rounded-[2rem] border bg-white p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="font-heading text-5xl text-villa-red/30">{String(index + 1).padStart(2, "0")}</p>
              <p className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                {tx(lang, meal.serves)}
              </p>
            </div>
            <h2 className="font-heading text-3xl">{tx(lang, meal.name)}</h2>
            <p className="mt-2 text-muted-foreground">{tx(lang, meal.pitch)}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {meal.items.map((item) => {
                const product = productById(item.id);
                if (!product) return null;
                return (
                  <li key={item.id} className="flex justify-between gap-3 border-b border-dashed py-1.5">
                    <span>
                      {item.qty} × {tx(lang, product.name)}
                    </span>
                    <span className="text-muted-foreground">{money(product.price * item.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <p className="font-heading text-3xl">{money(mealTotal(meal))}</p>
              <Button
                type="button"
                className="h-11 rounded-full px-5"
                onClick={() => {
                  meal.items.forEach((item) => add(item.id, item.qty));
                  toast.success(lang === "es" ? `${tx(lang, meal.name)} está en la canasta` : `${tx(lang, meal.name)} is in the basket`);
                }}
              >
                {lang === "es" ? "Poner la mesa" : "Set the table"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
