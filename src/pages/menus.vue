<template>
  <div id="app" @click="popover_opened=false">
    <search-bar/>
    <div class="recycler">
      <resto-menu v-for="recette in recettes" :recette="recette" @item_add="addToCart" :quantite="getCartQuantite(recette)"/>
    </div>
    <button class="btn-panier" href="#" id="toggle-panier" @click.prevent.stop="popover_opened=true">
        panier ({{cart.length}})
    </button>
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
    },
    getCartQuantite(recette){
      let position = this.findPositionInCart(recette.id);
      if(position>=0){
        return this.cart[position].quantite;
      }
      return 0;
    },
    changeCart(cart){
      this.popover_opened = false;
      this.cart = cart;
    }
  }
};
</script>
<style scoped>
.btn-panier{
  border-radius: 0 5px 5px 0;
  position: absolute;
  top:50px;
  font-weight: bold;
  margin: 0;
  background-color: #955;
  z-index: 3;
}
</style>
