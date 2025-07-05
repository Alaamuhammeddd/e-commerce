import { shallowMount } from "@vue/test-utils";
import NavLinks from "@/components/NavLinks.vue";

describe("NavLinks.vue", () => {
  const globalStubs = {
    "router-link": {
      template: "<a><slot /></a>",
    },
  };

  it("renders all navigation links", () => {
    const wrapper = shallowMount(NavLinks, {
      global: {
        stubs: globalStubs,
      },
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBe(3);
    expect(links[0].text()).toBe("Home");
    expect(links[1].text()).toBe("Products");
    expect(links[2].text()).toBe("Contact");
  });

  it("applies 'header__nav--open' class when isOpen is true", () => {
    const wrapper = shallowMount(NavLinks, {
      props: {
        isOpen: true,
      },
      global: {
        stubs: globalStubs,
      },
    });

    expect(wrapper.find("ul").classes()).toContain("header__nav--open");
  });

  it("does not apply 'header__nav--open' class when isOpen is false", () => {
    const wrapper = shallowMount(NavLinks, {
      props: {
        isOpen: false,
      },
      global: {
        stubs: globalStubs,
      },
    });

    expect(wrapper.find("ul").classes()).not.toContain("header__nav--open");
  });
});
