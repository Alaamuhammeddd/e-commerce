import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "@/Shared/Header.vue";

// Mock child components used in Header.vue
vi.mock("@/components/MobileMenu.vue", () => ({
  default: {
    name: "MobileMenu",
    props: ["isOpen"],
    emits: ["close-menu"],
    template: "<div class='mock-mobile-menu'></div>",
  },
}));

vi.mock("@/components/NavLinks.vue", () => ({
  default: {
    name: "NavLinks",
    props: ["isOpen"],
    template: "<nav class='mock-nav-links'></nav>",
  },
}));

vi.mock("@/components/Cart.vue", () => ({
  default: {
    name: "Cart",
    props: ["isCartOpen"],
    emits: ["close-cart"],
    template: "<div class='mock-cart'></div>",
  },
}));

vi.mock("@/components/SearchBar.vue", () => ({
  default: {
    name: "SearchBar",
    template: "<div class='mock-search-bar'></div>",
  },
}));

describe("Header.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header, {
      global: {
        stubs: {
          "router-link": {
            template: "<a><slot /></a>",
          },
        },
      },
    });
  });

  it("renders logo image", () => {
    const logo = wrapper.find("img.header__logo");
    expect(logo.exists()).toBe(true);
    expect(logo.attributes("alt")).toBe("logo");
  });

  it("opens cart on button click", async () => {
    const cartBtn = wrapper.find("button.cart__btn--cart");
    await cartBtn.trigger("click");
    expect(wrapper.vm.isCartOpen).toBe(true);
  });
  it("closes cart when Cart emits 'close-cart'", async () => {
    wrapper.vm.isCartOpen = true;

    await wrapper.vm.$nextTick();

    const cartComponent = wrapper.findComponent({ name: "Cart" });

    await cartComponent.vm.$emit("close-cart");

    expect(wrapper.vm.isCartOpen).toBe(false);
  });
  it("closes mobile menu when MobileMenu emits close-menu", async () => {
    wrapper.vm.isMenuOpen = true;
    await wrapper.findComponent({ name: "MobileMenu" }).vm.$emit("close-menu");
    expect(wrapper.vm.isMenuOpen).toBe(false);
  });

  it("renders all subcomponents", () => {
    expect(wrapper.find(".mock-mobile-menu").exists()).toBe(true);
    expect(wrapper.find(".mock-nav-links").exists()).toBe(true);
    expect(wrapper.find(".mock-search-bar").exists()).toBe(true);
    expect(wrapper.find(".mock-cart").exists()).toBe(true);
  });
});
