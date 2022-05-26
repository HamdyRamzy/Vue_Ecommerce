import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

createApp(App).use(store).use(router, axios).mount("#app");
import "bootstrap/dist/js/bootstrap.js";
