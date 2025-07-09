<script setup>
import { defineProps } from "vue";
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content">
        <p>
          Your one-stop shop for everything awesome. Discover deals, new
          arrivals, and best-sellers now.
        </p>
        <button class="shop-btn">Shop Now</button>
      </div>
    </header>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-card">
        <i class="fa fa-truck icon"></i>
        <h3>Free Shipping</h3>
        <p>On all orders over $50</p>
      </div>
      <div class="feature-card">
        <i class="fa fa-lock icon"></i>
        <h3>Secure Payments</h3>
        <p>100% secure and trusted</p>
      </div>
      <div class="feature-card">
        <i class="fa fa-headphones icon"></i>
        <h3>24/7 Support</h3>
        <p>We're here to help anytime</p>
      </div>
    </section>

    <!-- About Us -->
    <section class="about">
      <h2>About Us</h2>
      <p>
        We're passionate about delivering top-notch products and unbeatable
        service. Since day one, our mission has been to bring joy to your
        shopping experience.
      </p>
    </section>

    <!-- Categories -->
    <section class="categories">
      <h2>Shop by Category</h2>
      <div class="category-grid">
        <div class="category-card">
          <i class="fa fa-laptop icon"></i>
          <h4>Electronics</h4>
        </div>
        <div class="category-card">
          <i class="fa fa-tshirt icon"></i>
          <h4>Clothing</h4>
        </div>
        <div class="category-card">
          <i class="fa fa-couch icon"></i>
          <h4>Home & Living</h4>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <h2>What Our Customers Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <p>"Amazing service and great quality products!"</p>
          <span>- Sarah J.</span>
        </div>
        <div class="testimonial-card">
          <p>"Fast shipping and awesome support. Love it!"</p>
          <span>- Mark R.</span>
        </div>
        <div class="testimonial-card">
          <p>"My go-to shop for gifts. Highly recommend!"</p>
          <span>- Emily T.</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  font-family: "Segoe UI", sans-serif;
  color: #1e1e1e;
  background-color: #f9f9f9;

  .hero {
    background: linear-gradient(to right, #7f5af0, #2cb67d);
    color: white;
    padding: 4rem 2rem;
    text-align: center;

    .hero-content {
      max-width: 800px;
      margin: 0 auto;

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
      }

      .shop-btn {
        padding: 0.75rem 2rem;
        font-size: 1rem;
        background-color: black;
        color: white;
        border: 2px solid transparent;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: transparent;
          color: black;
          border: 2px solid black;
        }
      }
    }
  }

  .features {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 4rem 2rem;
    background-color: #fff;

    .feature-card {
      background: #f4f4f5;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #7f5af0;
      }

      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }

      p {
        font-size: 0.95rem;
        color: #555;
      }
    }
  }

  .about {
    padding: 4rem 2rem;
    background-color: #fefefe;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      max-width: 700px;
      margin: 0 auto;
      font-size: 1.1rem;
      color: #555;
    }
  }

  .categories {
    padding: 4rem 2rem;
    text-align: center;
    background-color: #fff;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .category-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

      .category-card {
        padding: 1.5rem;
        background: #f4f4f5;
        border-radius: 1rem;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        .icon {
          font-size: 2rem;
          color: #7f5af0;
          margin-bottom: 0.5rem;
        }

        h4 {
          font-size: 1.1rem;
        }
      }
    }
  }

  .testimonials {
    background-color: #f9f9f9;
    padding: 4rem 2rem;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .testimonial-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      .testimonial-card {
        background: #fff;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        p {
          font-style: italic;
          margin-bottom: 1rem;
        }

        span {
          display: block;
          font-weight: bold;
          color: #555;
        }
      }
    }
  }
}
</style>
