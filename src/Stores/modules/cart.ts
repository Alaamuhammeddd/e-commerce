import { defineStore } from "pinia";
import type { CartItem } from "../types";

const CART_KEY = "my-app-cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[],
  }),

  getters: {
    cartItems: (state) => state.items,
    cartTotalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price, 0),
  },

  actions: {
    addToCart(product: CartItem) {
      const existing = this.items.find((item) => item.id === product.id);

      if (!existing) {
        this.items.push({ ...product });
      }

      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    },
  },
});
