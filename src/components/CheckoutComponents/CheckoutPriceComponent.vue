<template>
  <div class="CartPriceSection">
    <div class="card">
      <div class="card-body">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Total Ammount {{ cartTotalPrice }} EGP
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    SubTotal
                    <span class="float-right-i">{{ cartTotalPrice }} EGP</span>
                  </li>
                  <li class="list-group-item">
                    Items
                    <span class="float-right-i">{{ cartTotalLength }}</span>
                  </li>
                </ul>
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
  name: "CheckoutPriceComponent",
  props: ["cartTotalLength", "cartTotalPrice"],
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
