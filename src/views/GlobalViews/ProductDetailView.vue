<template>
  <div class="container">
    <div class="row">
      <ProductDetailComponent v-bind:product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ProductDetailComponent from "@/components/ProductDetailComponents/ProductDetailComponent.vue";

export default {
  name: "ProductDetailView",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  components: {
    ProductDetailComponent,
  },
  mounted() {
    this.getProduct();
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
  },
};
</script>
<style scoped></style>
