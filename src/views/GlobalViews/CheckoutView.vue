<template>
  <div class="home">
    <div class="row p-3" v-if="cartTotalLength">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div>
              <div class="row p-3">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    id="firstame"
                    placeholder="First name"
                    v-model="first_name"
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    placeholder="Last name"
                    v-model="last_name"
                  />
                </div>
              </div>
              <div class="form-group p-3">
                <input
                  type="text"
                  class="form-control"
                  id="place"
                  placeholder="1234 Main St"
                  v-model="place"
                />
              </div>
              <div class="form-group p-3">
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Apartment, studio, or floor"
                  v-model="address"
                />
              </div>
              <div class="row p-3">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Phone"
                    v-model="phone"
                  />
                </div>
                <div class="form-group col-md-4">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="email"
                    v-model="email"
                  />
                </div>
                <div class="form-group col-md-2">
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    placeholder="Zip"
                    v-model="zipcode"
                  />
                </div>
              </div>
              <button
                class="btn btn-dark shadow-none w-100"
                @click="submitForm"
              >
                COMPLETE PAYMENT
              </button>
              <div class="notification is-danger mt-4" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <CheckoutPriceComponent
          :cartTotalPrice="cartTotalPrice"
          :cartTotalLength="cartTotalLength"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CheckoutPriceComponent from "@/components/CheckoutComponents/CheckoutPriceComponent.vue";
import axios from "axios";
export default {
  name: "CheckoutView",
  components: {
    CheckoutPriceComponent,
  },
  data() {
    return {
      cart: {
        items: [],
      },
      errors: [],
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      coupon_value: 0,
      coupon: "",
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];
      if (this.first_name === "") {
        this.errors.push("The first name field is missing!");
      }
      if (this.last_name === "") {
        this.errors.push("The last name field is missing!");
      }
      if (this.email === "") {
        this.errors.push("The email field is missing!");
      }
      if (this.phone === "") {
        this.errors.push("The phone field is missing!");
      }
      if (this.address === "") {
        this.errors.push("The address field is missing!");
      }
      if (this.zipcode === "") {
        this.errors.push("The zip code field is missing!");
      }
      if (this.place === "") {
        this.errors.push("The place field is missing!");
      }
      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);

        const items = [];
        for (let i = 0; i < this.cart.items.length; i++) {
          const item = this.cart.items[i];
          const obj = {
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price * item.quantity,
          };
          items.push(obj);
        }
        const formData = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          zipcode: this.zipcode,
          place: this.place,
          items: items,
          coupon: this.coupon,
        };
        this.$store.commit("setIsLoading", true);
        await axios
          .post("/api/v2/checkout/", formData)
          .then((response) => {
            this.$store.state.code_no = response.data.code_no;
            const order_no = this.$store.state.code_no;
            this.$store.commit("clearCart");
            this.$router.push(`/success/H${order_no}R/`);
          })
          .catch((error) => {
            this.errors.push("Something went wrong. Please try again");
            console.log(error);
          });
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  mounted() {
    document.title = "Checkout";
    console.log(this.$store.state.code_no);
    this.cart = this.$store.state.cart;
    this.coupon_value = this.$store.state.coupon_value;
    this.coupon = this.$store.state.coupon;
    console.log(this.coupon);
    console.log(this.coupon_value);
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
