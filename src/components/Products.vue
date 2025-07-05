<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../Stores/modules/products";
import { useSearchStore } from "../Stores/modules/search"; // <-- if you migrated it
import ProductCards from "./ProductCards.vue";
import SortDropdown from "./SortDropdown.vue";
import type { Product } from "../Stores/types";

// Stores
const productStore = useProductStore();
const searchStore = useSearchStore(); // if using Pinia search module

// Local state
const selectedSort = ref("default");

// Computed properties
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.isLoading);
const searchQuery = computed(() => searchStore.searchQuery.toLowerCase());

const filteredProducts = computed(() => {
  let filtered = products.value.filter((product: Product) =>
    product.title.toLowerCase().includes(searchQuery.value)
  );

  if (selectedSort.value === "lowToHigh") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === "highToLow") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
});

// Fetch products on mount
onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div class="productsList">
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="filteredProducts.length === 0">No products found.</div>
    <div class="products">
      <!-- Sort Dropdown -->
      <SortDropdown v-model="selectedSort" />

      <!-- Product Cards -->
      <ProductCards
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        class="products__card"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sortDropdown {
  margin-bottom: 1rem;

  select {
    padding: 5px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}

@media (max-width: 1023px) {
  .products {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-inline: auto;
    padding: 10px;
    max-width: fit-content;

    &__card {
      transition: transform 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
