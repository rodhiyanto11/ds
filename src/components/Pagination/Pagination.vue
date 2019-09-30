<style lang="scss">
.pagination {
    justify-content: flex-end !important;
    .page-stats {
        align-items: center;
        margin-right: 5px;
    }
    i {
        color: #3273dc !important;
    }
}
</style>
<template>


    <div class="row pagination">
      <div class="col-lg-6">
        <div class="dataTables_info" id="datatable-table_info" role="status" aria-live="polite">Showing 
          <strong class="page-stats">{{pagination.from}} - {{pagination.to}} of {{pagination.total}}</strong> 
        </div>
        </div>
        <div class="col-lg-6">
          <div class="dataTables_paginate paging_bootstrap" id="datatable-table_paginate">
            <ul class="pagination no-margin">
              <li v-if="pagination.prevPageUrl" class="prev page-item">
               <a  :disabled="false" class="page-link" @click="$emit('prev');" >Previous</a>
              </li>
              <li v-else class="prev page-item disabled">
                <a  :disabled="true" class="page-link" href="#">Previous</a>
              </li>
              
              <li v-if="pagination.nextPageUrl" class="prev page-item">
                <a v-if="pagination.nextPageUrl"  class="page-link"  @click="$emit('next');">Next</a>
              </li>
              <li v-else class="prev page-item disabled">
                <a :disabled="true" class="page-link"  @click="$emit('next');">Next</a>
              </li>
              
            </ul>
          </div>
        </div>
    </div>
    

</template>
<script>
export default {
    props: ['pagination', 'client', 'filtered'] ,
    
}
</script>