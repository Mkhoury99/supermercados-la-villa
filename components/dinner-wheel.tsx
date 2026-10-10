"use client";

import { useState } from "react";
import { mealTotal, meals, productById } from "@/lib/catalog";
import { money } from "@/lib/format";
import { tx, useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const colors = ["#c4162a", "#157a3a", "#e7a322", "#0c6e96", "#a12658", "#d35400", "#2f6b16", "#4c3aa8"];

export function DinnerWheel() {
  const { lang } = useLang();
  const { add } = useCart();
  const [turn, setTurn] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  function spin() {
    if (spinning) return;
    const next = Math.floor(Math.random() * meals.length);
    const slice = 360 / meals.length;
    const landing = 360 * 5 + (360 - next * slice - slice / 2);
    setSpinning(true);
    setIndex(null);
    setTurn((current) => {
      const normalized = current % 360;
      return current - normalized + landing;
    });
    window.setTimeout(() => {
      setIndex(next);
      setSpinning(false);
    }, 3200);
  }

  const meal = index === null ? null : meals[index];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
      <div className="relative mx-auto size-72 sm:size-80">
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1">
          <span className="block h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-villa-ink" />
        </div>
        <div
          className="size-full rounded-full border-[10px] border-white shadow-xl"
          style={{
            background: `conic-gradient(${colors
              .map((color, colorIndex) => {
                const slice = 100 / meals.length;
                return `${color} ${colorIndex * slice}% ${(colorIndex + 1) * slice}%`;
              })
              .join(",")})`,
            transform: `rotate(${turn}deg)`,
            transition: spinning ? "transform 3.2s cubic-bezier(0.12, 0.7, 0.08, 1)" : "none",
          }}
        />
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-center font-heading text-lg leading-none text-villa-ink shadow-lg disabled:opacity-70"
        >
          {spinning ? (lang === "es" ? "Girando" : "Spinning") : lang === "es" ? "Gira el comal" : "Spin the comal"}
        </button>
      </div>
      <div>
        <p className="text-sm font-bold tracking-[0.16em] text-villa-green uppercase">
          {lang === "es" ? "¿Qué se cena?" : "What's for dinner?"}
        </p>
        <h2 className="mt-2 font-heading text-4xl">
          {lang === "es" ? "Deja que el comal decida." : "Let the comal decide."}
        </h2>
        <p className="mt-3 max-w-lg text-lg text-muted-foreground">
          {lang === "es"
            ? "Ocho cenas armadas con lo que sí hay en la tienda. Gira, y si te late, la canasta se llena sola."
            : "Eight dinners built from what is actually on the shelves. Spin, and if it sounds right, the basket fills itself."}
        </p>
        {meal ? (
          <div className="mt-6 rounded-[1.5rem] border bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-villa-red">{tx(lang, meal.serves)}</p>
            <h3 className="font-heading text-3xl">{tx(lang, meal.name)}</h3>
            <p className="mt-2 text-muted-foreground">{tx(lang, meal.pitch)}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {meal.items.map((item) => {
                const product = productById(item.id);
                if (!product) return null;
                return (
                  <li key={item.id}>
                    {item.qty} × {tx(lang, product.name)}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                className="h-11 rounded-full px-5"
                onClick={() => {
                  meal.items.forEach((item) => add(item.id, item.qty));
                  toast.success(lang === "es" ? "La mesa ya está en la canasta" : "The whole table is in the basket");
                }}
              >
                {lang === "es" ? "Agregar el kit" : "Add the kit"} · {money(mealTotal(meal))}
              </Button>
              <Button type="button" variant="outline" className="h-11 rounded-full px-5" onClick={spin}>
                {lang === "es" ? "Otra vez" : "Spin again"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm font-semibold text-villa-ink/70">
            {lang === "es" ? "El puntero está arriba. Un clic y cae en una cena." : "The pointer sits at the top. One click and it lands on a dinner."}
          </p>
        )}
      </div>
    </div>
  );
}
