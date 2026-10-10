import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = { title: "Basket" };

export default function Page() {
  return <CartView />;
}
