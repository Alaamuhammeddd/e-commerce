<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileMenu",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-menu"],
  setup(props, { emit }) {
    const closeMenu = () => {
      emit("close-menu");
    };

    return {
      isOpen: props.isOpen,
      closeMenu,
    };
  },
});
</script>

<template>
  <div class="mobile-menu" :class="{ 'mobile-menu__hamburger--open': isOpen }">
    <div class="mobile-menu__hamburger" @click="closeMenu">
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
