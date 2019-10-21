<template>
  <div class="tables-basic">
    <vue-headful title="Analytics"></vue-headful>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
          customHeader 
        >
        <meta http-equiv="X-Frame-Options" content="allow">
        <div id="refs"  class="ex1" ref="tableau"></div>  
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
<script>
 
import $ from 'jquery';
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import vueHeadful from 'vue-headful'

import 'imports-loader?jQuery=jquery,this=>window!jquery-sparkline'; // eslint-disable-line
export default {
  name: 'Analytics',
  components: { Widget , vueHeadful },
  data() {
    return {
      token : '',
      url : '',
      location : '',
      sheetexc : [],
    };
  },
  methods: {
     initgetViz (url) {  
                this.sheetexc.push("Branch by Total Active Member");
                initViz(url, this.sheetexc);
            },

    generatingTableau(){
        this.getUrl(this.$route.params.analyticsid);
        this.getTokenTableau()
        this.uri = 'https://118.97.214.19:7070/trusted/';
        var url = this.uri+window.localStorage.getItem('tableautoken')+'/'+window.localStorage.getItem('location');
        this.full =  this.initgetViz(url)
    },
    getUrl(id){
      this.$axios.get("api/analytics/"+id)
      .then((result) => {
       window.localStorage.setItem('location',result.data[0].analytics_url)
      })
      .catch(error => {
        this.$snotify.error(error.response.data);
      })          
    },
     getTokenTableau  (){
     dispose();
      this.$axios.get('https://analytics.admedika.co.id/debug/tokens.php', {
                      header : {
                         "Access-Control-Allow-Origin" : "*",
                         "Access-Control-Request-Method": "GET",
                         "Content-type" : "text/json",
                      },
                 params : {"reqtoken" : "rodhi"}
                })
      .then(response=> {
      window.localStorage.setItem('tableautoken',response.data.data);
      })
      .catch(error => {
        this.$snotify.error(error.response.data);
      })          
    },
   
  },
   watch: {
      '$route' (to, from) {
        dispose();
           this.generatingTableau();   
        }
      },
  mounted() {
    dispose();    
     this.$emit('up');
     this.$on('up',() => {
       console.log(2)
     })
    this.generatingTableau();
  },
};
</script>


