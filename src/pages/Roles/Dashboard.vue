<template>
  <div>
    <loading :showloading="varLoad" />
    <vue-headful :title="name"/>
    <div>
       <b-row>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Visits Today">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
              </div>
              <div class="mt">
                <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Revenue Breakdown">
           <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
              </div>
              <div class="mt">
                <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
       <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Revenue Breakdown">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
              </div>
              <div class="mt">
                <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
       <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Revenue Breakdown">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
              </div>
              <div class="mt">
                <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
     </b-row> 
    <b-row>
      <b-col xs="12">
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
                  <router-link class="btn btn-outline-dark" to='/app/roles/action/Create/new'>Create Role</router-link>
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
                  <td><li></li></td>
                  <td>{{project.role_name}}</td>
                  <td>{{project.id}}</td>
                  <td>{{project.role_status  == 0 ?  'Tidak' : 'Aktif'}}</td>
                  <td>{{project.role_desc}}</td>
                  <td>
                    <router-link :to="'/app/roles/action/Update/'+project.id" :form="project" class="btn btn-outline-dark"  v-tooltip="'Edit '+project.role_name" ><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
                        &nbsp;
                    <router-link :to="'/app/roles/action/Delete/'+project.id" :form="project" class="btn btn-outline-dark"  v-tooltip="'Delete '+project.role_name" ><i class="fa fa-trash" aria-hidden="true"></i></router-link>
                     &nbsp;
                     <router-link :to="'/app/roles/action/Detail/'+project.id" :form="project" class="btn btn-outline-dark"  v-tooltip="'Detail '+project.role_name" ><i class="fa fa-cogs" aria-hidden="true"></i></router-link>
                  </td>

                </tr>
            </tbody>
          </Datatable>
          <Pagination :pagination="pagination"
            @prev="getProjects(pagination.prevPageUrl)"
            @next="getProjects(pagination.nextPageUrl)">
          </Pagination>
        </div>
        </div>
        </b-col>
        </b-row>
        
          
        </Widget>
      </b-col>
    </b-row>
    </div>
    
    
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import Datatable from '@/components/Datatable/Datatable';
import Pagination from '@/components/Pagination/Pagination';
import Loading from '@/components/Loading/Loading';
import vueHeadful from 'vue-headful';
import Layout from '@/components/Layout/Layout';
export default {
  components: { Widget,Datatable: Datatable, Pagination: Pagination , Loading, vueHeadful,Layout},
 data() {
        let sortOrders = {};
        let columns = [
            {width: '5%', label: '', name: '' },
            {width: '10%', label: 'Role Name ', name: 'role_name'},
            {width: '10%', label: 'Role Id', name: 'id'},
            {width: '30%', label: 'Role Status', name: 'role_status'},
            {width: '30%', label: 'Role Desc', name: 'role_desc'},
            {width: '33%', label: 'action', name: 'action'}
        ];
       
        columns.forEach((column) => {
           sortOrders[column.name] = -1;
        });
        return {
            name : 'Role-Dashboard',
            varLoad : false,
            incrementNumber : 0,
            incrementHit : 1,
            projects: [],
            columns: columns,
            sortKey: 'deadline',
            sortOrders: sortOrders,
            perPage: ['5', '20', '30'],
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
        }
    },
  methods: {
    // addroute(id){
    //   let componentrolemenu = require(`@/pages/Roles/Dashboard.vue`).default;
    //   const config =  [
    //     {
    //         path: 'rolemenus:id', 
    //         component : componentrolemenu ,
    //         name : 'RoleMenus',
    //     }
    //   ]
    //   this.$router.addRoutes(["Layout",config]);
      // this.$router.addRoutes(
        
      //   //config
      //   ['/app',{
      //       path: '/app/rolemenus:id', 
      //       component : componentrolemenu ,
      //       name : 'RoleMenus',
      //   }]
      //   )
      
   // },
    getProjects(url = '/api/roles') {
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
                        this.projects = data.data.data;
                        this.configPagination(data.data);
                        this.incrementNumber = data.data.from;
                         this.$snotify.success('Fetch data is successfully')
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
  },
  

  mounted() {
    //this.getProjects();
  },
  computed:{
    
    },
  created() {
  
 //   this.varLoad = true;
    this.getProjects();
     this.title = ''
  },
  
};
</script>
<style src="./Users.scss" lang="scss" scoped />
