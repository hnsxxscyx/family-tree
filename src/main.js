import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// import { Button, Dialog, Table, Input, Select, Radio, DatePicker } from 'element-ui';

// Vue.use(Button)
// Vue.use(Dialog)
// Vue.use(Table)
// Vue.use(Input)
// Vue.use(Select)
// Vue.use(Radio)
// Vue.use(DatePicker)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
