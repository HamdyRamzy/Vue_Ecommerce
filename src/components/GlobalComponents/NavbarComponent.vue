<template>
  <div class="">
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <a class="navbar-brand" id="offcanvasExampleLabel" href="#">SHOESY</a>
        <button
          type="button"
          class="btn-close text-reset shadow-none"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div
            class="accordion-item"
            v-for="category in categories"
            :key="category.id"
          >
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed shadow-none"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + category.name"
                aria-expanded="false"
                :aria-controls="category.name"
              >
                {{ category.name }}
              </button>
            </h2>
            <div
              :id="category.name"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="section in category.sectioncategory"
                    :key="section.id"
                  >
                    <router-link
                      :to="section.get_absolute_url"
                      class="text-decoration-none"
                    >
                      {{ section.name }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link ml-2" to="/signup"
              >Create account</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light p-3">
      <div class="container-fluid">
        <button
          class="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand m-0 pb-2" href="#"
          ><router-link class="text-decoration-none" to="/"
            >SHOESY</router-link
          ></a
        >

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ml-2">
            <li class="nav-item">
              <router-link class="nav-link ml-2" to="/">Home</router-link>
            </li>

            <li
              class="nav-item dropdown"
              v-for="category in categories"
              :key="category.id"
            >
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ category.name }}
              </a>
              <div
                class="dropdown-menu dropdown-large"
                aria-labelledby="navbarDropdown"
              >
                <div class="row">
                  <div
                    class="col-4"
                    v-for="section in category.sectioncategory"
                    :key="section.id"
                  >
                    <li>
                      <router-link
                        :to="section.get_absolute_url"
                        class="text-decoration-none"
                      >
                        <a class="dropdown-item disabled text-dark" href="#">{{
                          section.name
                        }}</a>
                      </router-link>
                    </li>
                    <small v-for="item in section.itemsection" :key="item.id">
                      <router-link
                        :to="item.get_absolute_url"
                        class="text-decoration-none"
                      >
                        <a class="dropdown-item disabled text-dark" href="#">{{
                          item.name
                        }}</a>
                      </router-link>
                    </small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ml-2" to="/signup"
                >Create account</router-link
              >
            </li>
          </ul>
        </div>

        <ul class="navbar-nav inline ml-nav-auto">
          <li class="nav-item">
            <router-link class="nav-link p-2" to="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                />
              </svg>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link p-2" to="/search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link p-2 position-relative" to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
              <span
                class="nav-link position-absolute top-0 start-100 translate-middle badge rounded-pill cart-bill"
              >
                {{ cartTotalLength }}
                <span class="visually-hidden"></span>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavbarComponent",
  props: ["categories", "cartTotalLength"],
};
</script>
<style scoped lang="scss">
nav {
  .row {
    --bs-gutter-x: 0;
    --bs-gutter-y: 0;
  }
}
.navbar-nav {
  margin-left: 10px;
}
.dropdown-large {
  min-width: 700px;
}
.list-group {
  text-align: left;
}
hr {
  margin-top: 10px;
}
.cart-number {
  position: absolute;
  top: 4px;
  right: 29px;
  padding: 10px;
}
.inline {
  display: -webkit-inline-box;
}
.navbar-light .navbar-toggler {
  border: none;
}
.ml-nav-auto {
  margin-left: auto;
}
.accordion-button:not(.collapsed) {
  color: #000 !important;
  background-color: #f4f4f5 !important;
}
.accordion-button:after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
}
.cart-bill {
  left: 26px !important;
  top: 7px !important;
}
</style>
