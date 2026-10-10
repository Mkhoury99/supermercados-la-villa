import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderView } from "@/components/order-view";

export const metadata: Metadata = { title: "Order" };

export default function Page() {
  return (
    <Suspense fallback={<p className="px-4 py-16 text-center">Looking up the order…</p>}>
      <OrderView />
    </Suspense>
  );
}
