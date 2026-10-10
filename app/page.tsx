import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";

export const metadata: Metadata = {
  title: { absolute: "Supermercados La Villa" },
  description:
    "The Acworth market for pan dulce, the carnicería, La Cocina, and same-day grocery delivery.",
};

export default function Page() {
  return <HomeView />;
}
