<template>
  <div class="home container">
    <div class="row" v-if="products.length">
      <ProductComponent
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
    <div>
      <p class="mb-0 mt-5">{{ res }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductComponent from "@/components/MainComponents/ProductComponent.vue";

export default {
  name: "SearchResultsView",
  components: {
    ProductComponent,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      hasNext: true,
      query: "",
      res: "",
    };
  },
  mounted() {
    document.title = "Search";
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("query")) {
      this.query = params.get("query");
      this.performSearch();
      console.log("run");
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.hasNext) {
          this.currentPage += 1;
          this.performSearch();
        }
      };
    }
  },
  methods: {
    async performSearch() {
      this.$store.commit("setIsLoading", true);
      await axios
        .post(`/api/v1/products/search/?page=${this.currentPage}`, {
          query: this.query,
        })
        .then((response) => {
          document.title = `Search - ${this.query}`;
          this.hasNext = false;
          if (response.data.next) {
            this.hasNext = true;
          } else {
            this.res = "NO RESULTS FOUND";
          }
          for (let i = 0; i < response.data.results.length; i++) {
            this.products.push(response.data.results[i]);
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
<style scoped></style>
