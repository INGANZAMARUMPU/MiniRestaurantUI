<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <TableItem v-for="table in tables" :id_table="table.id" :number="table.number"/>
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
    }
  },
  computed:{
    tables(){
      return this.$store.state.tables;
    }
  }
};
</script>
<style scoped>
</style>
