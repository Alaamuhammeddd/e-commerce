import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavLinks from "@/components/NavLinks.vue";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: { template: "<div>Home</div>" } },
    {
      path: "/products",
      name: "Products",
      component: { template: "<div>Products</div>" },
    },
    {
      path: "/contact-us",
      name: "Contact",
      component: { template: "<div>Contact</div>" },
    },
  ],
});

describe("NavLinks.vue", () => {
  it("renders navigation links", async () => {
    const wrapper = mount(NavLinks, {
      global: {
        plugins: [router, createTestingPinia()],
      },
      props: {
        isOpen: false,
      },
    });

    await router.isReady();

    expect(wrapper.findAll(".header__nav-item").length).toBe(3);
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("Products");
    expect(wrapper.text()).toContain("Contact");
  });

  it("adds header__nav--open class when isOpen is true", async () => {
    const wrapper = mount(NavLinks, {
      global: {
        plugins: [router],
      },
      props: {
        isOpen: true,
      },
    });

    expect(wrapper.classes()).toContain("header__nav--open");
  });

  it("does not add header__nav--open class when isOpen is false", async () => {
    const wrapper = mount(NavLinks, {
      global: {
        plugins: [router],
      },
      props: {
        isOpen: false,
      },
    });

    expect(wrapper.classes()).not.toContain("header__nav--open");
  });
});
