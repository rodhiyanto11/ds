<template>
  <div class="tables-basic">
    <vue-headful title="Analytics"></vue-headful>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
          customHeader 
        >
        <div id="refs"  class="ex1" ref="tableau"></div>  
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
<script>
 ///JS FOR HANDEL CONTENT TABLEAU
      var viz;
      var workbook;
      var containerDiv;
      function initViz(params, sheetexc) {
        dispose();
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
        function getJson(url,data){
            return JSON.parse(jQuery.ajax({
                type : "GET",
                url : url,
                data : data,
                dataType : "json",
                global : false,
                async : false,
                beforeSend: function(request){
                   // request.setRequestHeader("HTTP_X_REQUESTED_WITH",'xmlhttprequest')
                    //swal("loading");
                },
                success : function(msg){
                    //swal.close();
                }
            }).responseText);
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
      token : '',
      url : '',
      location : '',
      sheetexc : [],
    };
  },
  methods: {
     initgetViz: function (url) {  
                this.sheetexc.push("Branch by Total Active Member");
                initViz(url, this.sheetexc);
            },
    generatingTableau : function(){
      this.token = this.getTokenTableau;
          this.url = 'https://dwh.admedika.co.id:7070/trusted/';
          this.location = '/views/AdBriefProviderGroupDummy/Overview';
          var url = this.url+this.token+this.location;
          this.full =  this.initgetViz(url,function(){     
          });
    }
  },
  computed : {
    getTokenTableau : function (){
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
      let data = "";
      data = response.data.data;
      window.localStorage.setItem('token_tableau',data);
      });
      return window.localStorage.getItem('token_tableau');                 
    }
  },
   watch: {
      '$route' (to, from) {
        dispose();
        this.generatingTableau();
        }
      },
  mounted() {
    dispose();
    this.generatingTableau();
  },
};
</script>


