<template>
  <div id="app" @click="popover_opened=false">
    <search-bar @changed="search"/>
    <div class="recycler">
      <RestoMenu v-for="recette in recettes" :recette="recette"/>
    </div>
    <button class="btn-panier" href="#" id="toggle-panier" @click.prevent.stop="popover_opened=true">
        panier ({{cart.getLength()}})
    </button>
    <CartDialog :visible='popover_opened' :cart='cart'
      @close="popover_opened=false"/>
  </div>
</template>

<script>
import searchbar from "../components/search";
import RestoMenu from "../components/menu";
import CartDialog from "../components/popup_panier";

export default {
  components:{ searchBar: searchbar, RestoMenu, CartDialog },
  data () {
    return{
      recettes: this.$store.state.recettes,
      cart : this.$store.state.cart,
      popover_opened:false
    }
  },
  methods:{
    search(string){
      this.recettes = [];
      for(var i = 0; i < this.$store.state.recettes.length; i++){
        let recette = this.$store.state.recettes[i];
        for (let key in recette) {
          var value = String(recette[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.recettes.push(recette);
            break;
          }
        }
      }
    },
  }
};
</script>
<style scoped>
.btn-panier{
  border-radius: 0 5px 5px 0;
  position: fixed;
  top:50px;
  font-weight: bold;
  margin: 0;
  background-color: #955;
  z-index: 2;
}
</style>
