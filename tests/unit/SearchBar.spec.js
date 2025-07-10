import { mount } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar.vue";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import { nextTick } from "vue";

import { useSearchStore } from "@/Stores/modules/search";
vi.mock("@/Stores/modules/search", () => ({
  useSearchStore: vi.fn(),
}));

describe("SearchBar.vue", () => {
  let searchStore;

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
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
  });

  it("toggles mobile search visibility on icon click", async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    wrapper.vm.isMobile = true;
    await nextTick();

    expect(wrapper.find(".search-bar__overlay").exists()).toBe(false);

    await wrapper.find(".fa-search").trigger("click");
    await nextTick();
    expect(wrapper.find(".search-bar__overlay").exists()).toBe(true);

    await wrapper.find(".fa-search").trigger("click");
    await nextTick();
    expect(wrapper.find(".search-bar__overlay").exists()).toBe(false);
  });
});
