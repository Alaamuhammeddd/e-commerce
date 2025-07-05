import { mount } from "@vue/test-utils";
import SortDropdown from "@/components/SortDropdown.vue";

describe("SortDropdown.vue", () => {
  it("renders select with default value", () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    const select = wrapper.find("select");
    expect(select.exists()).toBe(true);
    expect(select.element.value).toBe("default");
  });

  it("emits update:modelValue when selection changes", async () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    const select = wrapper.find("select");
    await select.setValue("lowToHigh");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["lowToHigh"]);
  });

  it("updates localSelected when modelValue changes", async () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    await wrapper.setProps({ modelValue: "highToLow" });
    const select = wrapper.find("select");
    expect(select.element.value).toBe("highToLow");
  });
});
