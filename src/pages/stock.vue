<template>
  <div id="app">
    <SearchBar/>
    <div class="recycler">
      <StockItem v-for="produit in stocks" :produit="produit"
        @out="decreaseStock(produit)" @in="increaseStock(produit)"/>
    </div>
    <OutDialog :visible='out_dialog_opened' :produit='produit'
      @close="out_dialog_opened=false"/>
    <InDialog :visible='in_dialog_opened' :produit='produit'
      @close="in_dialog_opened=false"/>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import StockItem from "../components/stock_item";
import OutDialog from "../components/popup_stock_out";
import InDialog from "../components/popup_stock_in";

export default {
  components:{ StockItem, SearchBar, OutDialog, InDialog},
  data(){
    return{
      stocks : [],
      out_dialog_opened:false,
      in_dialog_opened:false,
      produit :{
        "id": 0, "unite_sortant": "","rapport": 0,
        "quantite": 0,"nom": "", "unite": ""
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
    decreaseStock(produit){
      this.produit = produit;
      this.out_dialog_opened = true;
    },
    increaseStock(produit){
      this.produit = produit;
      this.in_dialog_opened = true;
    },
  }
};
</script>
<style scoped>
</style>
