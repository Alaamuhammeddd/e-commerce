<script lang="ts" setup>
import { defineProps } from "vue";
import type { Product } from "../Stores/types";
import { RouterLink } from "vue-router";

const props = defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product-card">
    <RouterLink
      :to="{ name: 'ProductView', params: { id: props.product.id } }"
      class="product-card__link"
    >
      <article
        class="product-card__content"
        role="group"
        :aria-labelledby="`product-title-${props.product.id}`"
        :aria-describedby="`product-desc-${props.product.id}`"
      >
        <div class="product-card__image-wrapper">
          <img
            :src="props.product.image"
            :alt="props.product.title"
            class="product-card__image"
          />
        </div>
        <h2
          :id="`product-title-${props.product.id}`"
          class="product-card__title"
        >
          {{ props.product.title }}
        </h2>
        <p
          :id="`product-category-${props.product.id}`"
          class="product-card__category"
        >
          {{ props.product.category }}
        </p>
        <p
          :id="`product-price-${props.product.id}`"
          class="product-card__price"
        >
          ${{ props.product.price }}
        </p>
        <p
          :id="`product-desc-${props.product.id}`"
          class="product-card__description"
        >
          {{ props.product.description }}
        </p>
      </article>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;
  border: 2px solid black;
  padding-block: 40px;
  margin: 2rem auto;
  max-width: 300px;
  text-align: center;

  &:hover {
    transition: 0.3s ease;
    box-shadow: 5px 10px 18px #888888;
  }

  &__link {
    text-decoration: none;
    color: black;
  }

  &__cart-button {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: grey;
    }
  }

  &__image-wrapper {
    aspect-ratio: 1 / 1;
    padding: 8px;
    background-color: #fff;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__title {
    padding-inline: 4px;
    font-size: 1.2rem;
    font-weight: bold;
    line-height: 1.4rem;
    max-height: calc(1.4rem * 2);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__price {
    font-weight: 600;
  }

  &__category {
    font-size: 12px;
    color: #888888;
    text-transform: uppercase;
  }

  &__description {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
