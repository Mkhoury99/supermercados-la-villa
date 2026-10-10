"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFoundView() {
  const { lang } = useLang();
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-heading text-7xl text-villa-red">404</p>
      <h1 className="mt-2 font-heading text-4xl">
        {lang === "es" ? "Este pasillo no está en el mapa." : "This aisle is not on the map."}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {lang === "es" ? "Pinta se comió la página. El pan dulce sigue en su sitio." : "Pinta ate the page. The pan dulce is still where you left it."}
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-6 h-11 rounded-full px-5")}>
        {lang === "es" ? "Volver a la entrada" : "Back to the front door"}
      </Link>
    </div>
  );
}
