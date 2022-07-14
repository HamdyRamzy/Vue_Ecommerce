<template>
  <div class="">
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample1"
      aria-labelledby="offcanvasExampleLabe"
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
      <div class="offcanvas-body"></div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light p-3">
      <div class="container-fluid">
        <button
          class="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample1"
          aria-controls="offcanvasExample1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/account"
                >My Account</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/orders">My Orders</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ratings"
                >My Rating</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "SideBarComponent",
};
</script>
<style scoped lang="scss">
.nav .nav-link {
  color: rgba(0, 0, 0, 0.55);
}
.nav-item {
  text-align: start;
}
.nav {
  display: block;
}
</style>
