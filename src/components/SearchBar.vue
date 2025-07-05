<template>
  <div class="search-bar">
    <i
      class="fa fa-search search-bar__icon"
      @click="toggleMobileSearch"
      style="font-size: 24px"
    ></i>

    <div
      class="search-bar__mobileSearch"
      v-show="isMobileSearchVisible || !isMobile"
    >
      <input
        type="text"
        placeholder="Search Products"
        v-model="searchQuery"
        class="search-bar__input"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useSearchStore } from "../Stores/modules/search";

const isMobileSearchVisible = ref(false);
const isMobile = ref(false);

// ✅ Use Pinia search store
const searchStore = useSearchStore();

// Handle screen resize
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

// ✅ Computed v-model binding with Pinia
const searchQuery = computed({
  get: () => searchStore.searchQuery,
  set: (value: string) => {
    searchStore.setSearchQuery(value);
  },
});

// Toggle search visibility on mobile
const toggleMobileSearch = () => {
  isMobileSearchVisible.value = !isMobileSearchVisible.value;
};
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon {
    font-size: 21px;
    color: #1e077d;
    cursor: default;

    &.clickable {
      cursor: pointer;
    }
  }

  &__input {
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
    position: relative;

    &__mobileSearch {
      position: absolute;
      top: 2.5rem;
      left: 0.25rem;
      width: fit-content;
      background-color: white;
      padding: 10px;
      z-index: 999;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
