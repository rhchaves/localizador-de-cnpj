import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import VueSweetalert2 from "vue-sweetalert2"; //importa a lib
import "sweetalert2/dist/sweetalert2.min.css"; //configura css
Vue.use(VueSweetalert2); //usa a biblioteca

import VueMask from "v-mask";
Vue.use(VueMask);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
