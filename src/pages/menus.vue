<template>
  <div id="app" class="nonprintable" @click="hideEverything()">
    <div class="context" ref="context" style="display:none" 
      :class="{'visible':context_shown}">
      <div class="" @click="disableMenu" v-if="menuActive">desactiver</div>
      <div class="" @click="disableMenu" v-else>activer</div>
      <div class="">modifier</div>
    </div>
    <search-bar @changed="search"/>
    <div class="recycler">
      <div class="recette_size">
        <button class="big" @click.stop="menu_opened=true">
          +
        </button>
      </div>
      <RestoMenu v-for="recette in recettes" :recette="recette" :key="recette.id"
         @contextmenu.native.prevent="e => showContext(e, recette)"/>
    </div>
    <button class="btn-panier" href="#" id="toggle-panier" @click.prevent.stop="panier_opened=true">
        panier ({{cart.getLength()}})
    </button>
    <CartDialog :visible='panier_opened' :cart='cart'
      @close="hideEverything"/>
    <MenuDialog :visible='menu_opened' :cart='cart'
      @close="hideEverything"/>
  </div>
</template>

<script>
import searchbar from "../components/search";
import RestoMenu from "../components/menu";
import CartDialog from "../components/popup_panier";
import MenuDialog from "../components/popup_menu";

export default {
  components:{ searchBar: searchbar, RestoMenu, CartDialog, MenuDialog},
  data () {
    return{
      recettes: this.$store.state.recettes,
      cart : this.$store.state.cart,
      panier_opened:false,context_shown:false,
      menu_opened:false, menu:null
    }
  },
  computed:{
    menuActive(){
      return !!this.menu && this.menu.is_active
    }
  },
  watch:{
    "$store.state.recettes"(new_val){
      this.recettes = new_val
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
    showContext(event, menu){
      this.context_shown = true;
      let context = this.$refs.context;
      context.style.left = event.clientX+"px";
      context.style.top = event.clientY+"px";
      this.menu = menu;
    },
    disableMenu(data){
      this.menu.is_active = !this.menu.is_active;
    },
    hideEverything(){
      this.panier_opened = false;
      this.menu_opened = false;
      this.context_shown = false;
      this.menu=null;
    },
    fetchData(){
      axios.get(this.host+'/recette/', this.headers)
      .then((response) => {
        this.$store.state.recettes = response.data;
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
.recette_size{
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0088aa;
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
}
</style>
