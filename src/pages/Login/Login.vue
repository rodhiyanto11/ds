<template>

  <div class="login-page">
    <vue-snotify></vue-snotify>
    <b-container>
      
      <Widget class="mx-auto" title="<center>
          <img src='https://image4.owler.com/logo/admedika_owler_20160919_225929_original.png'>
        </center>" customHeader>
      
        <p class="text-muted mb-0 mt fs-sm">
          Use email or your username to sign in.
        </p>
        
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="username"
              required type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password"
            required type="password" name="password" placeholder="Password" />
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <b-button type="submit" size="sm" variant="inverse">Login</b-button>
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

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;
      this.$axios.post('api/login',{
        email : username,
        password : password
      },
     
      )
      .then((response) => { 
        let res = response;
        
        this.$token = res.token;
        localStorage.setItem('authenticated', true);
        localStorage.setItem('token',this.$token);
        this.$router.push('/app/dashboard');
      })
      .catch((err) => {
       this.$snotify.error(err);
      })
     
    },
  },
  
  created() {
    if (window.localStorage.getItem('authenticated') === 'true' && window.localStorage.getItem('token').length > 0) {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
