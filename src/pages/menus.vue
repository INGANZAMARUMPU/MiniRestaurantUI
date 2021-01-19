<template>
  <div id="app" @click="hideEverything()">
    <div class="context" ref="context" style="display:none" 
      :class="{'visible':context_shown}">
      <div class="">desactiver</div>
      <div class="">modifier</div>
    </div>
    <search-bar @changed="search"/>
    <div class="recycler">
      <button class="big">+</button>
      <RestoMenu v-for="recette in recettes" :recette="recette"
         @contextmenu="showContext"/>
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
      popover_opened:false,context_shown:false
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
    showContext(data){
      this.context_shown = true;
      let context = this.$refs.context;
      context.style.left = data.event.clientX+"px";
      context.style.top = data.event.clientY+"px";
    },
    hideEverything(){
      this.popover_opened = false;
      this.context_shown = false;
    }
  }
};
</script>
<style scoped>
.visible{
  display: block!important;
}
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
