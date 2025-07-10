<template>
  <div class="productsList">
    <div class="productsList__wrapper">
      <SortDropdown v-model="selectedSort" class="sortDropdown" />
      <div v-if="loading" class="loading">Loading products...</div>
      <div v-else-if="filteredProducts.length === 0">No products found.</div>
      <div class="products">
        <ProductCards
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="products__card"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useProductStore } from "../Stores/modules/products";
import { useSearchStore } from "../Stores/modules/search";
import ProductCards from "../components/ProductCards.vue";
import SortDropdown from "../components/SortDropdown.vue";
import type { Product } from "../Stores/types";

export default defineComponent({
  name: "ProductList",
  components: {
    ProductCards,
    SortDropdown,
  },
  setup() {
    const productStore = useProductStore();
    const searchStore = useSearchStore();
    const selectedSort = ref("default");
    const products = computed<Product[]>(() => productStore.allProducts || []);
    const loading = computed(() => productStore.isLoading);
    const searchQuery = computed(
      () => searchStore.searchQuery.toLowerCase() || ""
    );

    // Filtering + Sorting
    const filteredProducts = computed<Product[]>(() => {
      let filtered = products.value.filter((product) =>
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

    return {
      selectedSort,
      filteredProducts,
      loading,
    };
  },
});
</script>

<style scoped lang="scss">
.productsList {
  background: linear-gradient(to right, #7f5af0, #2cb67d);
  padding: 2rem 1rem;

  &__wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  }
}

.sortDropdown {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;

  select {
    border-radius: 20px;
    padding: 6px 10px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
    transition: 0.3s ease;

    &:hover {
      border-color: #2cb67d;
    }

    &:focus {
      border-color: #7f5af0;
      box-shadow: 0 0 0 3px rgba(127, 90, 240, 0.2);
    }
  }
}

.products {
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  &__card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }
}

.loading {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin: 2rem 0;
}
</style>
