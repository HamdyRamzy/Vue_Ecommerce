<template>
  <div class="home container">
    <div class="row" v-if="orders.length">
      <OrderComponent
        v-for="order in orders"
        v-bind:key="order.id"
        v-bind:order="order"
      />
    </div>
    <div v-else>
      <h5>MY ORDERS</h5>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="currentColor"
        class="bi bi-cart mt-3"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
      <p class="cart-p mt-3">You do not have an orders</p>
      <router-link class="btn btn-dark shadow-none" to="/"
        >START SHOPPING</router-link
      >
    </div>
  </div>
</template>

<script>
import OrderComponent from "@/components/OrderComponents/OrderComponent.vue";
import axios from "axios";
export default {
  name: "MyOrdersView",
  data() {
    return {
      orders: [],
    };
  },
  components: {
    OrderComponent,
  },
  mounted() {
    document.title = "My Orders";
    this.getMyOrders();
  },
  methods: {
    async getMyOrders() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v2/orders/")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
  props: {},
};
</script>
<style scoped lang="scss">
.btn {
  border-radius: 0;
  padding: 8px 20px;
}
.cart-p {
  font-size: larger;
}
</style>
