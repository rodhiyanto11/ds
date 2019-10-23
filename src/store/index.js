import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import Menus from './menus';
import Companies from './companies';
import Roles from './roles';
import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    'user' : User,
    'companies' : Companies,
    'menus' : Menus,
    'roles' : Roles,
  },
});
