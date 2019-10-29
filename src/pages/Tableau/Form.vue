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
                                    <label for="email" class="col-sm-3 control-label">Tableau Name*</label>
                                    <div class="container">
                                        <input type="text" id="menu_name" placeholder="Analytics name" class="form-control" autofocus  v-model="form.analytics_name">
                                         <span class="help-validate">{{errors.get('analytics_name')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Tableau Url</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="menu_name" placeholder="Analytics Url" class="form-control" autofocus  v-model="form.analytics_url">
                                        <span class="help-validate">{{errors.get('analytics_url')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">Tableau Status*</label>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="0" v-model="form.analytics_status" :checked ="0 == form.analytics_status">No</b-form-radio>
                                                </label>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="1" v-model="form.analytics_status" :checked ="0 == form.analytics_status">Yes</b-form-radio>
                                                </label>
                                            </div>
                                        </div>
                                        <span class="help-validate">{{errors.get('anlytics_status')}}</span>
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
                                        to="/app/tableau">Cancel
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
           
            form : {
                id : '',
                analytics_name : '',
                analytics_url : '',
                analytics_status : ''
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
            this.$store.dispatch("REGISTERTABLEAU",this.form)//vuex
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
            
            this.$store.dispatch('UPDATETABLEAU',this.form)
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
            
            this.$store.dispatch('DELETETABLEAU',{id : this.form.id})
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
        
        gettableaubyID : function(id){
            this.varLoad = true;
            this.$axios.get('api/analytics/'+id)
            .then((result) => {
               // console.log(result)
                this.form = result.data[0]
                //console.log(this.form);
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
this.varLoad = false;
        
        if(this.formMode !== 'Create'){
            this.gettableaubyID(this.formId);
            this.varLoad = false;
            if(this.formMode === 'Update'){
                this.name = "Tableau-Update";
            }else{
                this.name = "Tableau-Delete";
            }
        }else{
            this.name = "Tableau-Create";
        }
        
        
        
    }
    
}
</script>