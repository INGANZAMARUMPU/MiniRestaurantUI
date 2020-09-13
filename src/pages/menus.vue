<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <resto-menu v-for="recette in recettes" :recette="recette" @item_add="addToCart"/>
    </div>
    <ul class="floating-menu floating-left floating-top">
      <li><a href="#" id="toggle-panier" @click="popover_opened=true">
        panier ({{cart.length}})
      </a></li>
    </ul>
    <cart-popover :visible='popover_opened' :cart='cart' @item_add="addToCart"/>
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import searchbar from "../components/search";
import menu from "../components/menu";
import popover from "../components/popup";

export default {
  components:{
    searchBar: searchbar,
    restoMenu:menu,
    cartPopover:popover
  },
  data () {
    return{
      recettes: EVENT_BUS.recettes,
      cart:[],
      popover_opened:false
    }
  },
  methods: {
    addToCart(data){
      let position = this.findPositionInCart(data.recette.id);
      if((position>=0)&(data.quantite == 0)){
        this.cart.shift(position);
        return;
      }
      if(position>=0){
        this.cart[position].quantite=data.quantite;
      }else{
        this.cart.push(data);
      }
    },
    findPositionInCart(item_id){
      for (let i = 0; i < this.cart.length; i++) {
        let item = this.cart[i];
        if (item.recette.id == item_id) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>
<style scoped>
  
</style>
