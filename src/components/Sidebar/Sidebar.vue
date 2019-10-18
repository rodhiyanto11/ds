<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link to="/app/dashboard"><span data-v-741978ef="" class="avatar thumb float-center"><img v-bind:src="require('@/assets/whitelabel/'+changeLogo)" alt="..." class="rounded-circle img-close"></span></router-link>
      <router-link to="/app/dashboard"><span data-v-741978ef="" class="avatar float-center"><img  v-bind:src="require('@/assets/whitelabel/'+changeLogo)" alt="..." class="rounded-circle img-open"></span></router-link>
    </header>
    <ul class="nav">
      <NavLink
        header="Dashboard"
        link="/app/dashboard"
        iconName="flaticon-home"
        index="dashboard"
        isHeader
      />
      <NavLink
        header="Users"
        link="/app/users"
        iconName="flaticon-list"
        index="users"
        isHeader
      />
       <NavLink
        header="Menus"
        link="/app/menus"
        iconName="flaticon-list"
        index="menus"
        isHeader
      />
      <NavLink
        header="Analytics"
        link="/app/Analytics-1"
        iconName="flaticon-list"
        index="analytics"
        isHeader
      />
      <NavLink
        header="Tables Basic"
        link="/app/Tables"
        iconName="flaticon-equal-1"
        index="tables"
        isHeader
      />
      <NavLink
        header="Notifications"
        link="/app/notifications"
        iconName="flaticon-star"
        index="notifications"
        isHeader
      />
      <NavLink
        :activeItem="activeItem"
        header="Components"
        link="/app/components"
        iconName="flaticon-network"
        index="components"
        :childrenLinks="[ 
          { header: 'Charts', link: '/app/components/charts' },
          { header: 'Icons', link: '/app/components/icons' },
          { header: 'Maps', link: '/app/components/maps' },
        ]"
      />
       <NavLink
        :activeItem="activeItem"
        header="Components"
        link="/app/components"
        iconName="flaticon-network"
        index="components"
        :childrenLinks="[
          { header: 'Charts', link: '/app/components/charts' },
          { header: 'Icons', link: '/app/components/icons' },
          { header: 'Maps', link: '/app/components/maps' },
        ]"
      />
    </ul>
    <p>
    <h5 class="navTitle">
      LABELS
      <a class="actionLink">
        <i class="la la-plus float-right" />
      </a>
    </h5>
    <ul class="sidebarLabels">
      <li>
        <a href="#">
          <i class="fa fa-circle text-warning mr-2" />
          <span class="labelName">My Recent</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-circle text-gray mr-2" />
          <span class="labelName">Starred</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-circle text-danger mr-2" />
          <span class="labelName">Background</span>
        </a>
      </li>
    </ul>
    <h5 class="navTitle">
      PROJECTS
    </h5>
    <div class="sidebarAlerts">
      <b-alert
        v-for="alert in alerts"
        :key="alert.id"
        class="sidebarAlert" variant="transparent"
        show dismissible
      >
        <span>{{alert.title}}</span><br />
        <b-progress class="sidebarProgress progress-xs mt-1"
          :variant="alert.color" :value="alert.value" :max="100" />
        <small>{{alert.footer}}</small>
      </b-alert>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  logo : '',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'info',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    // console.log(localStorage.getItem('logo'));
    // this.logo = localStorage.getItem('logo');
    this.setActiveByRoute();

  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
    changeLogo : function(){
      //this.logo = localStorage.getItem('logo');
      return localStorage.getItem('logo');
    }
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
