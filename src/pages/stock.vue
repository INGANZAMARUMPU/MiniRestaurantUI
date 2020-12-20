<template>
  <div id="app">
    <SearchBar/>
    <div class="recycler">
      <StockItem v-for="x in (1,4)" :id_table="String(x)" :number="x"/>
    </div>
  </div>
</template>

<script>
import EVENT_BUS from "../main";
import SearchBar from "../components/search";
import StockItem from "../components/stock_item";

export default {
  components:{ StockItem, SearchBar},
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
