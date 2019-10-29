<template>

  <div class="login-page" v-bind:style="{background : changeBackgroundCompany}">
    <loading :showloading="varLoad" />
    <vue-snotify></vue-snotify>
    <vue-headful :title="name"/>
    <b-container>
      
      <Widget class="mx-auto" customHeader>
       <center>
          <!-- <img :src="require(`@/assets/whitelabel/${changeLogo}`)" style="width:200px;height:150px;"> -->
          <img v-bind:src="require('@/assets/whitelabel/'+changeLogo+'')" style="width:200px;height:150px;">

        </center>
        <p class="text-muted mb-0 mt fs-sm">
          Use email or your username to sign in.
        </p>
        
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" v-model="username"
              required type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" v-model="password"
            required type="password" name="password" placeholder="Password" />
          </div>
          <div class="clearfix">
            <div>
              <center>
                <vue-recaptcha 
                 @verify="onVerify"
                 sitekey="6Lf43q8UAAAAAFuLQ-RZnAcoJ7vKNa0d-Ist2X-a"></vue-recaptcha>
              </center>
            </div>
            <div class="btn-toolbar">
              <b-button type="submit" block variant="inverse">Login</b-button>
            </div>
          </div>
         
        </form>
      </Widget>
    </b-container>
    <footer class="footer">
      2019 &copy; PT. Administrasi Medika 
    </footer>
  </div>
</template>

<script>

import Widget from '@/components/Widget/Widget';
import Loading from '@/components/Loading/Loading';
import VueRecaptcha from 'vue-recaptcha';
import vueHeadful from 'vue-headful'
export default {
  name: 'LoginPage',
  components: { Widget,Loading, vueHeadful,VueRecaptcha},
  data() {
    return {
      name : "Login",
      varLoad : false,
      errorMessage: null,
      color : '',
      logo : '',
      username : '',
      password : '',
      verify : false,
      expired : false,
    };
  },
  computed : {
    changeLogo : function(){
      return this.logo;
    },
    changeBackgroundCompany : function(){
     // console.log(window.localStorage.getItem('company'))
          this.$axios.get('api/getcompanies', {params: {companies_name: window.localStorage.getItem('company'),logo : true}})
          .then((response) => {
          this.logo = response.data.data.companies_logo;
          this.color =  'linear-gradient(110deg, '+response.data.data.companies_color+' 65%, whitesmoke 20%)';
          })
        .catch(errors => {
          this.$snotify.error(errors.response.data);
          this.color =  'linear-gradient(110deg, #ee4035 65%, whitesmoke 20%)';
        })
        return this.color;
      
    }
   
  },
  methods: {
    onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onVerify: function (response) {
      if(response.length > 0 && response){
        this.verify = true;
      }
    },
    
    login : function(){
      if(this.verify == true){
        //console.log(1);
        this.varLoad = true;
        this.$store.dispatch("LOGIN",{
          email : this.username,
          password : this.password
        })
        .then((response) => {
        let res = response;
        localStorage.setItem('userdetail',res);
        //localStorage.setItem('color',this.color);
          this.$router.push('/app/dashboard');
          this.varLoad = false;
          location.reload();
        })
        .catch(error=>{
          this.varLoad = false;
          this.$snotify.error(error);
        });
      }
      else{
       this.$snotify.error("Please Verify reCaptcha");
      }
      
    },
    setBackground: function(){
     
          this.$axios.get('api/getcompanies', {params: {companies_name: window.localStorage.getItem('company'),logo:true}})
          .then((response) => {
         
          localStorage.setItem('logo',response.data.data.companies_logo);
          localStorage.setItem('color',response.data.data.companies_color);
          })
        .catch(errors => {
          localStorage.setItem('logo','admedika.jpg');
          localStorage.setItem('color','#ee4035');
          this.$snotify.error(errors);
        })
        return this.color;
    },
    setCompany : function(){
      //console.log(this.company);
      //console.log(this.$route.params.company);
      this.company = this.$route.params.company;
      if(this.company === undefined || this.company == 'null' || !this.company || !window.localStorage.getItem('token')){
       // console.log(2);
        //alert('invalid url');
       // window.location.href = "http://www.google.com";
          this.cekCompany = 'N';
        }else{
          window.localStorage.setItem('company',this.$route.params.company);
          this.cekCompany = 'Y';
        } 
    }
    
  },
  watch : {
     '$route' (to, from) {
              this.setBackground();
              this.setCompany();
      //  this.company = this.$route.params.company;
      //   if(this.company === undefined){
      //     this.cekCompany = 'N';
      //   }else{
      //     window.localStorage.setItem('company',this.$route.params.company);
      //     this.cekCompany = 'Y';
      //   } 
            // if (window.localStorage.getItem('authenticated') === 'false' || window.localStorage.getItem('token') === 'false') {
        
        // if(this.cekCompany === 'N'){
          
        //   // this.$router.push('/login/default');
        //     location.reload();
        // }else{

        //   //this.$router.push('/login/'+this.$route.params.company);
        //   location.reload();
        // }
      
    // }
      },
            
  },
  created() {
    
    // if(window.localStorage.getItem('authenticated') == 'true'){
    //  // console.log(1);
    // }else{
    //   console.log(window.localStorage.getItem('authenticated') == 'false' ? 'oke' : 'gagal')
    //   console.log(window.localStorage.getItem('token') == 'false' ? 'oke' : 'gagal')
    //   console.log(2);
    // }
   
    // if (window.localStorage.getItem('authenticated') !== 'false'  || window.localStorage.getItem('token') !== 'false' ) {
      
    //   this.$router.push('/app/dashboard');
    // }
    this.setCompany();
    this.setBackground();
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
