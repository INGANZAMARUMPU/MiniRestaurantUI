<template>
  <div id="app">
    <search-bar  @changed="search"/>
    <div class="recycler">
      <TableItem v-for="table in tables" :table="table"/>
    </div>
  </div>
</template>

<script>
import EVENT_BUS from "../main";
import SearchBar from "../components/search";
import TableItem from "../components/table_item";

export default {
  components:{ SearchBar, TableItem },
  data () {
    return{
      tables : []
    }
  },
  mounted(){
    this.tables = this.$store.state.tables;
  },
  methods:{
    search(string){
      if (string == "") {
        this.tables = this.$store.state.tables;
        return;
      }
      this.tables = [];
      for(var i = 0; i < this.$store.state.tables.length; i++){
        let table = this.$store.state.tables[i];
        if (table.id == string ) {
          this.tables.push(table);
        }
      }
    },
  }
};
</script>
<style scoped>
</style>
