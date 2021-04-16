import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSimpleAlert from "vue-simple-alert";
import ToggleButton from 'vue-js-toggle-button'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



import VueCardFormat from 'vue-credit-card-validation';

Vue.use(VueCardFormat);
Vue.use(ToggleButton)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSimpleAlert);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
