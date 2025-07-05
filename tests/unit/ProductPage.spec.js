import { shallowMount } from "@vue/test-utils";
import ProductsPage from "@/components/Products.vue";
import { createStore } from "vuex";

const mockProducts = [
  { id: 1, title: "Apple", price: 2 },
  { id: 2, title: "Banana", price: 1 },
];

const createMockStore = ({ isLoading = false, searchQuery = "" } = {}) => {
  return createStore({
    modules: {
      product: {
        namespaced: true,
        getters: {
          allProducts: () => mockProducts,
          isLoading: () => isLoading,
        },
        actions: {
          fetchProducts: () => {},
        },
      },
      search: {
        namespaced: true,
        getters: {
          searchQuery: () => searchQuery,
        },
      },
    },
  });
};

describe("ProductsPage.vue", () => {
  it("displays loading message when loading is true", () => {
    const store = createMockStore({ isLoading: true });
    const wrapper = shallowMount(ProductsPage, {
      global: { plugins: [store] },
    });

    expect(wrapper.text()).toContain("Loading products...");
  });

  it('shows "No products found." when filtered list is empty', () => {
    const store = createMockStore({ searchQuery: "xyz" }); 
    const wrapper = shallowMount(ProductsPage, {
      global: { plugins: [store] },
    });

    expect(wrapper.text()).toContain("No products found.");
  });

  it("renders ProductCards for each filtered product", () => {
    const store = createMockStore();
    const wrapper = shallowMount(ProductsPage, {
      global: { plugins: [store] },
    });

    const cards = wrapper.findAllComponents({ name: "ProductCards" });
    expect(cards.length).toBe(mockProducts.length);
  });

  it("sorts products from low to high when selectedSort is set", async () => {
    const store = createMockStore();
    const wrapper = shallowMount(ProductsPage, {
      global: { plugins: [store] },
    });

    await wrapper.setData({ selectedSort: "lowToHigh" });

    const sorted = wrapper.vm.filteredProducts.map((p) => p.title);
    expect(sorted).toEqual(["Banana", "Apple"]);
  });

  it("sorts products from high to low when selectedSort is set", async () => {
    const store = createMockStore();
    const wrapper = shallowMount(ProductsPage, {
      global: { plugins: [store] },
    });

    await wrapper.setData({ selectedSort: "highToLow" });

    const sorted = wrapper.vm.filteredProducts.map((p) => p.title);
    expect(sorted).toEqual(["Apple", "Banana"]);
  });
});
