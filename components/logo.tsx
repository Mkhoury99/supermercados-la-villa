import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Supermercados La Villa"
      width={549}
      height={198}
      priority={priority}
      className={cn("h-14 w-auto", className)}
    />
  );
}
