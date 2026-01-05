import { create } from "zustand";
import { Product } from "@/types/products";
import { getProducts } from "@/services/productService";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  search: string;
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  setSearch: (value: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  search: "",
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getProducts();
      set({
        products: data,
        filteredProducts: data,
        loading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error fetching products",
        loading: false,
      });
    }
  },

  setSearch: (value: string) => {
    const { products } = get();

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );

    set({
      search: value,
      filteredProducts: filtered,
    });
  },
}));
