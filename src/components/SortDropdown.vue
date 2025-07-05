<template>
  <div class="sort-dropdown">
    <select
      v-model="localSelected"
      @change="emit('update:modelValue', localSelected)"
    >
      <option value="default">Default</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const localSelected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    localSelected.value = val;
  }
);
</script>

<style scoped lang="scss">
@media (max-width: 1023px) {
  .sort-dropdown {
    padding-block-start: 20px;
    padding-inline-start: 30px;
    select {
      padding: 5px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
}
@media (min-width: 1024px) {
  .sort-dropdown {
    margin-bottom: 1rem;
    grid-column-start: 4;
    justify-self: end;
    padding-block-start: 20px;

    select {
      padding: 5px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
}
</style>
