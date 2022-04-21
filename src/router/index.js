import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/GlobalViews/HomeView.vue";

import LoginView from "../views/AuthenticationViews/LoginView.vue";
import SignupView from "../views/AuthenticationViews/SignupView.vue";

import CartView from "../views/GlobalViews/CartView.vue";
import SearchView from "../views/GlobalViews/SearchView.vue";
import AccountView from "../views/GlobalViews/AccountView.vue";

import ProductDetailView from "../views/GlobalViews/ProductDetailView";

import SectionView from "../views/GlobalViews/SectionView";
import ItemView from "../views/GlobalViews/ItemView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },

  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },

  {
    path: "/Account",
    name: "account",
    component: AccountView,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/GlobalViews/AboutView.vue"
      ),
  },

  {
    path: "/:product_slug",
    name: "ProductDetailView",
    component: ProductDetailView,
  },

  {
    path: "/:category_slug/:section_slug",
    name: "SectionView",
    component: SectionView,
  },
  {
    path: "/:category_slug/:section_slug/:item_slug",
    name: "ItemView",
    component: ItemView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
