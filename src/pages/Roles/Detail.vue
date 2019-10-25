
<template>
  <div>
    
    <loading :showloading="varLoad" />
    <vue-headful :title="name"/>
    <div>
     
      <b-col xs="12"  v-if="isFormdetail != 0">
        <Widget
          title="<h5>Support <span class='fw-semi-bold'>Requests</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader
        >
       
        <b-row>
        <b-col xs="12">
            <div class="projects">
                
              <div class="tableFilters form-inline ">
                <div class="col-md-2 col-xs-2">
                  
                  
                  <button class="btn btn-outline-dark" @click="isFormdetail = 0" >Create Role Menu</button>
                  
                </div>
                <div class="col-md-8 col-xs-2 float-right">
                        <div class="input-group">
                            <input type="search" class="form-control"  v-model="tableData.search" placeholder="Search Menu" id="search-input">
                            <span class="input-group-append">
                                <button type="button" class="btn btn-default" @click="getProjects()">Search</button>
                            </span>
                        </div>
                </div>
                <div class="col-md-2 col-xs-2">
                    <div class="select">
                        <select v-model="tableData.length" @change="getProjects()" class="form-control">
                            <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                        </select>
                    </div>
                </div>
                
            </div>
        
        <div class="card-body">
          <Datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" class="table-responsive">
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                  <td>
                      <button 
                      
                      class="btn btn-outline-dark"  
                      v-tooltip="'Delete '+project.menu_name" 
                      @click="deleteForm(project.id)"  
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                      </td>
                  <td>{{project.id}}</td>
                  <td>{{project.menu_name}}</td>
                  <td>{{project.role_name}}</td>
                  <td>{{project.role_status  == 0 ?  'Tidak' : 'Aktif'}}</td>
                  <td>{{project.role_desc}}</td>
                  <td>
                    
                  </td>

                </tr>
            </tbody>
          </Datatable>
          <Pagination :pagination="pagination"
            @prev="getProjects(pagination.prevPageUrl)"
            @next="getProjects(pagination.nextPageUrl)">
          </Pagination>
          <router-link class="btn btn-outline-dark" to="/app/roles"> <i class="fa fa-arrow-left"></i> Back</router-link>
        </div>
        </div>
        </b-col>
        </b-row>
        
          
        </Widget>
      </b-col>
      <!----ini form detail---->
      <div v-else class-="col-md-8" style="padding-bottom:5%;">
        <form  class="" @submit.prevent ="createForm()">                  
          <div class="form-group" align="center">
              <label for="firstName" class="col-sm-3 control-label">Menu</label>
              <div class="col-sm-6">
                 <v-select  v-model="form.menu_id" :options="menucollection" :reduce="menu_name => menu_name.id" label="menu_name" ></v-select>
                  <span class="help-validate">{{errors.get('menu_id')}}</span>
              </div>
          </div>
          <div class='float-right' style="padding:10px;">
            <button class="btn btn-outline-dark" >Register</button>
          </div>
        </form>
        &nbsp;&nbsp;
         <div class='float-right' style="padding:10px;">
            <button class="btn btn-outline-dark" @click="isFormdetail = 1">Cancel</button>
          </div>
            
          
      </div>
    </div>
    
    
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
import Datatable from '@/components/Datatable/Datatable';
import Pagination from '@/components/Pagination/Pagination';
import Loading from '@/components/Loading/Loading';
import vueHeadful from 'vue-headful';
import vSelect from 'vue-select'
export default {
  props : ['myid'],
  components: { Widget,Datatable: Datatable, Pagination: Pagination , Loading, vueHeadful,vSelect},
 data() {
   //$columns = ['id', 'menu_name', 'role_name','id'];
        let sortOrders = {};
        let columns = [
            {width: '5%', label: '', name: '' },
            {width: '5%', label: 'Id', name: 'id' },
            {width: '20%', label: 'Menu Name ', name: 'menu_name'},
            {width: '20%', label: 'Role name', name: 'role_name'},
            {width: '30%', label: 'Role Status', name: 'role_status'},
            {width: '10%', label: '', name: 'action'}
        ];
       
        columns.forEach((column) => {
           sortOrders[column.name] = -1;
        });
        return {
            name : 'Role-Dashboard',
            varLoad : false,
            formId : this.$route.params.id,
            menucollection : [],
            isFormdetail : 1,
            formMode : '',
            incrementNumber : 0,
            incrementHit : 1,
            projects: [],
            columns: columns,
            sortKey: 'deadline',
            sortOrders: sortOrders,
            perPage: ['5', '20', '30'],
            errors : new Errors(),
            tableData: {
                draw: 0,
                length: 5,
                search: '',
                column: 0,
                dir: 'desc',
            },
            pagination: {
                lastPage: '',
                currentPage: '',
                total: '',
                lastPageUrl: '',
                nextPageUrl: '',
                prevPageUrl: '',
                from: '',
                to: ''
            },
            form : {
              role_id : this.$route.params.id,
              menu_id : ''
            }
        }
    },
  methods: {
    createForm : function(){
            this.varLoad = true;
            this.$store.dispatch("REGISTERROLEMENU",this.form)//vuex
            .then((response) => {
                this.varLoad = false;
                this.$snotify.success("Registration is successfully");
                this.isFormdetail = 1;
                this.getDetail(this.$route.params.id);
                setTimeout(() => {
                  this.getProjects()
                },1000)
                
            })
            .catch((error) => {
                this.varLoad = false;
                this.errors.record(error.response.data );
                this.$snotify.error('Registration is error with status code : '+error.response.status);
            });
        },
    getDetail(id){
      this.$axios.get('/api/rolemenus/'+id+'/edit')
      .then((result) => {
        this.menucollection = result.data.data
      })
      .catch(error => {
        this.$snotify.error(error.response.data);
      })
      
    },
     getDetails(id){
      this.$axios.get('/api/rolemenus/'+id)
      .then((result) => {
        this.menucollection = result.data.data
      })
      .catch(error => {
        this.$snotify.error(error.response.data);
      })
    },
    getProjects(url = 'api/rolemenus?id='+this.$route.params.id+'') {
            this.varLoad = true;
            this.tableData.draw++;
            this.$axios.get(url, {params: this.tableData})
                .then(response => {
                    let data = response.data;
                    if(data.status == 'Token is Invalid'){
                      window.localStorage.setItem('authenticated', false);
                      window.localStorage.setItem('token', false);
                      this.$router.push('/login');
                    }else{
                      if (this.tableData.draw == data.draw) {
                        console.log(data.data.data);
                        this.projects = data.data.data;
                        this.configPagination(data.data);
                        this.incrementNumber = data.data.from;
                       //  this.$snotify.success('Fetch data is successfully')
                      }
                    }
                    
                   this.varLoad = false;
                })
                .catch(errors => {
                 this.varLoad = false;
                 
                 if(errors.response.status == '401'){
                    window.localStorage.setItem('authenticated', false);
                    window.localStorage.setItem('token', false);
                    this.$snotify.error('Invalid token');
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 5000);
                 }else{
                   this.$snotify.error(errors);
                 }
                });
            //this.varLoad = false;
        },
        configPagination(data) {
          //console.log(data);
            this.pagination.lastPage = data.last_page;
            this.pagination.currentPage = data.current_page;
            this.pagination.total = data.total;
            this.pagination.lastPageUrl = data.last_page_url;
            this.pagination.nextPageUrl = data.next_page_url;
            this.pagination.prevPageUrl = data.prev_page_url;
            this.pagination.from = data.from;
            this.pagination.to = data.to;
        },
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            this.tableData.column = this.getIndex(this.columns, 'role_name', key);
            this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
            this.getProjects();
        },
        getIndex(array, key, value) {
            return array.findIndex(i => i[key] == value)
        },
        deleteForm : function(id){
            this.varLoad = true;
            
            this.$store.dispatch('DELETEROLEMENU',{id : id})
            .then((response) => {
              
                 this.$snotify.success("Deleted is successfully");
                this.isFormdetail = 0;
                this.isFormdetail = 1;
                this.getDetail(this.$route.params.id);
                setTimeout(()=> {
                  this.getProjects()
                },1000)
                
                
            })
            .catch((error) => {
                this.varLoad = false;
                this.errors.record(error.response.data );
                this.$snotify.error('Delete is error with status code : '+error.response.status);
            });
        },
        
  },
  

  mounted() {
    //this.getProjects();
  },
  computed:{
      rerender(){
        this.getProjects()
        return 1;
      }
    },
  created() {
  //this.myid = this.formId
 //   this.varLoad = true;
   //if(this.isFormdetail == 1){
     this.getProjects();
   //}
   console.log(2);
   console.log(this.projects)
    console.log(this.$route.params.id);
    this.getDetail(this.$route.params.id);
     this.title = ''
  },
  
};
</script>
<style src="./Users.scss" lang="scss" scoped />
