import store from "../store";

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/GlobalViews/HomeView.vue";

import LoginView from "../views/AuthenticationViews/LoginView.vue";
import SignupView from "../views/AuthenticationViews/SignupView.vue";

import CartView from "../views/GlobalViews/CartView.vue";
import CheckoutView from "../views/GlobalViews/CheckoutView.vue";

import SearchView from "../views/GlobalViews/SearchView.vue";
import SearchResultsView from "../views/GlobalViews/SearchResultsView.vue";

import MyAccountView from "../views/GlobalViews/MyAccountView.vue";
import MyOrdersView from "../views/GlobalViews/MyOrdersView.vue";
import MyRatingsView from "../views/GlobalViews/MyRatingsView.vue";
import successView from "../views/GlobalViews/SuccessView.vue";

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
    meta: {
      alreadyLogged: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: {
      alreadyLogged: true,
    },
  },

  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/success/:order_no",
    name: "success",
    component: successView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/search-results",
    name: "search-results",
    component: SearchResultsView,
  },

  {
    path: "/account",
    name: "account",
    component: MyAccountView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: MyOrdersView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/ratings",
    name: "ratings",
    component: MyRatingsView,
    meta: {
      requireLogin: true,
    },
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
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "login", query: { to: to.path } });
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.alreadyLogged) &&
    store.state.isAuthenticated
  ) {
    next({ name: "home", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
