import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routers: [
    {
      path: "/",
      component: App,
    },
  ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
