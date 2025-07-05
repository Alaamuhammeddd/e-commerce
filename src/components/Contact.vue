<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="container">Contact</div>
</template>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .container {
    height: 100vh;
  }
}
</style>
