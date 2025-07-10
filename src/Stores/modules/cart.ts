import { defineStore } from "pinia";
import type { CartItem } from "../types";

const CART_KEY = "my-app-cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    CartItems: JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[],
  }),

  getters: {
    cartItems: (state) => state.CartItems,
    cartTotalPrice: (state) =>
      state.CartItems.reduce((total, CartItems) => total + CartItems.price, 0),
  },

  actions: {
    addToCart(product: CartItem) {
      const existing = this.CartItems.find(
        (CartItems) => CartItems.id === product.id
      );

      if (!existing) {
        this.CartItems.push({ ...product });
      }

      localStorage.setItem(CART_KEY, JSON.stringify(this.CartItems));
    },

    removeFromCart(id: number) {
      this.CartItems = this.CartItems.filter(
        (CartItems) => CartItems.id !== id
      );
      localStorage.setItem(CART_KEY, JSON.stringify(this.CartItems));
    },
  },
});
