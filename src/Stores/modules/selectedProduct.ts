import { defineStore } from "pinia";
import type { Product } from "../types";

interface SelectedProductState {
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const useSelectedProductStore = defineStore("selectedProduct", {
  state: (): SelectedProductState => ({
    selectedProduct: null,
    loading: false,
    error: null,
  }),

  getters: {
    product: (state) => state.selectedProduct,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
  },

  actions: {
    async fetchSelectedProduct(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const product: Product = await res.json();
        this.selectedProduct = product;
      } catch (error: any) {
        this.error = error.message || "Error fetching product";
      } finally {
        this.loading = false;
      }
    },

    clearProduct() {
      this.selectedProduct = null;
      this.error = null;
    },
  },
});
