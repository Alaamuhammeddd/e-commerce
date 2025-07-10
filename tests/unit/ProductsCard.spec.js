import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "@/components/ProductCards.vue";
import { createRouter, createWebHistory } from "vue-router";

const mockProduct = {
  id: 1,
  title: "Test Product",
  category: "Test Category",
  price: 19.99,
  description: "This is a test description.",
  image: "https://example.com/image.jpg",
};

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/product/:id", name: "ProductView", component: {} }],
});

describe("ProductCard.vue", () => {
  it("renders product details correctly", async () => {
    const wrapper = mount(ProductCard, {
      global: {
        plugins: [router],
      },
      props: {
        product: mockProduct,
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("Test Category");
    expect(wrapper.text()).toContain("$19.99");

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(mockProduct.image);
    expect(img.attributes("alt")).toBe(mockProduct.title);

    const routerLink = wrapper.findComponent({ name: "RouterLink" });
    expect(routerLink.props("to")).toEqual({
      name: "ProductView",
      params: { id: mockProduct.id },
    });
  });
});
