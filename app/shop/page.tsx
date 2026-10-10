import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";

export const metadata: Metadata = { title: "Aisles" };

export default function Page() {
  return <ShopView />;
}
