import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";

export const metadata: Metadata = { title: "Our market" };

export default function Page() {
  return <AboutView />;
}
