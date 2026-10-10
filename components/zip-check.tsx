"use client";

import { useState } from "react";
import Link from "next/link";
import { deliveryFee, findZone, MIN_ORDER, type Zone } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ZipCheck({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const { subtotal } = useCart();
  const [zip, setZip] = useState("");
  const [zone, setZone] = useState<Zone | null | undefined>(undefined);

  function check(value = zip) {
    const clean = value.replace(/\D/g, "").slice(0, 5);
    setZip(clean);
    if (clean.length !== 5) {
      setZone(undefined);
      return;
    }
    const found = findZone(clean) ?? null;
    setZone(found);
    if (found) localStorage.setItem("lavilla-zip", clean);
  }

  const fee = zone ? deliveryFee(subtotal, zone) : 0;

  return (
    <div className={compact ? "" : "rounded-[2rem] border bg-white p-5 shadow-sm"}>
      <label className="text-sm font-bold" htmlFor={compact ? "zip-home" : "zip-delivery"}>
        {lang === "es" ? "Tu código postal" : "Your ZIP code"}
      </label>
      <div className="mt-2 flex gap-2">
        <Input
          id={compact ? "zip-home" : "zip-delivery"}
          inputMode="numeric"
          maxLength={5}
          placeholder="30102"
          value={zip}
          onChange={(event) => {
            const clean = event.target.value.replace(/\D/g, "").slice(0, 5);
            setZip(clean);
            if (clean.length === 5) check(clean);
            else setZone(undefined);
          }}
          className="h-11 rounded-full bg-white px-4 text-base"
        />
        <Button type="button" className="h-11 rounded-full px-5" onClick={() => check()}>
          {lang === "es" ? "Ver" : "Check"}
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["30102", "30152", "30060", "30303"].map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => check(sample)}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
          >
            {sample}
          </button>
        ))}
      </div>
      {zone ? (
        <div className="mt-4 rounded-2xl bg-[#e5f6ea] p-4 text-sm leading-relaxed text-villa-deep">
          <p className="font-heading text-xl text-villa-deep">
            {lang === "es" ? `Sí, llegamos a ${zone.name}` : `Yes — we roll into ${zone.name}`}
          </p>
          <p className="mt-1">
            {lang === "es"
              ? `Unos ${zone.minutes} min desde Highway 92. Envío ${fee === 0 ? "gratis" : money(fee)} hoy${subtotal ? "" : ""}. Gratis desde ${money(zone.freeOver)}.`
              : `About ${zone.minutes} min from Highway 92. Delivery is ${fee === 0 ? "free" : money(fee)} on this basket. Free from ${money(zone.freeOver)}.`}
          </p>
          <p className="mt-1">
            {lang === "es" ? `Pedido mínimo ${money(MIN_ORDER)}.` : `Minimum order ${money(MIN_ORDER)}.`}
          </p>
          <Link href="/delivery" className="mt-2 inline-block font-bold underline">
            {lang === "es" ? "Armar la entrega" : "Set up the delivery"}
          </Link>
        </div>
      ) : null}
      {zone === null ? (
        <div className="mt-4 rounded-2xl bg-[#fff1c2] p-4 text-sm leading-relaxed">
          <p className="font-heading text-xl">
            {lang === "es" ? "Ese ZIP se nos queda lejos" : "That ZIP is outside the route"}
          </p>
          <p className="mt-1">
            {lang === "es"
              ? "La vaca solo pasta en Cobb y los pueblos de al lado. Puedes recoger en Acworth o Kennesaw."
              : "The van stays in Cobb and the towns next door. You can still pick up in Acworth or Kennesaw."}
          </p>
          <Link href="/stores" className="mt-2 inline-block font-bold underline">
            {lang === "es" ? "Ver tiendas" : "See the stores"}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
