<template>
  <div class="cart-panel" :class="{ 'cart-panel--open': isCartOpen }">
    <div class="cart-panel__header">
      <h3 class="cart-panel__title">Your Cart</h3>
      <button class="cart-close" @click="emit('close-cart')">✕</button>
    </div>

    <div class="cart-panel__content">
      <div v-if="cartItems.length === 0">Your Cart is empty</div>
      <div
        v-else
        v-for="item in cartItems"
        :key="item.id"
        class="cart-panel__item"
      >
        <img
          :src="item.image"
          alt="product image"
          class="cart-panel__item-image"
        />
        <div class="cart-panel__item-info">
          <div class="cart-panel__item-top">
            <strong class="cart-panel__item-title">{{ item.title }}</strong>
            <button class="remove-item-btn" @click="removeItem(item.id)">
              ✕ Remove
            </button>
          </div>
          <p class="cart-panel__item-price">${{ item.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <div class="cart-panel__footer">
      <p>Total: ${{ cartTotalPrice.toFixed(2) }}</p>
      <button class="cart-panel__footer--btn">Checkout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCartStore } from "../Stores/modules/cart";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CartPanel",
  props: {
    isCartOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-cart"],
  setup(_, { emit }) {
    const cartStore = useCartStore();
    const { cartItems } = storeToRefs(cartStore);

    // Make cartTotalPrice reactive
    const cartTotalPrice = computed(() => cartStore.cartTotalPrice);

    function removeItem(id: number) {
      cartStore.removeFromCart(id);
    }

    return {
      emit,
      cartItems,
      cartTotalPrice,
      removeItem,
    };
  },
});
</script>

<style scoped lang="scss">
.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 340px;
  background-color: #1e1e2f;
  color: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  display: flex;
  flex-direction: column;

  &.cart-panel--open {
    transform: translateX(0);
  }

  .cart-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background-color: #2a2e3b;
    border-bottom: 1px solid #444;

    .cart-panel__title {
      font-size: 1.4rem;
      font-weight: bold;
    }

    .cart-close {
      background: none;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      color: #ff6b6b;
      transition: color 0.2s ease;

      &:hover {
        color: #ffffff;
      }
    }
  }

  .cart-panel__content {
    padding: 1rem 1.5rem;
    flex-grow: 1;
    overflow-y: auto;
  }

  .cart-panel__item {
    display: flex;
    gap: 12px;
    background-color: #2a2e3b;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #353a4a;
    }

    &-image {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
    }

    &-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .cart-panel__item-title {
        font-size: 0.95rem;
        font-weight: bold;
        margin: 0;
        color: #ffffff;
        max-width: 180px;
        word-break: break-word;
      }

      .remove-item-btn {
        background-color: transparent;
        color: #ff6b6b;
        border: none;
        font-size: 0.8rem;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
          color: white;
        }
      }
    }

    &-price {
      font-size: 0.9rem;
      color: #ccc;
      margin-top: 4px;
    }
  }

  .cart-panel__footer {
    padding: 1rem 1.5rem;
    background-color: #2a2e3b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #444;

    p {
      font-size: 1.1rem;
      font-weight: bold;
      margin: 0;
    }

    &--btn {
      border: 2px solid #00d3a9;
      background: transparent;
      color: #00d3a9;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background-color: #00d3a9;
        color: #1e1e2f;
      }
    }
  }
}
</style>
