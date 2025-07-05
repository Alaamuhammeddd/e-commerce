import { shallowMount } from "@vue/test-utils";
import MobileMenu from "@/components/MobileMenu.vue"; // Adjust the path if needed

describe("MobileMenu.vue", () => {
  it("renders with correct class when isOpen is true", () => {
    const wrapper = shallowMount(MobileMenu, {
      props: {
        isOpen: true,
      },
    });

    const menu = wrapper.find(".mobile-menu");
    expect(menu.classes()).toContain("mobile-menu__hamburger--open");
  });

  it("does not have open class when isOpen is false", () => {
    const wrapper = shallowMount(MobileMenu, {
      props: {
        isOpen: false,
      },
    });

    const menu = wrapper.find(".mobile-menu");
    expect(menu.classes()).not.toContain("mobile-menu__hamburger--open");
  });

  it("emits 'close-menu' when hamburger is clicked", async () => {
    const wrapper = shallowMount(MobileMenu, {
      props: {
        isOpen: true,
      },
    });

    const hamburger = wrapper.find(".mobile-menu__hamburger");
    await hamburger.trigger("click");

    expect(wrapper.emitted("close-menu")).toBeTruthy();
    expect(wrapper.emitted("close-menu").length).toBe(1);
  });
});
