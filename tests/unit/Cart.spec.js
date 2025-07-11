import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "@/Stores/modules/cart";
import Cart from "@/components/Cart.vue";
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";

vi.mock("@/Stores/modules/cart", () => ({
  useCartStore: vi.fn(),
}));
vi.mock("vue3-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));
describe("Cart.vue", () => {
  let mockStore;
  let cartItemsRef;

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());

    cartItemsRef = ref([]);

    mockStore = {
      cartItems: cartItemsRef,
      get cartTotalPrice() {
        return cartItemsRef.value.reduce((acc, item) => acc + item.price, 0);
      },
      removeFromCart: vi.fn(),
    };

    useCartStore.mockReturnValue(mockStore);
  });

  it('shows "Your Cart is empty" when cart is empty', () => {
    const wrapper = shallowMount(Cart, {
      props: { isCartOpen: true },
    });

    expect(wrapper.text()).toContain("Your Cart is empty");
  });

  it("displays cart items when present", () => {
    cartItemsRef.value = [
      {
        id: 1,
        title: "Product A",
        image: "https://example.com/product-a.jpg",
        price: 10,
      },
    ];

    const wrapper = shallowMount(Cart, {
      props: { isCartOpen: true },
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/product-a.jpg");
    expect(img.attributes("alt")).toBe("Product A");
    expect(wrapper.text()).toContain("Product A");
    expect(wrapper.text()).toContain("$10.00");
  });

  it("emits close-cart event on close button click", async () => {
    const wrapper = shallowMount(Cart, {
      props: { isCartOpen: true },
    });

    await wrapper.find(".cart-close").trigger("click");
    expect(wrapper.emitted("close-cart")).toBeTruthy();
  });

  it("calls removeFromCart when remove button is clicked", async () => {
    cartItemsRef.value = [{ id: 2, title: "Product B", price: 20 }];

    const wrapper = shallowMount(Cart, {
      props: { isCartOpen: true },
    });

    await wrapper.find(".remove-item-btn").trigger("click");
    expect(mockStore.removeFromCart).toHaveBeenCalledWith(2);
    expect(toast.error).toHaveBeenCalledWith("Item removed from cart");
  });
});
