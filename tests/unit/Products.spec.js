// tests/unit/Products.spec.js
import { shallowMount, flushPromises } from "@vue/test-utils";
import Products from "@/components/Products.vue";
import { createTestingPinia } from "@pinia/testing";

vi.mock("@/Stores/modules/products", () => ({
  useProductStore: vi.fn(),
}));

vi.mock("@/Stores/modules/search", () => ({
  useSearchStore: vi.fn(),
}));

import { useProductStore } from "@/Stores/modules/products";
import { useSearchStore } from "@/Stores/modules/search";

describe("Products.vue", () => {
  let productStore;
  let searchStore;

  const mockProducts = [
    { id: 1, title: "Alpha", price: 100 },
    { id: 2, title: "Beta", price: 200 },
  ];

  beforeEach(() => {
    productStore = {
      fetchProducts: vi.fn(),
      allProducts: mockProducts,
      isLoading: false,
    };

    searchStore = {
      searchQuery: "",
    };

    useProductStore.mockReturnValue(productStore);
    useSearchStore.mockReturnValue(searchStore);
  });

  it("calls fetchProducts on mount", () => {
    shallowMount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ["router-link", "ProductCards", "SortDropdown"],
      },
    });
    expect(productStore.fetchProducts).toHaveBeenCalled();
  });

  it("displays loading text when loading is true", () => {
    productStore.isLoading = true;

    const wrapper = shallowMount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ["router-link", "ProductCards", "SortDropdown"],
      },
    });

    expect(wrapper.text()).toContain("Loading products...");
  });

  it("renders product cards when not loading", async () => {
    const wrapper = shallowMount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          ProductCards: {
            template: "<div class='product-card'></div>",
          },
          "router-link": true,
          SortDropdown: true,
        },
      },
    });

    await flushPromises();
    const cards = wrapper.findAll(".product-card");
    expect(cards.length).toBe(mockProducts.length);
  });

  it("filters products based on search query", async () => {
    searchStore.searchQuery = "alpha"; // ✅ lowercase for match
    const wrapper = shallowMount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          ProductCards: {
            template: "<div>{{ product.title }}</div>",
            props: ["product"],
          },
          "router-link": true,
          SortDropdown: true,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Alpha");
    expect(wrapper.text()).not.toContain("Beta");
  });

  it("displays 'No products found.' if filter is empty", async () => {
    searchStore.searchQuery = "zzz";
    const wrapper = shallowMount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ["router-link", "ProductCards", "SortDropdown"],
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("No products found.");
  });
});
