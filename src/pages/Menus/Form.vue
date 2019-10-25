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
                                    <label for="email" class="col-sm-3 control-label">Menu Target*</label>
                                    <div class="container">
                                        <v-select placeholder="Menu Target" v-model="form.menu_target" :options="menutargetcollection" :reduce="menu_target_name => menu_target_name.id" label="menu_target_name" ></v-select>
                                         <span class="help-validate">{{errors.get('menu_target')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Name</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="menu_name" placeholder="Menu Name" class="form-control" autofocus  v-model="form.menu_name">
                                        <span class="help-validate">{{errors.get('menu_name')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastName" class="col-sm-3 control-label">Route Path</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="menu_path" placeholder="Route Path" class="form-control" autofocus  v-model="form.menu_path">
                                        <span class="help-validate">{{errors.get('menu_path')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Component </label>
                                    <div class="col-sm-12">
                                        <input type="text" id="menu_component" placeholder="menu_component" class="form-control" name= "menu_component"   v-model="form.menu_component">
                                        <span class="help-validate">{{errors.get('menu_component')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Parent*</label>
                                    <div class="container">
                                        <v-select  v-model="form.menu_parent" :options="menucollection" :reduce="menu_name => menu_name.id" label="menu_name" ></v-select>
                                        <span class="help-validate">{{errors.get('menu_parent')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Tableau URL</label>
                                    <div class="col-sm-12">
                                        <v-select  v-model="form.tableau" :options="tableaucollection" :reduce="analytics_name => analytics_name.id" label="analytics_name" >
                                            <template slot="option" slot-scope="option">
                                               
                                                    <i class="fa fa-globe"></i> {{option.analytics_name}} <span style="color:red">-</span> {{ option.analytics_url }}
                                            </template>
                                            </v-select>
                                        <span class="help-validate">{{errors.get('tabelau')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Menu Desc</label>
                                    <div class="col-sm-12">
                                            <b-form-textarea
                                            id="textarea"
                                            v-model="form.menu_desc"
                                            placeholder="Enter something..."
                                            rows="3"
                                            max-rows="6"
                                            ></b-form-textarea>
                                            <span class="help-validate">{{errors.get('menu_desc')}}</span>
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
                                        to="/app/menus">Cancel
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
            menucollection              : [],
            menutargetcollection        : [],
            tableaucollection           : [],
            options : [{code: '1', country: 'Canada'},{code: '2', country: 'Japan'},{code: '3', country: 'Nepal'}],
            form : {
                id : '',
                menu_name : '',
                menu_path : '',
                menu_component : '',
                menu_parent : '',
                menu_target : '',
                tableau     : '',
                menu_desc   : '',
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
            this.$store.dispatch("REGISTERMENU",this.form)//vuex
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
            
            this.$store.dispatch('UPDATEMENU',this.form)
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
            
            this.$store.dispatch('DELETEMENU',{id : this.form.id})
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
            this.varLoad = true;
            this.$axios.get('api/menutarget',{params : {menu : true}})
            .then((result) => {
                this.menutargetcollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getmenuparent : function(){
            this.varLoad = true;
            this.$axios.get('api/menus',{params : {menu : true}})
            .then((result) => {
                this.menucollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getanalytics : function(){
            this.varLoad = true;
            this.$axios.get('api/analytics',{params : {analytics : true}})
            .then((result) => {
                this.tableaucollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getmenubyID : function(id){
            this.varLoad = true;
            this.$axios.get('api/menus/'+id)
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

        this.getmenutarget();
        this.getmenuparent();
        this.getanalytics();
        if(this.formMode !== 'Create'){
            this.getmenubyID(this.formId);
            if(this.formMode === 'Update'){
                this.name = "Menu-Update";
            }else{
                this.name = "Menu-Delete";
            }
        }else{
            this.name = "Menu-Create";
        }
        
        
        
    }
    
}
</script>