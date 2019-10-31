<template>
<div>
  <vue-headful title="Profile"/>
    <center>
      <h1 class="page-title">Profile</h1>
    </center>
  <div class="error-page">
    <b-container>
     
    <div class="container bootstrap snippet">
    <div class="row" align="center" style="margin-top:10%;">
  	
    </div>
    
    <div class="row" style="margin-top:10%;width">

  		<div class="col-sm-3"><!--left col-->
           

      <div class="text-center">
        <img v-bind:src="form.photo" class="avatar img-circle img-thumbnail" alt="avatar">
        <h6>Upload a different photo...</h6>
        <input @change="updatePhoto" name="photo" type="file" class="text-center center-block file-upload">
        <!-- <input type="file" class="custom-file-input" id="customFile" name="photo" @change="updatePhoto" > -->
      </div>
      <div align="center" style="margin-top:20px;margin-bottom:10px;" class="panel-heading">Roles <i class="fa fa-cogs fa-1x"></i></div>
        <v-select @input="changerole" placeholder="Role Target" v-model="form.role_default"  :options="rolecollection" :reduce="role_name => role_name.id" label="role_name" ></v-select>
          
        
          
          
        </div><!--/col-3-->
    	<div class="col-sm-9">
           
              
          <div class="tab-content">
            <div class="tab-pane active" id="home" ref="homeprofile">
                <hr>
                  <form class="form" action="##" id="registrationForm"  @submit.prevent ="Update">
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="first_name"><h4>Name</h4></label>
                              <input type="text" disabled v-model="form.name" class="form-control"  id="first_name" placeholder="first name" title="enter your first name if any.">
                          </div>
                      </div>
                       <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="first_name"><h4>Username</h4></label>
                              <input type="text" disabled v-model ="form.username" class="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any.">
                          </div>
                      </div>
                      
                      
                      <div class="form-group">
                          <div class="col-xs-6">
                             <label for="mobile"><h4>Mobile</h4></label>
                              <input type="text" disabled v-model="form.phone" class="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any.">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="email"><h4>Email</h4></label>
                              <input type="email" disabled v-model="form.email" class="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email.">
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-xs-6">
                             <label for="mobile"><h4>Company</h4></label>
                              <input type="text" disabled v-model="form.company" class="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any.">
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-xs-6">
                             <label for="mobile"><h4>Division</h4></label>
                              <input type="text" disabled v-model="form.division" class="form-control" name="mobile" id="mobile" placeholder="division" title="enter your mobile number if any.">
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-xs-6">
                             <label for="mobile"><h4>Derpartment</h4></label>
                              <input type="text" disabled v-model="form.deparment" class="form-control" name="mobile" id="mobile" placeholder="department" title="enter your mobile number if any.">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="password"><h4>Password</h4></label>
                              <input type="password" v-model="form.password" class="form-control" name="password" id="password" placeholder="password" title="enter your password.">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="password2"><h4>Retype-Password</h4></label>
                              <input type="password" v-model="form.password_confirmation" class="form-control" name="password_confirmation" id="password2" placeholder="password2" title="enter your password2.">
                          </div>
                      </div>
                      <div class="form-group">
                           <div class="col-xs-12">
                                <br>
                              	<button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                               	<!-- <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> -->
                            </div>
                      </div>
              	</form>
              
              <hr>
              
             </div><!--/tab-pane-->
             <div class="tab-pane" id="messages">
               
               <h2></h2>
               
               <hr>
                  
              </div>
               
              </div><!--/tab-pane-->
          </div><!--/tab-content-->

        </div><!--/col-9-->
    </div><!--/row-->
    </b-container>
  </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import vueHeadful from 'vue-headful';
export default {
  name: 'ErrorPage',
  components : {vSelect,vueHeadful},
  data(){
    return {
      rolecollection : [],
      form : {
        name : '',
        username : '',
        email : '',
        photo : '',
        password_confirmation : '',
        company : '',
        division : '',
        department : '',
        phone : '',
        password : '',
        role_default : ''
      }
    }
  },
  methods : {
    changerole : function (){
      this.$axios.put('api/users/1',{params : {changerole : true, role_id: this.form.role_default}})
      .then((response) => {
        if(response){
         // window.location.reload();
         this.$router.push('/app/dashboard');
          //console.log(2);
        }
      })
      .catch(error=>{
        console.log(error);
      });
    },
    getrole : function(){
            this.varLoad = true;
            this.$axios.get('api/rolemenus',{params : {profile : true}})
            .then((result) => {
                this.rolecollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
    getProfile : function(){
      this.$axios.get('/api/users?profile=true') 
      .then((response) => {
        this.form  = response.data.data[0]
        this.form.photo = 'http://localhost:8000/img/'+this.form.photo
        this.password = '';
        this.verify = '';
      //  window.localStorage.setItem('photo',this.form.photo);
        
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getProfilePhoto(){
      
          let photo = (this.form.photo.length > 200) ? this.form.photo : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" ;
          return photo;
        },
    updatePhoto(e){
          // console.log('uploading');
          let file = e.target.files[0];
          // console.log(file);
          let reader = new FileReader();
          // let vm = this;
          if (file['size'] < 2048000) {
            reader.onloadend = (file) =>{
              // console.log('RESULT', reader.result)
              this.form.photo = reader.result;
            }
            reader.readAsDataURL(file);
          } else{
            this.$snotify.error('You`re file is to biggest than the limit file size');
            
          }
        },
    Update(){
     this.$axios.put('api/users/1',this.form)
     .then((response) => {
       console.log(response.data.data)
       this.$snotify.success("Update is successfully");
       setTimeout(()=> {
           window.localStorage.setItem('authenticated', false);
          window.localStorage.setItem('token', false);
           window.localStorage.setItem('photo',false) ;
      // console.log('1');
          this.$router.push('/login/'+window.localStorage.getItem('company'));
       },2000)
      
       this.$router.push('/app/profile');
     })
     .catch();
    }    
  },
  
  created (){
  if(window.localStorage.getItem('status') == 2){
     this.$snotify.success("Please change your password");
  }
  //this.$refs.homeprofile.$el.focus()
    this.getrole();
    this.getProfile();
  }
};
</script>


