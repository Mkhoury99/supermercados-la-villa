export type SavedOrder = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  fulfillment: "delivery" | "pickup";
  address: string;
  zip: string;
  zoneName: string;
  fee: number;
  slotLabel: string;
  storeName: string;
  notes: string;
  items: { id: string; name: string; qty: number; price: number }[];
  subtotal: number;
  total: number;
};

const KEY = "lavilla-orders";

export function createOrderId() {
  const stamp = Date.now().toString().slice(-4);
  return `VILLA-${stamp}`;
}

function readAll(): Record<string, SavedOrder> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, SavedOrder>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveOrder(order: SavedOrder) {
  const all = readAll();
  all[order.id] = order;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function loadOrder(id: string) {
  return readAll()[id] ?? null;
}
