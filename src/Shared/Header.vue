<template>
  <div class="header">
    <!-- Mobile Menu -->
    <MobileMenu :is-open="isMenuOpen" @close-menu="toggleMenu" />

    <!-- Logo -->
    <div class="header__logo-wrapper">
      <router-link :to="{ name: 'Home' }">
        <img class="header__logo" src="@/assets/Luna.png" alt="logo" />
      </router-link>
    </div>

    <!-- Navigation -->
    <NavLinks :is-open="isMenuOpen" />

    <!-- Action Buttons -->
    <div class="header__icons">
      <SearchBar />
      <button class="header__btn header__btn--signup">Sign Up</button>
      <button class="cart__btn--cart" @click="toggleCart" title="Cart Button">
        <i class="fa fa-shopping-cart" style="font-size: 26px"></i>
      </button>
      <Cart :is-cart-open="isCartOpen" @close-cart="toggleCart" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MobileMenu from "../components/MobileMenu.vue";
import NavLinks from "../components/NavLinks.vue";
import Cart from "../components/Cart.vue";
import SearchBar from "../components/SearchBar.vue";

// State
const isCartOpen = ref(false);
const isMenuOpen = ref(false);

// Methods
function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped lang="scss">
.cart__btn--cart {
  background: none;
  border: none;
  font-size: 16px;
  display: flex;
  transition: 0.2s ease;
  color: black;
  &:hover {
    cursor: pointer;
    transition: 0.2s ease;
    color: #333;
  }
}
.header {
  background: linear-gradient(to right, #7f5af0, #2cb67d);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  gap: 10px;
  position: relative;

  &__logo-wrapper {
    .header__logo {
      width: 120px;
      height: 120px;
      padding-inline-start: 5px;
      display: flex;
      align-items: center;
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  &__btn {
    background: none;
    border: none;
    font-size: 16px;
    color: white;

    &--search {
      display: flex;
      gap: 10px;
      color: black;
    }

    &--signup {
      border-radius: 5px;
      padding: 0.3rem 0.6rem;
      background-color: black;
      color: white;
      border: 2px solid transparent;
      transition: all 0.3s ease;

      &:hover {
        background-color: transparent;
        color: black;
        border: 2px solid black;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 1023px) {
    .header__logo {
      display: flex;
      align-items: center;
    }
    flex-wrap: wrap;
    padding: 0.5rem;

    &__hamburger {
      display: flex;
    }

    &__nav {
      display: none;

      &--open {
        gap: 10px;
        display: flex;
      }

      &-item {
        margin: 0.5rem 0;
      }
    }

    &__icons {
      gap: 20px;
    }

    &__btn--signup {
      padding: 0.3rem 0.6rem;
    }

    &__logo {
      max-width: 50px;
      max-height: 50px;
    }
  }
}
</style>
