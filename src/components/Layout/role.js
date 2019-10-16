import Vue from 'vue';
import Router from 'vue-router';

import UsersFrom from '@/pages/Users/Form';
import UsersDashboard from '@/pages/Users/Dashboard';
//

Vue.use(Router);

export default new Router({
  mode  : 'history',
  routes:  [
            {
              path: 'form/:mode/:id',
              name: 'UserFrom',
              component: UsersFrom,
            },
            {
              path: 'dashboard',
              name: 'UserDashboard',
              component: UsersDashboard,
            }
            ],
});
