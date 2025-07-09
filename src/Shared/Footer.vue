<script setup>
defineProps({
  msg: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__columns">
        <div class="footer__column">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Site Map</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4>Collection</h4>
          <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Catalog</a></li>
            <li><a href="#">Brands</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Tables</a></li>
            <li><a href="#">Lamps</a></li>
            <li><a href="#">Chairs</a></li>
            <li><a href="#">Sofas</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4>Contact</h4>
          <address>
            399 Crowfield Rd<br />
            Phoenix, AZ 85012<br />
            <a href="mailto:info@furnix.com">info@furnix.com</a><br />
            +1 646 262 5023
          </address>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; 2025 Luna's Bazar. All rights reserved.</p>
        <div class="footer__socials">
          <span>Follow us</span>
          <i class="fa fa-twitter icon"></i>
          <i class="fa fa-instagram icon"></i>
          <i class="fa fa-pinterest icon"></i>
          <i class="fa fa-facebook icon"></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: linear-gradient(to right, #7f5af0, #2cb67d);
  color: #fff;
  backdrop-filter: blur(8px);
  padding: 3rem 1.5rem;

  &__wrapper {
    max-width: 1280px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2.5rem;
  }

  &__column {
    h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      color: #f4f4f4;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 0.5rem 0;

        a {
          color: #ccc;
          text-decoration: none;
          position: relative;
          transition: color 0.3s;

          &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: #fff;
            transition: width 0.3s ease-in-out;
          }

          &:hover {
            color: #fff;

            &::after {
              width: 100%;
            }
          }
        }
      }
    }

    address {
      font-style: normal;
      line-height: 1.6;
      color: #ccc;

      a {
        display: inline-block;
        margin-top: 0.5rem;
        color: #ccc;
        text-decoration: underline;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    p {
      font-size: 0.875rem;
      color: #bbb;
    }
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      font-size: 0.9rem;
      color: #aaa;
    }

    .icon {
      font-size: 22px;
      color: #ccc;
      transition: transform 0.2s, color 0.3s;

      &:hover {
        transform: translateY(-3px);
        color: #fff;
      }
    }
  }
}
</style>
