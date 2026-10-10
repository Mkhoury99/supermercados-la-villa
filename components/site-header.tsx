"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Minus, Phone, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { PRIMARY, productById } from "@/lib/catalog";
import { money } from "@/lib/format";
import { acworthClock, type StoreClock } from "@/lib/hours";
import { useCart } from "@/lib/cart";
import { tx, useLang, type Lang } from "@/lib/i18n";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links: { href: string; label: { en: string; es: string } }[] = [
  { href: "/shop", label: { en: "Aisles", es: "Pasillos" } },
  { href: "/ofertas", label: { en: "Specials", es: "Ofertas" } },
  { href: "/cocina", label: { en: "La Cocina", es: "La Cocina" } },
  { href: "/mesa", label: { en: "Meal kits", es: "La mesa" } },
  { href: "/delivery", label: { en: "Delivery", es: "Entrega" } },
  { href: "/stores", label: { en: "Stores", es: "Tiendas" } },
  { href: "/about", label: { en: "Our market", es: "Nosotros" } },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const { lines, count, subtotal, setQty, remove } = useCart();
  const [clock, setClock] = useState<StoreClock | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setClock(acworthClock()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-[#fffdf8]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 bg-villa-deep px-4 py-1.5 text-xs text-white sm:px-6">
        <p className="truncate">
          {clock ? (
            <>
              <span className="font-semibold">{clock.open ? (lang === "es" ? "Abierto" : "Open") : lang === "es" ? "Cerrado" : "Closed"}</span>
              {" · "}
              {tx(lang, clock.label)}
              {" · "}
            </>
          ) : null}
          {PRIMARY.address}, {PRIMARY.city}
        </p>
        <a href={`tel:${PRIMARY.tel}`} className="hidden items-center gap-1 font-semibold sm:inline-flex">
          <Phone className="size-3" />
          {PRIMARY.phone}
        </a>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" className="lg:hidden" aria-label={lang === "es" ? "Menú" : "Menu"} />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-[#fffdf8]">
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl">La Villa</SheetTitle>
              <SheetDescription>
                {lang === "es" ? "Escoge un pasillo" : "Pick a door into the market"}
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              <NavLink href="/" pathname={pathname} label={lang === "es" ? "Inicio" : "Home"} close />
              {links.map((link) => (
                <NavLink key={link.href} href={link.href} pathname={pathname} label={tx(lang, link.label)} close />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="shrink-0">
          <Logo priority className="h-12 sm:h-14" />
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-bold transition",
                  active ? "bg-villa-green text-white" : "text-villa-ink hover:bg-secondary"
                )}
              >
                {tx(lang, link.label)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangToggle lang={lang} setLang={setLang} />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" className="relative h-10 rounded-full px-3" aria-label={lang === "es" ? "Canasta" : "Basket"} />
              }
            >
              <ShoppingBasket />
              <span className="font-bold">{count}</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-[#fffdf8] sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">
                  {lang === "es" ? "Tu canasta" : "Your basket"}
                </SheetTitle>
                <SheetDescription>
                  {count === 0
                    ? lang === "es"
                      ? "Todavía está vacía. El pasillo de pan huele mejor."
                      : "Still empty. The bakery aisle smells better than this."
                    : lang === "es"
                      ? `${count} piezas · ${money(subtotal)}`
                      : `${count} items · ${money(subtotal)}`}
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 space-y-3 overflow-y-auto px-4">
                {lines.map((line) => {
                  const product = productById(line.id);
                  if (!product) return null;
                  return (
                    <div key={line.id} className="flex items-center gap-3 rounded-2xl border bg-white p-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{tx(lang, product.name)}</p>
                        <p className="text-sm text-muted-foreground">{money(product.price * line.qty)}</p>
                      </div>
                      <div className="inline-flex items-center rounded-full border">
                        <Button type="button" size="icon-sm" variant="ghost" aria-label="Less" onClick={() => setQty(line.id, line.qty - 1)}>
                          <Minus />
                        </Button>
                        <span className="w-5 text-center text-sm font-bold">{line.qty}</span>
                        <Button type="button" size="icon-sm" variant="ghost" aria-label="More" onClick={() => setQty(line.id, line.qty + 1)}>
                          <Plus />
                        </Button>
                      </div>
                      <Button type="button" size="icon-sm" variant="ghost" aria-label={lang === "es" ? "Quitar" : "Remove"} onClick={() => remove(line.id)}>
                        <Trash2 />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <SheetFooter>
                <SheetClose render={<Link href="/cart" className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-full")} />}>
                  {lang === "es" ? "Ver canasta" : "View basket"}
                </SheetClose>
                <SheetClose render={<Link href="/checkout" className={cn(buttonVariants(), "h-11 rounded-full")} />}>
                  {lang === "es" ? "Pedir" : "Checkout"} · {money(subtotal)}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  label,
  close,
}: {
  href: string;
  pathname: string;
  label: string;
  close?: boolean;
}) {
  const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const className = cn(
    "rounded-2xl px-3 py-3 text-base font-bold",
    active ? "bg-villa-green text-white" : "hover:bg-secondary"
  );
  if (close) {
    return (
      <SheetClose render={<Link href={href} className={className} />}>{label}</SheetClose>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="flex rounded-full border bg-white p-0.5 text-xs font-bold">
      {(["en", "es"] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase",
            lang === code ? "bg-villa-ink text-white" : "text-muted-foreground"
          )}
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function BasketBar() {
  const { lang } = useLang();
  const { count, subtotal } = useCart();
  if (count === 0) return null;
  return (
    <Link
      href="/cart"
      className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-full bg-villa-ink px-5 py-3 text-white shadow-xl md:hidden"
    >
      <span className="font-bold">
        {lang === "es" ? "Canasta" : "Basket"} · {count}
      </span>
      <span className="font-heading text-lg">{money(subtotal)}</span>
    </Link>
  );
}
