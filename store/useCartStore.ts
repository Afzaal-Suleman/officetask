import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
};

const localStoragePersist: PersistOptions<CartStore, CartStore>["storage"] = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? Promise.resolve(JSON.parse(value)) : Promise.resolve(null);
  },
  setItem: (name, value) => {
    return Promise.resolve(localStorage.setItem(name, JSON.stringify(value)));
  },
  removeItem: (name) => {
    return Promise.resolve(localStorage.removeItem(name));
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existing = get().items.find((item) => item.id === product.id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },

      increase: (id) =>
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        }),

      remove: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),
    }),
    {
      name: "cart-storage",
      storage: localStoragePersist,
    }
  )
);
