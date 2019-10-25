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
                    <b-col xs="12"  class="">
                        <div class="container form-horizontal">
                            <form @submit.prevent ="formMode == 'Update' ? updateForm(formId) : ( formMode == 'Delete' ? deleteForm (formId) : createForm())">                  
                                <div class="form-group">
                                    <label for="firstName" class="col-sm-3 control-label">Full Name*</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="firstName" placeholder="First Name" class="form-control" autofocus required v-model="form.name">
                                        <span class="help-validate">{{errors.get('name')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastName" class="col-sm-3 control-label">Username*</label>
                                    <div class="col-sm-12">
                                        <input type="text" id="lastName" placeholder="Last Name" class="form-control" autofocus required v-model="form.username">
                                        <span class="help-validate">{{errors.get('username')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Email* </label>
                                    <div class="col-sm-12">
                                        <input type="email" id="email" placeholder="Email" class="form-control" name= "email"  required v-model="form.email">
                                        <span class="help-validate">{{errors.get('email')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Company* </label>
                                    <div class="container">
                                        <v-select v-model="form.companies_id" :options="companiescollection" :reduce="companies_detail => companies_detail.id" label="companies_detail" ></v-select>
                                        <span class="help-validate">{{errors.get('companies_id')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Divisions </label>
                                    <div class="container">
                                        <v-select  v-model="form.divisions_id" :options="divisionscollection" :reduce="divisions_name => divisions_name.id" label="divisions_name" ></v-select>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label for="email" class="col-sm-3 control-label">Departmens </label>
                                    <div class="container">
                                        <v-select  v-model="form.departments_id" :options="departmentscollection" :reduce="departments_name => departments_name.id" label="departments_name" ></v-select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="phoneNumber" class="col-sm-3 control-label">Phone number* </label>
                                    <div class="col-sm-12">
                                        <input type="phoneNumber" id="phoneNumber" placeholder="Phone number" class="form-control" required v-model="form.phone">
                                        <span class="help-validate">{{errors.get('phone')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="birthDate" class="col-sm-3 control-label">Expired</label>
                                    <div class="col-sm-12">
                                        <input type="date" id="birthDate" class="form-control" v-model="form.expired_date">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">Expired Status*</label>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="0" v-model="form.expired_status" :checked ="0 == form.expired_status">No</b-form-radio>
                                                </label>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="radio-inline">
                                                    <b-form-radio name="radio-size" size="sm" value="1" v-model="form.expired_status" :checked ="0 == form.expired_status">Yes</b-form-radio>
                                                </label>
                                            </div>
                                        </div>
                                        <span class="help-validate">{{errors.get('expired_status')}}</span>
                                    </div>
                                </div> 
                                <!-- /.form-group -->
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
import Detail from '@/pages/Users/Detail'
export default {
 
    name: 'UserCreate',
    components: { Widget, Loading,vSelect,vueHeadful,Detail},
    data(){
        return {
            formstatus : false,
            name: '',
           options :[{code: 'CA', country: 'Canada'},{code:'ID',country : 'Indonesia'}],
            prevRoute: null,
            varLoad : true,
            errors : new Errors(),
            formMode : this.$route.params.mode,
            formId : this.$route.params.id,
            companiescollection     : [],
            divisionscollection     : [],
            departmentscollection   : [],
            form : {
                id : '',
                name : '',
                email : '',
                username : '',
                phone : '',
                expired_date : '',
                expired_status : '',
                companies_id : '',
                divisions_id : '',
                departments_id : '',
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
        getCompanies : function(){
            this.varLoad = false;
            this.$axios.get('api/companies',{params : {user : true}})
            .then((result) => {
                this.companiescollection = result.data.data;
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getDivisions : function(){
            this.varLoad = true;
            this.$axios.get('api/divisions',{params : {user : true}})
            .then((result) => {
                this.divisionscollection = result.data.data
                this.varLoad = false;
            }).catch(error=> {
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
                this.varLoad = false;
            })
        },
        getDepartments: function(){
            this.varLoad = true;
            this.$axios.get('api/departments',{params : {user : true}})
            .then((result) => {
                this.departmentscollection = result.data.data
                this.varLoad = false;
            }).catch(error=> {
                this.varLoad = false;
                //console.log(error.response.data);
                this.$snotify.error(error.response.data);
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
                this.formstatus = 1;
                this.name = "User-Update";
            }else{
                this.formstatus = 1;
                this.name = "User-Delete";
            }
        }else{
            if(this.formMode == 'Detail'){
                this.formstatus = 0;
                this.name = "User Roles-Dashboard";
            }else{
                 this.formstatus = 1;
                 this.name = "User-Create";
                 this.varLoad = false;
            }
           
        }
        this.getCompanies();
        this.getDivisions();
        this.getDepartments();
        
    }
    
}
</script>