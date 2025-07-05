import { shallowMount } from "@vue/test-utils";
import ProductCard from "@/components/ProductCards.vue";

const product = {
  id: 123,
  title: "Test Product",
  category: "Test Category",
  price: 99.99,
  description: "This is a test product.",
  image: "http://example.com/image.jpg",
};

describe("ProductCard.vue", () => {
  it("renders product details", () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("Test Category");
    expect(wrapper.text()).toContain("$99.99");
  });

  it("renders product image with correct src and alt", () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(product.image);
    expect(img.attributes("alt")).toBe(product.title);
  });

  it("links to the correct route", () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const link = wrapper.findComponent({ name: "RouterLink" });
    expect(link.exists()).toBe(true);
    expect(link.props("to")).toEqual({
      name: "ProductView",
      params: { id: product.id },
    });
  });
});
