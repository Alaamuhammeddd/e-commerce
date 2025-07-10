<template>
  <ul class="header__nav" :class="{ 'header__nav--open': isOpen }">
    <router-link
      :to="{ name: 'Home' }"
      class="header__nav-item header__nav-item--home"
    >
      Home
    </router-link>
    <router-link
      :to="{ name: 'Products' }"
      class="header__nav-item header__nav-item--products"
    >
      Products
    </router-link>
    <router-link
      :to="{ name: 'Contact' }"
      class="header__nav-item header__nav-item--contact"
    >
      Contact
    </router-link>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLinks",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.header__nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 130px;
  color: white;
  position: static;
  background: none;
  flex-direction: row;
}

.header__nav-item {
  text-decoration: none;
  transition: color 0.2s ease;

  &--home,
  &--products,
  &--contact {
    &:hover {
      color: #1e077d;
      cursor: pointer;
    }
  }
}

.header__nav--open {
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 1rem;
  background-color: white;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 10;

  .header__nav-item {
    margin: 0.5rem 0;
  }
}

@media (max-width: 1023px) {
  .header__nav {
    display: none;
  }

  .header__nav--open {
    display: flex !important;
    color: black;
    gap: 20px;
  }

  .header__nav-item {
    color: black;
  }
}

@media (min-width: 1024px) {
  .header__nav-item {
    color: white;
  }
}
</style>
