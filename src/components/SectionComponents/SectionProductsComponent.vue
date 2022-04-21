<template>
  <div class="mt-3 col-lg-4 col-md-6 col-sm-12">
    <div class="card mb-2 border-0" style="">
      <router-link :to="product.get_absolute_url" class="text-decoration-none">
        <img class="card-img-top" :src="product.get_image" alt="..." />
      </router-link>
      <div class="card-body">
        <router-link
          :to="product.get_absolute_url"
          class="text-decoration-none"
        >
          <span class="card-title d-block mb-0">{{ product.name }}</span>
        </router-link>
        <small class="card-text">
          {{ product.description }}
        </small>
        <span class="card-title d-block">{{ product.price }} EGP</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SectionProductsComponent",
  props: ["product"],
};
</script>
<style scoped lang="scss">
.card-body {
  text-align: left;
  padding: 10px 0px;
}
.card-title {
  font-weight: 600;
}
.card-img-top {
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 3%;
  height: 410px;
}
.card-img-top:hover {
  box-shadow: 1px 5px 15px grey;
  transition: box-shadow 0.2s ease-in;
}
</style>
