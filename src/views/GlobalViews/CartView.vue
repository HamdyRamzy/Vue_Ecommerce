<template>
  <div class="home">
    <div class="row p-3" v-if="cartTotalLength">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <CartProductComponent
              v-for="item in toBeShown"
              v-bind:key="item.product.id"
              v-bind:initialItem="item"
              v-on:removeFromCart="removeFromCart"
            />
            <button
              class="btn btn-dark shadow-none"
              @click="prevPage"
              :disabled="currentPage == 1"
            >
              Preview
            </button>
            <button
              class="btn btn-dark shadow-none"
              @click="nextPage"
              :disabled="currentPage == totalPages"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <CartPriceComponent
          :cartTotalPrice="cartTotalPrice"
          :cartTotalLength="cartTotalLength"
        />
      </div>
    </div>
    <div class="cart-container mt-5" v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="currentColor"
        class="bi bi-cart"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
      <p class="mb-0 cart-p">Your shopping cart looks empty.</p>
      <router-link class="btn btn-dark shadow-none" to="/"
        >START SHOPPING</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CartPriceComponent from "@/components/CartComponents/CartPriceComponent.vue";
import CartProductComponent from "@/components/CartComponents/CartProductComponent.vue";

export default {
  name: "CartView",
  components: {
    CartPriceComponent,
    CartProductComponent,
  },
  data() {
    return {
      cart: {
        items: [],
      },
      currentPage: 1,
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      this.currentPage = this.currentPage - 1 || 1;
    },
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    toBeShown() {
      return this.cart.items.slice(0, this.currentPage * 2);
    },
    totalPages() {
      return Math.ceil(this.cart.items.length / 2);
    },
  },
};
</script>
<style scoped lang="scss">
.btn {
  border-radius: 0;
  padding: 8px 20px;
}
.cart-container {
  line-height: 3;
}
.cart-p {
  font-size: larger;
}
</style>
