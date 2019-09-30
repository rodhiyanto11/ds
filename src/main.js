// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import Axios from 'axios';

import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';

import Trend from 'vuetrend';

import store from './store';
import router from './Routes';
import App from './App';
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css';
import VTooltip from 'v-tooltip'



const options = {
  toast: {
    position: SnotifyPosition.centerTop,
    showProgressBar : false,
    bodyMaxLength : 500
  }
}

Vue.use(Snotify, options)
/*\ Axios Setup \*/
Axios.defaults.baseURL = "http://localhost:8000/"
Vue.prototype.$axios = Axios
Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.use(VTooltip)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  
});
