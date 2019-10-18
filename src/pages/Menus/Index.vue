<template>
  <div>
    <center>
      <h1 class="page-title">Menus {{$route.params.mode}}</h1>
    </center>
    <div class="card-body">

       <transition 
       name="bounce"
        enter-active-class="bounceInUp"
        leave-active-class="bounceOutDown"
        >
        <router-view style="animation-duration: 1s"/>
        
      </transition>
     
    </div>
  </div>
</template>
<script>


export default {
  
  props : ['title'],
  name: 'Dashboard',
  created(){
    this.title = this.$route.params.mode;
    //console.log(this.$router.options.routes)   
    // 
    
  }
}
</script>>
<style src="./Users.scss" lang="scss" scoped />

