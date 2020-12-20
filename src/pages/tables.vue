<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <TableItem v-for="x in (1,5)" :id_table="String(x)" :number="x"/>
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
  methods: {
  }
};
</script>
<style scoped>
</style>
