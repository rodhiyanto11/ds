<template>
  
  <router-view ></router-view>
  
</template>

<script>

import Users from '@/pages/Users/Users';
import UsersFrom from '@/pages/Users/Form';
import UserDashboard from '@/pages/Users/Dashboard';
export default {
  data (){
    return {
      company : this.$route.params.length > 0 ? this.$route.params : '',
      cekCompany : ''
    }
  },
  watch : {
    '$route' (to, from) {
       this.company = this.$route.params.company;
    if(this.company === undefined){
      this.cekCompany = 'N';
    }else{
      window.localStorage.setItem('company',this.$route.params.company);
      this.cekCompany = 'Y';
    } 
        if (window.localStorage.getItem('authenticated') === 'false' || window.localStorage.getItem('token') === 'false') {
     
     if(this.cekCompany === 'N'){
       
        this.$router.push('/login/default');
     }else{

       this.$router.push('/login/'+this.$route.params.company);
     }
      
    // }else if(!window.localStorage.getItem('authenticated') || !window.localStorage.getItem('token')){
    //   //console.log(2);
    //   this.$router.push('/app/dashboard');
    // }
    }
      },
  },
  name: 'App',
  created() {
    console.log(1);
    this.company = this.$route.params.company;
    if(this.company === undefined){
      this.cekCompany = 'N';
    }else{
      window.localStorage.setItem('company',this.$route.params.company);
      this.cekCompany = 'Y';
    } 
   //console.log(this.cekCompany)
    if (window.localStorage.getItem('authenticated') === 'false' || window.localStorage.getItem('token') === 'false') {
     
     if(this.cekCompany === 'N'){
       
        this.$router.push('/login/default');
     }else{

       this.$router.push('/login/'+this.$route.params.company);
     }
      
    // }else if(!window.localStorage.getItem('authenticated') || !window.localStorage.getItem('token')){
    //   //console.log(2);
    //   this.$router.push('/app/dashboard');
    // }
    }
    }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
