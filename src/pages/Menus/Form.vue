<template>
    <div>
        <loading :showloading="varLoad" />
        <vue-headful :title="name"/>
            <Widget
            title="<h5>Support <span class='fw-semi-bold'>Requests</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
            >
               <b-row style="padding:0px;">
                    <b-col xs="12"  class="">
                        <div class="container form-horizontal">
                            <form @submit.prevent ="formMode == 'Update' ? updateForm(formId) : ( formMode == 'Delete' ? deleteForm (formId) : createForm())">                  
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Name*</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="firstName" placeholder="First Name" class="form-control" autofocus required v-model="form.menu_name">
                                        <span class="help-validate">{{errors.get('menu_name')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastName" class="col-sm-3 control-label">Route Path*</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="lastName" placeholder="Last Name" class="form-control" autofocus required v-model="form.menu_path">
                                        <span class="help-validate">{{errors.get('username')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Component* </label>
                                    <div class="col-sm-12">
                                        <input type="email" id="email" placeholder="Email" class="form-control" name= "email"  required v-model="form.menu_component">
                                        <span class="help-validate">{{errors.get('email')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Parent*</label>
                                    <div class="container">
                                        <v-select v-model="form.menu_parent" :options="menuCollection" :reduce="menu_name => menu_name.id" label="menu_name" ></v-select>
                                        <span class="help-validate">{{errors.get('companies_id')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Menu Target*</label>
                                    <div class="container">
                                        <v-select  v-model="form.menu_target" :options="menutargetCollection" :reduce="menu_target_name => menu_target_name.id" label="menu_target_name" ></v-select>
                                    </div>
                                </div>
                                 
                              
                                <div class='float-right' style="padding:10px;">
                                    <button 
                                        class="btn btn-outline-dark" 
                                        >
                                        {{ formMode == 'Update' ? 'Update' : ( formMode == 'Delete' ? 'Delete': 'Register')}}
                                    </button>
                                    &nbsp;&nbsp;
                                    <router-link 
                                        class="btn btn-outline-dark" 
                                        to="/app/users">Cancel
                                    </router-link>
                                </div>
                            </form>
                        </div>
                    </b-col>
                </b-row>   
            </Widget>
    </div>
</template>
<script>
class Errors{
    errors = {};
    get(field){
        if(this.errors[field]){
            let msg = '';
            for(var i = 0 ; i < this.errors[field].length ; i++){
                msg = msg + this.errors[field][i]+" ";
            }
           
            return msg;
        }
    }
    record(errors){
        this.errors = errors; 
    }
}
import Widget from '@/components/Widget/Widget';
import Loading from '@/components/Loading/Loading';
import vSelect from 'vue-select'
import vueHeadful from 'vue-headful';
export default {
 
    name: 'MenuForm',
    components: { Widget, Loading,vSelect,vueHeadful},
    data(){
        return {
            prevRoute                   : null,
            varLoad                     : true,
            errors                      : new Errors(),
            formMode                    : this.$route.params.mode,
            formId                      : this.$route.params.id,
            menuCollection              : [],
            menutargetcollection        : [],
            form : {
                id : '',
                menu_name : '',
                menu_path : '',
                menu_component : '',
                menu_parent : '',
                menu_target : '',
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },
    methods: {
        // getSelected(){
        //     console.log(this.form.companies_id);
        // },
        createForm : function(){
            this.varLoad = true;
            this.$store.dispatch("REGISTER",this.form)//vuex
            //this.form.post('api/admin/users/')
            .then((response) => {
                this.varLoad = false;
                this.$snotify.success("Registration is successfully");
                this.$router.back();
            })
            .catch((error) => {
                this.varLoad = false;
                this.errors.record(error.response.data );
                this.$snotify.error('Registration is error with status code : '+error.response.status);
                
            });
        },
        updateForm : function(){
           
            this.varLoad = true;
            
            this.$store.dispatch('UPDATEUSER',this.form)
            .then((response) => {
                this.varLoad = false;
                this.$snotify.success("Updated is successfully");
                this.$router.back();
            })
            .catch((error) => {
                this.varLoad = false;
                this.errors.record(error.response.data );
                this.$snotify.error('Update is error with status code : '+error.response.status);
            });
        },
        deleteForm : function(){
            this.varLoad = true;
            
            this.$store.dispatch('DELETEUSER',{id : this.form.id})
            .then((response) => {
                this.varLoad = false;
                this.$snotify.success("Deleted is successfully");
                this.$router.back();
                
            })
            .catch((error) => {
                this.varLoad = false;
                this.errors.record(error.response.data );
                this.$snotify.error('Delete is error with status code : '+error.response.status);
            });
        },
        getmenutarget : function(){
            this.varLoad = false;
            this.$axios.get('api/menutarget',{params : {menu : true}})
            .then((result) => {
                this.menutargetCollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getmenuparent : function(){
            this.varLoad = false;
            this.$axios.get('api/menus',{params : {menu : true}})
            .then((result) => {
                this.menuCollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getUserbyID : function(id){
            this.varLoad = true;
            this.$axios.get('api/users/'+id)
            .then((result) => {
                this.form = result.data.data
                this.varLoad = false;
            }).catch(error=> {
                this.varLoad = false;
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
            })
        }
    },
    computed : {
        formMethod : function(){
            return this.mode;
        }
    },
    created (){
        if(this.formMode !== 'Create'){
            this.getUserbyID(this.formId);
            if(this.formMode === 'Update'){
                this.name = "User-Update";
            }else{
                this.name = "User-Delete";
            }
        }else{
            this.name = "User-Create";
        }
        this.getmenutarget();
        this.getmenuparent();
        
        
    }
    
}
</script>