import { create } from "zustand";
import { Product } from "@/types/products";
import { getProducts } from "@/services/productService";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getProducts();
      set({ products: data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Something went wrong",
        loading: false,
      });
    }
  },
}));
