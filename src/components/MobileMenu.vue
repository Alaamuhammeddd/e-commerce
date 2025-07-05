<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close-menu"): void;
}>();
</script>

<template>
  <div
    class="mobile-menu"
    :class="{ 'mobile-menu__hamburger--open': props.isOpen }"
  >
    <div class="mobile-menu__hamburger" @click="emit('close-menu')">
      <i class="fa fa-bars" style="font-size: 21px"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .mobile-menu {
    display: none;
  }
}

@media (max-width: 1023px) {
  .mobile-menu {
    flex-wrap: wrap;
    padding: 0.5rem;

    &__hamburger {
      display: flex;
    }
  }
}
</style>
