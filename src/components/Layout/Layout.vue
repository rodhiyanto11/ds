<template>

<div :class="{root: true, chatOpen, sidebarClose, sidebarStatic}">
  <vue-snotify></vue-snotify>
  <div>
      <vue-headful 
        :title="title"
        
        link rel="icon" href="<%= BASE_URL %>favicon.ico"
      />
    </div>
  <Sidebar />
  <!-- <Helper /> -->
  <div class="wrap">
    <Header />
    <Chat />
    <v-touch class="content" v-bind:style="{ background: changeBackgroundLayout }" @swipeleft="handleSwipe" @swiperight="handleSwipe" :swipe-options="{direction: 'horizontal', threshold: 100}">
      <transition 
       name="bounce"
        enter-active-class="bounceInUp"
        leave-active-class="bounceOutDown"
        >
        <router-view style="animation-duration: 1s"/>
      </transition>
      
      <footer class="contentFooter">
        Admedika <a href="https://admedika.co.id" rel="nofollow noopener noreferrer" target="_blank">BigData</a> &copy; 2019
        </footer>
    </v-touch>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import Chat from '@/components/Chat/Chat';
import Helper from '@/components/Helper/Helper';
import vueHeadful from 'vue-headful';

import './Layout.scss';
//import Role from 'Role.js';
// import Router from './role.js';
// import Anal from '@/pages/Analytics/Analytics';
function guard(to, from, next){
  if(1===0) {
      // or however you store your logged in state
      next('/login'); // allow to enter route
  } else{
      next('/app'); // go to '/login';
  }
}
export default {
  props : ['title'],
  name: 'Layout',
  // beforeRouteEnter (to, from, next) {
  //   console.log(window.localStorage.getItem('authenticated'));
  //  if(window.localStorage.getItem('authenticated') == true) {
  //       // or however you store your logged in state
  //       next('/app/dashboard'); // allow to enter route
  //   } else{
  //       next('/login/'+window.localStorage.getItem('company')); // go to '/login';
  //   }
  // },
  components: { Sidebar, Header, Chat, Helper ,vueHeadful},
  data (){
    return {
      backgroundcolor : '',
    }
  },
  
  methods: {
    ...mapActions(
      'layout', ['switchSidebar', 'handleSwipe', 'changeSidebarActive'],
    ),
    // onCreated(){
    //   return Role;
    // }
    
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
      chatOpen: state => state.chatOpen,
    }),
    changeBackgroundLayout : ()=>{
     //console.log(window.localStorage.getItem('color'))
    //if(window.localStorage.getItem('company') === 'admedika'){
        return 'linear-gradient( '+window.localStorage.getItem('color')+' 50%, whitesmoke 40%)';
      // }else{
       //  return 'linear-gradient( blue 50%, whitesmoke 40%)';
       //}
    }
  },
  watch: {
            '$route' (to, from) {
              
                //on route change re run: onCreated
               // this.onCreated();
            },
  },
  created() {
       //this.onCreated();
      const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));
      if (staticSidebar) {
        this.$store.state.layout.sidebarStatic = true;
      } else if (!this.sidebarClose) {
        setTimeout(() => {
          this.switchSidebar(true);
          this.changeSidebarActive(null);
        }, 2500);
      }
    
    
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
