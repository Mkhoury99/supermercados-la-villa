import type { Metadata } from "next";
import { CocinaView } from "@/components/cocina-view";

export const metadata: Metadata = { title: "La Cocina" };

export default function Page() {
  return <CocinaView />;
}
