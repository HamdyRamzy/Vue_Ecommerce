<template>
  <div class="CartProduct">
    <div class="items-container">
      <div class="img-container">
        <img
          :src="item.product.get_image"
          width="200"
          height="200"
          class="card-img-top product-img"
        />
      </div>
      <div class="product-descrition">
        <p class="card-text mb-0">
          <router-link :to="item.product.get_absolute_url">{{
            item.product.name
          }}</router-link>
        </p>
        <small class="card-text d-block">
          <div
            v-if="item.product.price_before_discount"
            class="price-container"
          >
            <span class="card-title d-block discounted-price"
              >{{ item.product.price_before_discount }} EGP</span
            >
            <span class="card-title d-block">{{ item.product.price }} EGP</span>
          </div>
          <span v-else class="card-title d-block"
            >{{ item.product.price }} EGP</span
          >
        </small>
        <small class="card-text d-block">{{ item.product.description }}</small>
        <div class="cart-actions-container d-inline">
          <span class="remove-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              class="bi bi-trash3 pointer"
              viewBox="0 0 16 16"
              @click="openModal(item)"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
            Remove</span
          >

          <span class="quantity-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              class="bi bi-dash-lg pointer"
              viewBox="0 0 16 16"
              @click="decrementQuantity(item)"
            >
              <path
                fill-rule="evenodd"
                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
              />
            </svg>
            Quantity
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              class="bi bi-plus-lg pointer"
              viewBox="0 0 16 16"
              @click="incrementQuantity(item)"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              /></svg
          ></span>
        </div>
        <span class="badge bg-light text-dark">{{ item.quantity }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  name: "CartProductComponent",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }
      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
    openModal(item) {
      this.$emit("openModal", item);
    },
  },
};
</script>
<style scoped lang="scss">
.items-container {
  display: flex;
}
.img-container {
  max-width: 110px;
  min-width: 100px;
}
.product-descrition {
  overflow: auto;
  text-align: start;
  padding-top: 12px;
  padding-left: 25px;
  object-fit: cover;
  line-height: 2;
}
.product-img {
  object-fit: contain;
  width: 100%;
  height: auto;
}
.remove-btn {
  margin-right: 25px;
}
.quantity-btn {
  margin-right: 25px;
}
.price-container {
  display: -webkit-inline-box;
}
.discounted-price {
  padding-right: 25px;
  text-decoration: line-through;
  color: #e60000;
}
.cart-actions-container {
  display: flex;
}
.pointer {
  cursor: pointer;
}
</style>
