<template>
    <div> 
        <loading :showloading="varLoad" />
        <vue-headful :title="name"/>
            <Widget
            title="<h5>Support <span class='fw-semi-bold'>Requests</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
            >
               <b-row style="padding:0px;" v-if="formMode!=='Detail'">
                    <b-col xs="12"  class="" >
                        <div class="container form-horizontal">
                            <form  @submit.prevent ="formMode == 'Update' ? updateForm(formId) : ( formMode == 'Delete' ? deleteForm (formId) : createForm())">                  
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Role Name*</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="role_name" placeholder="Role Name" class="form-control" autofocus required v-model="form.role_name">
                                        <span class="help-validate">{{errors.get('role_name')}}</span>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Role Desc</label>
                                    <div class="col-sm-12">
                                         <b-form-textarea
                                        id="textarea"
                                        v-model="form.role_desc"
                                        placeholder="Enter something..."
                                        rows="3"
                                        max-rows="6"
                                        ></b-form-textarea>
                                        <span class="help-validate">{{errors.get('role_desc')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">Role Status*</label>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="0" v-model="form.role_status" :checked ="0 == form.role_status">No</b-form-radio>
                                                </label>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="1" v-model="form.role_status" :checked ="0 == form.role_status">Yes</b-form-radio>
                                                </label>
                                            </div>
                                        </div>
                                        <span class="help-validate">{{errors.get('role_status')}}</span>
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
                                        to="/app/roles">Cancel
                                    </router-link>
                                </div>
                            </form>
                        </div>
                    </b-col>
                </b-row>   
               <Detail v-else/> 
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
import Detail from '@/pages/Roles/Detail'
export default {
    name: 'MenuForm',
    components: { Widget, Loading,vSelect,vueHeadful,Detail},
    data(){
        return {
            formstatus                  : false,
            prevRoute                   : null,
            varLoad                     : true,
            errors                      : new Errors(),
            dashboard                   : true,
            formMode                    : this.$route.params.mode,
            formId                      : this.$route.params.id,
            menucollection              : [],
            menutargetcollection        : [],
            form : {
                id : '',
                role_name : '',
                role_status : '',
                role_desc : '',
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
            this.$store.dispatch("REGISTERROLE",this.form)//vuex
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
            
            this.$store.dispatch('UPDATEROLE',this.form)
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
            
            this.$store.dispatch('DELETEROLE',{id : this.form.id})
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
       
        getbyID : function(id){
            this.varLoad = true;
            this.$axios.get('api/roles/'+id)
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
        //console.log(this.formMode);
        if(this.formMode !== 'Create'){
            this.getbyID(this.formId);
            if(this.formMode === 'Update'){
                this.formstatus = 1;
                this.name = "Menu-Update";
            }else{
                this.formstatus = 1;
                this.name = "Menu-Delete";
            }
        }else{
            if(this.formMode == 'Detail'){
                this.formstatus = 0;
                this.name = "Role Menus-Dashboard";
            }else{
                 this.formstatus = 1;
                 this.name = "Menu-Create";
                 this.varLoad = false;
            }
           
        }

        this.statusdetail = true;
       
        
        
        
    }
    
}
</script>