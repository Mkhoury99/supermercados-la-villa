import type { Metadata } from "next";
import { StoresView } from "@/components/stores-view";

export const metadata: Metadata = { title: "Stores" };

export default function Page() {
  return <StoresView />;
}
