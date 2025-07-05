import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProductView from "@/components/ViewProduct.vue";

// Mocks
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "1" },
  }),
}));

vi.mock("@/Stores/modules/selectedProduct", () => {
  return {
    useSelectedProductStore: () => ({
      product: {
        id: 1,
        title: "Test Product",
        description: "Test Description",
        price: 29.99,
        category: "electronics",
        image: "test.jpg",
        rating: { rate: 4.5, count: 20 },
      },
      isLoading: false,
      error: null,
      fetchSelectedProduct: vi.fn(),
    }),
  };
});

const addToCartMock = vi.fn();

vi.mock("@/Stores/modules/cart", () => {
  return {
    useCartStore: () => ({
      addToCart: addToCartMock,
    }),
  };
});

describe("ProductView.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProductView);
  });

  it("renders product details correctly", () => {
    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("Test Description");
    expect(wrapper.text()).toContain("$29.99");
    expect(wrapper.findAll("i.fa-star").length).toBeGreaterThan(0);
  });

  it("calls addToCart when button is clicked", async () => {
    global.alert = vi.fn();
    const button = wrapper.find("button.product-view__add-to-cart");
    await button.trigger("click");

    expect(addToCartMock).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith("Added to cart");
  });
});
