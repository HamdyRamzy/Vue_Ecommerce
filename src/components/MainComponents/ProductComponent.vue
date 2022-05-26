<template>
  <div class="mt-3 col-lg-4 col-md-6 col-sm-12">
    <div class="card mb-2 border-0" data-aos="fade-up" style="">
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
        <div v-if="product.price_before_discount" class="price-container">
          <span class="card-title d-block discounted-price"
            >{{ product.price_before_discount }} EGP</span
          >
          <span class="card-title d-block">{{ product.price }} EGP</span>
        </div>
        <span v-else class="card-title d-block">{{ product.price }} EGP</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductComponent",
  props: {
    product: Object,
  },
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
.price-container {
  display: -webkit-box;
}
.discounted-price {
  padding-right: 25px;
  text-decoration: line-through;
  color: #e60000;
}
</style>
