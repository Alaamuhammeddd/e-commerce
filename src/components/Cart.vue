<template>
  <div class="cart-panel" :class="{ 'cart-panel--open': isCartOpen }">
    <div class="cart-panel__header">
      <h3 class="cart-panel__title">Your Cart</h3>
      <button class="cart-close" @click="$emit('close-cart')">✕</button>
    </div>

    <div class="cart-panel__content">
      <div v-if="cartItems.length === 0">Your Cart is empty</div>
      <div
        v-else
        v-for="item in cartItems"
        :key="item.id"
        class="cart-panel__item"
      >
        <div class="cart-panel__item-info">
          <div class="cart-panel__item-header">
            <p>
              <strong>{{ item.title }}</strong>
            </p>
            <p>${{ item.price.toFixed(2) }}</p>
            <button class="remove-item-btn" @click="removeItem(item.id)">
              ✕ Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-panel__footer">
      <p>Total: ${{ cartTotalPrice.toFixed(2) }}</p>
      <button class="cart-panel__footer--btn">Checkout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../Stores/modules/cart";

const props = defineProps({
  isCartOpen: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits(["close-cart"]);

const cartStore = useCartStore();

const { cartItems, cartTotalPrice } = storeToRefs(cartStore);

function removeItem(id: number) {
  cartStore.removeFromCart(id);
}
</script>

<style scoped lang="scss">
.remove-item-btn {
  background-color: whitesmoke;
  padding: 5px;
  border-radius: 5px;
  margin-block-start: 5px;
  border: 2px solid #1e077d;
  color: #c9302c;
  &:hover {
    background-color: #1e077d;
    color: white;
    transition: 0.2s ease;
  }
}
.cart-holder {
  display: flex;
  font-size: 23px;
}
.cart-panel__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px;
  &--btn {
    border: 2px solid #1e077d;
    padding: 5px;
    border-radius: 5px;
    &:hover {
      color: whitesmoke;
      background-color: #1e077d;
      transition: 0.3s ease;
    }
  }
}

.cart__btn--cart {
  background: none;
  border: none;
  font-size: 16px;
  display: flex;

  &:hover {
    cursor: pointer;
    color: grey;
  }
}

.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #414756;
  color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
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
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    background-color: #414756;
  }

  .cart-panel__title {
    font-size: 1.2rem;
  }

  .cart-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: white;
  }

  .cart-panel__content {
    padding: 1rem;
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
