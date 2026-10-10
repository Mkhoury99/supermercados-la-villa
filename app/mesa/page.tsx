import type { Metadata } from "next";
import { MesaView } from "@/components/mesa-view";

export const metadata: Metadata = { title: "Meal kits" };

export default function Page() {
  return <MesaView />;
}
