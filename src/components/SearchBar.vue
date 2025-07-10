<template>
  <div class="search-bar">
    <i class="fa fa-search search-bar__icon" @click="toggleMobileSearch"></i>

    <div class="search-bar__inline" v-if="!isMobile">
      <input
        type="text"
        placeholder="Search Products"
        v-model="searchQuery"
        class="search-bar__input"
      />
    </div>

    <div class="search-bar__overlay" v-if="isMobile && isMobileSearchVisible">
      <div class="search-bar__overlay-content">
        <input
          type="text"
          placeholder="Search Products"
          v-model="searchQuery"
          class="search-bar__input"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { useSearchStore } from "../Stores/modules/search";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "SearchBar",
  setup() {
    const isMobileSearchVisible = ref(false);
    const isMobile = ref(false);
    const searchStore = useSearchStore();
    const { searchQuery } = storeToRefs(searchStore);

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 1023;
      if (!isMobile.value) {
        isMobileSearchVisible.value = false;
      }
    };

    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    const toggleMobileSearch = () => {
      isMobileSearchVisible.value = !isMobileSearchVisible.value;
    };

    return {
      isMobileSearchVisible,
      isMobile,
      searchQuery,
      toggleMobileSearch,
    };
  },
});
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  position: relative;

  &__icon {
    font-size: 24px;
    color: #333;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #7f5af0;
    }
  }

  &__inline {
    margin-left: 10px;
  }

  &__input {
    padding: 6px 12px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    background-color: #f0f0f0;
    width: 180px;
    outline: none;
    transition: box-shadow 0.3s ease;

    &:focus {
      background-color: #fff;
      box-shadow: 0 0 0 2px #7f5af0;
    }
  }

  @media (max-width: 1023px) {
    &__overlay {
      position: absolute;
      top: 100%;
      right: 2.5rem;
      margin-top: 8px;
      z-index: 1000;
      display: flex;
      justify-content: flex-start;
      width: 100%;
    }

    &__overlay-content {
      background-color: white;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
      width: 250px;
    }
  }
}
</style>
