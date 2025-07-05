import { mount } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar.vue";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";

vi.mock("@/Stores/modules/search", () => ({
  useSearchStore: vi.fn(),
}));

import { useSearchStore } from "@/Stores/modules/search";

describe("SearchBar.vue", () => {
  let searchStore;

  beforeEach(() => {
    searchStore = {
      searchQuery: "",
      setSearchQuery: vi.fn(),
    };

    useSearchStore.mockReturnValue(searchStore);
  });

  it("renders search icon and input", () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find(".fa-search").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("updates store searchQuery on input", async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const input = wrapper.find("input");
    await input.setValue("Laptop");

    expect(searchStore.setSearchQuery).toHaveBeenCalledWith("Laptop");
  });

  it("toggles mobile search visibility on icon click", async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Force mobile state
    wrapper.vm.isMobile = true;
    await nextTick();

    // Initially hidden
    expect(
      wrapper.find(".search-bar__mobileSearch").element.style.display
    ).toBe("none");

    // Click to show
    await wrapper.find(".fa-search").trigger("click");
    await nextTick();

    // Now visible
    expect(
      wrapper.find(".search-bar__mobileSearch").element.style.display
    ).not.toBe("none");

    // Click again to hide
    await wrapper.find(".fa-search").trigger("click");
    await nextTick();

    // Hidden again
    expect(
      wrapper.find(".search-bar__mobileSearch").element.style.display
    ).toBe("none");
  });
});
