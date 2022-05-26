<template>
  <div class="home container">
    <form method="get">
      <div class="input-group input-group-lg mt-5 search-container">
        <input
          type="text"
          class="form-control shadow-none"
          placeholder="What are looking for ?"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="query"
        />
      </div>
    </form>
    <form @submit.prevent="performSearch">
      <div class="form-check">
        <input
          class="form-check-input position-static"
          type="radio"
          name="blankRadio"
          id="sweat"
          value="sweat"
          v-model="categories"
        />
      </div>
    </form>

    <div class="row" v-if="products.length">
      <ProductComponent
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
    <div v-else>
      <p class="mb-0 mt-5">NO SEARCH RESULTS FOUND</p>
      <small>NO RESULTS FOUND FOR THE SEARCH: "{{ query }}"</small>
    </div>

    <li class="nav-item dropdown position-static">
      <a
        class="nav-link"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Search Icon
      </a>
      <div class="dropdown-menu w-100" aria-labelledby="navbarDropdown">
        <div class="row">
          <div class="dropdown-item disabled text-dark text-center" href="#">
            <form method="get" action="/search">
              <div class="input-group input-group-lg mt-5 search-container">
                <input
                  type="text"
                  class="form-control shadow-none"
                  placeholder="What are looking for ?"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="query"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import axios from "axios";
import ProductComponent from "@/components/MainComponents/ProductComponent.vue";

export default {
  name: "SearchView",
  components: {
    ProductComponent,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      hasNext: true,
      query: "",
      categories: "",
    };
  },
  mounted() {
    this.performSearch();
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
  watch: {
    categories: {
      handler: function () {
        this.performSearch();
      },
      deep: true,
    },
  },
  methods: {
    async performSearch() {
      this.$store.commit("setIsLoading", true);
      await axios
        .post(`/api/v1/products/search/?page=${this.currentPage}`, {
          query: this.categories,
        })
        .then((response) => {
          document.title = `Search - ${this.query}`;
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
