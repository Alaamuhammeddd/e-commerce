import { shallowMount } from "@vue/test-utils";
import ViewProduct from "@/components/ViewProduct.vue";
import { createStore } from "vuex";
import { useRoute } from "vue-router";

// Mocks
jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

describe("ViewProduct.vue", () => {
  let store;
  const fetchSelectedProduct = jest.fn();
  const addToCart = jest.fn();
  const RESET = jest.fn();

  beforeEach(() => {
    useRoute.mockReturnValue({ params: { id: "123" } });

    store = createStore({
      modules: {
        selectedProduct: {
          namespaced: true,
          getters: {
            product: () => ({
              id: 1,
              title: "Test Product",
              description: "A great product.",
              category: "electronics",
              price: 99.99,
              image: "test.jpg",
              rating: {
                rate: 4.5,
                count: 10,
              },
            }),
            isLoading: () => false,
            error: () => null,
          },
          actions: {
            fetchSelectedProduct,
          },
        },
        quantity: {
          namespaced: true,
          getters: {
            count: () => 2,
          },
          mutations: {
            RESET,
          },
        },
        cart: {
          namespaced: true,
          actions: {
            addToCart,
          },
        },
      },
    });
  });

  it("dispatches fetchSelectedProduct and RESET on mount", () => {
    shallowMount(ViewProduct, {
      global: {
        plugins: [store],
      },
    });

    expect(fetchSelectedProduct).toHaveBeenCalledWith(expect.anything(), 123);
    expect(RESET).toHaveBeenCalled();
  });

  it("renders product title and price", () => {
    const wrapper = shallowMount(ViewProduct, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("$99.99");
  });

  it("calls addToCart and RESET when button is clicked", async () => {
    const wrapper = shallowMount(ViewProduct, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find(".product-view__add-to-cart").trigger("click");

    expect(addToCart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        title: "Test Product",
        quantity: 2,
      })
    );

    expect(RESET).toHaveBeenCalled();
  });
});
