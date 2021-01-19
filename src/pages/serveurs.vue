<template>
  <div id="app">
    <SearchBar @changed="search"/>
    <div class="recycler">
      <button class="big" @click="dialog_shown=true">+</button>
      <ItemServeur v-for="serveur in serveurs" :serveur="serveur" :id_table="$route.params.id_table"/>
    </div>
    <DialogServeur :visible="dialog_shown" @close="closeDialog" :serveur="serveur"/>
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import SearchBar from "../components/search";
import ItemServeur from "../components/person";
import DialogServeur from "../components/popup_serveur";

export default {
  components:{ SearchBar, ItemServeur, DialogServeur },
  data () {
    return{
      serveurs: this.$store.state.serveurs,
      dialog_shown: false, serveur:null
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
    closeDialog(){
      this.serveur=null;
      this.dialog_shown=false;
    }
  }
};
</script>
