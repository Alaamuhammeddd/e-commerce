<template>
  <div v-if="isLoading" class="product-view__loading">Loading product...</div>

  <div v-else-if="product" class="product-view">
    <div class="product-view__card">
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
        <p class="product-view__price">${{ product.price.toFixed(2) }}</p>

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
  </div>

  <div v-else class="product-view__error">
    {{ error || "Product not found." }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSelectedProductStore } from "../Stores/modules/selectedProduct";
import { useCartStore } from "../Stores/modules/cart";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "ProductView",
  setup() {
    const route = useRoute();
    const selectedProductStore = useSelectedProductStore();
    const cartStore = useCartStore();
    const product = computed(() => selectedProductStore.product);
    const isLoading = computed(() => selectedProductStore.isLoading);
    const error = computed(() => selectedProductStore.error);

    function addToCart() {
      if (product.value) {
        const alreadyInCart = cartStore.cartItems.some(
          (item) => item.id === product.value!.id
        );

        if (alreadyInCart) {
          toast.warning("Product already in cart!");
        } else {
          cartStore.addToCart({ ...product.value });
          toast.success("Added to cart!");
        }
      }
    }

    onMounted(() => {
      const id = Number(route.params.id);
      selectedProductStore.fetchSelectedProduct(id);
    });

    return {
      product,
      isLoading,
      error,
      addToCart,
    };
  },
});
</script>

<style scoped lang="scss">
.product-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #7f5af0, #2cb67d);

  &__loading,
  &__error {
    font-size: 1.2rem;
    color: white;
    text-align: center;
    margin-top: 2rem;
  }

  &__card {
    background-color: #ffffff;
    border-radius: 16px;
    max-width: 1200px;
    width: 100%;
    display: flex;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    margin: 2rem;
  }

  &__image-container {
    width: 50%;
    min-height: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  &__image {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 12px;
  }

  &__details {
    width: 50%;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1e077d;
  }

  &__description {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  &__category {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #1e077d;
    margin-bottom: 0.5rem;
  }

  &__price {
    font-size: 1.3rem;
    font-weight: bold;
    color: #2cb67d;
    margin-bottom: 0.5rem;
  }

  &__stock {
    font-size: 0.95rem;
    color: #888;
    margin-bottom: 1rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 1rem;

    i {
      color: gold;
      font-size: 1.2rem;
    }
  }

  &__actions {
    margin-top: 1.5rem;
  }

  &__add-to-cart {
    padding: 12px 24px;
    background-color: transparent;
    color: #1e077d;
    font-size: 1rem;
    font-weight: 500;
    border: 2px solid #1e077d;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      background-color: #1e077d;
      color: white;
      box-shadow: 0 4px 20px rgba(30, 7, 125, 0.3);
    }
  }

  @media (max-width: 768px) {
    &__card {
      flex-direction: column;
    }

    &__image-container,
    &__details {
      width: 100%;
    }

    &__image {
      max-height: 300px;
    }

    &__details {
      padding: 1.5rem;
    }
  }
}
</style>
