import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProductView from "@/views/ViewProduct.vue";
import { toast } from "vue3-toastify";
import { useCartStore } from "@/Stores/modules/cart"; //

// Mocks
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { id: "1" },
  }),
}));
vi.mock("vue3-toastify", () => ({
  toast: {
    success: vi.fn(),
    warning: vi.fn(),
  },
}));

const addToCartMock = vi.fn();

vi.mock("@/Stores/modules/cart", () => ({
  useCartStore: vi.fn(() => ({
    cartItems: [],
    addToCart: addToCartMock,
  })),
}));

vi.mock("@/Stores/modules/selectedProduct", () => ({
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
}));

describe("ProductView.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProductView);
    addToCartMock.mockClear();
    toast.success.mockClear();
    toast.warning.mockClear();
  });

  it("renders product details correctly", () => {
    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("Test Description");
    expect(wrapper.text()).toContain("$29.99");
    expect(wrapper.findAll("i.fa-star").length).toBeGreaterThan(0);
  });

  it("adds product to cart if not already in cart", async () => {
    // ✅ Update mocked return
    useCartStore.mockReturnValue({
      cartItems: [],
      addToCart: addToCartMock,
    });

    wrapper = mount(ProductView);
    await wrapper.find("button.product-view__add-to-cart").trigger("click");

    expect(addToCartMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Added to cart!");
  });

  it("warns if product is already in cart", async () => {
    // ✅ Update mocked return
    useCartStore.mockReturnValue({
      cartItems: [{ id: 1 }],
      addToCart: addToCartMock,
    });

    wrapper = mount(ProductView);
    await wrapper.find("button.product-view__add-to-cart").trigger("click");

    expect(addToCartMock).not.toHaveBeenCalled();
    expect(toast.warning).toHaveBeenCalledWith("Product already in cart!");
  });
});
