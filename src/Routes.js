import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';

import ErrorPage from '@/pages/Error/Error';
// Core
import Analytics from '@/pages/Analytics/Analytics';

// Tables
// import TablesBasicPage from '@ /pages/Tables/Basic';
import Role from './Role';
// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';
//Form
//user
// import Users from '@/pages/Users/Users';
// import UsersFrom from '@/pages/Users/Form';
// import UsersDashboard from '@/pages/Users/Dashboard';
//

Vue.use(Router);

export default new Router({
  mode  : 'history',
  routes: [
    {
      path: '/login/:company',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        // {
        //   path: 'analytics',
        //   name: 'Analytics',
        //   component: Analytics,
        // },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage', 
          component: ChartsPage,
        },
        ...Role,
        // {
        //   path: 'tables',
        //   name: 'TablesBasicPage',
        //   component: TablesBasicPage,
        // },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
        
      ],
    },
  ],
});
