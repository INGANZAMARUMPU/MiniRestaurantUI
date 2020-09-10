<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <resto-table v-for="x in (1,5)" :id_table="x" :number="x"/>
    </div>
  </div>
</template>

<script>
import EVENT_BUS from "../main";
import searchbar from "../components/search";
import table from "../components/table";

export default {
  components:{
    searchBar: searchbar,
    restoTable:table
  },
  data () {
    return{
      
    }
  },
  methods: {
  }
};
</script>
<style scoped>
  
</style>
