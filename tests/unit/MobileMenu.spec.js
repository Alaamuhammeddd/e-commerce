import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MobileMenu from "@/components/MobileMenu.vue";

describe("MobileMenu.vue", () => {
  it("adds open class when isOpen is true", () => {
    const wrapper = mount(MobileMenu, {
      props: {
        isOpen: true,
      },
    });

    expect(wrapper.classes()).toContain("mobile-menu__hamburger--open");
  });

  it("does not add open class when isOpen is false", () => {
    const wrapper = mount(MobileMenu, {
      props: {
        isOpen: false,
      },
    });

    expect(wrapper.classes()).not.toContain("mobile-menu__hamburger--open");
  });

  it("emits close-menu when hamburger is clicked", async () => {
    const wrapper = mount(MobileMenu, {
      props: {
        isOpen: true,
      },
    });

    await wrapper.find(".mobile-menu__hamburger").trigger("click");
    expect(wrapper.emitted("close-menu")).toBeTruthy();
    expect(wrapper.emitted("close-menu").length).toBe(1);
  });
});
