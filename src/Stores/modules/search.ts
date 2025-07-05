// src/Stores/modules/search.ts
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchQuery: "",
  }),
  actions: {
    setSearchQuery(value: string) {
      this.searchQuery = value;
    },
  },
});
