import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "@/Stores/modules/cart";
import Cart from "@/components/Cart.vue";
import { ref, computed } from "vue";

vi.mock("@/Stores/modules/cart", () => ({
  useCartStore: vi.fn(),
}));

describe("Cart.vue", () => {
  let mockStore;
  let cartItemsRef;

  beforeEach(() => {
    // Activate Pinia
    setActivePinia(createPinia());

    // Setup mock store with reactive refs
    cartItemsRef = ref([]);

    mockStore = {
      cartItems: cartItemsRef,
      cartTotalPrice: computed(() =>
        cartItemsRef.value.reduce((acc, item) => acc + item.price, 0)
      ),
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
    cartItemsRef.value = [{ id: 1, title: "Product A", price: 10 }];

    const wrapper = shallowMount(Cart, {
      props: { isCartOpen: true },
    });

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
  });
});
