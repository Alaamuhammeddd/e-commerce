<script setup>
import Header from "./Shared/Header.vue";
import Footer from "./Shared/Footer.vue";
import "./assets/base.css";
</script>

<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
