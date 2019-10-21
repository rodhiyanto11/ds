<template>
  
  <router-view :key="$router.fullPath"></router-view>
  
</template>

<script>


export default {
  data (){
    return {
      company : this.$route.params.length > 0 ? this.$route.params : '',
      cekCompany : ''
    }
  },
  watch : {
    
  },
  name: 'App',
  created() {
  //   this.company = this.$route.params.company;
  //   if(this.company === undefined){
  //     this.cekCompany = 'N';
  //   }else{
  //     window.localStorage.setItem('company',this.$route.params.company);
  //     this.cekCompany = 'Y';
  //   } 
  //  //console.log(this.cekCompany)
  //   if (window.localStorage.getItem('authenticated') === 'false' || window.localStorage.getItem('token') === 'false') {
     
  //    if(this.cekCompany === 'N'){
       
  //       this.$router.push('/login/default');
  //    }else{

  //      this.$router.push('/login/'+this.$route.params.company);
  //    }

  //   }
    const currentPath = this.$router.history.current.path;
    if (currentPath === '/' || currentPath === '/app') {
      this.$router.push('/app/dashboard');
    }
    }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
