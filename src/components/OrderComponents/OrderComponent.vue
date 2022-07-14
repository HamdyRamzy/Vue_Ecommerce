<template>
  <div class="mt-3 col-lg-4 col-md-6 col-sm-12">
    <table class="table is-fullwidth">
      <thead>
        {{
          order.code_no
        }}
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in order.items" v-bind:key="item.product.id">
          <td>{{ item.product.name }}</td>
          <td>${{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "OrderComponent",
  props: {
    order: Object,
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
