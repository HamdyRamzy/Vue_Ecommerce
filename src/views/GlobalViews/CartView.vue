<template>
  <div class="home">
    <HelloWorld msg="Welcome to cart view" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "CartView",
  components: {
    HelloWorld,
  },
  props: {
    msg: String,
  },
};
</script>