import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { DatocmsImagePlugin } from "vue-datocms";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import VueMeta from "vue-meta";

import App from "./App.vue";
import "./assets/tailwind.css";

library.add(faImage);
library.add(faInstagram);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
