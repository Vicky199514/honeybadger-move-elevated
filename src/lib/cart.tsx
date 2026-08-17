import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { COD_FEE, type PaymentMethod } from "@/data/products";

export type CartItem = {
  key: string;
  productSlug: string;
  productName: string;
  packId: string;
  packLabel: string;
  colours: string[];
  size: string;
  /** Price of one pack (not per pant). */
  unitPrice: number;
  /** Pants per pack — used for messaging only. */
  piecesPerPack: number;
  quantity: number;
};

export type NewCartItem = Omit<CartItem, "key">;

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  payment: PaymentMethod;
  setPayment: (method: PaymentMethod) => void;
  total: number;
  add: (item: NewCartItem) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hb-cart-v1";

function itemKey(item: NewCartItem) {
  return [item.productSlug, item.packId, item.size, item.colours.join("|")].join("::");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>("prepaid");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items?: CartItem[]; payment?: PaymentMethod };
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.payment === "cod" || parsed.payment === "prepaid") setPayment(parsed.payment);
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, payment }));
    } catch {
      /* storage unavailable */
    }
  }, [items, payment, ready]);

  const add = useCallback((item: NewCartItem) => {
    const key = itemKey(item);
    setItems((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, 99) }
            : entry,
        );
      }
      return [...current, { ...item, key }];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((entry) => entry.key !== key)
        : current.map((entry) =>
            entry.key === key ? { ...entry, quantity: Math.min(quantity, 99) } : entry,
          ),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((current) => current.filter((entry) => entry.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      payment,
      setPayment,
      total: subtotal + (payment === "cod" && items.length ? COD_FEE : 0),
      add,
      setQuantity,
      remove,
      clear,
      ready,
    };
  }, [items, payment, add, setQuantity, remove, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
