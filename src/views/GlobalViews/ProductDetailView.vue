<template>
  <div class="container">
    <div class="row">
      <ProductDetailComponent v-bind:product="product" />
      <div v-if="reviews.length" class="card">
        <div class="card-title">
          <h3 class="text-start">Product Reviews</h3>
        </div>
        <div class="card-body row">
          <div class="col-lg-4 stars-count">
            <div class="stars-container">
              <div class="stars-name">
                <small>5 Stars</small>
              </div>
              <div class="progress">
                <div
                  class="progress-bar yellow"
                  role="progressbar"
                  :style="{ width: percentage + '%' }"
                  aria-valuenow="85"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stars-container">
              <div class="stars-name">
                <small>4 Stars</small>
              </div>
              <div class="progress">
                <div
                  class="progress-bar yellow"
                  role="progressbar"
                  :style="{ width: percentage + '%' }"
                  aria-valuenow="65"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stars-container">
              <div class="stars-name">
                <small>3 Stars</small>
              </div>
              <div class="progress">
                <div
                  class="progress-bar yellow"
                  role="progressbar"
                  :style="{ width: percentage + '%' }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stars-container">
              <div class="stars-name">
                <small>2 Stars</small>
              </div>
              <div class="progress">
                <div
                  class="progress-bar yellow"
                  role="progressbar"
                  :style="{ width: percentage + '%' }"
                  aria-valuenow="15"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="stars-container">
              <div class="stars-name">
                <small>1 Stars</small>
              </div>
              <div class="progress">
                <div
                  class="progress-bar yellow"
                  role="progressbar"
                  :style="{ width: percentage + '%' }"
                  aria-valuenow="5"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <ProductReviewsComponent
              v-for="review in reviews"
              :key="review.id"
              v-bind:review="review"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ProductDetailComponent from "@/components/ProductDetailComponents/ProductDetailComponent.vue";
import ProductReviewsComponent from "@/components/ProductDetailComponents/ProductReviewsComponent.vue";

export default {
  name: "ProductDetailView",
  data() {
    return {
      product: {},
      reviews: [],
      quantity: 1,
      currentPage: 1,
      hasNext: true,
      percentage: 0,
    };
  },
  components: {
    ProductDetailComponent,
    ProductReviewsComponent,
  },
  mounted() {
    this.getProduct();
    this.getReviews();
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && this.hasNext) {
        this.currentPage += 1;
        this.getReviews();
      }
    };
  },
  methods: {
    async getProduct() {
      this.$store.commit("setIsLoading", true);

      const product_slug = this.$route.params.product_slug;
      await axios
        .get(`/api/v1/${product_slug}/`)
        .then((response) => {
          this.product = response.data;
          document.title = this.product.name;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    async getReviews() {
      this.$store.commit("setIsLoading", true);
      const product_slug = this.$route.params.product_slug;
      await axios
        .get(`/api/v1/${product_slug}/reviews/?page=${this.currentPage}`)
        .then((response) => {
          this.hasNext = false;
          if (response.data.next) {
            this.hasNext = true;
          }
          for (let i = 0; i < response.data.results.length; i++) {
            this.reviews.push(response.data.results[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
  computed: {
    percent() {
      return this.percentage.toFixed();
    },
  },
  created() {
    var intval = setInterval(() => {
      if (this.percentage < 75) this.percentage += 0.1;
      else clearInterval(intval);
    }, 10);
  },
};
</script>
<style scoped>
.card {
  border: none;
}
.text-start {
  text-align: start;
}
.progress {
  height: 5px;
  margin-top: 11px;
}
.stars-name {
  float: left;
  margin-right: 1em;
  font-weight: 600;
}
.stars-container {
  display: flow-root;
}
.yellow {
  background-color: #ffd055;
}
</style>
