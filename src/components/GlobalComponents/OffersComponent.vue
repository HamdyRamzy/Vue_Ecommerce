<template>
  <div class="">
    <div class="pt-2 pb-2 bg-gradiant text-white text-center">
      <p class="mb-0" id="subscribeButton">
        <i class="bi bi-gift"></i>
        <span> FREE DELIVERY ON ORDERS OVER 100 EGP</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "OffersComponent",
};
</script>
<style scoped lang="scss">
.bg-gradiant {
  background-color: #f4f4f5;
}
.bi-gift {
  color: #e60000;
  font-size: 20px;
  padding-right: 5px;
}
@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60% {
    transform: rotate(6deg);
  }
  40%,
  80% {
    transform: rotate(-6deg);
  }
}
#subscribeButton i {
  height: auto;
  display: inline-block;
  text-align: center;
  animation-name: shake;
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
  animation-iteration-count: 2;
  animation-delay: 1s;
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60% {
    transform: rotate(6deg);
  }
  40%,
  80% {
    transform: rotate(-6deg);
  }
}
</style>
