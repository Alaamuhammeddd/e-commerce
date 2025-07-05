import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import SearchBar from "@/components/SearchBar.vue";

describe("SearchBar.vue", () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = createStore({
      modules: {
        search: {
          namespaced: true,
          state: () => ({
            searchQuery: "",
          }),
          getters: {
            searchQuery: (state) => state.searchQuery,
          },
          actions: {
            setSearchQuery: jest.fn(),
          },
        },
      },
    });

    // Spy on store.dispatch
    dispatchSpy = jest.spyOn(store, "dispatch");
  });

  it("renders input and updates store on change", async () => {
    const wrapper = shallowMount(SearchBar, {
      global: {
        plugins: [store],
      },
    });

    const input = wrapper.find("input");
    await input.setValue("Shoes");

    expect(dispatchSpy).toHaveBeenCalledWith("search/setSearchQuery", "Shoes");
  });

  it("toggles mobile search visibility", async () => {
    const wrapper = shallowMount(SearchBar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.vm.isMobileSearchVisible).toBe(false);

    await wrapper.find(".search-bar__icon").trigger("click");

    expect(wrapper.vm.isMobileSearchVisible).toBe(true);
  });

  it("should hide mobile search on desktop", async () => {
    const wrapper = shallowMount(SearchBar, {
      global: {
        plugins: [store],
      },
    });

    global.innerWidth = 1200;
    global.dispatchEvent(new Event("resize"));

    expect(wrapper.vm.isMobile).toBe(false);
    expect(wrapper.vm.isMobileSearchVisible).toBe(false);
  });
});
