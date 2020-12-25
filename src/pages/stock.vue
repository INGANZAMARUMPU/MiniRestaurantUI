<template>
  <div id="app">
    <SearchBar/>
    <div class="recycler">
      <StockItem v-for="produit in stocks" :produit="produit"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import StockItem from "../components/stock_item";

export default {
  components:{ StockItem, SearchBar},
  data(){
    return{
      stocks : [],
      // details_opened:false,
      // pay_opened:false,
      active_stock :{
      },
    }
  },
  mounted(){
    let result = this.$store.state.stocks;
    if (result.length > 0){
      this.stocks = result;
    } else {
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      }
      axios.get(this.$store.state.host+'/produit/', headers)
      .then((response) => {
        this.$store.state.stocks = response.data;
        this.stocks = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  methods:{
    search(string){
      this.stocks = [];
      for(var i = 0; i < this.$store.state.stocks.length; i++){
        let stock = this.$store.state.stocks[i];
        for (let key in stock) {
          var value = String(stock[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.stocks.push(stock);
            break;
          }
        }
      }
    },
  }
};
</script>
<style scoped>
</style>
