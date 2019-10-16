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
// import Router from './role.js';
// import Anal from '@/pages/Analytics/Analytics';
export default {
  props : ['title'],
  name: 'Layout',
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
  
  created() {
      
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
