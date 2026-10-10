import type { Metadata } from "next";
import { aisles } from "@/lib/catalog";
import { AisleView } from "@/components/aisle-view";

export function generateStaticParams() {
  return aisles.map((aisle) => ({ aisle: aisle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ aisle: string }>;
}): Promise<Metadata> {
  const { aisle } = await params;
  const match = aisles.find((item) => item.slug === aisle);
  return { title: match?.name.en ?? "Aisle" };
}

export default function Page() {
  return <AisleView />;
}
