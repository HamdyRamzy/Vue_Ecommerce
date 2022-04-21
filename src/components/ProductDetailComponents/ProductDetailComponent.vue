<template>
  <div class="card mb-3 mt-5 p-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="product.get_image" class="img-fluid" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <div v-if="product.price_before_discount" class="price-container">
            <span class="card-title d-block discounted-price"
              >{{ product.price_before_discount }} EGP</span
            >
            <span class="card-title d-block">{{ product.price }} EGP</span>
          </div>
          <span v-else class="card-title d-block">{{ product.price }} EGP</span>
          <p class="card-text">
            {{ product.description }}
          </p>
          <button class="btn btn-dark shadow-none w-100" @click="addToCart()">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
    <div
      ref="el"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            /></svg
        ></strong>
        <small class="text-muted">ADDED TO CART!</small>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <p class="toast-body">{{ product.name }}</p>
      <hr class="text-dark" />
      <router-link class="" to="/cart">
        <button class="btn btn-dark shadow-none w-100">GO TO CART</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Toast } from "bootstrap/dist/js/bootstrap";

export default {
  name: "ProductDetailComponent",
  props: ["product"],
  data() {
    return {
      quantity: 1,
      toast: null,
    };
  },

  methods: {
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);
      this.toast = new Toast(this.$refs.el);
      this.toast.show();
    },
  },
};
</script>
<style scoped lang="scss">
.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  height: 410px;
  border-radius: 3%;
}
.card {
  border-radius: 12px;
}
.card-body {
  text-align: left;
  padding: 10px 15px;
}
.btn {
  border-radius: 0;
  padding: 8px;
}
.toast {
  position: fixed;
  top: auto !important;
  bottom: 0 !important;
  right: 0 !important;
  left: auto !important;
  margin: 0.5em;
  z-index: 1200;
  padding: 10px;
}
.toast-header {
  border-bottom: none;
}
.price-container {
  display: -webkit-inline-box;
}
.discounted-price {
  padding-right: 25px;
  text-decoration: line-through;
  color: #e60000;
}
</style>
