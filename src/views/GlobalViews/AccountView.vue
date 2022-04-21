<template>
  <div class="home">
    <HelloWorld msg="Welcome to Account view" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "AccountView",
  components: {
    HelloWorld,
  },
  props: {
    msg: String,
  },
};
</script>
