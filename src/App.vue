<template>
  <div>
    <OffersComponent />
    <NavbarComponent
      :categories="categories"
      :cartTotalLength="cartTotalLength"
    />
    <router-view :key="$route.path" />
    <transition name="fade">
      <div id="pagetop" class="" v-show="scY > 300" @click="toTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a5568"
          stroke-width="1"
          stroke-linecap="square"
          stroke-linejoin="arcs"
          class="top-btn"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
    </transition>
    <div
      class="loader-container"
      :class="{ 'spinner-border': $store.state.isLoading }"
      role="status"
      style="width: 3rem; height: 3rem"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <FooterComponent />
  </div>
</template>
<script>
import NavbarComponent from "@/components/GlobalComponents/NavbarComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import OffersComponent from "@/components/GlobalComponents/OffersComponent.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterComponent,
    OffersComponent,
  },
  data() {
    return {
      categories: [],
      scTimer: 0,
      scY: 0,
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.getCategories();
    this.cart = this.$store.state.cart;
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
  methods: {
    async getCategories() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v1/categories/all/")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html,
body {
  width: 100%;
  margin: 0px;
  padding: 0px !important;
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6,
strong {
  color: #000;
  font-family: "Mochiy Pop P One", sans-serif;
}

p,
li,
span,
label,
input,
textarea,
small {
  color: #000;
  font-family: "Mochiy Pop P One", sans-serif;
}
.top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
}
.form-control:focus {
  border-color: #ced4da;
  border-radius: 0;
}
.form-control {
  border-radius: 0 !important;
}
</style>
