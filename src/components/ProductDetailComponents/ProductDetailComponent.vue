<template>
  <div class="mb-3 mt-5 p-3">
    <div class="row g-0">
      <div class="col-md-6">
        <inner-image-zoom
          :src="vpicture ? vpicture : product.get_image"
          :alt="product.name"
          :zoomScale="1.5"
          class="mainImg"
        />
        <div id="colorPicker">
          <ul>
            <label class="p-1">
              <input
                type="radio"
                :id="product.id"
                v-model="vpicture"
                :value="product.get_image"
                checked="checked"
              />
              <img :src="product.get_image" height="100" width="100" />
            </label>
            <label
              class="p-1"
              v-for="picture in product.imageproduct"
              :key="picture.id"
            >
              <input
                type="radio"
                :name="picture.id"
                :id="picture.id"
                v-model="vpicture"
                :value="picture.get_image"
              />
              <img :src="picture.get_image" height="100" width="100" />
            </label>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <small class="d-block text-muted"
            >Model Number : {{ product.code }}</small
          >
          <div v-if="product.price_before_discount" class="price-container">
            <span class="card-title d-block discounted-price"
              >{{ product.price_before_discount }} EGP</span
            >
            <span class="card-title d-block">{{ product.price }} EGP</span>
          </div>
          <span v-else class="card-title d-block">{{ product.price }} EGP</span>
          <small class="d-block" v-if="product.in_stock"
            >Availability:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-check-lg text-success bolder"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
              />
            </svg>
            <span class="bolder">in stock</span>
          </small>
          <small class="d-block" v-if="!product.in_stock"
            >Availability:

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              class="bi bi-x text-danger bolder"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
            <span class="bolder">out of stock</span>
          </small>

          <p class="card-text">
            {{ displayedText }}
          </p>
          <p
            @click="showFullText = !showFullText"
            class="text-decoration-underline"
            role="button"
          >
            Read {{ readMoreText }}
          </p>
          <button
            class="btn btn-dark shadow-none w-100"
            :class="{ disabled: !product.in_stock }"
            @click="addToCart()"
          >
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
import InnerImageZoom from "vue-inner-image-zoom";

export default {
  name: "ProductDetailComponent",
  props: ["product"],
  components: {
    "inner-image-zoom": InnerImageZoom,
  },
  data() {
    return {
      quantity: 1,
      toast: null,
      vpicture: null,
      showFullText: false,
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
  computed: {
    displayedText() {
      if (!this.showFullText) {
        return this.product.description?.slice(0, 50) + ".....";
      } else {
        return this.product.description;
      }
    },
    readMoreText() {
      return this.showFullText ? "less" : "more";
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
  background-color: #fff;
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
[type="radio"] {
  position: absolute;
  opacity: 0;
}
[type="radio"] + img {
  cursor: pointer;
  margin-right: 0.5rem;
  border-radius: 10px;
  object-fit: cover;
}
[type="radio"]:checked + img {
  outline: 2px solid rgb(152 152 152);
  transition: box-shadow 0.2s ease-in;
  padding: 1px;
}
.mainImg {
  object-fit: cover;
  margin-bottom: 20px;
  width: 100%;
  height: 500px;
}
.bolder {
  font-weight: 600;
}
</style>
