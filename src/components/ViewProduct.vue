<template>
  <div v-if="isLoading" class="product-view__loading">Loading product...</div>

  <div v-else-if="product" class="product-view">
    <div class="product-view__image-container">
      <img
        :src="product.image"
        :alt="product.title"
        class="product-view__image"
      />
    </div>

    <div class="product-view__details">
      <h2 class="product-view__title">{{ product.title }}</h2>
      <p class="product-view__description">{{ product.description }}</p>
      <p class="product-view__category">{{ product.category }}</p>
      <p class="product-view__price">${{ product.price }}</p>

      <p class="product-view__rating">
        <span v-for="n in 5" :key="n">
          <i
            class="fa"
            :class="{
              'fa-star': n <= Math.floor(product.rating.rate),
              'fa-star-half-o':
                n === Math.ceil(product.rating.rate) &&
                !Number.isInteger(product.rating.rate),
              'fa-star-o': n > product.rating.rate,
            }"
          ></i>
        </span>
        ({{ product.rating.rate }})
      </p>

      <p class="product-view__stock">
        {{ product.rating.count }} left in stock
      </p>

      <div class="product-view__actions">
        <button class="product-view__add-to-cart" @click="addToCart">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  </div>

  <div v-else class="product-view__error">
    {{ error || "Product not found." }}
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSelectedProductStore } from "../Stores/modules/selectedProduct";

import { useCartStore } from "../Stores/modules/cart";

const route = useRoute();
const selectedProductStore = useSelectedProductStore();
const cartStore = useCartStore();

const product = computed(() => selectedProductStore.product);
const isLoading = computed(() => selectedProductStore.isLoading);
const error = computed(() => selectedProductStore.error);

function addToCart() {
  if (product.value) {
    cartStore.addToCart({
      ...product.value,
      quantity: 1, // Default quantity is 1
    });
    alert("Added to cart");
  }
}

onMounted(() => {
  const id = Number(route.params.id);
  selectedProductStore.fetchSelectedProduct(id);
});
</script>

<style scoped lang="scss">
.product-view {
  display: flex;
  height: 100vh;
  padding: 1rem;
  &__loading,
  &__error {
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
    margin-top: 2rem;
    color: red;
  }

  &__image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 100%;
    overflow: hidden;
  }

  &__image {
    max-height: 100vh;
    max-width: 100%;
    object-fit: contain;
    display: block;
  }

  &__details {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &__category {
    color: #888;
    text-transform: uppercase;
  }
  &__stock,
  &__price {
    font-weight: bold;
  }
  &__description,
  &__category,
  &__price,
  &__stock {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 0.5rem;

    i {
      color: gold;
      font-size: 1.2rem;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
  }

  &__add-to-cart {
    padding: 10px 20px;
    background-color: none;
    color: #1e077d;
    font-size: 14px;
    border: 2px solid #1e077d;
    border-radius: 4px;
    cursor: pointer;
    align-self: start;

    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #1e077d;
      color: white;
      transition: 0.3s ease;
    }
  }
}
</style>
