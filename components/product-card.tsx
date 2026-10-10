"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { aisleBySlug, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { tx, useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { MarketIcon } from "@/components/market-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const aisle = aisleBySlug(product.aisle);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex h-36 items-center justify-center"
          style={{ background: aisle?.tint ?? "#fff" }}
        >
          <span
            className="flex size-20 items-center justify-center rounded-full bg-white/80 shadow-sm"
            style={{ color: aisle?.ink }}
          >
            <MarketIcon name={product.icon} className="size-10" />
          </span>
          {product.compareAt ? (
            <Badge className="absolute top-3 left-3 bg-villa-red text-white">
              {lang === "es" ? "Oferta" : "Special"}
            </Badge>
          ) : null}
          {product.house ? (
            <Badge className="absolute top-3 right-3 border-transparent bg-white/90 text-villa-deep">
              {lang === "es" ? "De la casa" : "House"}
            </Badge>
          ) : null}
        </button>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <button type="button" onClick={() => setOpen(true)} className="text-left">
            <h3 className="font-heading text-xl leading-tight">{tx(lang, product.name)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tx(lang, product.unit)}</p>
          </button>
          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <p className="font-heading text-2xl">{money(product.price)}</p>
              {product.compareAt ? (
                <p className="text-sm text-muted-foreground line-through">
                  {money(product.compareAt)}
                </p>
              ) : null}
            </div>
            <AddButton product={product} />
          </div>
        </div>
      </article>
      <ProductDialog product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function AddButton({
  product,
  qty = 1,
  label,
}: {
  product: Product;
  qty?: number;
  label?: string;
}) {
  const { lang } = useLang();
  const { add } = useCart();
  return (
    <Button
      type="button"
      className="h-10 rounded-full px-4"
      onClick={() => {
        add(product.id, qty);
        toast.success(
          lang === "es"
            ? `${tx(lang, product.name)} va en la canasta`
            : `${tx(lang, product.name)} is in the basket`
        );
      }}
    >
      {label ?? (lang === "es" ? "Agregar" : "Add")}
    </Button>
  );
}

function ProductDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useLang();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const aisle = aisleBySlug(product.aisle);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQty(1);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <div
          className="flex h-40 items-center justify-center rounded-2xl"
          style={{ background: aisle?.tint }}
        >
          <span className="flex size-24 items-center justify-center rounded-full bg-white/85" style={{ color: aisle?.ink }}>
            <MarketIcon name={product.icon} className="size-12" />
          </span>
        </div>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{tx(lang, product.name)}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {tx(lang, product.detail)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-3xl">{money(product.price)}</p>
            <p className="text-sm text-muted-foreground">{tx(lang, product.unit)}</p>
          </div>
          <div className="inline-flex items-center rounded-full border bg-white">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={lang === "es" ? "Menos" : "Less"}
              onClick={() => setQty((value) => Math.max(1, value - 1))}
            >
              <Minus />
            </Button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={lang === "es" ? "Más" : "More"}
              onClick={() => setQty((value) => value + 1)}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <DialogFooter className="border-0 bg-transparent sm:justify-stretch">
          <Button
            type="button"
            className="h-11 w-full rounded-full text-base"
            onClick={() => {
              add(product.id, qty);
              toast.success(
                lang === "es"
                  ? `${qty} × ${tx(lang, product.name)} en la canasta`
                  : `${qty} × ${tx(lang, product.name)} in the basket`
              );
              onOpenChange(false);
              setQty(1);
            }}
          >
            {lang === "es" ? "Agregar" : "Add"} · {money(product.price * qty)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
