import type { Metadata } from "next";
import { OrderView } from "@/components/order-view";

export const metadata: Metadata = { title: "Order" };

export default function Page() {
  return <OrderView />;
}
