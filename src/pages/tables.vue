<template>
  <div id="app" class="nonprintable">
    <search-bar  @changed="search"/>
    <div class="recycler">
      <div class="table_size">
        <button class="big" @click="dialog_shown=true;table=null">+</button>
      </div>
      <TableItem v-for="table in tables" :table="table" @edit="editTable" :key="table.id"/>
    </div>
    <TableDialog :table="table" :visible="dialog_shown" @close="dialog_shown=false"/>
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
        if (table.nom.includes(string)||table.number==string){
          this.tables.push(table);
        }
      }
    },
    editTable(table){
      this.table = table;
      this.dialog_shown=true;
    },
    fetchData(){
      axios.get(this.host+'/table/', this.headers)
      .then((response) => {
        this.$store.state.tables = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  mounted(){
    this.fetchData()
  }
};
</script>
<style scoped>
.table_size{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0088aa;
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
  width: 200px;
}
</style>
