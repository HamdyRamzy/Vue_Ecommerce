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
              @openModal="showModal"
              @removeFromCart="removeFromCart"
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
        <CartDiscountComponent
          class="mt-4"
          v-on:checkCoupon="checkCoupon"
          :coupon_value="coupon_value"
        />
      </div>
      <h1>{{ coupon.value }}</h1>
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
import CartDiscountComponent from "@/components/CartComponents/CartDiscountComponent.vue";
import DeleteProductComponent from "@/components/CartComponents/DeleteProductComponent.vue";
import axios from "axios";
export default {
  name: "CartView",
  components: {
    CartPriceComponent,
    CartProductComponent,
    CartDiscountComponent,
  },
  data() {
    return {
      cart: {
        items: [],
      },
      isOpen: false,
      currentPage: 1,
      coupon: {},
      coupon_value: 0,
    };
  },
  methods: {
    async showModal(item) {
      // once this library is installed. it will add a $vbsModal global property to the app instance.
      const confirmed = await this.$vbsModal.open({
        content: DeleteProductComponent,
        contentProps: {
          initialItem: item,
        },
        center: true, // default is false.
        backgroundScrolling: false, // default is false.
        staticBackdrop: false, // will disable backdrop click to close modal if true.
      });
      return confirmed;
    },
    setIsOpen(value) {
      this.isOpen = value;
    },
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
    async checkCoupon(coupon_code) {
      this.$store.commit("setIsLoading", true);
      await axios
        .post(`/api/v3/coupon/?coupon_code=${coupon_code}`)
        .then((response) => {
          this.coupon = response.data;
          this.$store.state.coupon = this.coupon.code;
          if (response.data.value) {
            this.coupon_value = parseInt(response.data.value);
            this.$store.state.coupon_value = parseInt(response.data.value);
          } else {
            this.coupon_value = 0;
          }
          console.log(this.coupon);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
  mounted() {
    document.title = "Cart";
    this.cart = this.$store.state.cart;
    console.log(this.$store.state.code_no);
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      if (this.coupon_value > 0) {
        return (
          this.cart.items.reduce((acc, curVal) => {
            return (acc += curVal.product.price * curVal.quantity);
          }, 0) -
          this.cart.items.reduce((acc, curVal) => {
            return (acc += curVal.product.price * curVal.quantity);
          }, 0) *
            (parseInt(this.coupon_value) / 100)
        );
      } else {
        return this.cart.items.reduce((acc, curVal) => {
          return (acc += curVal.product.price * curVal.quantity);
        }, 0);
      }
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
