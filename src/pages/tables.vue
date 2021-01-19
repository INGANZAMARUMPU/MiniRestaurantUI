<template>
  <div id="app">
    <search-bar  @changed="search"/>
    <div class="recycler">
      <button class="big" @click="dialog_shown=true;table=null">+</button>
      <TableItem v-for="table in tables" :table="table"/>
    </div>
    <TableDialog :table="table" :visible="dialog_shown"/>
  </div>
</template>

<script>
import SearchBar from "../components/search";
import TableItem from "../components/table_item";
import TableDialog from "../components/popup_table";

export default {
  components:{ SearchBar, TableItem, TableDialog},
  data () {
    return{
      tables : this.$store.state.tables,
      dialog_shown : false,
      table : null,
    }
  },
  watch:{
    "$store.state.tables"(new_val){
      this.tables = new_val;
    }
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
