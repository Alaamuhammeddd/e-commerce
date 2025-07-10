import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Products from "../views/Products.vue";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import ViewProduct from "../views/ViewProduct.vue";
import NotFound from "../views/NotFound.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/:id",
    name: "ProductView",
    component: ViewProduct,
  },
  {
    path: "/contact-us",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/contact",
    redirect: "contact-us",
  },
  {
    path: "/all-products",
    redirect: "products",
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
