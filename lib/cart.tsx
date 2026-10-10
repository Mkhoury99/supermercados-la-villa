"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productById } from "@/lib/catalog";

export type CartLine = { id: string; qty: number };

type CartValue = {
  ready: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "lavilla-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartLine[];
          if (Array.isArray(parsed)) {
            setLines(
              parsed.filter(
                (line) =>
                  line &&
                  typeof line.id === "string" &&
                  typeof line.qty === "number" &&
                  line.qty > 0 &&
                  productById(line.id)
              )
            );
          }
        }
      } catch {
        localStorage.removeItem(KEY);
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => {
      const product = productById(line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
    return {
      ready,
      lines,
      count,
      subtotal,
      add: (id, qty = 1) => {
        setLines((current) => {
          const existing = current.find((line) => line.id === id);
          if (!existing) return [...current, { id, qty }];
          return current.map((line) =>
            line.id === id ? { ...line, qty: line.qty + qty } : line
          );
        });
      },
      setQty: (id, qty) => {
        setLines((current) => {
          if (qty <= 0) return current.filter((line) => line.id !== id);
          return current.map((line) => (line.id === id ? { ...line, qty } : line));
        });
      },
      remove: (id) => setLines((current) => current.filter((line) => line.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
