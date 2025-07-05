<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="footer">
    <div class="footer__main">
      <div class="footer__columns">
        <div class="footer__column footer__column--navigate">
          <h5 class="footer__heading">Navigate</h5>
          <ul class="footer__links">
            <li class="footer__link-item">About us</li>
            <li class="footer__link-item">Blog</li>
            <li class="footer__link-item">Contact Us</li>
            <li class="footer__link-item">Site Map</li>
          </ul>
        </div>
        <div class="footer__column footer__column--collection">
          <h5 class="footer__heading">Collection</h5>
          <ul class="footer__links">
            <li class="footer__link-item">New Arrivals</li>
            <li class="footer__link-item">Features</li>
            <li class="footer__link-item">Catalog</li>
            <li class="footer__link-item">Brands</li>
          </ul>
        </div>
        <div class="footer__column footer__column--categories">
          <h5 class="footer__heading">Categories</h5>
          <ul class="footer__links">
            <li class="footer__link-item">Tables</li>
            <li class="footer__link-item">Lamps</li>
            <li class="footer__link-item">Chairs</li>
            <li class="footer__link-item">Sofas</li>
          </ul>
        </div>
      </div>

      <div class="footer__contact">
        <p class="footer__address">399 Crowfield Rd, Phoenix, Arizona 85012</p>
        <a class="footer__email" href="mailto:asff@fddfd.com">asff@fddfd.com</a>
        <p class="footer__phone">+16462625023</p>
      </div>
    </div>

    <div class="footer__socials">
      <p class="footer__rights">Copyright &copy; All Rights Reserved</p>
      <div class="footer__social-icons">
        <p class="footer__social-label">Get Socials</p>
        <button class="footer__social-btn">
          <i class="fa fa-twitter-square"></i>
        </button>
        <button class="footer__social-btn">
          <i class="fa fa-instagram"></i>
        </button>
        <button class="footer__social-btn">
          <i class="fa fa-pinterest"></i>
        </button>
        <button class="footer__social-btn">
          <i class="fa fa-facebook"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  background: linear-gradient(135deg, #f3a354, #d388a2, #d63792);
  font-size: 21px;
  display: flex;
  flex-direction: column;
  color: white;

  &__main {
    display: flex;
    flex-direction: column;
    padding: 20px;

    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  &__columns {
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 20px;
  }

  &__heading {
    font-weight: bold;
    // margin-bottom: 10px;
  }

  &__links {
    list-style: none;
    padding: 0;

    .footer__link-item {
      padding-block: 10px;
    }
  }

  &__contact {
    text-align: center;
    margin-top: 20px;

    @media (min-width: 1024px) {
      text-align: left;
      margin-top: 0;
    }

    .footer__email,
    .footer__phone,
    .footer__address {
      display: block;
      margin-bottom: 8px;
    }
  }

  &__socials {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 10px;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__social-icons {
    display: flex;
    align-items: center;
    gap: 10px;

    .footer__social-label {
      margin-right: 10px;
    }
  }

  &__social-btn {
    border: none;
    background: none;
    font-size: 28px;
    color: inherit;

    &:hover {
      cursor: pointer;
      color: #1e077d;
    }
  }

  &__rights {
    margin-bottom: 10px;
    color: black;

    @media (min-width: 1024px) {
      margin-bottom: 0;
    }
  }
}
</style>
