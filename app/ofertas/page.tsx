import type { Metadata } from "next";
import { OfertasView } from "@/components/ofertas-view";

export const metadata: Metadata = { title: "Specials" };

export default function Page() {
  return <OfertasView />;
}
