<template>
  <div @click="hideEverything()">
    <SearchBar @changed="search"/>
    <div class="context" ref="context" style="display:none" 
      :class="{'visible':context_shown}">
      <div class="" @click="changeStatus" v-if="serveurActif">desactiver</div>
      <div class="" @click="changeStatus" v-else>activer</div>
      <div class="">modifier</div>
    </div>
    <div class="recycler">
      <div class="serveur_size">
        <button class="big" @click.stop="dialog_shown=true">
          +
        </button>
      </div>
      <ItemServeur
        v-for="serveur in serveurs"
        :serveur="serveur"
        :id_table="$route.params.id_table"
        @contextmenu.native.prevent="e => showContext(e, serveur)"
      />
    </div>
    <DialogServeur :visible="dialog_shown" @close="hideEverything" :serveur="serveur"/>
  </div>
</template>

<script>
import SearchBar from "../components/search";
import ItemServeur from "../components/person";
import DialogServeur from "../components/popup_serveur";

export default {
  components:{ SearchBar, ItemServeur, DialogServeur },
  data () {
    return{
      serveurs: this.$store.state.serveurs,
      dialog_shown: false, serveur:null,
      context_shown:false,
    }
  },
  computed:{
    serveurActif(){
      return !!this.serveur && this.serveur.is_active
    }
  },
  watch:{
    "$store.state.serveurs"(new_val){
      this.serveurs = new_val
    }
  },
  methods: {
    search(string){
      this.serveurs = [];
      for(var i = 0; i < this.$store.state.serveurs.length; i++){
        let serveur = this.$store.state.serveurs[i];
        for (let key in serveur) {
          var value = String(serveur[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.serveurs.push(serveur);
            break;
          }
        }
      }
    },
    hideEverything(){
      this.serveur=null;
      this.dialog_shown=false;
      this.context_shown = false;
      this.menu=false;
    },
    showContext(event, serveur){
      this.context_shown = true;
      let context = this.$refs.context;
      context.style.left = event.clientX+"px";
      context.style.top = event.clientY+"px";
      this.serveur = serveur;
    },
    changeStatus(){
      this.serveur.is_active = !this.serveur.is_active
    },
    fetchData(){
      axios.get(this.host+'/serveur/', this.headers)
      .then((response) => {
        this.$store.state.serveurs = response.data;
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
<style>
.visible{
  display: block!important;
}
.serveur_size{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0088aa;
  border-radius: 5px;
  width: 140px;
  padding: 10px 5px;
  margin: 10px;
}
</style>
