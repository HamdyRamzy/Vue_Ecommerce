<template>
  <div class="home container">
    <div class="row">
      <ProductComponent
        v-for="product in Products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ProductComponent from "@/components/MainComponents/ProductComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      Products: [],
      currentPage: 1,
      hasNext: true,
    };
  },
  components: {
    ProductComponent,
  },
  mounted() {
    document.title = "Home";
    this.getProducts();
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && this.hasNext) {
        this.currentPage += 1;
        this.getProducts();
      }
    };
  },
  methods: {
    async getProducts() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get(`/api/v1/latest-products/?page=${this.currentPage}`)
        .then((response) => {
          this.hasNext = false;
          console.log(this.currentPage);

          if (response.data.next) {
            this.hasNext = true;
            console.log(this.currentPage);
          }
          for (let i = 0; i < response.data.results.length; i++) {
            this.Products.push(response.data.results[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
<style scoped lang="scss">
.no-products {
  color: #e60000;
}
</style>
