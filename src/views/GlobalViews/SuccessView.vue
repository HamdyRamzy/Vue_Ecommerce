<template>
  <div class="container">
    <div class="confetti">
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
      <div class="confetti-piece"></div>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            class="bi bi-check-circle text-success"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
            />
          </svg>
          <p class="cart-p mt-3">YOUR ORDER IS SUCCESSFULLY COMPLETED.</p>
          <small>ORDER NO: {{ order_no }}</small>
          <small class="d-block"
            >Redirect to homepage after:
            <span class="text-success font-weight-bold">{{
              countDown
            }}</span></small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessView",
  data() {
    return {
      order_no: "",
      countDown: 50,
    };
  },
  components: {},
  props: {},
  created() {
    this.countDownTimer();
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.$router.push({ path: "/" });
      }
    },
  },
  mounted() {
    document.title = "Success";
    this.order_no = this.$store.state.code_no;
  },
};
</script>
<style scoped lang="scss">
.card {
  border: none;
}
.confetti {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
}
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #ffd300;
  top: 0;
  opacity: 0;
}
.confetti-piece:nth-child(1) {
  left: 7%;
  -webkit-transform: rotate(-40deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 182ms;
  -webkit-animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
  left: 14%;
  -webkit-transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 161ms;
  -webkit-animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
  left: 21%;
  -webkit-transform: rotate(-51deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 481ms;
  -webkit-animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
  left: 28%;
  -webkit-transform: rotate(61deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 334ms;
  -webkit-animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
  left: 35%;
  -webkit-transform: rotate(-52deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 302ms;
  -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
  left: 42%;
  -webkit-transform: rotate(38deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 180ms;
  -webkit-animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
  left: 49%;
  -webkit-transform: rotate(11deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 395ms;
  -webkit-animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
  left: 56%;
  -webkit-transform: rotate(49deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 14ms;
  -webkit-animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
  left: 63%;
  -webkit-transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 149ms;
  -webkit-animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
  left: 70%;
  -webkit-transform: rotate(10deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 351ms;
  -webkit-animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
  left: 77%;
  -webkit-transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 307ms;
  -webkit-animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
  left: 84%;
  -webkit-transform: rotate(42deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 464ms;
  -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
  left: 91%;
  -webkit-transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 429ms;
  -webkit-animation-duration: 818ms;
}
.confetti-piece:nth-child(odd) {
  background: #7431e8;
}
.confetti-piece:nth-child(even) {
  z-index: 1;
}
.confetti-piece:nth-child(4n) {
  width: 5px;
  height: 12px;
  -webkit-animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
  width: 3px;
  height: 10px;
  -webkit-animation-duration: 2500ms;
  -webkit-animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}
@-webkit-keyframes makeItRain {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    -webkit-transform: translateY(350px);
  }
}
</style>
