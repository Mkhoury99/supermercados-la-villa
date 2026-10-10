import {
  Apple,
  Banana,
  Bean,
  Beef,
  Cake,
  Candy,
  Carrot,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  Croissant,
  CupSoda,
  Drumstick,
  Flame,
  Grape,
  Ham,
  Leaf,
  Milk,
  Nut,
  Pizza,
  Popcorn,
  Salad,
  Sandwich,
  Soup,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  GlassWater,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/catalog";

const icons: Record<IconName, LucideIcon> = {
  apple: Apple,
  banana: Banana,
  bean: Bean,
  beef: Beef,
  cake: Cake,
  candy: Candy,
  carrot: Carrot,
  cherry: Cherry,
  citrus: Citrus,
  coffee: Coffee,
  cookie: Cookie,
  croissant: Croissant,
  cup: CupSoda,
  drumstick: Drumstick,
  flame: Flame,
  grape: Grape,
  ham: Ham,
  leaf: Leaf,
  milk: Milk,
  nut: Nut,
  pizza: Pizza,
  popcorn: Popcorn,
  salad: Salad,
  sandwich: Sandwich,
  soup: Soup,
  sparkles: Sparkles,
  spray: SprayCan,
  utensils: UtensilsCrossed,
  water: GlassWater,
  wheat: Wheat,
};

export function MarketIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
