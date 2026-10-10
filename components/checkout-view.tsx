"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deliveryFee,
  findZone,
  MIN_ORDER,
  productById,
  stores,
} from "@/lib/catalog";
import { money } from "@/lib/format";
import { slotOptions } from "@/lib/hours";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { createOrderId, saveOrder } from "@/lib/orders";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function CheckoutView() {
  const { lang } = useLang();
  const { ready, lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [slots, setSlots] = useState<{ id: string; label: string }[]>([]);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [storeId, setStoreId] = useState(stores[0].id);
  const [notes, setNotes] = useState("");
  const [card, setCard] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lavilla-zip");
    const timer = window.setTimeout(() => {
      if (saved) setZip(saved);
      const days = slotOptions();
      const next = days.flatMap((day) =>
        day.slots.map((windowSlot) => ({
          id: windowSlot.id,
          label: `${lang === "es" ? day.es : day.en} · ${windowSlot.label}`,
        }))
      );
      setSlots(next);
      setSlot((current) => current ?? next[0]?.id ?? null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [lang]);

  const zone = findZone(zip);
  const fee = mode === "pickup" ? 0 : zone ? deliveryFee(subtotal, zone) : 0;
  const total = subtotal + fee;

  if (!ready) {
    return <p className="px-4 py-16 text-center">{lang === "es" ? "Preparando el pedido…" : "Setting the order up…"}</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-4xl">{lang === "es" ? "No hay nada que pedir." : "There is nothing to order."}</h1>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6 h-11 rounded-full px-5")}>
          {lang === "es" ? "Llenar la canasta" : "Fill the basket"}
        </Link>
      </div>
    );
  }

  function placeOrder() {
    const cleanCard = card.replace(/\s/g, "");
    if (name.trim().length < 2) {
      setError(lang === "es" ? "Escribe el nombre de quien recibe." : "Add the name of whoever is receiving this.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError(lang === "es" ? "Falta un teléfono." : "Add a phone number.");
      return;
    }
    if (subtotal < MIN_ORDER) {
      setError(
        lang === "es"
          ? `El mínimo es ${money(MIN_ORDER)}. Te faltan ${money(MIN_ORDER - subtotal)}.`
          : `The minimum is ${money(MIN_ORDER)}. You are ${money(MIN_ORDER - subtotal)} short.`
      );
      return;
    }
    if (!slot) {
      setError(lang === "es" ? "Elige una ventana." : "Pick a window.");
      return;
    }
    if (mode === "delivery") {
      if (address.trim().length < 6) {
        setError(lang === "es" ? "Falta la dirección." : "Add a street address.");
        return;
      }
      if (!zone) {
        setError(lang === "es" ? "Ese ZIP está fuera de la ruta. Prueba recoger en tienda." : "That ZIP is outside the route. Switch to pickup.");
        return;
      }
    }
    if (!/^\d{12,19}$/.test(cleanCard)) {
      setError(lang === "es" ? "La tarjeta de demo necesita 12 a 19 dígitos. No se cobra." : "The demo card needs 12 to 19 digits. Nothing is charged.");
      return;
    }

    const store = stores.find((item) => item.id === storeId) ?? stores[0];
    const slotLabel = slots.find((item) => item.id === slot)?.label ?? slot;
    const id = createOrderId();
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      fulfillment: mode,
      address: mode === "delivery" ? address.trim() : store.address,
      zip: mode === "delivery" ? zip : "",
      zoneName: mode === "delivery" && zone ? zone.name : store.name,
      fee,
      slotLabel,
      storeName: store.name,
      notes: notes.trim(),
      items: lines.flatMap((line) => {
        const product = productById(line.id);
        if (!product) return [];
        return [{ id: product.id, name: product.name[lang], qty: line.qty, price: product.price }];
      }),
      subtotal,
      total,
    });
    clear();
    router.push(`/order/${id}`);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="font-heading text-5xl">{lang === "es" ? "Pedir" : "Checkout"}</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          {lang === "es"
            ? "Recorrido de demostración. La tarjeta no se cobra y la tienda no recibe este pedido."
            : "A demo walkthrough. The card is not charged, and the store never receives this order."}
        </p>
        <Tabs value={mode} onValueChange={(value) => setMode(value as "delivery" | "pickup")} className="mt-6">
          <TabsList className="h-11 w-full max-w-md">
            <TabsTrigger value="delivery" className="flex-1">{lang === "es" ? "Entrega" : "Delivery"}</TabsTrigger>
            <TabsTrigger value="pickup" className="flex-1">{lang === "es" ? "Recoger" : "Pickup"}</TabsTrigger>
          </TabsList>
        </Tabs>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            placeOrder();
          }}
        >
          <Field label={lang === "es" ? "Nombre" : "Name"}>
            <Input value={name} onChange={(event) => setName(event.target.value)} className="h-11 rounded-2xl px-3" autoComplete="name" />
          </Field>
          <Field label={lang === "es" ? "Teléfono" : "Phone"}>
            <Input value={phone} onChange={(event) => setPhone(event.target.value)} className="h-11 rounded-2xl px-3" autoComplete="tel" inputMode="tel" />
          </Field>
          {mode === "delivery" ? (
            <>
              <Field label={lang === "es" ? "Dirección" : "Street address"}>
                <Input value={address} onChange={(event) => setAddress(event.target.value)} className="h-11 rounded-2xl px-3" autoComplete="street-address" />
              </Field>
              <Field label={lang === "es" ? "Código postal" : "ZIP code"}>
                <Input
                  value={zip}
                  onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="h-11 rounded-2xl px-3"
                  inputMode="numeric"
                />
              </Field>
              <p className="text-sm">
                {zip.length === 5 && zone
                  ? lang === "es"
                    ? `${zone.name} · envío ${fee === 0 ? "gratis" : money(fee)}`
                    : `${zone.name} · delivery ${fee === 0 ? "free" : money(fee)}`
                  : zip.length === 5
                    ? lang === "es"
                      ? "Fuera de ruta."
                      : "Outside the route."
                    : lang === "es"
                      ? "Acworth es 30102."
                      : "Acworth is 30102."}
              </p>
            </>
          ) : (
            <Field label={lang === "es" ? "Tienda" : "Store"}>
              <Select
                value={storeId}
                onValueChange={(value) => setStoreId(value ?? stores[0].id)}
                items={stores.map((store) => ({ value: store.id, label: store.name }))}
              >
                <SelectTrigger className="h-11 w-full rounded-2xl px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name} · {store.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
          <Field label={lang === "es" ? "Ventana" : "Window"}>
            <Select
              value={slot}
              onValueChange={(value) => setSlot(value)}
              items={slots.map((item) => ({ value: item.id, label: item.label }))}
            >
              <SelectTrigger className="h-11 w-full rounded-2xl px-3">
                <SelectValue placeholder={lang === "es" ? "Elige horario" : "Choose a time"} />
              </SelectTrigger>
              <SelectContent>
                {slots.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label={lang === "es" ? "Notas para el carnicero" : "Notes for the butcher"}>
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={lang === "es" ? "Sin cebolla en la asada, por favor." : "No onion on the asada, please."}
              className="min-h-24 rounded-2xl px-3 py-3"
            />
          </Field>
          <Field label={lang === "es" ? "Tarjeta de demo" : "Demo card"}>
            <Input
              value={card}
              onChange={(event) => setCard(event.target.value)}
              placeholder="4242 4242 4242 4242"
              className="h-11 rounded-2xl px-3"
              inputMode="numeric"
              autoComplete="off"
            />
          </Field>
          {error ? <p className="rounded-2xl bg-[#ffe0dc] px-4 py-3 text-sm font-semibold text-[#9d1222]">{error}</p> : null}
          <Button type="submit" className="h-12 rounded-full text-base">
            {lang === "es" ? "Hacer el pedido demo" : "Place the demo order"} · {money(total)}
          </Button>
        </form>
      </div>
      <aside className="h-fit rounded-[2rem] border bg-white p-5 lg:sticky lg:top-28">
        <h2 className="font-heading text-2xl">{lang === "es" ? "Resumen" : "Summary"}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {lines.map((line) => {
            const product = productById(line.id);
            if (!product) return null;
            return (
              <li key={line.id} className="flex justify-between gap-3">
                <span>{line.qty} × {product.name[lang]}</span>
                <span>{money(product.price * line.qty)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 space-y-1 border-t pt-3 text-sm">
          <Row label={lang === "es" ? "Subtotal" : "Subtotal"} value={money(subtotal)} />
          <Row label={mode === "pickup" ? (lang === "es" ? "Recoger" : "Pickup") : lang === "es" ? "Envío" : "Delivery"} value={fee === 0 ? (lang === "es" ? "Gratis" : "Free") : money(fee)} />
          <Row label="Total" value={money(total)} strong />
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <p className={`flex justify-between ${strong ? "font-heading text-2xl" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}
