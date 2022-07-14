<template>
  <div class="CartPriceSection">
    <div class="card">
      <div class="card-body">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingtwo">
              <button
                class="accordion-button collapsed shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapsetwo"
                aria-expanded="false"
                aria-controls="flush-collapsetwo"
              >
                Use Discount Code
              </button>
            </h2>
            <div
              id="flush-collapsetwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingtwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control shadow-none p-2"
                    placeholder=" Enter Discount Code"
                    v-model="coupon_code"
                  />
                </div>
                <small class="text-success" v-if="coupon_value"
                  >your discount is {{ coupon_value }} %</small
                >
                <button
                  @click="checkCoupon(coupon_code)"
                  class="btn btn-dark shadow-none mt-2 w-100"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartDiscountComponent",
  data() {
    return {
      coupon_code: "",
    };
  },
  props: ["coupon_value"],
  methods: {
    checkCoupon(coupon_code) {
      this.$emit("checkCoupon", coupon_code);
      console.log(this.coupon_code);
    },
  },
};
</script>
<style scoped lang="scss">
.accordion-button:not(.collapsed) {
  color: #000 !important;
  background-color: #f4f4f5 !important;
}
.accordion-button:after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
}
.list-group {
  text-align: left;
}
.float-right-i {
  float: right;
}
.btn {
  border-radius: 0;
  padding: 8px;
}
</style>
