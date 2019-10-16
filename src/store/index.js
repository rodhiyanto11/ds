import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import Companies from './companies';
import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    'user' : User,
    'companies' : Companies
  },
});
