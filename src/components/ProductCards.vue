<template>
  <div class="product-card">
    <RouterLink
      :to="{ name: 'ProductView', params: { id: product.id } }"
      class="product-card__link"
    >
      <article
        class="product-card__content"
        role="group"
        :aria-labelledby="`product-title-${product.id}`"
        :aria-describedby="`product-desc-${product.id}`"
      >
        <div class="product-card__image-wrapper">
          <img
            :src="product.image"
            :alt="product.title"
            class="product-card__image"
          />
        </div>
        <div class="product-card__text-content">
          <h2 :id="`product-title-${product.id}`" class="product-card__title">
            {{ product.title }}
          </h2>
          <p
            :id="`product-category-${product.id}`"
            class="product-card__category"
          >
            {{ product.category }}
          </p>
          <p :id="`product-price-${product.id}`" class="product-card__price">
            ${{ product.price }}
          </p>
          <p
            :id="`product-desc-${product.id}`"
            class="product-card__description"
          >
            {{ product.description }}
          </p>
        </div>
      </article>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import type { Product } from "../Stores/types";

export default defineComponent({
  name: "ProductCard",
  components: {
    RouterLink,
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props) {
    return {
      product: props.product,
    };
  },
});
</script>
<style scoped lang="scss">
.product-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  max-width: 320px;
  margin: 2rem auto;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &__image-wrapper {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__text-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: left;
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #1e1e1e;
    height: 2.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #7f5af0;
    letter-spacing: 0.5px;
  }

  &__price {
    font-size: 1rem;
    font-weight: 600;
    color: #2cb67d;
  }

  &__description {
    display: none;
  }
}
</style>
