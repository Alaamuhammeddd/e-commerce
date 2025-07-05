import { shallowMount } from "@vue/test-utils";
import Header from "@/Shared/Header.vue";

jest.mock("@/components/MobileMenu.vue", () => ({
  name: "MobileMenu",
  template: "<div class='mobile-menu-mock'></div>",
}));

jest.mock("@/components/NavLinks.vue", () => ({
  name: "NavLinks",
  template: "<div class='nav-links-mock'></div>",
}));

jest.mock("@/components/Cart.vue", () => ({
  name: "Cart",
  template: "<div class='cart-mock'></div>",
}));

jest.mock("@/components/SearchBar.vue", () => ({
  name: "SearchBar",
  template: "<div class='search-bar-mock'></div>",
}));

const globalStubs = {
  "router-link": {
    template: "<a><slot /></a>",
  },
};

describe("Header.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        stubs: globalStubs,
      },
    });
  });

  it("renders logo image", () => {
    const logo = wrapper.find("img.header__logo");
    expect(logo.exists()).toBe(true);
    expect(logo.attributes("alt")).toBe("logo");
  });

  it("toggles menu when toggleMenu is called", async () => {
    expect(wrapper.vm.isMenuOpen).toBe(false);
    wrapper.vm.toggleMenu();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isMenuOpen).toBe(true);
  });

  it("toggles cart when toggleCart is called", async () => {
    expect(wrapper.vm.isCartOpen).toBe(false);
    wrapper.vm.toggleCart();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isCartOpen).toBe(true);
  });
});
