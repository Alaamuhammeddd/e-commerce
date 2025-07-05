import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Cart from "@/components/Cart.vue";

describe("Cart.vue", () => {
  let actions;
  let getters;
  let store;
  let wrapper;

  const cartItems = [
    { id: 1, title: "Product A", price: 10.99 },
    { id: 2, title: "Product B", price: 5.5 },
  ];

  const createWrapper = (isCartOpen = false, items = cartItems) => {
    actions = {
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    };

    getters = {
      cartItems: () => items,
      cartTotalPrice: () => items.reduce((acc, item) => acc + item.price, 0),
    };

    store = createStore({
      modules: {
        cart: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });

    return shallowMount(Cart, {
      props: { isCartOpen },
      global: {
        plugins: [store],
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper(true);
  });

  it("renders cart items", () => {
    const itemElements = wrapper.findAll(".cart-panel__item");
    expect(itemElements.length).toBe(2);
    expect(wrapper.text()).toContain("Product A");
    expect(wrapper.text()).toContain("Product B");
  });

  it("displays empty message when cart is empty", () => {
    wrapper = createWrapper(true, []);
    expect(wrapper.text()).toContain("Your Cart is empty");
  });

  it("calls removeFromCart when remove button is clicked", async () => {
    const removeButton = wrapper.find(".remove-item-btn");
    await removeButton.trigger("click");

    expect(actions.removeFromCart).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it("emits close-cart when close button is clicked", async () => {
    const closeButton = wrapper.find(".cart-close");
    await closeButton.trigger("click");

    expect(wrapper.emitted("close-cart")).toBeTruthy();
  });

  it("applies cart-panel--open class when isCartOpen is true", () => {
    const panel = wrapper.find(".cart-panel");
    expect(panel.classes()).toContain("cart-panel--open");
  });

  it("does not apply cart-panel--open class when isCartOpen is false", () => {
    wrapper = createWrapper(false);
    const panel = wrapper.find(".cart-panel");
    expect(panel.classes()).not.toContain("cart-panel--open");
  });
});
