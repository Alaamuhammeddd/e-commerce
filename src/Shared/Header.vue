<template>
  <div class="header">
    <!-- Mobile Menu -->
    <MobileMenu :is-open="isMenuOpen" @close-menu="toggleMenu" />

    <!-- Logo -->
    <div class="header__logo-wrapper">
      <router-link to="/products">
        <img class="header__logo" :src="logo" alt="logo" />
      </router-link>
    </div>

    <!-- Navigation -->
    <NavLinks :is-open="isMenuOpen" />

    <!-- Action Buttons -->
    <div class="header__icons">
      <SearchBar />
      <button class="header__btn header__btn--signup">Sign Up</button>
      <button class="cart__btn--cart" @click="toggleCart">
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
import logo from "../assets/Luna.png";

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
  &:hover {
    cursor: pointer;
    color: grey;
  }
}
.header {
  background: linear-gradient(135deg, #f3a354, #d388a2, #d63792);
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
    color: 1e77d;
  }

  &__btn {
    background: none;
    border: none;
    font-size: 16px;
    color: #1e077d;

    &--search {
      display: flex;
      gap: 10px;
    }

    &--signup {
      border: 2px solid #1e077d;
      border-radius: 3px;
      padding: 0.3rem 0.6rem;

      &:hover {
        color: white;
        cursor: pointer;
        background-color: #1e077d;
        transition: 0.3s ease;
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
