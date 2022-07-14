<template>
  <div class="container">
    <div class="row">
      <h1>{{ section }}</h1>
      <ProductComponent
        v-for="product in products"
        v-bind:key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ProductComponent from "@/components/MainComponents/ProductComponent.vue";

export default {
  name: "SectionView",
  data() {
    return {
      products: [],
      section: "",
      currentPage: 1,
      hasNext: true,
    };
  },
  components: {
    ProductComponent,
  },
  mounted() {
    document.title = "Shoesy";
    this.getSection();
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && this.hasNext) {
        this.currentPage += 1;
        this.getSection();
      }
    };
  },
  methods: {
    async getSection() {
      this.$store.commit("setIsLoading", true);

      const category_slug = this.$route.params.category_slug;
      const section_slug = this.$route.params.section_slug;
      this.section = section_slug;

      await axios
        .get(
          `/api/v1/${category_slug}/${section_slug}/?page=${this.currentPage}`
        )
        .then((response) => {
          document.title = `Shoesy ${this.section}`;
          console.log(this.cat);
          this.hasNext = false;
          if (response.data.next) {
            this.hasNext = true;
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
