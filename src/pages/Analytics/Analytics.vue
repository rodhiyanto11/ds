<template>
  <div class="tables-basic">
    <vue-headful :title="name"></vue-headful>
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
  var viz;
      var workbook;
      var containerDiv;
      function initViz(params, sheetexc) {
      //  dispose();
            var containerDiv = document.getElementById("refs"),
                url = params,
                options = {
                    hideTabs: true,
                    hideToolbar: true,
                   onFirstInteractive: function() {
                    workbook = viz.getWorkbook();
                    dash = viz.getWorkbook().getActiveSheet();
                    workbook.activateSheetAsync(dash)
                      .then(function(dashboard) {
                        var worksheets = dashboard.getWorksheets();
                        var sheetNames = [];
                        for (var i = 0, len = worksheets.length; i < len; i++) {
                          var sheet = worksheets[i];
                          sheetNames.push(sheet.getName());
                        }
                        var sel = document.getElementById('SheetList');
                        var fragment = document.createDocumentFragment();
                        if(sheetexc !=null){
                            sheetNames = sheetexc;
                        }
                        sheetNames.forEach(function(sheetName, index) {
                          var opt = document.createElement('option');
                          var shettemp = sheetName.length;
                          if(shettemp == 2){
                              opt.innerHTML = sheetName[1];
                              opt.value = sheetName[0];
                          } else {
                              opt.innerHTML = sheetName;
                              opt.value = sheetName;
                          }
                          fragment.appendChild(opt);
                        });
                        sel.appendChild(fragment);
                      });
                  }
                };
            viz = new tableau.Viz(containerDiv, url, options); 
        }
        function exportToPDF() {
            viz.showExportPDFDialog();
        }
        function getVizData() {
             options = {
              
                maxRows: 0, // Max rows to return. Use 0 to return all rows
                ignoreAliases: false,
                ignoreSelection: true,
                includeAllColumns: false
              };
              sheet = viz.getWorkbook().getActiveSheet();
              //if active tab is a worksheet, get data from that sheet
              if (sheet.getSheetType() === 'worksheet') {
                sheet.getUnderlyingDataAsync(options).then(function(t) {
                  buildMenu(t);
                });
                //if active sheet is a dashboard get data from a specified sheet
              } else {
                worksheetArray = viz.getWorkbook().getActiveSheet().getWorksheets();
                  
                if(document.getElementById("SheetList") != null){
                    for (var i = 0; i < worksheetArray.length; i++) {
                      worksheet = worksheetArray[i];
                      sheetName = worksheet.getName();
                          //get user's selection from dropdown of sheets
                          var selectedVal = document.getElementById("SheetList").value;
                          //get the data from the selected sheet
                          if (sheetName == selectedVal) {
                            viz.showExportCrossTabDialog(sheetName);
                          }
                    }
                } else {
                       
                    viz.showExportCrossTabDialog();
                }
              }
        }
        function dispose() {
            if (viz == null) {
                console.log("No Viz has been rendered, so I can't dispose anything");
                return;
            } else {
                viz.dispose();
            }
        }
        function vizResize() {
            var width = document.getElementById("resizeWidth").value;
            var height = document.getElementById("resizeHeight").value;
              viz.setFrameSize(parseInt('100%', 10), parseInt('100%', 10));
            }
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
      name : '',
      token : '',
      url : '',
      location : '',
      sheetexc : [],
    };
  },
  methods: {
     initgetViz (url) {  
       dispose();
                this.sheetexc.push("Branch by Total Active Member");
                initViz(url, this.sheetexc);
            },

    generatingTableau(){
        this.getUrl(this.$route.params.analyticsid);
        this.getTokenTableau()
        this.uri = 'https://dwh.admedika.co.id:7070/trusted/';
        var url = this.uri+window.localStorage.getItem('tableautoken')+'/'+window.localStorage.getItem('location');
         this.initgetViz(url)
         
        
    },
    getUrl(id){
      this.$axios.get("api/analytics/"+id)
      .then((result) => {
       window.localStorage.setItem('location',result.data[0].analytics_url)
       this.name = result.data[0].analytics_name  
      })
      .catch(error => {
        window.localStorage.setItem('location',id)
        //this.$snotify.error(error.response.data);
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
        this.generatingTableau();   
        setTimeout(() => {
        this.generatingTableau();
      }, 1000);
      setTimeout(() => {
          this.generatingTableau();
      }, 1000);
        //dispose();
           
        }
      },
  mounted() {
    //dispose();    
     this.$emit('up');
     this.$on('up',() => {
       console.log(2)
     })
    // dispose();
    this.generatingTableau();
    setTimeout(() => {
        this.generatingTableau();
    }, 1000);
     setTimeout(() => {
        this.generatingTableau();
    }, 1000);
    
  },
};
</script>


