import { shallowMount } from "@vue/test-utils";
import SortDropdown from "@/components/SortDropdown.vue"; // adjust path if needed

describe("SortDropdown.vue", () => {
  it("renders with correct initial value from modelValue", () => {
    const wrapper = shallowMount(SortDropdown, {
      props: {
        modelValue: "highToLow",
      },
    });

    const select = wrapper.find("select");
    expect(select.element.value).toBe("highToLow");
  });

  it("updates localSelected when modelValue prop changes", async () => {
    const wrapper = shallowMount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    await wrapper.setProps({ modelValue: "lowToHigh" });

    const select = wrapper.find("select");
    expect(select.element.value).toBe("lowToHigh");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = shallowMount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    const select = wrapper.find("select");
    await select.setValue("highToLow");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["highToLow"]);
  });
});
