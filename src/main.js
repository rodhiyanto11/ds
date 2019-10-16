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
import tableau from 'vue-tableau';
import store from './store';
import router from './Routes';
import { default as App }from './App';
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css';
import VTooltip from 'v-tooltip'



const options = {
  toast: {
    position: SnotifyPosition.centerBottom  ,
    showProgressBar : false,
    bodyMaxLength : 500
  }
}

Vue.use(Snotify, options)
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
/*\ Axios Setup \*/
window.localStorage.setItem('base_url',"http://localhost:8000/");
Axios.defaults.baseURL = "http://localhost:8000/"
Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
Axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
Axios.defaults.withCredentials = true;

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { config, response: { status } } = error
  const originalRequest = config

  if (status === 401) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      store.dispatch('REFRESH_TOKEN').then((access_token) => {
        isAlreadyFetchingAccessToken = false
        onAccessTokenFetched(access_token)
      })
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(access_token => {
        originalRequest.headers.Authorization = 'Bearer ' + access_token
        resolve(Axios(originalRequest))
      })
    })
    return retryOriginalRequest
  }
  return Promise.reject(error)
})
Vue.prototype.$axios = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  tableau,
  router,
  render: h => h(App),
  
});
