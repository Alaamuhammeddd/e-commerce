<script setup>
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const description = ref("");
</script>

<template>
  <div class="contact-us">
    <div class="contact-us__wrapper">
      <div class="contact-us__header">
        <h2>Have some questions?</h2>
        <p>We’d love to hear from you. Please fill out the form below.</p>
      </div>

      <div class="contact-us__body">
        <img
          src="../assets/email2.png"
          alt="email-logo"
          class="contact-us__image"
        />

        <form class="contact-us__form" @submit.prevent>
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            required
          />
          <input v-model="email" type="email" placeholder="Email" required />
          <textarea
            v-model="description"
            placeholder="Describe your issue..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-us {
  padding: 2rem;
  text-align: center;
  background: linear-gradient(to right, #7f5af0, #2cb67d);

  &__wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  }
  &__header {
    margin-bottom: 2rem;
    h2 {
      font-size: 2rem;
      color: #1e077d;
    }
    p {
      font-size: 1rem;
      color: #555;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rem;
    @media (max-width: 1023px) {
      // flex-direction: row;
      justify-content: center;
      gap: 5rem;
    }

    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: center;
    }
  }

  &__image {
    max-width: 300px;
    width: 100%;
    height: auto;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 400px;

    input,
    textarea {
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: none;
      border-bottom: 2px solid #ccc;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #1e077d;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
    button {
      padding: 0.75rem;
      font-size: 1rem;
      background-color: black;
      color: white;
      border: 2px solid transparent; // prevent layout shift on hover
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: transparent;
        color: black;
        border-color: black;
      }
    }
  }
}
</style>
