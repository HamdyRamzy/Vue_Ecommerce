<template>
  <div class="home">
    <HelloWorld msg="Welcome to Login view" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "LoginView",
  components: {
    HelloWorld,
  },
  props: {
    msg: String,
  },
};
</script>
