import Vue from "vue";
import "./components";

Vue.config.productionTip = false;

new Vue({
  delimiters: ["${", "}"]
}).$mount("#app");
